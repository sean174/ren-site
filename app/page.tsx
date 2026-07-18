import fs from "fs";
import path from "path";
import matter from "gray-matter";
import LegislationWatch from "@/components/LegislationWatch";
import KeyDates from "@/components/KeyDates";
import EbookBanner from "@/components/EbookBanner";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

const CATEGORY_LABELS: Record<string, string> = {
  "safe-money": "Safe Money",
  "long-term-care": "Long-Term Care",
  "medicare": "Medicare",
  "social-security": "Social Security",
  "wills-and-trusts": "Wills & Trusts",
  "tax-planning": "Tax Planning",
};

function getAllArticles() {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs.readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith(".md"))
    .map(f => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, f), "utf-8");
      const { data } = matter(raw);
      return { slug: f.replace(/\.md$/, ""), ...data } as any;
    })
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export default function HomePage() {
  const articles = getAllArticles();
  const lead = articles[0];
  const secondary = articles.slice(1, 3);
  const mostRead = articles.slice(0, 5);
  const medicareArticles = articles.filter(a => a.category === "medicare").slice(0, 4);
  const moneyArticles = articles.filter(a => ["safe-money","tax-planning"].includes(a.category)).slice(0, 4);

  return (
    <main style={{ background: "var(--color-ivory, #F4EFE6)", minHeight: "100vh" }}>

      {/* ── Ticker ───────────────────────────────────────────────────────── */}
      <div style={{
        background: "#EAE3D6",
        borderBottom: "1px solid rgba(15,42,68,0.18)",
        display: "flex",
        alignItems: "stretch",
        fontFamily: "var(--font-inter),sans-serif",
        fontSize: "12px",
        color: "#3A3A3A",
      }}>
        <div style={{
          background: "#B5432F", color: "#fff",
          padding: "8px 14px", fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase" as const,
          fontSize: "10px", display: "flex", alignItems: "center", gap: "8px",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff", display: "inline-block", animation: "ren-pulse 1.8s infinite" }} />
          Latest
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "28px", padding: "8px 18px", overflowX: "hidden" as const, whiteSpace: "nowrap" as const }}>
          <span><strong style={{ color: "#0F2A44", marginRight: "6px" }}>2026</strong> Part D $2,000 out-of-pocket cap now in effect</span>
          <span style={{ color: "rgba(58,58,58,0.4)", margin: "0 -10px" }}>·</span>
          <span><strong style={{ color: "#0F2A44", marginRight: "6px" }}>2025</strong> Social Security COLA set at 2.5%</span>
          <span style={{ color: "rgba(58,58,58,0.4)", margin: "0 -10px" }}>·</span>
          <span><strong style={{ color: "#0F2A44", marginRight: "6px" }}>Update</strong> RMD age confirmed at 73 under SECURE 2.0</span>
        </div>
      </div>

      {/* ── Front Page Grid ───────────────────────────────────────────────── */}
      <section className="ren-front-grid" style={{ background: "#FBF8F2", padding: "28px 32px 32px", display: "grid", gridTemplateColumns: "2.2fr 1fr", gap: "32px" }}>

        {/* Lead story */}
        <div className="ren-lead-story" style={{ borderRight: "1px solid rgba(15,42,68,0.18)", paddingRight: "32px", display: "flex", flexDirection: "column" as const }}>
          {lead && (
            <>
              <div style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#B5432F", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{CATEGORY_LABELS[lead.category] ?? lead.category}</span>
                <span style={{ color: "#6B6B6B", fontWeight: 500, letterSpacing: "0.06em" }}>
                  {new Date(lead.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <a href={`/articles/${lead.slug}`} style={{ textDecoration: "none" }}>
                <h1 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "clamp(2rem,4vw,3.25rem)", lineHeight: 1.02, color: "#0F2A44", margin: "0 0 14px", letterSpacing: "-0.015em" }}>
                  {lead.title}
                </h1>
              </a>
              <p style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 300, fontStyle: "italic", fontSize: "1.2rem", lineHeight: 1.5, color: "#3A3A3A", margin: "0 0 18px", maxWidth: "640px" }}>
                {lead.excerpt}
              </p>
              {/* Lead image */}
              <div style={{ position: "relative", marginBottom: "8px" }}>
                <img
                  src={`/images/${lead.category}.jpg`}
                  alt={`${CATEGORY_LABELS[lead.category]} | Retirement Education Network`}
                  style={{ width: "100%", height: "280px", objectFit: "cover", display: "block" }}
                />
              </div>
              <p style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", color: "#6B6B6B", marginBottom: "24px" }}>
                <strong>{CATEGORY_LABELS[lead.category]}</strong> · Photo via <a href="https://pexels.com" target="_blank" rel="noopener noreferrer" style={{ color: "#6B6B6B" }}>Pexels</a>
              </p>

              {/* Secondary stories */}
              {secondary.length > 0 && (
                <div className="ren-secondary-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", borderTop: "1px solid rgba(15,42,68,0.18)", paddingTop: "20px", marginTop: "24px" }}>
                  {secondary.map(s => (
                    <div key={s.slug}>
                      <div style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#B5432F", marginBottom: "6px" }}>
                        {CATEGORY_LABELS[s.category] ?? s.category}
                      </div>
                      <a href={`/articles/${s.slug}`} style={{ textDecoration: "none" }}>
                        <h3 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 600, fontSize: "1.1rem", color: "#0F2A44", margin: "0 0 6px", lineHeight: 1.25 }}>
                          {s.title}
                        </h3>
                      </a>
                      <p style={{ fontSize: "0.85rem", color: "#3A3A3A", margin: "0 0 6px", lineHeight: 1.6 }}>
                        {s.excerpt?.split(".")[0]}.
                      </p>
                      <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", color: "#6B6B6B" }}>
                        {CATEGORY_LABELS[s.category]} · 6-min read
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Rail / Sidebar */}
        <aside className="ren-sidebar" style={{ display: "flex", flexDirection: "column" as const, gap: "28px" }}>

          {/* Most Read */}
          <div>
            <h4 style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#0F2A44", margin: "0 0 12px", display: "flex", justifyContent: "space-between" }}>
              Most Read <small style={{ fontWeight: 500, color: "#6B6B6B", textTransform: "none" as const, letterSpacing: 0 }}>this week</small>
            </h4>
            {mostRead.map((a, i) => (
              <div key={a.slug} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "10px 0", borderTop: "1px solid rgba(15,42,68,0.12)" }}>
                <div style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontSize: "1.4rem", fontWeight: 700, color: "rgba(15,42,68,0.2)", lineHeight: 1, minWidth: "24px" }}>{i + 1}</div>
                <div>
                  <a href={`/articles/${a.slug}`} style={{ textDecoration: "none" }}>
                    <p style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontSize: "0.95rem", color: "#0F2A44", margin: "0 0 3px", lineHeight: 1.35, fontWeight: 600 }}>
                      {a.title}
                    </p>
                  </a>
                  <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "10px", color: "#6B6B6B", letterSpacing: "0.04em" }}>
                    {CATEGORY_LABELS[a.category] ?? a.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Consultation CTA */}
          <div style={{ background: "#0F2A44", padding: "20px", color: "#F4EFE6" }}>
            <h4 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "1rem", margin: "0 0 4px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              Free Consultation <small style={{ fontFamily: "var(--font-inter),sans-serif", fontWeight: 500, fontSize: "10px", letterSpacing: "0.1em", color: "rgba(244,239,230,0.6)" }}>optional</small>
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.65, margin: "0 0 14px", color: "rgba(244,239,230,0.85)" }}>
              Want to talk through your own situation with a real person? Book a free, no-pressure call with the Elevated Advisor team.
            </p>
            <a
              href="/consultation"
              style={{
                display: "block",
                textAlign: "center" as const,
                textDecoration: "none",
                background: "#F4EFE6",
                color: "#0F2A44",
                padding: "11px",
                fontSize: "0.85rem",
                fontFamily: "var(--font-inter),sans-serif",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                width: "100%",
                boxSizing: "border-box" as const,
              }}
            >
              Book a Free Consultation
            </a>
            <p style={{ fontSize: "10px", color: "rgba(244,239,230,0.5)", margin: "8px 0 0", letterSpacing: "0.04em" }}>
              Free · No obligation · Always optional
            </p>
          </div>
        </aside>
      </section>

      {/* ── Ebook opt-in banner ───────────────────────────────────────── */}
      <EbookBanner />

      {/* ── Key Dates + Washington Watch (full-width band) ─────────────── */}
      <section className="ren-two-col-band" style={{ background: "#FBF8F2", borderTop: "1px solid rgba(15,42,68,0.18)", padding: "28px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        <div style={{ borderTop: "3px solid #0F2A44", paddingTop: "16px" }}>
          <KeyDates />
        </div>
        <div style={{ borderTop: "3px solid #0F2A44", paddingTop: "16px" }}>
          <LegislationWatch />
        </div>
      </section>

      {/* ── Section: Medicare ────────────────────────────────────────────── */}
      {medicareArticles.length > 0 && (
        <>
          <div className="ren-section-header" style={{ padding: "0 32px", borderTop: "1px solid rgba(15,42,68,0.18)", background: "#FBF8F2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "1.1rem", color: "#0F2A44", padding: "14px 0", margin: 0, borderLeft: "4px solid #B5432F", paddingLeft: "14px" }}>
              Medicare
            </h2>
            <a href="/medicare" style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", fontWeight: 600, color: "#0F2A44", letterSpacing: "0.12em", textDecoration: "none" }}>
              All Medicare →
            </a>
          </div>
          <div className="ren-article-grid" style={{ background: "#FBF8F2", padding: "0 32px 28px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {medicareArticles.map(a => (
                <a key={a.slug} href={`/articles/${a.slug}`} style={{ textDecoration: "none", display: "block", borderTop: "2px solid rgba(15,42,68,0.15)", paddingTop: "10px" }}>
                <div style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#B5432F", marginBottom: "5px" }}>
                  {CATEGORY_LABELS[a.category]}
                </div>
                <h3 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 600, fontSize: "1rem", color: "#0F2A44", margin: "0 0 6px", lineHeight: 1.3 }}>
                  {a.title}
                </h3>
                <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", color: "#6B6B6B" }}>6-min read</span>
              </a>
            ))}
          </div>
        </>
      )}

      {/* ── Explainer Strip ───────────────────────────────────────────────── */}
      <section className="ren-explainer" style={{ background: "#EAE3D6", padding: "28px 32px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "32px", alignItems: "center", borderTop: "1px solid rgba(15,42,68,0.18)", borderBottom: "1px solid rgba(15,42,68,0.18)" }}>
        <div>
          <div style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#B5432F", marginBottom: "8px" }}>
            Key Numbers
          </div>
          <h2 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "1.3rem", color: "#0F2A44", margin: 0, lineHeight: 1.25 }}>
            3 things to know about Medicare in 2026
          </h2>
        </div>
        <div className="ren-explainer-numbers" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
          {[
            { n: "01", val: "$2,000", desc: "New annual out-of-pocket cap on Part D prescription costs, effective 2026" },
            { n: "02", val: "$185",   desc: "Standard Part B monthly premium in 2026, up from $174.70 in 2024" },
            { n: "03", val: "Dec 7",  desc: "Last day to change Medicare plans during fall open-enrollment window" },
          ].map(item => (
            <div key={item.n}>
              <div style={{ fontFamily: "var(--font-mono,monospace)", fontSize: "10px", color: "rgba(15,42,68,0.35)", marginBottom: "4px" }}>{item.n}</div>
              <div style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "1.75rem", color: "#0F2A44", lineHeight: 1 }}>{item.val}</div>
              <p style={{ fontSize: "0.8rem", color: "#3A3A3A", margin: "6px 0 0", lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section: Money & Planning ────────────────────────────────────── */}
      {moneyArticles.length > 0 && (
        <>
          <div className="ren-section-header" style={{ padding: "0 32px", background: "#FBF8F2", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(15,42,68,0.18)" }}>
            <h2 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "1.1rem", color: "#0F2A44", padding: "14px 0 14px 14px", margin: 0, borderLeft: "4px solid #B5432F" }}>
              Money &amp; Planning
            </h2>
            <a href="/safe-money" style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", fontWeight: 600, color: "#0F2A44", letterSpacing: "0.12em", textDecoration: "none" }}>
              All Money →
            </a>
          </div>
          <div className="ren-article-grid" style={{ background: "#FBF8F2", padding: "0 32px 28px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {moneyArticles.map(a => (
                <a key={a.slug} href={`/articles/${a.slug}`} style={{ textDecoration: "none", display: "block", borderTop: "2px solid rgba(15,42,68,0.15)", paddingTop: "10px" }}>
                <div style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#B5432F", marginBottom: "5px" }}>
                  {CATEGORY_LABELS[a.category]}
                </div>
                <h3 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 600, fontSize: "1rem", color: "#0F2A44", margin: "0 0 6px", lineHeight: 1.3 }}>
                  {a.title}
                </h3>
                <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", color: "#6B6B6B" }}>6-min read</span>
              </a>
            ))}
          </div>
        </>
      )}

      {/* ── Who We Are ───────────────────────────────────────────────────── */}
      <section className="ren-about-grid" style={{ background: "#0F2A44", padding: "40px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", borderTop: "1px solid rgba(15,42,68,0.3)" }}>
        <div style={{ color: "#F4EFE6" }}>
          <h2 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "1.5rem", margin: "0 0 16px" }}>Who We Are</h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, marginBottom: "14px", color: "rgba(244,239,230,0.9)" }}>
            Retirement Education Network is an education service of Walker Thomas LLC, built for Americans 59 and older. We research the rules, deadlines, and decisions that matter most in retirement, then explain them in plain language you can actually use. Our content is for education only. It is not personal financial, tax, or legal advice.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(244,239,230,0.9)" }}>
            Walker Thomas LLC also operates Elevated Advisor, a retirement planning service. If you would like to speak with a real person about your own situation, you can request a free consultation with the Elevated Advisor team. It is completely optional, and our educational content is always free either way.
          </p>
          <a href="/consultation" style={{
            display: "inline-block",
            marginTop: "20px",
            background: "#E89A7A",
            color: "#0F2A44",
            fontFamily: "var(--font-inter),sans-serif",
            fontWeight: 700,
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            padding: "12px 22px",
            textDecoration: "none",
            borderRadius: "3px",
          }}>
            Book a Free Consultation
          </a>
        </div>
        <div style={{ color: "#F4EFE6" }}>
          <h2 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "1.5rem", margin: "0 0 16px" }}>Why This Matters</h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(244,239,230,0.9)" }}>
            Retirement is one of the biggest financial chapters of your life, and the rules change every year. Most people get their information from headlines, sales pitches, or whoever called them last. You deserve better.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, marginTop: "14px", color: "rgba(244,239,230,0.9)" }}>
            Fifty-nine and a half is when new options open up. That is when it becomes clear that the plan that got you here may need to change. Our job is to keep you current and confident in the questions you ask.
          </p>
        </div>
      </section>
    </main>
  );
}
