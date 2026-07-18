import ConsultationForm from "@/components/ConsultationForm";

export const metadata = {
  title: "Request a Free Retirement Consultation | Retirement Education Network",
  description:
    "Request a free, no-pressure consultation with the Elevated Advisor team, a service of Walker Thomas LLC, the same company behind Retirement Education Network.",
};

export default function ConsultationPage() {
  return (
    <main style={{ background: "var(--color-ivory, #F4EFE6)", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ background: "#0F2A44", color: "#F4EFE6", padding: "64px 32px 56px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,239,230,0.55)", marginBottom: "18px" }}>
          Optional · Free · No obligation
        </p>
        <h1 style={{ fontFamily: "var(--font-source-serif), Georgia, serif", fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: 700, lineHeight: 1.15, maxWidth: "760px", margin: "0 auto 22px" }}>
          Request a Free Retirement Consultation
        </h1>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "17px", lineHeight: 1.7, maxWidth: "640px", margin: "0 auto", color: "rgba(244,239,230,0.82)" }}>
          Want to talk through your own situation with a real person? Request a free, no-pressure
          consultation with the Elevated Advisor team, a service of Walker Thomas LLC, the same company
          behind Retirement Education Network. There is no cost and no obligation.
        </p>
      </section>

      {/* Form */}
      <section style={{ maxWidth: "620px", margin: "0 auto", padding: "48px 32px 80px" }}>
        <ConsultationForm />
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", lineHeight: 1.7, color: "#6B6B6B", textAlign: "center", margin: "24px auto 0", maxWidth: "480px" }}>
          Our educational content is always free either way. A consultation simply gives you the option to
          ask your own questions of the Elevated Advisor team.
        </p>
      </section>
    </main>
  );
}
