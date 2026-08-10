import fs from "fs";
import path from "path";
import { chartThreePaths, chartPatricia, chartStopping, chartBlock } from "./book-charts";

// Source of truth is content/book/manuscript.md. book-compiled.html is generated
// from it with pandoc (gfm -> html) and committed, because the build environment
// has no pandoc. After editing the manuscript run:
//   pandoc content/book/manuscript.md -f gfm-tex_math_dollars -t html --wrap=none -o content/book/book-compiled.html
// The -tex_math_dollars is load-bearing: with plain gfm, two dollar amounts in
// one paragraph are parsed as TeX math and the digits render as italic letters.

const PULL_QUOTES: { anchor: string; quote: string }[] = [
  { anchor: "Both directions are permanent.", quote: "The decisions that haunt people are almost always the permanent ones." },
  { anchor: "The pause became the decision.", quote: "He gave up $2.8 million to avoid something that had cost him $6,900." },
  { anchor: "The Roth decision has three answers", quote: "Three paths. You have probably been told there are two." },
  { anchor: "The chart on their desk said 12 percent", quote: "The chart said 12 percent. The money moved at 49.95." },
  { anchor: "Patricia was paying nearly $7,000 more every year", quote: "Nearly $7,000 more in tax. $18,000 less income. Every year she has left." },
  { anchor: "She would have spent $87,000 of her own money", quote: "Spend $87,000. Save your children $447,000." },
  { anchor: "You are going to make this decision once.", quote: "You will make this decision once. They work through it every week." },
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
    `<div class="bk-chapter-open" id="introduction" data-chapter="intro"><span class="bk-ch-kicker">Introduction</span><span class="bk-ch-title">The Most Expensive Thing Patricia Ever Did Was Nothing</span></div>`
  );
  // The intro's first h2 duplicates the opener title; drop it.
  html = html.replace(/<h2 id="the-most-expensive-thing-patricia-ever-did-was-nothing">[^<]*<\/h2>/, "");

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
  const stoppingAnchor = /(<p><strong>He gave up about \$2\.8 million[\s\S]*?<\/p>)/;
  html = html.replace(
    stoppingAnchor,
    (_m, p1) => p1 + chartBlock("What He Avoided, and What It Cost", chartStopping(), "Approximate figures from Robert's illustrative plan. Both bars are drawn to the same scale.")
  );
  const patriciaAnchor = /(<p>A million-dollar IRA\.[\s\S]*?<\/p>)/;
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
      chartBlock("The Paths, Side by Side", chartThreePaths(), "Same figures as the table above. Illustrative example, Dave and Carol, $1,000,000 IRA. The third path has no bar because its size is your own number.") +
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
  { label: "How We Work", id: "how-we-work" },
  { label: "Introduction: What This Book Is", id: "introduction" },
  { label: "The Five Mistakes", id: "the-five-mistakes" },
  { label: "The Roth Conversion in Plain English", id: "the-roth-conversion-in-plain-english" },
  { label: "1. The Decision You Cannot Take Back", id: "the-decision-you-cannot-take-back" },
  { label: "2. The Three Choices In Front of You", id: "the-three-choices-in-front-of-you" },
  { label: "3. The Regret of Stopping Too Soon", id: "the-regret-of-stopping-too-soon" },
  { label: "4. The Regret of Waiting Too Long", id: "the-regret-of-waiting-too-long" },
  { label: "5. The Regret You Leave Behind", id: "the-regret-you-leave-behind" },
  { label: "6. When Each Choice Is the Right One", id: "when-each-choice-is-the-right-one" },
  { label: "7. Seeing the Shape of the Math", id: "seeing-the-shape-of-the-math" },
  { label: "8. The Tax You Already Paid", id: "the-tax-you-already-paid" },
  { label: "9. The Conversation Retirees Wish They Had Sooner", id: "the-conversation-most-retirees-wish-they-had-sooner" },
  { label: "Closing: Your Roth Reality Check", id: "how-to-set-up-your-roth-reality-check" },
  { label: "About the Retirement Education Network", id: "about-the-retirement-education-network" },
  { label: "Important Disclosures", id: "important-disclosures" },
];
