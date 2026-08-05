import fs from "fs";
import path from "path";
import { chartThreePaths, chartPatricia, chartRobert, chartBlock } from "./book-charts";

// Source of truth is content/book/manuscript.md. book-compiled.html is generated
// from it with pandoc (gfm -> html) and committed, because the build environment
// has no pandoc. After editing the manuscript run:
//   pandoc content/book/manuscript.md -f gfm -t html --wrap=none -o content/book/book-compiled.html

const PULL_QUOTES: { anchor: string; quote: string }[] = [
  { anchor: "Both directions are permanent.", quote: "The decisions that haunt people are almost always the permanent ones." },
  { anchor: "The Roth decision has three answers", quote: "Three paths. You have probably been told there are two." },
  { anchor: "The bracket said 12 percent.", quote: "In the 12 percent bracket, paying more than four times that." },
  { anchor: "Patricia was paying $7,750 more every year", quote: "$7,750 more in tax. $18,000 less income. Every year she has left." },
  { anchor: "She would have spent $87,000 of her own money", quote: "Spend $87,000. Save your children $471,239." },
  { anchor: "You are going to make this decision once.", quote: "You will make it once. They have made it dozens of times this year." },
];

export function getBookHtml(): string {
  const file = path.join(process.cwd(), "content/book/book-compiled.html");
  let html = fs.readFileSync(file, "utf-8");

  // Front matter (cover comment, title line, copyright paragraphs) is rebuilt as
  // designed pages by the flipbook; drop everything before the first h1.
  const firstH1 = html.indexOf("<h1");
  html = html.slice(firstH1);

  // The markdown section dividers became <hr>; chapter opener pages replace them.
  html = html.replace(/<hr\s*\/?>/g, "");

  // Merge "Chapter N" + title h1 pairs into a single chapter-opener block.
  html = html.replace(
    /<h1 id="chapter-(\d+)">Chapter \d+<\/h1>\s*<h1 id="([^"]+)">([^<]+)<\/h1>/g,
    (_m, num, id, title) =>
      `<div class="bk-chapter-open" id="${id}" data-chapter="${num}"><span class="bk-ch-kicker">Chapter ${num}</span><span class="bk-ch-title">${title}</span></div>`
  );
  html = html.replace(
    /<h1 id="closing">Closing<\/h1>\s*<h1 id="([^"]+)">([^<]+)<\/h1>/,
    (_m, id, title) =>
      `<div class="bk-chapter-open" id="${id}" data-chapter="closing"><span class="bk-ch-kicker">Closing</span><span class="bk-ch-title">${title}</span></div>`
  );
  html = html.replace(
    /<h1 id="introduction">Introduction<\/h1>/,
    `<div class="bk-chapter-open" id="introduction" data-chapter="intro"><span class="bk-ch-kicker">Introduction</span><span class="bk-ch-title">What This Book Is, and What It Isn't</span></div>`
  );
  // The intro's first h2 duplicates the opener title; drop it.
  html = html.replace(/<h2 id="what-this-book-is-and-what-it-isnt">[^<]*<\/h2>/, "");

  // Standalone sections keep h1 but styled as section openers.
  html = html.replace(/<h1 id="([^"]+)">([^<]+)<\/h1>/g, `<div class="bk-section-open" id="$1">$2</div>`);

  // Contents section: replace the markdown list with a designed TOC handled by
  // the flipbook (it builds its own from chapter data), so drop the raw one.
  html = html.replace(
    /<div class="bk-section-open" id="contents">Contents<\/div>\s*<ul>[\s\S]*?<\/ul>/,
    ""
  );

  // Inject charts.
  // NOTE: replacement functions, never replacement strings, because chart
  // titles and labels contain "$1..." which String.replace would interpret
  // as capture-group references.
  const robertAnchor = /(<p>The full breakdown of Robert’s \$147,000[\s\S]*?<\/p>)/;
  html = html.replace(
    robertAnchor,
    (_m, p1) => p1 + chartBlock("Where Robert's $147,000 Went", chartRobert(), "Approximate figures from Robert's illustrative plan.")
  );
  const patriciaAnchor = /(<p>A million-dollar IRA\. \$774,000[\s\S]*?<\/p>)/;
  html = html.replace(
    patriciaAnchor,
    (_m, p1) => p1 + chartBlock("Who Pays for the Non-Decision", chartPatricia(), "Approximate figures from Patricia's illustrative case.")
  );
  // Three-paths chart right after the side-by-side table.
  const tableEnd = html.indexOf("</table>");
  if (tableEnd !== -1) {
    const insertAt = tableEnd + "</table>".length;
    html =
      html.slice(0, insertAt) +
      chartBlock("The Three Paths, Side by Side", chartThreePaths(), "Same figures as the table above. Illustrative example, Dave and Carol, $1,000,000 IRA.") +
      html.slice(insertAt);
  }

  // Pull quotes: insert after the paragraph containing each anchor sentence.
  for (const { anchor, quote } of PULL_QUOTES) {
    const idx = html.indexOf(anchor);
    if (idx === -1) continue;
    const pEnd = html.indexOf("</p>", idx);
    if (pEnd === -1) continue;
    const insertAt = pEnd + "</p>".length;
    html = html.slice(0, insertAt) + `<aside class="bk-pull">${quote}</aside>` + html.slice(insertAt);
  }

  // The effective-rate aside arrives as a blockquote; give it its own class.
  html = html.replace(/<blockquote>\s*<p>(<strong>An aside on what the tax actually costs\.<\/strong>[\s\S]*?)<\/p>\s*<\/blockquote>/, `<aside class="bk-box">$1</aside>`);

  return html;
}

// Copyright-page paragraphs (the front matter dropped from the flow).
export function getBookFrontMatter(): string[] {
  const file = path.join(process.cwd(), "content/book/book-compiled.html");
  const html = fs.readFileSync(file, "utf-8");
  const firstH1 = html.indexOf("<h1");
  const front = html.slice(0, firstH1);
  const paras = [...front.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => m[1]);
  return paras;
}

export const BOOK_TOC = [
  { label: "A Note Before You Begin", id: "a-note-before-you-begin" },
  { label: "Introduction: What This Book Is, and What It Isn't", id: "introduction" },
  { label: "The Roth Conversion in Plain English", id: "the-roth-conversion-in-plain-english" },
  { label: "Two Retirees, Two Regrets", id: "two-retirees-two-regrets" },
  { label: "1. The Decision You Cannot Take Back", id: "the-decision-you-cannot-take-back" },
  { label: "2. The Three Choices In Front of You", id: "the-three-choices-in-front-of-you" },
  { label: "3. The Regret of Acting Too Soon", id: "the-regret-of-acting-too-soon" },
  { label: "4. The Regret of Waiting Too Long", id: "the-regret-of-waiting-too-long" },
  { label: "5. The Regret You Leave Behind", id: "the-regret-you-leave-behind" },
  { label: "6. When Each Choice Is the Right One", id: "when-each-choice-is-the-right-one" },
  { label: "7. Seeing Your Picture Before You Decide", id: "seeing-your-picture-before-you-decide" },
  { label: "8. The Conversation Most Retirees Wish They Had Sooner", id: "the-conversation-most-retirees-wish-they-had-sooner" },
  { label: "Closing: How to Set Up Your Roth Reality Check", id: "how-to-set-up-your-roth-reality-check" },
  { label: "About the Retirement Education Network", id: "about-the-retirement-education-network" },
  { label: "Important Disclosures", id: "important-disclosures" },
];
