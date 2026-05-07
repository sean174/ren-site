export default function Footer() {
  return (
    <footer style={{ background: "#0F2A44", color: "rgba(244,239,230,0.7)" }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 32px 28px",
        display: "flex",
        flexDirection: "column" as const,
        gap: "28px",
      }}>
        {/* Top row */}
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "32px", justifyContent: "space-between", alignItems: "flex-start" }}>
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "8px", maxWidth: "280px" }}>
            <span style={{
              fontFamily: "var(--font-source-serif), Georgia, serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "#F4EFE6",
              letterSpacing: "-0.01em",
            }}>
              Retirement Education Network
            </span>
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "12px",
              lineHeight: 1.7,
              color: "rgba(244,239,230,0.55)",
              margin: 0,
            }}>
              Plain-language retirement education for Americans 59 and older.
              Not financial advice.
            </p>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" as const }}>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px" }}>
              <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(244,239,230,0.4)", marginBottom: "2px" }}>Topics</span>
              {[
                ["Social Security", "/social-security"],
                ["Medicare", "/medicare"],
                ["Safe Money", "/safe-money"],
                ["Long-Term Care", "/long-term-care"],
                ["Tax Planning", "/tax-planning"],
                ["Wills & Trusts", "/wills-and-trusts"],
              ].map(([label, href]) => (
                <a key={href} href={href} style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", color: "rgba(244,239,230,0.7)", textDecoration: "none" }}>{label}</a>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px" }}>
              <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(244,239,230,0.4)", marginBottom: "2px" }}>Site</span>
              {[
                ["About", "/about"],
                ["Newsletter", "/#newsletter"],
                ["Terms of Use", "/terms"],
                ["Privacy Policy", "/privacy"],
              ].map(([label, href]) => (
                <a key={href} href={href} style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", color: "rgba(244,239,230,0.7)", textDecoration: "none" }}>{label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ borderTop: "1px solid rgba(244,239,230,0.1)", paddingTop: "20px" }}>
          <p style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "11.5px",
            lineHeight: 1.75,
            color: "rgba(244,239,230,0.45)",
            margin: "0 0 14px",
            maxWidth: "820px",
          }}>
            This content is for educational purposes only and does not constitute financial, tax, legal,
            or investment advice. We do not recommend specific products, advisors, or strategies. Always
            consult a qualified professional before making any financial decision.
          </p>
          {/* Bottom bar */}
          <div style={{ display: "flex", flexWrap: "wrap" as const, justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
            <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", color: "rgba(244,239,230,0.35)" }}>
              © 2025 Retirement Education Network LLC. All rights reserved.
            </span>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" as const, alignItems: "center" }}>
              <a href="/terms" style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", color: "rgba(244,239,230,0.45)", textDecoration: "none" }}>Terms of Use</a>
              <a href="/privacy" style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", color: "rgba(244,239,230,0.45)", textDecoration: "none" }}>Privacy Policy</a>
              <a
                href="mailto:privacy@retirementeducationnetwork.com?subject=Do Not Share"
                style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", color: "rgba(244,239,230,0.45)", textDecoration: "none" }}
              >
                Do Not Sell or Share My Personal Information
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
