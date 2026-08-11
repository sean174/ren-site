#!/usr/bin/env node
/**
 * Build the print PDF for Roth Conversion Do's & Don'ts.
 *
 *   node scripts/build-book-pdf.mjs
 *
 * Writes public/downloads/roth-conversion-dos-and-donts.pdf, which is what the
 * "Download PDF" button in the flipbook serves.
 *
 * WHY IT IMPORTS lib/book.ts INSTEAD OF PARSING THE MANUSCRIPT
 * The sister book (The 7 1/2 Retirement Mistakes) has its own generator that
 * re-parses its markdown, because its chapters live in another repo. This book
 * cannot do that: its four charts are TypeScript functions in lib/book-charts.ts,
 * and its pull quotes and aside boxes are injected by lib/book.ts. Re-parsing
 * content/book/manuscript.md here would mean a second copy of all of that, and the
 * PDF would silently drift from the flipbook the first time either changed. So this
 * transpiles lib/book.ts with the repo's own tsc and calls getBookHtml(), the exact
 * function the page uses. Same HTML, different stylesheet.
 *
 * Requires Google Chrome, for --print-to-pdf. Run it after regenerating
 * content/book/book-compiled.html from the manuscript (see the header of lib/book.ts).
 */
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(HERE);
const TMP = path.join(ROOT, ".pdf-build");
const OUT_DIR = path.join(ROOT, "public/downloads");
const OUT_PDF = path.join(OUT_DIR, "roth-conversion-dos-and-donts.pdf");
const HTML = path.join(TMP, "roth-print.html");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const e = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function die(msg) {
  console.error(`build-book-pdf: ${msg}`);
  process.exit(1);
}

if (!fs.existsSync(CHROME)) die(`Chrome not found at ${CHROME}`);

// ---- 1. Transpile the book modules with the repo's own TypeScript ----
fs.rmSync(TMP, { recursive: true, force: true });
execFileSync(
  path.join(ROOT, "node_modules/.bin/tsc"),
  [
    "lib/book.ts",
    "--outDir", TMP,
    "--module", "commonjs",
    "--target", "es2020",
    "--moduleResolution", "node",
    "--esModuleInterop",
    "--skipLibCheck",
  ],
  { cwd: ROOT, stdio: "inherit" }
);

// ---- 2. Pull the same HTML the flipbook page renders ----
const require_ = createRequire(import.meta.url);
const book = require_(path.join(TMP, "book.js"));
process.chdir(ROOT); // getBookHtml resolves content/ off process.cwd()
const bodyHtml = book.getBookHtml();
const frontMatter = book.getBookFrontMatter();
const toc = book.BOOK_TOC;

// Charts and pull quotes are injected by matching anchor sentences in the prose, so
// rewording a paragraph silently drops a figure and nothing complains. These two
// numbers are the tripwire.
//
// THE ROTH BOOK IS BEING REWRITTEN (Sean, 2026-08-11). A rewrite legitimately changes
// these counts. When the build stops here after a content change, confirm the new
// anchors in lib/book.ts are the ones you want, then update these two constants. Do
// not delete the check: a dropped chart is invisible in a 111-page PDF.
const EXPECTED_CHARTS = 3;
const EXPECTED_PULL_QUOTES = 7;

const chartCount = (bodyHtml.match(/class="bk-chart"/g) || []).length;
const pullCount = (bodyHtml.match(/class="bk-pull"/g) || []).length;
if (chartCount !== EXPECTED_CHARTS)
  die(`expected ${EXPECTED_CHARTS} chart blocks, found ${chartCount} — an anchor in lib/book.ts stopped matching, or the book was rewritten (see EXPECTED_CHARTS above)`);
if (pullCount !== EXPECTED_PULL_QUOTES)
  die(`expected ${EXPECTED_PULL_QUOTES} pull quotes, found ${pullCount} — an anchor in lib/book.ts stopped matching, or the book was rewritten (see EXPECTED_PULL_QUOTES above)`);
if (!frontMatter.length) die("front matter came back empty");

// ---- 3. Wrap for print ----
const css = fs.readFileSync(path.join(HERE, "book-print.css"), "utf-8").trim();
const tocHtml = toc
  .map((t) => `<li><a href="#${e(t.id)}">${e(t.label)}</a></li>`)
  .join("");

const doc =
  '<!doctype html><html lang="en"><head><meta charset="utf-8">\n' +
  "<title>Roth Conversion Do's &amp; Don'ts</title>\n" +
  `<style>${css}\n</style></head><body>\n` +
  `<div class="cover"><img src="${path.join(ROOT, "public/images/book-cover.png")}" alt="Roth Conversion Do's and Don'ts"></div>\n` +
  `<section class="copyright">${frontMatter.map((p) => `<p>${p}</p>`).join("")}</section>\n` +
  '<section id="contents"><h2 class="toch">Contents</h2>\n' +
  '<p class="tnote">Read these in any order. Each chapter stands on its own.</p>\n' +
  `<ol class="toc">${tocHtml}</ol></section>\n` +
  bodyHtml +
  "</body></html>";

fs.mkdirSync(path.dirname(HTML), { recursive: true });
fs.writeFileSync(HTML, doc);

// ---- 4. Print ----
fs.mkdirSync(OUT_DIR, { recursive: true });
execFileSync(
  CHROME,
  [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${OUT_PDF}`,
    `file://${HTML}`,
  ],
  { stdio: "inherit" }
);

const kb = Math.round(fs.statSync(OUT_PDF).size / 1024);
const words = bodyHtml.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
console.log(
  `build-book-pdf: wrote ${path.relative(ROOT, OUT_PDF)} (${kb} KB, ~${words.toLocaleString()} words, ` +
    `${toc.length} sections, ${chartCount} charts, ${pullCount} pull quotes)`
);
