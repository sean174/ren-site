// Static SVG charts for the Roth Conversion Do's & Don'ts flipbook.
// Palette validated (dataviz six-checks, light surface #FFFFFF):
//   blue #2E6FA3 (retiree tax) · brick #B5432F (widow tax) · coral #E0885E (heirs' tax)
// Coral carries a contrast WARN at 2.67:1; relief = every bar is direct-labeled
// and the book prints the full table beside the chart.

const BLUE = "#2E6FA3";
const BRICK = "#B5432F";
const CORAL = "#E0885E";
const INK = "#3A3A3A";
const MUTED = "#6B6B6B";
const FONT = "font-family='Inter,-apple-system,sans-serif'";

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

function legendRow(x: number, y: number, items: [string, string][]): string {
  let out = "";
  let cx = x;
  for (const [label, color] of items) {
    out += `<rect x="${cx}" y="${y - 8}" width="10" height="10" rx="2" fill="${color}"/>`;
    out += `<text x="${cx + 15}" y="${y + 1}" ${FONT} font-size="12.5" fill="${INK}">${label}</text>`;
    cx += 15 + label.length * 6.7 + 24;
  }
  return out;
}

// Chart 1: the three paths, stacked horizontal bars (Chapter 7)
export function chartThreePaths(): string {
  const W = 420;
  const rows = [
    { name: "Path 1: Don't Convert", segs: [300300, 43200, 471239] },
    { name: "Path 2: DIY Conversion", segs: [268112, 7800, 13440] },
    { name: "Path 3: Structured Conversion", segs: [114300, 0, 0] },
  ];
  const max = 814739;
  const barH = 26;
  const rowGap = 62;
  const x0 = 8;
  const plotW = W - x0 - 86;
  const top = 34;
  let svg = legendRow(x0, 14, [
    ["Retiree tax", BLUE],
    ["Widow tax", BRICK],
    ["Heirs' tax", CORAL],
  ]);
  rows.forEach((r, i) => {
    const y = top + i * rowGap + 14;
    const total = r.segs.reduce((a, b) => a + b, 0);
    svg += `<text x="${x0}" y="${y - 6}" ${FONT} font-size="13.5" font-weight="600" fill="${INK}">${r.name}</text>`;
    let cx = x0;
    const colors = [BLUE, BRICK, CORAL];
    const drawn = r.segs.filter((s) => s > 0).length;
    let seen = 0;
    r.segs.forEach((seg, j) => {
      if (seg <= 0) return;
      seen++;
      const w = Math.max(3, (seg / max) * plotW - (seen < drawn ? 2 : 0));
      const isLast = seen === drawn;
      // rounded right end only on the final segment; 2px white gap between fills
      svg += isLast
        ? `<path d="M ${cx} ${y} h ${w - 4} a 4 4 0 0 1 4 4 v ${barH - 8} a 4 4 0 0 1 -4 4 h ${-(w - 4)} z" fill="${colors[j]}"/>`
        : `<rect x="${cx}" y="${y}" width="${w}" height="${barH}" fill="${colors[j]}"/>`;
      cx += w + 2;
    });
    svg += `<text x="${cx + 6}" y="${y + barH / 2 + 4}" ${FONT} font-size="13.5" font-weight="700" fill="${INK}">${fmt(total)}</text>`;
  });
  const H = top + rows.length * rowGap + 4;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Family lifetime tax cost by path: Path 1 $814,739, Path 2 $289,352, Path 3 $114,300" style="width:100%;height:auto;display:block">${svg}</svg>`;
}

// Chart 2: who pays for Patricia's non-decision (Chapter 4)
export function chartPatricia(): string {
  const W = 420;
  const rows: [string, number, string][] = [
    ["Tax during her RMD years", 189000, BLUE],
    ["The widow's penalty", 114300, BRICK],
    ["Her children's tax bill", 471239, CORAL],
  ];
  const max = 471239;
  const barH = 22;
  const rowGap = 56;
  const x0 = 8;
  const plotW = W - x0 - 84;
  let svg = "";
  rows.forEach(([label, v, color], i) => {
    const y = i * rowGap + 16;
    const w = Math.max(4, (v / max) * plotW);
    svg += `<text x="${x0}" y="${y - 5}" ${FONT} font-size="13.5" font-weight="600" fill="${INK}">${label}</text>`;
    svg += `<path d="M ${x0} ${y} h ${w - 4} a 4 4 0 0 1 4 4 v ${barH - 8} a 4 4 0 0 1 -4 4 h ${-(w - 4)} z" fill="${color}"/>`;
    svg += `<text x="${x0 + w + 6}" y="${y + barH / 2 + 4}" ${FONT} font-size="13.5" font-weight="700" fill="${INK}">${fmt(v)}</text>`;
  });
  const totY = rows.length * rowGap + 18;
  svg += `<text x="${x0}" y="${totY}" ${FONT} font-size="14" font-weight="700" fill="${INK}">Total: $774,000 on a $1,000,000 IRA</text>`;
  const H = totY + 10;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Patricia's family cost: $189,000 RMD-years tax, $114,300 widow's penalty, $471,239 children's tax" style="width:100%;height:auto;display:block">${svg}</svg>`;
}

// Chart 3: where Robert's $147,000 went (Chapter 3). Breakdown of one total
// by cause: single hue, identity carried by labels.
export function chartRobert(): string {
  const W = 420;
  const rows: [string, number][] = [
    ["Social Security taxation cascade", 52000],
    ["RMD and conversion overlap", 42000],
    ["IRMAA Medicare surcharges", 26712],
    ["Widow tax on the unconverted balance", 26000],
  ];
  const max = 52000;
  const barH = 18;
  const rowGap = 50;
  const x0 = 8;
  const plotW = W - x0 - 78;
  let svg = "";
  rows.forEach(([label, v], i) => {
    const y = i * rowGap + 16;
    const w = Math.max(4, (v / max) * plotW);
    svg += `<text x="${x0}" y="${y - 5}" ${FONT} font-size="13.5" font-weight="600" fill="${INK}">${label}</text>`;
    svg += `<path d="M ${x0} ${y} h ${w - 4} a 4 4 0 0 1 4 4 v ${barH - 8} a 4 4 0 0 1 -4 4 h ${-(w - 4)} z" fill="${BLUE}"/>`;
    svg += `<text x="${x0 + w + 6}" y="${y + barH / 2 + 4}" ${FONT} font-size="13.5" font-weight="700" fill="${INK}">${fmt(v)}</text>`;
  });
  const totY = rows.length * rowGap + 16;
  svg += `<text x="${x0}" y="${totY}" ${FONT} font-size="14" font-weight="700" fill="${INK}">Total: approximately $147,000 in unanticipated costs</text>`;
  const H = totY + 10;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Robert's $147,000 breakdown: $52,000 Social Security cascade, $42,000 RMD overlap, $26,712 IRMAA, $26,000 widow tax" style="width:100%;height:auto;display:block">${svg}</svg>`;
}

export function chartBlock(title: string, svg: string, note?: string): string {
  return `<figure class="bk-chart"><figcaption class="bk-chart-title">${title}</figcaption>${svg}${
    note ? `<div class="bk-chart-note">${note}</div>` : ""
  }</figure>`;
}
