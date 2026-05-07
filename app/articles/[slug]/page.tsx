import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export async function generateStaticParams() {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  return files.map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

type Props = { params: Promise<{ slug: string }> };

const CATEGORY_LABELS: Record<string, string> = {
  "safe-money": "Safe Money",
  "long-term-care": "Long-Term Care",
  "medicare": "Medicare",
  "social-security": "Social Security",
  "wills-and-trusts": "Wills & Trusts",
  "tax-planning": "Tax Planning",
};

function fmtDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function getRelatedArticles(currentSlug: string, category: string, limit = 4) {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs.readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md") && !f.includes(currentSlug))
    .map((f) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, f), "utf-8");
      const { data } = matter(raw);
      return { slug: f.replace(/\.md$/, ""), ...data } as any;
    })
    .filter((a: any) => a.category === category)
    .sort((a: any, b: any) => (b.date ?? "").localeCompare(a.date ?? ""))
    .slice(0, limit);
}

// Returns [{ id, text }] for h2 headings
function extractTOC(md: string): Array<{ id: string; text: string }> {
  const lines = md.split("\n");
  const toc: Array<{ id: string; text: string }> = [];
  for (const line of lines) {
    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      toc.push({ id, text });
    }
  }
  return toc;
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code style="background:#F4EFE6;padding:1px 5px;font-family:JetBrains Mono,monospace;font-size:.85em">$1</code>');
}

function mdToHtml(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let inList = false;
  let inOl = false;
  let inTable = false;
  let isFirst = true;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // HR
    if (/^---+$/.test(line.trim())) {
      if (inList) { out.push("</ul>"); inList = false; }
      if (inOl) { out.push("</ol>"); inOl = false; }
      if (inTable) { out.push("</tbody></table></div>"); inTable = false; }
      out.push('<hr style="border:none;border-top:1px solid rgba(15,42,68,.2);margin:32px 0" />');
      continue;
    }

    // Table header
    if (line.startsWith("|") && lines[i + 1]?.match(/^\|[-| ]+\|$/)) {
      if (inList) { out.push("</ul>"); inList = false; }
      if (inOl) { out.push("</ol>"); inOl = false; }
      const headers = line.split("|").slice(1, -1).map((h) => h.trim());
      out.push('<div style="overflow-x:auto;margin:28px 0"><table style="width:100%;border-top:2px solid #0F2A44;border-bottom:2px solid #0F2A44;border-collapse:collapse;font-family:var(--font-inter),sans-serif">');
      out.push('<thead><tr>' + headers.map((h) => `<th style="padding:8px 12px;border-bottom:1px solid #0F2A44;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#0F2A44;font-weight:700;text-align:left">${h}</th>`).join("") + '</tr></thead><tbody>');
      inTable = true;
      i++;
      continue;
    }

    // Table row
    if (inTable && line.startsWith("|")) {
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      out.push("<tr>" + cells.map((c) => `<td style="padding:10px 12px;border-bottom:1px solid rgba(15,42,68,.15);font-size:14px">${inlineFormat(c)}</td>`).join("") + "</tr>");
      continue;
    } else if (inTable) {
      out.push("</tbody></table></div>");
      inTable = false;
    }

    // H2 — with anchor
    if (line.startsWith("## ")) {
      if (inList) { out.push("</ul>"); inList = false; }
      if (inOl) { out.push("</ol>"); inOl = false; }
      const text = line.slice(3);
      const id = text.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      out.push(`<h2 id="${id}" style="font-family:var(--font-serif),Georgia,serif;font-weight:600;font-size:30px;line-height:1.15;color:#0F2A44;margin:40px 0 14px;letter-spacing:-.01em">${inlineFormat(text)}</h2>`);
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      if (inList) { out.push("</ul>"); inList = false; }
      if (inOl) { out.push("</ol>"); inOl = false; }
      out.push(`<h3 style="font-family:var(--font-serif),Georgia,serif;font-weight:600;font-size:21px;color:#0F2A44;margin:28px 0 8px;letter-spacing:-.005em">${inlineFormat(line.slice(4))}</h3>`);
      continue;
    }

    // Blockquote → pullquote
    if (line.startsWith("> ")) {
      if (inList) { out.push("</ul>"); inList = false; }
      if (inOl) { out.push("</ol>"); inOl = false; }
      out.push(`<div style="margin:32px 0;padding:22px 0;border-top:3px double #0F2A44;border-bottom:3px double #0F2A44;font-family:var(--font-serif),Georgia,serif;font-style:italic;font-weight:300;font-size:26px;line-height:1.25;color:#0F2A44;letter-spacing:-.005em">${inlineFormat(line.slice(2))}</div>`);
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      if (inList) { out.push("</ul>"); inList = false; }
      if (!inOl) { out.push('<ol style="margin:0 0 20px;padding:0;list-style:none;counter-reset:ol">'); inOl = true; }
      out.push(`<li style="counter-increment:ol;display:grid;grid-template-columns:28px 1fr;gap:8px;padding:8px 0;border-bottom:1px solid rgba(15,42,68,.12);line-height:1.6"><span style="font-family:JetBrains Mono,monospace;color:#B5432F;font-weight:500;font-size:12px;margin-top:3px">${(line.match(/^\d+/)??[""])[0].padStart(2,"0")}</span><span>${inlineFormat(line.replace(/^\d+\.\s/, ""))}</span></li>`);
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      if (inOl) { out.push("</ol>"); inOl = false; }
      if (!inList) { out.push('<ul style="margin:0 0 20px;padding:0;list-style:none">'); inList = true; }
      out.push(`<li style="padding:8px 0 8px 24px;border-bottom:1px solid rgba(15,42,68,.12);position:relative;line-height:1.6"><span style="position:absolute;left:0;top:8px;color:#B5432F;font-weight:600;font-family:var(--font-serif),Georgia,serif">§</span>${inlineFormat(line.slice(2))}</li>`);
      continue;
    }

    // Close lists on blank line
    if (line.trim() === "") {
      if (inList) { out.push("</ul>"); inList = false; }
      if (inOl) { out.push("</ol>"); inOl = false; }
      continue;
    }

    // Regular paragraph
    if (!inList && !inOl) {
      if (isFirst) {
        // First paragraph: drop cap + small-caps first line
        out.push(`<p style="font-size:18px;line-height:1.65;margin:0 0 18px;font-family:var(--font-serif),Georgia,serif"><span style="font-family:var(--font-serif),Georgia,serif;font-weight:600;font-size:72px;line-height:.85;float:left;color:#0F2A44;padding:6px 12px 0 0">${inlineFormat(line).charAt(0)}</span>${inlineFormat(line).slice(1)}</p>`);
        isFirst = false;
      } else {
        out.push(`<p style="font-size:18px;line-height:1.65;margin:0 0 18px;font-family:var(--font-serif),Georgia,serif">${inlineFormat(line)}</p>`);
      }
    }
  }

  if (inList) out.push("</ul>");
  if (inOl) out.push("</ol>");
  if (inTable) out.push("</tbody></table></div>");
  return out.join("\n");
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return (
      <div style={{ background: "#FBF8F2", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px", padding: "60px 32px" }}>
        <h1 style={{ fontFamily: "var(--font-serif),Georgia,serif", fontSize: "32px", color: "#0F2A44", margin: 0 }}>Article not found</h1>
        <a href="/" style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 700, color: "#0F2A44", textDecoration: "none", borderBottom: "1px solid #0F2A44", paddingBottom: "3px" }}>
          ← Back to home
        </a>
      </div>
    );
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const htmlContent = mdToHtml(content);
  const toc = extractTOC(content);
  const related = getRelatedArticles(slug, data.category);
  const dateFormatted = fmtDate(data.date);

  // Hero image: slug-specific first, category fallback
  const fs2 = fs;
  const slugImgPath = path.join(process.cwd(), "public", "images", "articles", `${slug}.jpg`);
  const catImgPath = path.join(process.cwd(), "public", "images", `${data.category}.jpg`);
  const imgSrc = fs2.existsSync(slugImgPath)
    ? `/images/articles/${slug}.jpg`
    : fs2.existsSync(catImgPath) ? `/images/${data.category}.jpg` : null;

  // Pexels credit from image-log.json
  let creditName = "";
  let creditUrl = "https://www.pexels.com";
  try {
    const logPath = "/home/sean/ren/content/image-log.json";
    if (fs2.existsSync(logPath)) {
      const log = JSON.parse(fs2.readFileSync(logPath, "utf-8"));
      const entries = log.images ?? log;
      const entry = (Array.isArray(entries) ? entries : []).find(
        (e: any) => e.used_for === `article:${slug}`
      );
      if (entry) {
        creditName = entry.photographer || "";
        creditUrl = entry.photo_url || (entry.source === "pexels" ? "https://www.pexels.com" : "https://www.pexels.com");
      }
    }
  } catch {}

  // Estimate read time
  const wordCount = content.split(/\s+/).length;
  const readMins = Math.max(1, Math.round(wordCount / 200));

  return (
    <article style={{ background: "#FBF8F2" }}>

      {/* ── ARTICLE HEADER ───────────────────────────────────────────────── */}
      <div style={{
        padding: "32px 32px 22px",
        display: "grid",
        gridTemplateColumns: "1fr 220px",
        gap: "32px",
        borderBottom: "1px solid rgba(15,42,68,.18)",
      }}>
        {/* Left: crumb + kicker + title + deck + byline */}
        <div>
          {/* Breadcrumb */}
          <div style={{
            fontFamily: "var(--font-inter),sans-serif",
            fontSize: "11px",
            letterSpacing: ".22em",
            textTransform: "uppercase" as const,
            color: "#B5432F",
            fontWeight: 700,
            marginBottom: "18px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <a href="/" style={{ color: "#6B6B6B", textDecoration: "none", fontWeight: 500 }}>Home</a>
            <span style={{ color: "rgba(15,42,68,.35)" }}>›</span>
            {data.category && (
              <>
                <a href={`/${data.category}`} style={{ color: "#6B6B6B", textDecoration: "none", fontWeight: 500 }}>
                  {CATEGORY_LABELS[data.category] ?? data.category}
                </a>
                <span style={{ color: "rgba(15,42,68,.35)" }}>›</span>
              </>
            )}
            <span style={{ color: "#B5432F" }}>Article</span>
          </div>

          {/* Category kicker */}
          {data.category && (
            <div style={{
              fontFamily: "var(--font-inter),sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: ".22em",
              textTransform: "uppercase" as const,
              color: "#B5432F",
              marginBottom: "14px",
            }}>
              {CATEGORY_LABELS[data.category] ?? data.category}
            </div>
          )}

          {/* Title */}
          <h1 style={{
            fontFamily: "var(--font-serif),Georgia,serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 5vw, 64px)",
            lineHeight: 1,
            color: "#0F2A44",
            margin: "0 0 18px",
            letterSpacing: "-.02em",
          }}>
            {data.title}
          </h1>

          {/* Excerpt/deck */}
          {data.excerpt && (
            <p style={{
              fontFamily: "var(--font-serif),Georgia,serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "22px",
              lineHeight: 1.4,
              color: "#3A3A3A",
              margin: "0 0 22px",
              maxWidth: "780px",
            }}>
              {data.excerpt}
            </p>
          )}

          {/* Byline row */}
          <div style={{
            display: "flex",
            gap: "28px",
            alignItems: "center",
            fontFamily: "var(--font-inter),sans-serif",
            fontSize: "11px",
            letterSpacing: ".04em",
            color: "#6B6B6B",
            paddingTop: "18px",
            borderTop: "1px solid rgba(15,42,68,.18)",
          }}>
            <div style={{ lineHeight: 1.4 }}>
              <b style={{ display: "block", color: "#0F2A44", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: ".18em", fontSize: "10px", marginBottom: "2px" }}>
                By
              </b>
              REN Editorial Team
            </div>
            {dateFormatted && (
              <div style={{ lineHeight: 1.4 }}>
                <b style={{ display: "block", color: "#0F2A44", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: ".18em", fontSize: "10px", marginBottom: "2px" }}>
                  Published
                </b>
                {dateFormatted}
              </div>
            )}
            <div style={{ lineHeight: 1.4 }}>
              <b style={{ display: "block", color: "#0F2A44", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: ".18em", fontSize: "10px", marginBottom: "2px" }}>
                Read time
              </b>
              {readMins} min
            </div>
          </div>
        </div>

        {/* Right: key info sidebar */}
        <div style={{ paddingTop: "4px" }}>
          <div style={{
            fontFamily: "var(--font-inter),sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: ".24em",
            textTransform: "uppercase" as const,
            color: "#0F2A44",
            marginBottom: "12px",
            paddingBottom: "8px",
            borderBottom: "2px solid #0F2A44",
          }}>
            Quick Facts
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {data.category && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "8px", padding: "10px 0", borderBottom: "1px solid rgba(15,42,68,.15)", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "10px", letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#6B6B6B", fontWeight: 600 }}>Section</span>
                <span style={{ fontFamily: "var(--font-serif),Georgia,serif", fontWeight: 600, fontSize: "15px", color: "#0F2A44", textAlign: "right" }}>
                  {CATEGORY_LABELS[data.category] ?? data.category}
                </span>
              </div>
            )}
            {dateFormatted && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "8px", padding: "10px 0", borderBottom: "1px solid rgba(15,42,68,.15)", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "10px", letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#6B6B6B", fontWeight: 600 }}>Published</span>
                <span style={{ fontFamily: "var(--font-serif),Georgia,serif", fontWeight: 600, fontSize: "13px", color: "#0F2A44", textAlign: "right" }}>
                  {dateFormatted}
                </span>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "8px", padding: "10px 0", borderBottom: "1px solid rgba(15,42,68,.15)", alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "10px", letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#6B6B6B", fontWeight: 600 }}>Read time</span>
              <span style={{ fontFamily: "var(--font-serif),Georgia,serif", fontWeight: 600, fontSize: "18px", color: "#B5432F" }}>{readMins} min</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "8px", padding: "10px 0", alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "10px", letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#6B6B6B", fontWeight: 600 }}>Words</span>
              <span style={{ fontFamily: "var(--font-serif),Georgia,serif", fontWeight: 600, fontSize: "18px", color: "#0F2A44" }}>{wordCount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── HERO IMAGE ───────────────────────────────────────────────────── */}
      {imgSrc && (
        <div style={{ margin: "0 32px" }}>
          <img
            src={imgSrc}
            alt={data.title}
            style={{ width: "100%", height: "420px", objectFit: "cover", display: "block", marginTop: "24px" }}
          />
          <div style={{
            padding: "10px 0 18px",
            borderBottom: "1px solid rgba(15,42,68,.18)",
            fontFamily: "var(--font-inter),sans-serif",
            fontSize: "11px",
            color: "#6B6B6B",
            lineHeight: 1.5,
          }}>
            {creditName ? (
              <>
                <b style={{ color: "#0F2A44", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: ".14em", fontSize: "10px", marginRight: "8px" }}>Photo</b>
                <a href={creditUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#6B6B6B" }}>
                  {creditName} / Pexels
                </a>
              </>
            ) : (
              <>
                <b style={{ color: "#0F2A44", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: ".14em", fontSize: "10px", marginRight: "8px" }}>Photo</b>
                <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" style={{ color: "#6B6B6B" }}>Pexels</a>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── 3-COLUMN ARTICLE BODY ────────────────────────────────────────── */}
      <div style={{
        padding: "36px 32px 36px",
        display: "grid",
        gridTemplateColumns: "160px 1fr 220px",
        gap: "36px",
      }}>

        {/* LEFT: sticky TOC */}
        <div style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "10px", color: "#6B6B6B" }}>
          <div style={{ position: "sticky", top: "20px" }}>
            {toc.length > 0 && (
              <>
                <h5 style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: ".24em",
                  textTransform: "uppercase" as const,
                  color: "#0F2A44",
                  margin: "0 0 12px",
                  paddingBottom: "8px",
                  borderBottom: "2px solid #0F2A44",
                }}>
                  Contents
                </h5>
                <ol style={{ listStyle: "none", margin: "0 0 24px", padding: 0, counterReset: "s", display: "flex", flexDirection: "column", gap: "9px" }}>
                  {toc.map((item, idx) => (
                    <li key={item.id} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: "6px", lineHeight: 1.35, counterIncrement: "s" }}>
                      <span style={{ fontFamily: "JetBrains Mono,monospace", color: "#B5432F", fontWeight: 500, fontSize: "10px" }}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${item.id}`}
                        style={{
                          color: "#0F2A44",
                          textDecoration: "none",
                          fontFamily: "var(--font-serif),Georgia,serif",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </>
            )}

            {/* Back link */}
            {data.category && (
              <a
                href={`/${data.category}`}
                style={{
                  fontFamily: "var(--font-inter),sans-serif",
                  fontSize: "10px",
                  letterSpacing: ".16em",
                  textTransform: "uppercase" as const,
                  color: "#0F2A44",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(15,42,68,.2)",
                  padding: "8px 0",
                  display: "block",
                  fontWeight: 600,
                }}
              >
                ← {CATEGORY_LABELS[data.category]}
              </a>
            )}
          </div>
        </div>

        {/* MIDDLE: article body */}
        <div
          style={{ color: "#3A3A3A", maxWidth: "680px" }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* RIGHT: related + newsletter */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* Related articles */}
          {related.length > 0 && (
            <div>
              <h4 style={{
                fontFamily: "var(--font-inter),sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: ".24em",
                textTransform: "uppercase" as const,
                color: "#0F2A44",
                margin: "0 0 12px",
                paddingBottom: "8px",
                borderBottom: "2px solid #0F2A44",
              }}>
                Related
              </h4>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {related.map((a: any) => (
                  <a
                    key={a.slug}
                    href={`/articles/${a.slug}`}
                    style={{ padding: "12px 0", borderTop: "1px solid rgba(15,42,68,.18)", textDecoration: "none", display: "block" }}
                  >
                    <div style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "9px", letterSpacing: ".22em", textTransform: "uppercase" as const, color: "#B5432F", fontWeight: 700, marginBottom: "4px" }}>
                      {CATEGORY_LABELS[a.category] ?? a.category}
                    </div>
                    <p style={{ fontFamily: "var(--font-serif),Georgia,serif", fontWeight: 500, fontSize: "15px", lineHeight: 1.25, color: "#0F2A44", margin: "0 0 6px" }}>
                      {a.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter callout */}
          <div style={{ background: "#0F2A44", color: "#F4EFE6", padding: "22px", position: "sticky", top: "20px" }}>
            <h4 style={{
              fontFamily: "var(--font-inter),sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: ".24em",
              textTransform: "uppercase" as const,
              color: "#F4EFE6",
              margin: "0 0 12px",
              paddingBottom: "8px",
              borderBottom: "1px solid rgba(244,239,230,.3)",
            }}>
              Weekly Briefing
            </h4>
            <p style={{ fontFamily: "var(--font-serif),Georgia,serif", fontSize: "13px", lineHeight: 1.5, margin: "0 0 14px", color: "rgba(244,239,230,.9)" }}>
              Retirement news every Sunday morning. Plain English. Free forever.
            </p>
            <a
              href="/#newsletter"
              style={{
                display: "block",
                background: "#F4EFE6",
                color: "#0F2A44",
                textAlign: "center",
                padding: "10px",
                fontFamily: "var(--font-inter),sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: ".16em",
                textTransform: "uppercase" as const,
                textDecoration: "none",
              }}
            >
              Subscribe Free
            </a>
          </div>

          {/* Share / print */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <a
              href={`/${data.category ?? ""}`}
              style={{
                fontFamily: "var(--font-inter),sans-serif",
                fontSize: "10px",
                letterSpacing: ".16em",
                textTransform: "uppercase" as const,
                color: "#0F2A44",
                textDecoration: "none",
                borderBottom: "1px solid rgba(15,42,68,.15)",
                padding: "8px 0",
                fontWeight: 600,
              }}
            >
              More {CATEGORY_LABELS[data.category] ?? ""} →
            </a>
          </div>
        </div>
      </div>

      {/* ── DISCLAIMER ───────────────────────────────────────────────────── */}
      <footer style={{
        padding: "28px 32px",
        borderTop: "3px double #0F2A44",
        background: "#F4EFE6",
      }}>
        <p style={{
          fontFamily: "var(--font-inter),sans-serif",
          fontSize: "11px",
          color: "#6B6B6B",
          maxWidth: "680px",
          margin: "0 auto",
          textAlign: "center",
          lineHeight: 1.7,
          letterSpacing: ".02em",
        }}>
          Educational purposes only. Not financial, tax, or legal advice. Please consult a qualified professional before making any financial decision. Retirement Education Network is an independent educational publisher and does not sell financial products or provide personalized advice.
        </p>
      </footer>
    </article>
  );
}
