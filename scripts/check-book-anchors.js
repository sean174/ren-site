// Verifies that every anchor lib/book.ts depends on still matches the compiled
// HTML. A missed pull-quote anchor fails SILENTLY in book.ts (it does
// `continue`), so this check is the only thing that catches it.
//
// Everything is read out of lib/book.ts itself, so it cannot drift.
//   node scripts/check-book-anchors.js

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const bookTs = fs.readFileSync(path.join(root, "lib/book.ts"), "utf-8");
const html = fs.readFileSync(
  path.join(root, "content/book/book-compiled.html"),
  "utf-8"
);

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error("FAIL  " + msg);
};
const pass = (msg) => console.log("ok    " + msg);

// 1. Pull-quote anchors: plain-string `anchor: "..."` entries.
const anchors = [...bookTs.matchAll(/anchor:\s*"((?:[^"\\]|\\.)*)"/g)].map((m) =>
  m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\")
);
if (anchors.length === 0) fail("no pull-quote anchors found in lib/book.ts");
for (const a of anchors) {
  if (html.includes(a)) pass(`pull-quote anchor: ${a}`);
  else fail(`pull-quote anchor NOT FOUND in compiled HTML: ${a}`);
}

// 2. Chart anchors: `const somethingAnchor = /.../;`
const regexAnchors = [
  ...bookTs.matchAll(/const\s+(\w*Anchor)\s*=\s*\/((?:[^/\\]|\\.)+)\/([gimsuy]*)\s*;/g),
];
if (regexAnchors.length === 0) fail("no *Anchor regexes found in lib/book.ts");
for (const [, name, body, flags] of regexAnchors) {
  const re = new RegExp(body, flags);
  if (re.test(html)) pass(`chart anchor regex: ${name}`);
  else fail(`chart anchor regex NO MATCH in compiled HTML: ${name} = /${body}/`);
}

// 3. The three-paths chart hangs off the first </table>, not a named anchor.
if (html.includes("</table>")) pass("three-paths chart: a <table> exists");
else fail("three-paths chart: no <table> in compiled HTML, chart will not render");

// 4. The effective-rate aside blockquote rewrite.
const asideRe =
  /<blockquote>\s*<p>(<strong>An aside on what the tax actually costs\.<\/strong>[\s\S]*?)<\/p>\s*<\/blockquote>/;
if (asideRe.test(html)) pass("effective-rate aside blockquote");
else fail("effective-rate aside blockquote NO MATCH");

// 5. The Contents list strip. This one runs in book.ts AFTER the h1 headings
// have been rewritten into bk-section-open divs, so apply that one rewrite to a
// copy before testing, or the check reports a false failure.
const sectionOpened = html.replace(
  /<h1 id="([^"]+)">([^<]+)<\/h1>/g,
  `<div class="bk-section-open" id="$1">$2</div>`
);
const contentsRe =
  /<div class="bk-section-open" id="contents">Contents<\/div>\s*<ul>[\s\S]*?<\/ul>/;
if (contentsRe.test(sectionOpened)) pass("contents-list strip");
else fail("contents-list strip NO MATCH (raw markdown TOC will render)");

// 6. Every BOOK_TOC id exists as a heading id in the compiled HTML.
const tocIds = [...bookTs.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
if (tocIds.length === 0) fail("no BOOK_TOC ids found in lib/book.ts");
const headingIds = new Set(
  [...html.matchAll(/<h[1-6][^>]*\bid="([^"]+)"/g)].map((m) => m[1])
);
for (const id of tocIds) {
  if (headingIds.has(id)) pass(`toc id: ${id}`);
  else fail(`toc id has no heading in compiled HTML: ${id}`);
}

// 7. The manuscript and the compiled HTML must not have drifted.
const mdMtime = fs.statSync(path.join(root, "content/book/manuscript.md")).mtimeMs;
const htmlMtime = fs.statSync(
  path.join(root, "content/book/book-compiled.html")
).mtimeMs;
if (mdMtime > htmlMtime)
  fail("manuscript.md is NEWER than book-compiled.html: recompile with pandoc -f gfm-tex_math_dollars");
else pass("compiled HTML is at least as new as the manuscript");

console.log(
  failures === 0
    ? "\nAll book anchor checks passed."
    : `\n${failures} check(s) FAILED.`
);
process.exit(failures === 0 ? 0 : 1);
