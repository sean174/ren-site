import { NextResponse } from "next/server";

// Congress.gov public RSS feeds — no API key required
// These are officially published by the Library of Congress
const RETIREMENT_FEEDS = [
  "https://www.congress.gov/rss/legislation.xml",
  "https://www.congress.gov/rss/most-viewed-legislation.xml",
];

// Keywords that indicate a bill is retirement-relevant
const RETIREMENT_KEYWORDS = [
  "social security", "medicare", "medicaid", "retirement", "pension",
  "rmd", "required minimum distribution", "ira ", "401(k)", "annuity",
  "senior", "elderly", "long-term care", "nursing home", "secure act",
  "cola", "cost-of-living", "supplemental security", "ssi", "benefit",
];

function parseRSSItem(item: string) {
  const get = (tag: string) => {
    const m = item.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, "i"))
      || item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
    return m ? m[1].trim() : "";
  };
  return {
    title: get("title"),
    link: get("link"),
    description: get("description").replace(/<[^>]+>/g, "").slice(0, 200),
    pubDate: get("pubDate"),
  };
}

function isRetirementRelevant(title: string, desc: string): boolean {
  const text = (title + " " + desc).toLowerCase();
  return RETIREMENT_KEYWORDS.some((kw) => text.includes(kw));
}

function summarizeStatus(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("passed") || t.includes("enacted")) return "Passed";
  if (t.includes("committee")) return "In Committee";
  if (t.includes("floor") || t.includes("vote")) return "Floor Vote";
  if (t.includes("introduced")) return "Introduced";
  return "Proposed";
}

function relativeDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const days = Math.floor((Date.now() - d.getTime()) / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

export async function GET() {
  const bills: { title: string; link: string; status: string; date: string; snippet: string }[] = [];

  for (const feed of RETIREMENT_FEEDS) {
    try {
      const res = await fetch(feed, {
        headers: { "User-Agent": "RetirementEducationNetwork/1.0 (retirementeducationnetwork.com)" },
        next: { revalidate: 3600 },
      });
      if (!res.ok) continue;
      const xml = await res.text();
      const items = xml.match(/<item>([\s\S]*?)<\/item>/gi) || [];
      for (const item of items.slice(0, 30)) {
        const parsed = parseRSSItem(item);
        if (!parsed.title) continue;
        if (!isRetirementRelevant(parsed.title, parsed.description)) continue;
        bills.push({
          title: parsed.title.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").slice(0, 120),
          link: parsed.link,
          status: summarizeStatus(parsed.title),
          date: relativeDate(parsed.pubDate),
          snippet: parsed.description.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
        });
        if (bills.length >= 8) break;
      }
    } catch {
      continue;
    }
    if (bills.length >= 8) break;
  }

  // If no live bills (RSS empty), fall back to known active legislation
  if (bills.length === 0) {
    bills.push(
      { title: "Social Security Fairness Act (P.L. 118-310)", link: "https://www.congress.gov/bill/118th-congress/house-bill/82", status: "Enacted", date: "Jan 2025", snippet: "Eliminates WEP and GPO reductions for public employees receiving pensions." },
      { title: "Medicare Drug Price Negotiation (IRA 2022)", link: "https://www.congress.gov/bill/117th-congress/house-bill/5376", status: "Enacted", date: "Aug 2022", snippet: "Allows Medicare to negotiate prices on high-cost drugs starting 2026." },
      { title: "SECURE 2.0 Act of 2022", link: "https://www.congress.gov/bill/117th-congress/house-bill/2954", status: "Enacted", date: "Dec 2022", snippet: "Raises RMD age to 73, expands catch-up contributions, new Roth rules." },
      { title: "Social Security 2100 Act", link: "https://www.congress.gov/bill/119th-congress/house-bill/2/text", status: "Proposed", date: "Jan 2025", snippet: "Would increase SS benefits across the board and expand payroll tax base." },
    );
  }

  return NextResponse.json(
    { bills, updatedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
