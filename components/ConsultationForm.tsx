"use client";

import { useState } from "react";

export default function ConsultationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, consent }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    fontSize: "16px",
    fontFamily: "var(--font-inter), sans-serif",
    border: "1px solid rgba(15,42,68,0.28)",
    borderRadius: "3px",
    background: "#fff",
    color: "#0F2A44",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-inter), sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#0F2A44",
    marginBottom: "7px",
  };

  if (status === "success") {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(15,42,68,0.18)",
          borderTop: "4px solid #2E7D52",
          borderRadius: "4px",
          padding: "40px 32px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-source-serif), Georgia, serif",
            fontSize: "26px",
            fontWeight: 700,
            color: "#0F2A44",
            margin: "0 0 14px",
          }}
        >
          Thanks.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#3A3A3A",
            margin: "0 auto",
            maxWidth: "460px",
          }}
        >
          A member of the Elevated Advisor team will reach out shortly to find a time that works. Keep an
          eye on your phone.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        border: "1px solid rgba(15,42,68,0.18)",
        borderRadius: "4px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "22px",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }} className="ren-consult-names">
        <div>
          <label style={labelStyle} htmlFor="firstName">First Name</label>
          <input id="firstName" style={inputStyle} value={firstName} onChange={(e) => setFirstName(e.target.value)} required autoComplete="given-name" />
        </div>
        <div>
          <label style={labelStyle} htmlFor="lastName">Last Name</label>
          <input id="lastName" style={inputStyle} value={lastName} onChange={(e) => setLastName(e.target.value)} required autoComplete="family-name" />
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="email">Email <span style={{ color: "#B5432F" }}>*</span></label>
        <input id="email" type="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
      </div>

      <div>
        <label style={labelStyle} htmlFor="phone">Cell Phone</label>
        <input id="phone" type="tel" style={inputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", color: "#6B6B6B", margin: "7px 0 0" }}>
          So our team can reach you to schedule.
        </p>
      </div>

      {/* Consent checkbox — unchecked by default */}
      <label style={{ display: "flex", gap: "12px", alignItems: "flex-start", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          style={{ marginTop: "4px", width: "18px", height: "18px", flexShrink: 0, cursor: "pointer" }}
        />
        <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", lineHeight: 1.65, color: "#3A3A3A" }}>
          By checking this box, I agree to receive phone calls and text messages from Elevated Advisor
          (Walker Thomas LLC), including through automated technology, for appointment scheduling,
          appointment reminders, and follow-ups about my request. Message frequency varies. Message and
          data rates may apply. Reply HELP for help or STOP to cancel at any time. Consent is not a
          condition of purchase. See our{" "}
          <a href="/terms" style={{ color: "#B5432F" }}>terms &amp; conditions</a> and{" "}
          <a href="/privacy" style={{ color: "#B5432F" }}>privacy policy</a>.
        </span>
      </label>

      {status === "error" && (
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", color: "#B5432F", margin: 0 }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          background: "#0F2A44",
          color: "#F4EFE6",
          border: "none",
          borderRadius: "3px",
          padding: "15px",
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: status === "loading" ? "wait" : "pointer",
        }}
      >
        {status === "loading" ? "Sending..." : "Request My Consultation"}
      </button>
    </form>
  );
}
