import { NextResponse } from "next/server";

const FEEDS = [
  { name: "SSA", url: "https://www.ssa.gov/news/press/releases/rss/press.xml" },
  { name: "CMS", url: "https://www.cms.gov/newsroom/fact-sheets.rss" },
  { name: "IRS", url: "https://www.irs.gov/newsroom/news-releases-for-current-month.rss" },
];

const RELEVANCE_KEYWORDS = [
  "social security", "medicare", "medicaid", "retirement", "pension", "ira",
  "rmd", "cola", "benefit", "part b", "part d", "premium", "enrollment",
  "annuity", "401", "senior", "elderly", "long-term care", "tax", "inflation",
];

function parseItems(xml: string, source: string) {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/gi) || [];
  return items.slice(0, 10).map((item) => {
    const get = (tag: string) => {
      const m = item.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, "i"))
        || item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
      return m ? m[1].trim().replace(/<[^>]+>/g, "") : "";
    };
    return { title: get("title"), link: get("link"), pubDate: get("pubDate"), source };
  });
}

function isRelevant(title: string): boolean {
  const t = title.toLowerCase();
  return RELEVANCE_KEYWORDS.some((kw) => t.includes(kw));
}

function fmtDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  } catch { return ""; }
}

export async function GET() {
  const allItems: { title: string; link: string; date: string; source: string }[] = [];

  await Promise.all(
    FEEDS.map(async ({ name, url }) => {
      try {
        const res = await fetch(url, {
          headers: { "User-Agent": "RetirementEducationNetwork/1.0 (retirementeducationnetwork.com)" },
          next: { revalidate: 1800 },
        });
        if (!res.ok) return;
        const xml = await res.text();
        const items = parseItems(xml, name);
        for (const item of items) {
          if (!item.title) continue;
          if (!isRelevant(item.title)) continue;
          allItems.push({
            title: item.title.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").slice(0, 140),
            link: item.link,
            date: fmtDate(item.pubDate),
            source: name,
          });
        }
      } catch {
        // silently skip failed feeds
      }
    })
  );

  // Sort by recency (most recent first, approximate)
  allItems.sort((a, b) => (a.date < b.date ? 1 : -1));

  return NextResponse.json(
    { items: allItems.slice(0, 12), updatedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" } }
  );
}
