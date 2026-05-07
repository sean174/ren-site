import fs from "fs";
import path from "path";
import matter from "gray-matter";
import EmailForm from "@/components/EmailForm";

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

const DISCLAIMER = "Retirement Education Network provides educational content for informational purposes only. Nothing on this site constitutes financial, tax, legal, or investment advice. We do not recommend specific products, advisors, or strategies. Always consult a qualified professional before making any financial decision.";

export default function HomePage() {
  const articles = getAllArticles();
  const lead = articles[0];
  const secondary = articles.slice(1, 3);
  const mostRead = articles.slice(0, 5);
  const medicareArticles = articles.filter(a => a.category === "medicare").slice(0, 4);
  const moneyArticles = articles.filter(a => ["safe-money","tax-planning"].includes(a.category)).slice(0, 4);

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  return (
    <>
      {/* ── Utility Bar ─────────────────────────────────────────────────── */}
      <div style={{
        background: "var(--color-navy, #0F2A44)",
        color: "rgba(244,239,230,0.85)",
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase" as const,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 32px",
        fontWeight: 500,
      }}>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span>{todayStr}</span>
          <a
            href="https://www.congress.gov/congressional-record"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#E89A7A", textDecoration: "none", display: "flex", alignItems: "center", gap: "7px" }}
          >
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "#B5432F", display: "inline-block",
              animation: "ren-pulse 1.8s infinite",
            }} />
            Live: Congressional Record
          </a>
        </div>
        <div style={{ display: "flex", gap: "18px" }}>
          <a href="/about" style={{ color: "inherit", textDecoration: "none" }}>About</a>
          <a href="#newsletter" style={{ color: "inherit", textDecoration: "none" }}>Newsletter</a>
        </div>
      </div>

      {/* ── Masthead ─────────────────────────────────────────────────────── */}
      <header style={{
        background: "#FBF8F2",
        padding: "24px 32px 20px",
        borderBottom: "3px double #0F2A44",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: "24px",
      }}>
        <div style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", letterSpacing: "0.04em", color: "#6B6B6B", lineHeight: 1.7 }}>
          <strong style={{ fontWeight: 700, color: "#0F2A44", textTransform: "uppercase" as const, letterSpacing: "0.18em", fontSize: "10px", display: "block" }}>
            Educational · Independent · Free
          </strong>
          {todayStr}
        </div>

        {/* Nameplate */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px", justifyContent: "center" }}>
          <svg width="56" height="56" viewBox="0 0 100 100" fill="none" stroke="#0F2A44" strokeWidth="2.5" aria-hidden="true">
            <circle cx="50" cy="50" r="46" />
            <line x1="14" y1="58" x2="86" y2="58" strokeLinecap="square" />
            <path d="M22 58 A28 28 0 0 1 78 58" />
            <path d="M32 58 A18 18 0 0 1 68 58" />
          </svg>
          <div style={{ width: "1px", height: "64px", background: "rgba(15,42,68,0.35)" }} />
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "4px", alignItems: "center", textAlign: "center" as const }}>
            <div style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "60px", lineHeight: 0.9, letterSpacing: "-0.015em", color: "#0F2A44" }}>
              REN
            </div>
            <div style={{ fontFamily: "var(--font-inter),sans-serif", fontWeight: 600, fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase" as const, color: "#3A3A3A" }}>
              Retirement Education Network
            </div>
          </div>
        </div>

        <div style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", letterSpacing: "0.04em", color: "#6B6B6B", lineHeight: 1.7, textAlign: "right" as const }}>
          <strong style={{ fontWeight: 700, color: "#0F2A44", textTransform: "uppercase" as const, letterSpacing: "0.18em", fontSize: "10px", display: "block" }}>
            America&apos;s Retirement Resource
          </strong>
          retirementeducationnetwork.com
        </div>
      </header>

      {/* ── Primary Nav ──────────────────────────────────────────────────── */}
      <nav style={{
        background: "#FBF8F2",
        padding: "12px 32px",
        borderBottom: "1px solid rgba(15,42,68,0.18)",
        display: "flex",
        justifyContent: "center",
        gap: "32px",
        fontFamily: "var(--font-inter),sans-serif",
        fontWeight: 600,
        fontSize: "11px",
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
      }}>
        {[
          ["Front Page", "/"],
          ["Medicare", "/medicare"],
          ["Social Security", "/social-security"],
          ["Safe Money", "/safe-money"],
          ["Wills & Trusts", "/wills-and-trusts"],
          ["Tax Planning", "/tax-planning"],
          ["Long-Term Care", "/long-term-care"],
        ].map(([label, href]) => (
          <a key={href} href={href} style={{
            color: "#0F2A44", textDecoration: "none",
            paddingBottom: "4px",
            borderBottom: href === "/" ? "2px solid #0F2A44" : "2px solid transparent",
          }}>
            {label}
          </a>
        ))}
      </nav>

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
      <section style={{ background: "#FBF8F2", padding: "28px 32px 32px", display: "grid", gridTemplateColumns: "2.2fr 1fr", gap: "32px" }}>

        {/* Lead story */}
        <div style={{ borderRight: "1px solid rgba(15,42,68,0.18)", paddingRight: "32px" }}>
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
              {/* Image placeholder */}
              <div style={{
                height: "280px",
                background: "linear-gradient(180deg, rgba(15,42,68,0.04) 0%, rgba(15,42,68,0.12) 100%), repeating-linear-gradient(135deg, rgba(15,42,68,0.04) 0 8px, rgba(15,42,68,0.08) 8px 16px), #EAE3D6",
                marginBottom: "8px",
              }} />
              <p style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", color: "#6B6B6B", marginBottom: "24px" }}>
                <strong>Illustration</strong> — {CATEGORY_LABELS[lead.category]} · Retirement Education Network
              </p>

              {/* Secondary stories */}
              {secondary.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", borderTop: "1px solid rgba(15,42,68,0.18)", paddingTop: "20px" }}>
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
        <aside style={{ display: "flex", flexDirection: "column" as const, gap: "28px" }}>

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

          {/* Email opt-in */}
          <div id="newsletter" style={{ background: "#0F2A44", padding: "20px", color: "#F4EFE6" }}>
            <h4 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "1rem", margin: "0 0 4px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              The Weekly <small style={{ fontFamily: "var(--font-inter),sans-serif", fontWeight: 500, fontSize: "10px", letterSpacing: "0.1em", color: "rgba(244,239,230,0.6)" }}>by REN</small>
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.65, margin: "0 0 14px", color: "rgba(244,239,230,0.85)" }}>
              One letter, every Thursday. The week in retirement — written for readers, not advisors.
            </p>
            <EmailForm />
            <p style={{ fontSize: "10px", color: "rgba(244,239,230,0.5)", margin: "8px 0 0", letterSpacing: "0.04em" }}>
              Free · No spam · Unsubscribe anytime
            </p>
          </div>

          {/* Calendar */}
          <div>
            <h4 style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#0F2A44", margin: "0 0 12px" }}>
              On the Calendar
            </h4>
            {[
              { m: "May", d: "15", label: "Deadline", title: "Q1 estimated tax payments due" },
              { m: "Oct", d: "15", label: "Event", title: "Medicare open enrollment begins" },
              { m: "Dec", d: "7",  label: "Deadline", title: "Last day to change Medicare plans" },
              { m: "Dec", d: "31", label: "Deadline", title: "RMD deadline for age 73+" },
            ].map(item => (
              <div key={item.title} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "10px 0", borderTop: "1px solid rgba(15,42,68,0.12)" }}>
                <div style={{ background: "#0F2A44", color: "#F4EFE6", padding: "4px 8px", textAlign: "center" as const, minWidth: "40px" }}>
                  <div style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" as const, opacity: 0.7 }}>{item.m}</div>
                  <div style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontSize: "1.1rem", fontWeight: 700, lineHeight: 1 }}>{item.d}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "10px", color: "#B5432F", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "2px" }}>{item.label}</div>
                  <p style={{ fontSize: "0.875rem", color: "#3A3A3A", margin: 0, lineHeight: 1.4, fontFamily: "var(--font-source-serif),Georgia,serif" }}>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* ── Section: Medicare ────────────────────────────────────────────── */}
      {medicareArticles.length > 0 && (
        <>
          <div style={{ padding: "0 32px", borderTop: "1px solid rgba(15,42,68,0.18)", background: "#FBF8F2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "1.1rem", color: "#0F2A44", padding: "14px 0", margin: 0, borderLeft: "4px solid #B5432F", paddingLeft: "14px" }}>
              Medicare
            </h2>
            <a href="/medicare" style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", fontWeight: 600, color: "#0F2A44", letterSpacing: "0.12em", textDecoration: "none" }}>
              All Medicare →
            </a>
          </div>
          <div style={{ background: "#FBF8F2", padding: "0 32px 28px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {medicareArticles.map(a => (
              <a key={a.slug} href={`/articles/${a.slug}`} style={{ textDecoration: "none", display: "block", borderTop: "2px solid rgba(15,42,68,0.15)" }}>
                <div style={{ height: "100px", background: "linear-gradient(135deg, rgba(15,42,68,0.06) 0%, rgba(15,42,68,0.12) 100%), #EAE3D6", marginBottom: "10px" }} />
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
      <section style={{ background: "#EAE3D6", padding: "28px 32px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "32px", alignItems: "center", borderTop: "1px solid rgba(15,42,68,0.18)", borderBottom: "1px solid rgba(15,42,68,0.18)" }}>
        <div>
          <div style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#B5432F", marginBottom: "8px" }}>
            Key Numbers
          </div>
          <h2 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "1.3rem", color: "#0F2A44", margin: 0, lineHeight: 1.25 }}>
            3 things to know about Medicare in 2026
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
          {[
            { n: "01", val: "$2,000", desc: "New annual out-of-pocket cap on Part D prescription costs, effective 2026" },
            { n: "02", val: "$185",   desc: "Standard Part B monthly premium in 2026 — up from $174.70 in 2024" },
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
          <div style={{ padding: "0 32px", background: "#FBF8F2", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(15,42,68,0.18)" }}>
            <h2 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "1.1rem", color: "#0F2A44", padding: "14px 0 14px 14px", margin: 0, borderLeft: "4px solid #B5432F" }}>
              Money &amp; Planning
            </h2>
            <a href="/safe-money" style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", fontWeight: 600, color: "#0F2A44", letterSpacing: "0.12em", textDecoration: "none" }}>
              All Money →
            </a>
          </div>
          <div style={{ background: "#FBF8F2", padding: "0 32px 28px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {moneyArticles.map(a => (
              <a key={a.slug} href={`/articles/${a.slug}`} style={{ textDecoration: "none", display: "block", borderTop: "2px solid rgba(15,42,68,0.15)" }}>
                <div style={{ height: "100px", background: "linear-gradient(135deg, rgba(15,42,68,0.04) 0%, rgba(15,42,68,0.1) 100%), #EAE3D6", marginBottom: "10px" }} />
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
      <section style={{ background: "#0F2A44", padding: "40px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", borderTop: "1px solid rgba(15,42,68,0.3)" }}>
        <div style={{ color: "#F4EFE6" }}>
          <h2 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "1.5rem", margin: "0 0 16px" }}>Who We Are</h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, marginBottom: "14px", color: "rgba(244,239,230,0.9)" }}>
            Retirement Education Network is a content company built for Americans 59 and older. We research the most current and trusted guidance on the topics that matter most in retirement, then share it in plain language you can use.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(244,239,230,0.9)" }}>
            We do not give personal financial advice. We do not meet with readers, take appointments, or manage anyone&apos;s money. What we are is a trusted source for staying informed. We bring you the information — you take it from there, ideally with a professional you trust.
          </p>
        </div>
        <div style={{ color: "#F4EFE6" }}>
          <h2 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "1.5rem", margin: "0 0 16px" }}>Why This Matters</h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(244,239,230,0.9)" }}>
            Retirement is one of the biggest financial chapters of your life, and the rules change every year. Most people get their information from headlines, sales pitches, or whoever called them last. You deserve better.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, marginTop: "14px", color: "rgba(244,239,230,0.9)" }}>
            Fifty-nine and a half is the age when new options open up — and when it becomes clear that the plan that got you here may need to change. Our job is to keep you current and confident in the questions you ask.
          </p>
        </div>
      </section>

      {/* ── Footer / Disclaimer ───────────────────────────────────────────── */}
      <footer style={{ background: "#0A1E33", padding: "24px 32px", borderTop: "1px solid rgba(244,239,230,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none" stroke="#F4EFE6" strokeWidth="3" opacity={0.7} aria-hidden="true">
            <circle cx="50" cy="50" r="46" />
            <line x1="14" y1="58" x2="86" y2="58" strokeLinecap="square" />
            <path d="M22 58 A28 28 0 0 1 78 58" />
            <path d="M32 58 A18 18 0 0 1 68 58" />
          </svg>
          <span style={{ fontFamily: "var(--font-inter),sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(244,239,230,0.7)" }}>
            Retirement Education Network
          </span>
        </div>
        <p style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", color: "rgba(244,239,230,0.5)", lineHeight: 1.75, maxWidth: "720px", margin: "0 0 12px" }}>
          {DISCLAIMER}
        </p>
        <div style={{ display: "flex", gap: "20px", alignItems: "center", fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", color: "rgba(244,239,230,0.4)", flexWrap: "wrap" as const }}>
          <span>© 2026 Retirement Education Network · Educational · Independent · Free</span>
          <a href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a>
          <a href="/terms" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
          <a href="/about" style={{ color: "inherit", textDecoration: "none" }}>About</a>
        </div>
      </footer>

      <style>{`
        @keyframes ren-pulse {
          0% { box-shadow: 0 0 0 0 rgba(181,67,47,0.6); }
          70% { box-shadow: 0 0 0 8px rgba(181,67,47,0); }
          100% { box-shadow: 0 0 0 0 rgba(181,67,47,0); }
        }
        nav a:hover { border-bottom-color: #B5432F !important; }
      `}</style>
    </>
  );
}
