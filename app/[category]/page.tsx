import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

const CATEGORY_LABELS: Record<string, string> = {
  "safe-money": "Safe Money",
  "long-term-care": "Long-Term Care",
  "medicare": "Medicare",
  "social-security": "Social Security",
  "wills-and-trusts": "Wills & Trusts",
  "tax-planning": "Tax Planning",
};

const CATEGORY_DECKS: Record<string, string> = {
  "safe-money": "Protecting your retirement savings from market risk, inflation, and sequence-of-returns danger.",
  "long-term-care": "Planning for the care you may need, and how to pay for it without depleting your estate.",
  "medicare": "Understanding your coverage options, costs, and enrollment rules at every stage of retirement.",
  "social-security": "Maximizing the benefit you've earned over a lifetime of work.",
  "wills-and-trusts": "Ensuring your assets go where you intend and your family is protected.",
  "tax-planning": "Keeping more of what you've saved through smart, legal tax strategies.",
};

type Props = {
  params: Promise<{ category: string }>;
};

function getArticlesForCategory(category: string) {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((f) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, f), "utf-8");
      const { data } = matter(raw);
      return { slug: f.replace(/\.md$/, ""), ...data } as any;
    })
    .filter((a: any) => a.category === category)
    .sort((a: any, b: any) => (b.date ?? "").localeCompare(a.date ?? ""));
}

function getAllArticles() {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs.readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, f), "utf-8");
      const { data } = matter(raw);
      return { slug: f.replace(/\.md$/, ""), ...data } as any;
    })
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

function fmtDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function slugImg(slug: string) {
  const p = path.join(process.cwd(), "public", "images", "articles", `${slug}.jpg`);
  return fs.existsSync(p) ? `/images/articles/${slug}.jpg` : null;
}

// Placeholder stripe pattern (matches mock design)
const STRIPE_BG = `repeating-linear-gradient(135deg, rgba(15,42,68,.05) 0 8px, rgba(15,42,68,.10) 8px 16px), #EAE3D6`;

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const title = CATEGORY_LABELS[category] ?? category
    .split("-")
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const deck = CATEGORY_DECKS[category] ?? `In-depth guides on ${title} for retirees and pre-retirees.`;

  const articles = getArticlesForCategory(category);
  const lead = articles[0] as any;
  const rest = articles.slice(1) as any[];

  // Right rail: recent from other categories
  const allArticles = getAllArticles();
  const railArticles = allArticles.filter((a) => a.category !== category).slice(0, 5);

  if (articles.length === 0) {
    return (
      <div style={{ background: "#FBF8F2", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px", padding: "60px 32px" }}>
        <p style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "24px", color: "#0F2A44" }}>
          In-depth guides on <em>{title}</em> are coming soon.
        </p>
        <a href="/" style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 700, color: "#0F2A44", textDecoration: "none", borderBottom: "1px solid #0F2A44", paddingBottom: "3px" }}>
          ← Back to home
        </a>
      </div>
    );
  }

  return (
    <div style={{ background: "#FBF8F2" }}>

      {/* ── SECTION HEADER ────────────────────────────────────────────────── */}
      <div style={{
        padding: "36px 32px 24px",
        borderBottom: "1px solid rgba(15,42,68,.18)",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "end",
        gap: "24px",
      }}>
        {/* Left: breadcrumb + title + deck */}
        <div>
          {/* Breadcrumb */}
          <div style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "11px",
            letterSpacing: ".22em",
            textTransform: "uppercase" as const,
            color: "#B5432F",
            fontWeight: 700,
            marginBottom: "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <a href="/" style={{ color: "#6B6B6B", textDecoration: "none", fontWeight: 500, letterSpacing: ".18em" }}>Home</a>
            <span style={{ color: "rgba(15,42,68,.35)" }}>›</span>
            <span>{title}</span>
          </div>

          {/* Big section title */}
          <h1 style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 600,
            fontSize: "clamp(52px, 7vw, 88px)",
            lineHeight: .92,
            color: "#0F2A44",
            margin: "0 0 16px",
            letterSpacing: "-.02em",
          }}>
            {title}
          </h1>

          {/* Deck */}
          <p style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "20px",
            color: "#3A3A3A",
            margin: 0,
            maxWidth: "640px",
            lineHeight: 1.4,
          }}>
            {deck}
          </p>
        </div>

        {/* Right: article count meta */}
        <div style={{
          textAlign: "right",
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "11px",
          letterSpacing: ".04em",
          color: "#6B6B6B",
          lineHeight: 1.8,
        }}>
          <b style={{ display: "block", color: "#0F2A44", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: ".2em", fontSize: "10px" }}>
            Articles
          </b>
          <span style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 600,
            fontSize: "34px",
            color: "#B5432F",
            lineHeight: 1,
            display: "block",
            marginTop: "4px",
          }}>
            {articles.length}
          </span>
          <span>in this section</span>
        </div>
      </div>

      {/* ── FEATURED LEAD ─────────────────────────────────────────────────── */}
      {lead && (
        <div style={{
          padding: "28px 32px",
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: "32px",
          borderBottom: "1px solid rgba(15,42,68,.18)",
        }}>
          {/* Image area */}
          <a href={`/articles/${lead.slug}`} style={{ textDecoration: "none", display: "block" }}>
            {slugImg(lead.slug) ? (
              <img
                src={slugImg(lead.slug)!}
                alt={lead.title}
                style={{ width: "100%", height: "380px", objectFit: "cover", display: "block" }}
              />
            ) : (
              <div style={{
                height: "380px",
                background: STRIPE_BG,
                display: "flex",
                alignItems: "flex-end",
                padding: "14px 16px",
              }}>
                <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10px", color: "rgba(15,42,68,.5)", letterSpacing: ".06em" }}>
                  {title} · Featured
                </span>
              </div>
            )}
          </a>

          {/* Body */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: ".22em",
              textTransform: "uppercase" as const,
              color: "#B5432F",
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
              <span>Featured</span>
              {lead.date && <span style={{ color: "#6B6B6B", fontWeight: 500, letterSpacing: ".08em" }}>{fmtDate(lead.date)}</span>}
            </div>

            <a href={`/articles/${lead.slug}`} style={{ textDecoration: "none" }}>
              <h2 style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(28px, 3vw, 42px)",
                lineHeight: 1.04,
                color: "#0F2A44",
                margin: "0 0 14px",
                letterSpacing: "-.012em",
              }}>
                {lead.title}
              </h2>
            </a>

            {lead.excerpt && (
              <p style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "18px",
                lineHeight: 1.45,
                color: "#3A3A3A",
                margin: "0 0 22px",
              }}>
                {lead.excerpt}
              </p>
            )}

            <div style={{ marginBottom: "18px", fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", letterSpacing: ".04em", color: "#6B6B6B" }}>
              <b style={{ color: "#0F2A44", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: ".16em", fontSize: "10px" }}>
                REN Editorial Team
              </b>
            </div>

            <a
              href={`/articles/${lead.slug}`}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: ".2em",
                textTransform: "uppercase" as const,
                color: "#0F2A44",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                borderBottom: "1px solid #0F2A44",
                paddingBottom: "3px",
                alignSelf: "flex-start",
              }}
            >
              Read full article →
            </a>
          </div>
        </div>
      )}

      {/* ── MAIN BODY GRID ────────────────────────────────────────────────── */}
      <div style={{
        padding: "28px 32px 48px",
        display: "grid",
        gridTemplateColumns: "2.3fr 1fr",
        gap: "36px",
      }}>

        {/* Stories column */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3 style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: ".24em",
            textTransform: "uppercase" as const,
            color: "#0F2A44",
            margin: "0 0 14px",
            paddingBottom: "8px",
            borderBottom: "2px solid #0F2A44",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}>
            All {title} Articles
            <small style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: ".04em", color: "#6B6B6B", textTransform: "none" as const, fontWeight: 400 }}>
              {rest.length} more
            </small>
          </h3>

          {rest.map((article: any) => (
            <a
              key={article.slug}
              href={`/articles/${article.slug}`}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: "24px",
                padding: "22px 0",
                borderBottom: "1px solid rgba(15,42,68,.18)",
                textDecoration: "none",
              }}
            >
              {/* Thumbnail */}
              {slugImg(article.slug) ? (
                <img
                  src={slugImg(article.slug)!}
                  alt={article.title}
                  style={{ width: "180px", height: "120px", objectFit: "cover", display: "block", flexShrink: 0 }}
                />
              ) : (
                <div style={{
                  width: "180px",
                  height: "120px",
                  background: STRIPE_BG,
                  flexShrink: 0,
                }} />
              )}

              {/* Text */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "6px" }}>
                <div style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "10px",
                  letterSpacing: ".22em",
                  textTransform: "uppercase" as const,
                  color: "#B5432F",
                  fontWeight: 700,
                }}>
                  {CATEGORY_LABELS[article.category] ?? article.category}
                </div>
                <h2 style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: 1.2,
                  color: "#0F2A44",
                  margin: 0,
                  letterSpacing: "-.005em",
                }}>
                  {article.title}
                </h2>
                {article.excerpt && (
                  <p style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    color: "#6B6B6B",
                    margin: 0,
                  }}>
                    {article.excerpt}
                  </p>
                )}
                {article.date && (
                  <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "10px", letterSpacing: ".04em", color: "#6B6B6B" }}>
                    {fmtDate(article.date)}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* Right rail */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* From other sections */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: ".24em",
              textTransform: "uppercase" as const,
              color: "#0F2A44",
              margin: "0 0 12px",
              paddingBottom: "8px",
              borderBottom: "2px solid #0F2A44",
            }}>
              Also from REN
            </h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {railArticles.map((a: any) => (
                <a
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  style={{ padding: "12px 0", borderTop: "1px solid rgba(15,42,68,.18)", textDecoration: "none", display: "block" }}
                >
                  <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: ".22em", textTransform: "uppercase" as const, color: "#B5432F", fontWeight: 700, marginBottom: "4px" }}>
                    {CATEGORY_LABELS[a.category] ?? a.category}
                  </div>
                  <p style={{ fontFamily: "var(--font-serif), Georgia, serif", fontWeight: 500, fontSize: "15px", lineHeight: 1.25, color: "#0F2A44", margin: "0 0 6px" }}>
                    {a.title}
                  </p>
                  {a.date && (
                    <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#6B6B6B" }}>
                      {fmtDate(a.date)}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter callout */}
          <div style={{ background: "#0F2A44", color: "#F4EFE6", padding: "22px" }}>
            <h4 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: ".24em",
              textTransform: "uppercase" as const,
              color: "#F4EFE6",
              margin: "0 0 12px",
              paddingBottom: "8px",
              borderBottom: "1px solid rgba(244,239,230,.3)",
            }}>
              Free Weekly Briefing
            </h4>
            <p style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "14px", lineHeight: 1.5, margin: "0 0 14px", color: "rgba(244,239,230,.9)" }}>
              Plain-English retirement news delivered every Sunday morning. No ads. No spam.
            </p>
            <a
              href="/#newsletter"
              style={{
                display: "block",
                background: "#F4EFE6",
                color: "#0F2A44",
                textAlign: "center",
                padding: "10px 16px",
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: ".18em",
                textTransform: "uppercase" as const,
                textDecoration: "none",
              }}
            >
              Subscribe Free →
            </a>
            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "10px", letterSpacing: ".16em", textTransform: "uppercase" as const, color: "rgba(244,239,230,.6)", marginTop: "10px", marginBottom: 0 }}>
              Weekly · Free forever
            </p>
          </div>

          {/* All topics */}
          <div>
            <h4 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: ".24em",
              textTransform: "uppercase" as const,
              color: "#0F2A44",
              margin: "0 0 12px",
              paddingBottom: "8px",
              borderBottom: "2px solid #0F2A44",
            }}>
              All Topics
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {Object.entries(CATEGORY_LABELS).map(([slug, label]) => (
                <a
                  key={slug}
                  href={`/${slug}`}
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "12px",
                    fontWeight: slug === category ? 700 : 500,
                    color: slug === category ? "#B5432F" : "#0F2A44",
                    textDecoration: "none",
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(15,42,68,.1)",
                    letterSpacing: ".04em",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {label}
                  {slug === category && <span style={{ fontSize: "10px", color: "#B5432F" }}>← current</span>}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── DISCLAIMER ────────────────────────────────────────────────────── */}
      <div style={{
        padding: "20px 32px",
        borderTop: "1px solid rgba(15,42,68,.18)",
        background: "#F4EFE6",
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: "11px",
        color: "#6B6B6B",
        textAlign: "center",
        letterSpacing: ".02em",
        lineHeight: 1.6,
      }}>
        Educational purposes only. Not financial, tax, or legal advice. Please consult a qualified professional before making any financial decision.
      </div>
    </div>
  );
}
