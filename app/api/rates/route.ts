import { NextResponse } from "next/server";

async function fetchFREDSeries(series: string): Promise<{ value: number; date: string } | null> {
  try {
    const res = await fetch(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${series}`, {
      headers: { "User-Agent": "RetirementEducationNetwork/1.0 (retirementeducationnetwork.com)" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const text = await res.text();
    const lines = text.trim().split("\n").filter((l) => l && !l.startsWith("DATE"));
    for (let i = lines.length - 1; i >= 0; i--) {
      const [date, val] = lines[i].split(",");
      if (val && val.trim() !== ".") {
        return { value: parseFloat(val), date: date.trim() };
      }
    }
    return null;
  } catch {
    return null;
  }
}

async function fetchCPIYoY(): Promise<{ yoy: string; label: string } | null> {
  try {
    const res = await fetch("https://fred.stlouisfed.org/graph/fredgraph.csv?id=CPIAUCSL", {
      headers: { "User-Agent": "RetirementEducationNetwork/1.0 (retirementeducationnetwork.com)" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const text = await res.text();
    const lines = text
      .trim()
      .split("\n")
      .filter((l) => l && !l.startsWith("DATE") && l.split(",")[1]?.trim() !== ".");
    if (lines.length < 13) return null;
    const last = lines[lines.length - 1].split(",");
    const yearAgo = lines[lines.length - 13].split(",");
    const yoy = ((parseFloat(last[1]) - parseFloat(yearAgo[1])) / parseFloat(yearAgo[1])) * 100;
    const d = new Date(last[0].trim() + "T00:00:00Z");
    const label = d.toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
    return { yoy: yoy.toFixed(1), label };
  } catch {
    return null;
  }
}

export async function GET() {
  const [fedFunds, treasury10yr, cpi] = await Promise.all([
    fetchFREDSeries("FEDFUNDS"),
    fetchFREDSeries("DGS10"),
    fetchCPIYoY(),
  ]);

  return NextResponse.json(
    { fedFunds, treasury10yr, cpi, updatedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
