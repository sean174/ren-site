import fs from "fs";
import path from "path";

// Source of truth is content/book-mistakes/manuscript.md. book-compiled.html is
// generated from it with pandoc and committed, because the build environment has
// no pandoc. After editing the manuscript run:
//   pandoc content/book-mistakes/manuscript.md -f gfm -t html --wrap=none -o content/book-mistakes/book-compiled.html
//
// Two manuscript conventions this file depends on:
//   1. Each chapter is a single h1 followed by a one-line italic subtitle.
//      Do NOT wrap the subtitle in an HTML comment. A line beginning with a
//      comment is treated as a raw HTML block by pandoc and the asterisks then
//      render literally on the page.
//   2. No \newpage directives. Page breaks come from CSS in the PDF build and
//      from pagination here; a LaTeX directive survives gfm as visible text.

const FILE = "content/book-mistakes/book-compiled.html";

export function getMistakesBookHtml(): string {
  let html = fs.readFileSync(path.join(process.cwd(), FILE), "utf-8");

  // Front matter (title block, copyright) is rebuilt as designed pages by the
  // flipbook; drop everything before the first h1.
  html = html.slice(html.indexOf("<h1"));

  // Markdown section dividers became <hr>; section opener pages replace them.
  html = html.replace(/<hr\s*\/?>/g, "");

  // Editorial notes for the compliance desk and for production live in the
  // manuscript as HTML comments. They must never reach a reader.
  html = html.replace(/<!--[\s\S]*?-->/g, "");

  // This book has no "Chapter N" kicker lines; every chapter is a single h1.
  // Keep the id so the contents can jump to it.
  html = html.replace(
    /<h1 id="([^"]+)">([^<]+)<\/h1>/g,
    `<div class="bk-section-open" id="$1">$2</div>`
  );

  // The flipbook builds its own contents from MISTAKES_TOC, so remove the raw
  // markdown list. Nothing may sit between the heading and the list or this
  // silently no-ops and the reader sees two tables of contents.
  html = html.replace(
    /<div class="bk-section-open" id="contents">Contents<\/div>\s*<ul>[\s\S]*?<\/ul>/,
    ""
  );

  // The PDF edition ends each chapter with a "Return to Contents" link. The
  // flipbook removes the contents anchor above and navigates from the toolbar,
  // so that link would dangle here. Strip it.
  html = html.replace(/<p>\s*<a href="#contents">[^<]*<\/a>\s*<\/p>/g, "");

  return html;
}

// Copyright-page paragraphs (the front matter dropped from the flow).
export function getMistakesFrontMatter(): string[] {
  const html = fs.readFileSync(path.join(process.cwd(), FILE), "utf-8");
  const front = html.slice(0, html.indexOf("<h1")).replace(/<!--[\s\S]*?-->/g, "");
  return [...front.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => m[1]);
}

// ids are pandoc's slugs of the h1 text. If a chapter title changes, the id
// changes with it and this array must be updated or that entry stops working.
export const MISTAKES_TOC = [
  { label: "How to Use This Book", id: "how-to-use-this-book" },
  { label: "What This Book Is, and What It Isn't", id: "what-this-book-is-and-what-it-isnt" },
  { label: "How We Work", id: "how-we-work" },
  { label: "It Could Happen to You", id: "it-could-happen-to-you" },
  { label: "1. The First Five Years Decide the Next Thirty", id: "the-first-five-years-decide-the-next-thirty" },
  { label: "2. The One Thing Medicare Won't Cover", id: "the-one-thing-medicare-wont-cover" },
  { label: "3. The Doors That Close at 65", id: "the-doors-that-close-at-65" },
  { label: "4. The Bill You Haven't Opened Yet", id: "the-bill-you-havent-opened-yet" },
  { label: "5. The Form That Overrides Your Will", id: "the-form-that-overrides-your-will" },
  { label: "6. The Accounts You Stopped Thinking About", id: "the-accounts-you-stopped-thinking-about" },
  { label: "7. The Asset You Spent a Lifetime Earning", id: "the-asset-you-spent-a-lifetime-earning" },
  { label: "Closing: The Questions This Book Cannot Answer", id: "the-questions-this-book-cannot-answer" },
];
