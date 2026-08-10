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
    { name: "Path 1: Don't Convert", segs: [324000, 17300, 406200] },
    { name: "Path 2: Convert On Your Own", segs: [194800, 11500, 0] },
    { name: "Path 3: Built Around Your Own Year", segs: [] },
  ];
  const max = 747500;
  const barH = 26;
  const rowGap = 62;
  const x0 = 8;
  const plotW = W - x0 - 86;
  const top = 34;
  let svg = legendRow(x0, 14, [
    ["Retiree tax", BLUE],
    ["Medicare surcharges", BRICK],
    ["Heirs' tax", CORAL],
  ]);
  rows.forEach((r, i) => {
    const y = top + i * rowGap + 14;
    const total = r.segs.reduce((a, b) => a + b, 0);
    svg += `<text x="${x0}" y="${y - 6}" ${FONT} font-size="13.5" font-weight="600" fill="${INK}">${r.name}</text>`;
    // The third path has no bar on purpose: its size is the reader's own number.
    if (r.segs.length === 0) {
      svg += `<rect x="${x0}" y="${y}" width="${plotW}" height="${barH}" rx="4" fill="none" stroke="${INK}" stroke-opacity="0.35" stroke-dasharray="5 4"/>`;
      svg += `<text x="${x0 + 12}" y="${y + barH / 2 + 4}" ${FONT} font-size="13" font-style="italic" fill="${INK}" fill-opacity="0.75">your numbers</text>`;
      return;
    }
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
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Family lifetime tax cost by path: Path 1 approximately $747,500, Path 2 approximately $206,300, Path 3 depends on the reader's own numbers" style="width:100%;height:auto;display:block">${svg}</svg>`;
}

// Chart 2: who pays for Patricia's non-decision (Chapter 4)
export function chartPatricia(): string {
  const W = 420;
  const rows: [string, number, string][] = [
    ["Her own federal tax, 73 to 88", 379000, BLUE],
    ["Her Medicare surcharges", 32000, BRICK],
    ["Her children's tax bill", 447000, CORAL],
  ];
  const max = 447000;
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
  svg += `<text x="${x0}" y="${totY}" ${FONT} font-size="14" font-weight="700" fill="${INK}">Total: $858,000 on a $1,000,000 IRA</text>`;
  const H = totY + 10;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Patricia's family cost: $379,000 her own federal tax, $32,000 Medicare surcharges, $447,000 her children's tax" style="width:100%;height:auto;display:block">${svg}</svg>`;
}

// Chart 3: what stopped Robert against what stopping cost him (Chapter 3).
// Drawn strictly to scale. The point of the chart is that one bar is invisible.
export function chartStopping(): string {
  const W = 420;
  const rows: [string, number, string][] = [
    ["The surcharge that made him stop", 6890, BRICK],
    ["What stopping cost his family", 2821850, BLUE],
  ];
  const max = 2821850;
  const barH = 26;
  const rowGap = 62;
  const x0 = 8;
  const plotW = W - x0 - 96;
  let svg = "";
  rows.forEach(([label, v, color], i) => {
    const y = i * rowGap + 20;
    const w = (v / max) * plotW;
    svg += `<text x="${x0}" y="${y - 6}" ${FONT} font-size="13.5" font-weight="600" fill="${INK}">${label}</text>`;
    if (w < 3) {
      // to scale this is under a pixel; draw a hairline and lead the eye to it
      svg += `<rect x="${x0}" y="${y}" width="2" height="${barH}" fill="${color}"/>`;
      svg += `<line x1="${x0 + 3}" y1="${y + barH / 2}" x2="${x0 + 26}" y2="${y + barH / 2}" stroke="${INK}" stroke-opacity="0.35" stroke-width="1"/>`;
      svg += `<text x="${x0 + 31}" y="${y + barH / 2 + 4}" ${FONT} font-size="13.5" font-weight="700" fill="${INK}">${fmt(v)}</text>`;
    } else {
      svg += `<path d="M ${x0} ${y} h ${w - 4} a 4 4 0 0 1 4 4 v ${barH - 8} a 4 4 0 0 1 -4 4 h ${-(w - 4)} z" fill="${color}"/>`;
      svg += `<text x="${x0 + w + 6}" y="${y + barH / 2 + 4}" ${FONT} font-size="13.5" font-weight="700" fill="${INK}">${fmt(v)}</text>`;
    }
  });
  const totY = rows.length * rowGap + 14;
  svg += `<text x="${x0}" y="${totY}" ${FONT} font-size="14" font-weight="700" fill="${INK}">Both bars drawn to the same scale.</text>`;
  const H = totY + 10;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="The Medicare surcharge that made Robert stop was about $6,890. Stopping cost his family about $2,821,850, roughly four hundred times as much." style="width:100%;height:auto;display:block">${svg}</svg>`;
}

export function chartBlock(title: string, svg: string, note?: string): string {
  return `<figure class="bk-chart"><figcaption class="bk-chart-title">${title}</figcaption>${svg}${
    note ? `<div class="bk-chart-note">${note}</div>` : ""
  }</figure>`;
}
