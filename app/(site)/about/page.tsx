import { COMPANY } from "@/lib/site";

export const metadata = {
  title: "About | Retirement Education Network",
  description:
    "Retirement Education Network is an education service of Walker Thomas LLC, built for Americans 59 and older.",
};

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
          An education service of {COMPANY.legalEntity}, built for Americans 59 and older. We translate
          the most important retirement rules, deadlines, and decisions into plain language and keep you
          current as things change.
        </p>
      </section>

      {/* ── Who We Are ───────────────────────────────────────────────────── */}
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
          Who We Are
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "17px", lineHeight: 1.8, color: "#3A3A3A", marginBottom: "20px" }}>
          Retirement Education Network is an education service of {COMPANY.legalEntity}, built for
          Americans 59 and older. We research the rules, deadlines, and decisions that matter most in
          retirement, then explain them in plain language you can actually use. Our content is for
          education only. It is not personal financial, tax, or legal advice.
        </p>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "17px", lineHeight: 1.8, color: "#3A3A3A", margin: 0 }}>
          {COMPANY.legalEntity} also operates Elevated Advisor, a retirement planning service. If you
          would like to speak with a real person about your own situation, you can request a free
          consultation with the Elevated Advisor team. It is completely optional, and our educational
          content is always free either way.
        </p>
        <a
          href="/consultation"
          style={{
            display: "inline-block",
            marginTop: "28px",
            background: "#0F2A44",
            color: "#F4EFE6",
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "13px 24px",
            textDecoration: "none",
            borderRadius: "3px",
          }}
        >
          Request a Free Consultation
        </a>
      </section>

      {/* ── Why We Exist ─────────────────────────────────────────────────── */}
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
          Why We Exist
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "17px", lineHeight: 1.8, color: "#3A3A3A", marginBottom: "20px" }}>
          Retirement is one of the most consequential financial periods of your life, and the rules change
          every year. Medicare premiums shift. Tax brackets adjust. RMD ages move. Social Security
          strategies evolve. Most people find out about these changes through headlines, mailers, or
          whoever called them last.
        </p>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "17px", lineHeight: 1.8, color: "#3A3A3A", marginBottom: "20px" }}>
          We built REN to be something different: a straightforward source of record for retirement-age
          Americans who want to stay informed without wading through sales pitches or decoding policy
          jargon. Every article we publish is written in plain English, grounded in primary sources, and
          reviewed before it goes live.
        </p>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "17px", lineHeight: 1.8, color: "#3A3A3A", margin: 0 }}>
          Fifty-nine and a half is the age when new doors open. The plan that got you here may need to be
          reconsidered. We want to help you ask better questions and walk into those conversations better
          prepared.
        </p>
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
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "17px", lineHeight: 1.8, color: "#3A3A3A", marginBottom: "20px" }}>
          Every article on this site is grounded in primary sources: the Social Security Administration,
          the IRS, the Centers for Medicare &amp; Medicaid Services, the Federal Reserve, and peer-reviewed
          research institutions. We verify dates and figures before publishing and update articles when
          official guidance changes.
        </p>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "17px", lineHeight: 1.8, color: "#3A3A3A", margin: 0 }}>
          Content is published under the REN Editorial Team byline. Our educational content and our optional
          consultation service are kept clearly separate, and reading REN never obligates you to anything.
          If you need personalized advice, you are always free to work with a qualified financial planner,
          tax professional, or elder law attorney of your choosing, or to request a free consultation with
          the Elevated Advisor team.
        </p>
      </section>

      {/* ── Company / Contact ─────────────────────────────────────────────── */}
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
          The Company Behind REN
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "17px", lineHeight: 1.8, color: "#3A3A3A", marginBottom: "20px" }}>
          Retirement Education Network and Elevated Advisor are both services of {COMPANY.legalEntity}. You
          can reach us at any time:
        </p>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", lineHeight: 1.9, color: "#3A3A3A", margin: 0 }}>
          <strong>{COMPANY.legalEntity}</strong><br />
          {COMPANY.address.street}<br />
          {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}<br />
          Email: <a href={`mailto:${COMPANY.email}`} style={{ color: "#B5432F" }}>{COMPANY.email}</a><br />
          Phone: <a href={COMPANY.phoneHref} style={{ color: "#B5432F" }}>{COMPANY.phone}</a>
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
            Retirement Education Network provides educational content for informational purposes only.
            Nothing on this site constitutes financial, tax, legal, or investment advice. We do not
            recommend specific products or strategies. Always consult a qualified professional before
            making any financial decision.
          </p>
        </div>
      </section>
    </main>
  );
}
