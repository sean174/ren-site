import { COMPANY, OWNERSHIP_DISCLOSURE } from "@/lib/site";

export const metadata = {
  title: "Contact | Retirement Education Network",
  description:
    "Contact Walker Thomas LLC, the company behind Retirement Education Network and Elevated Advisor.",
};

export default function ContactPage() {
  return (
    <main style={{ background: "var(--color-ivory, #F4EFE6)", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ background: "#0F2A44", color: "#F4EFE6", padding: "64px 32px 52px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,239,230,0.55)", marginBottom: "18px" }}>
          Contact
        </p>
        <h1 style={{ fontFamily: "var(--font-source-serif), Georgia, serif", fontSize: "clamp(30px, 4.5vw, 46px)", fontWeight: 700, lineHeight: 1.15, maxWidth: "700px", margin: "0 auto 20px" }}>
          Get in Touch
        </h1>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "17px", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto", color: "rgba(244,239,230,0.82)" }}>
          {OWNERSHIP_DISCLOSURE} Reach us any of the ways below, we are happy to help.
        </p>
      </section>

      {/* Details */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "56px 32px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }} className="ren-two-col">
        <div style={{ background: "#fff", border: "1px solid rgba(15,42,68,0.14)", borderRadius: "4px", padding: "28px" }}>
          <h2 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#B5432F", margin: "0 0 12px" }}>
            Mailing Address
          </h2>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", lineHeight: 1.8, color: "#0F2A44", margin: 0 }}>
            <strong>{COMPANY.legalEntity}</strong><br />
            {COMPANY.address.street}<br />
            {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}
          </p>
        </div>
        <div style={{ background: "#fff", border: "1px solid rgba(15,42,68,0.14)", borderRadius: "4px", padding: "28px" }}>
          <h2 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#B5432F", margin: "0 0 12px" }}>
            Email &amp; Phone
          </h2>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", lineHeight: 1.9, color: "#0F2A44", margin: 0 }}>
            Email: <a href={`mailto:${COMPANY.email}`} style={{ color: "#B5432F" }}>{COMPANY.email}</a><br />
            Phone: <a href={COMPANY.phoneHref} style={{ color: "#B5432F" }}>{COMPANY.phone}</a>
          </p>
        </div>
      </section>

      {/* Consultation nudge */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "8px 32px 80px" }}>
        <div style={{ background: "#EAE3D6", border: "1px solid rgba(15,42,68,0.14)", borderRadius: "4px", padding: "32px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-source-serif), Georgia, serif", fontSize: "22px", fontWeight: 700, color: "#0F2A44", margin: "0 0 10px" }}>
            Want to talk through your own situation?
          </h2>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "15px", lineHeight: 1.7, color: "#3A3A3A", margin: "0 auto 20px", maxWidth: "520px" }}>
            You can request a free, no-pressure consultation with the Elevated Advisor team. It is
            completely optional, and our educational content is always free either way.
          </p>
          <a href="/consultation" style={{
            display: "inline-block",
            background: "#0F2A44",
            color: "#F4EFE6",
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "13px 26px",
            textDecoration: "none",
            borderRadius: "3px",
          }}>
            Book a Free Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
