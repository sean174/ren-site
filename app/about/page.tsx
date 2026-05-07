export default function AboutPage() {
  return (
    <main style={{ background: "var(--color-ivory, #F4EFE6)", minHeight: "100vh" }}>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#0F2A44",
          color: "#F4EFE6",
          padding: "72px 32px 64px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(244,239,230,0.55)",
            marginBottom: "20px",
          }}
        >
          About
        </p>
        <h1
          style={{
            fontFamily: "var(--font-source-serif), Georgia, serif",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: "720px",
            margin: "0 auto 24px",
          }}
        >
          Retirement Education Network
        </h1>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "18px",
            lineHeight: 1.7,
            maxWidth: "620px",
            margin: "0 auto",
            color: "rgba(244,239,230,0.8)",
          }}
        >
          We're a content company built for Americans 59 and older. Our job is to
          translate the most important retirement rules, deadlines, and decisions
          into plain language — and keep you current as things change.
        </p>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "64px 32px",
          borderBottom: "1px solid rgba(15,42,68,0.12)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-source-serif), Georgia, serif",
            fontSize: "28px",
            fontWeight: 700,
            color: "#0F2A44",
            marginBottom: "20px",
          }}
        >
          Why We Exist
        </h2>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "17px",
            lineHeight: 1.8,
            color: "#3A3A3A",
            marginBottom: "20px",
          }}
        >
          Retirement is one of the most consequential financial periods of your life —
          and the rules change every year. Medicare premiums shift. Tax brackets adjust.
          RMD ages move. Social Security strategies evolve. Most people find out about
          these changes through headlines, mailers, or whoever called them last.
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "17px",
            lineHeight: 1.8,
            color: "#3A3A3A",
            marginBottom: "20px",
          }}
        >
          We built REN to be something different: a straightforward source of record
          for retirement-age Americans who want to stay informed without wading through
          sales pitches or decoding policy jargon. Every article we publish is written
          in plain English, grounded in primary sources, and reviewed before it goes
          live.
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "17px",
            lineHeight: 1.8,
            color: "#3A3A3A",
          }}
        >
          Fifty-nine and a half is the age when new doors open — and when the plan that
          got you here may need to be reconsidered. We want to help you ask better
          questions and walk into those conversations better prepared.
        </p>
      </section>

      {/* ── What We Are / Not ─────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "56px 32px",
          borderBottom: "1px solid rgba(15,42,68,0.12)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-source-serif), Georgia, serif",
            fontSize: "28px",
            fontWeight: 700,
            color: "#0F2A44",
            marginBottom: "32px",
          }}
        >
          What We Are — and What We're Not
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#0F2A44",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              We are
            </p>
            {[
              "An independent educational publication",
              "A source of plain-language explanations",
              "Current — we track rule changes as they happen",
              "Free to read, always",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                  marginBottom: "14px",
                }}
              >
                <span
                  style={{
                    color: "#B5432F",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: 1.4,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "16px",
                    lineHeight: 1.6,
                    color: "#3A3A3A",
                    margin: 0,
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#0F2A44",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              We are not
            </p>
            {[
              "A financial advisory firm",
              "A source of personalized advice",
              "Affiliated with any insurance company or product",
              "A lead generation service",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                  marginBottom: "14px",
                }}
              >
                <span
                  style={{
                    color: "#0F2A44",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: 1.4,
                    flexShrink: 0,
                    opacity: 0.4,
                  }}
                >
                  ✕
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "16px",
                    lineHeight: 1.6,
                    color: "#3A3A3A",
                    margin: 0,
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial Standards ───────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "56px 32px",
          borderBottom: "1px solid rgba(15,42,68,0.12)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-source-serif), Georgia, serif",
            fontSize: "28px",
            fontWeight: 700,
            color: "#0F2A44",
            marginBottom: "20px",
          }}
        >
          Our Editorial Standards
        </h2>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "17px",
            lineHeight: 1.8,
            color: "#3A3A3A",
            marginBottom: "20px",
          }}
        >
          Every article on this site is grounded in primary sources: the Social Security
          Administration, the IRS, the Centers for Medicare &amp; Medicaid Services,
          the Federal Reserve, and peer-reviewed research institutions. We verify dates
          and figures before publishing and update articles when official guidance changes.
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "17px",
            lineHeight: 1.8,
            color: "#3A3A3A",
            marginBottom: "20px",
          }}
        >
          We do not publish opinion pieces or market predictions. We do not take
          advertising from financial product companies. Our content decisions are
          made editorially — based on what readers need to know — not based on what
          sponsors want promoted.
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "17px",
            lineHeight: 1.8,
            color: "#3A3A3A",
          }}
        >
          Content is published under the REN Editorial Team byline. We do not represent
          individual contributors as licensed professionals. If you need personalized
          advice, we encourage you to work with a qualified financial planner,
          tax professional, or elder law attorney.
        </p>
      </section>

      {/* ── Disclaimer ────────────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "48px 32px 80px",
        }}
      >
        <div
          style={{
            background: "rgba(15,42,68,0.06)",
            borderLeft: "4px solid #0F2A44",
            padding: "28px 32px",
            borderRadius: "0 4px 4px 0",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#0F2A44",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            Disclosure
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "15px",
              lineHeight: 1.75,
              color: "#3A3A3A",
              margin: 0,
            }}
          >
            Retirement Education Network provides educational content for informational
            purposes only. Nothing on this site constitutes financial, tax, legal, or
            investment advice. We do not recommend specific products, advisors, or
            strategies. Always consult a qualified professional before making any
            financial decision.
          </p>
        </div>
      </section>
    </main>
  );
}
