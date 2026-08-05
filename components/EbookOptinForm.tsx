"use client";

import { useState } from "react";

const inputStyle: React.CSSProperties = {
  flex: "1 1 100%",
  padding: "11px 14px",
  fontSize: "0.9rem",
  border: "1px solid rgba(15,42,68,0.25)",
  background: "#fff",
  color: "#0F2A44",
  outline: "none",
  fontFamily: "var(--font-inter), sans-serif",
  boxSizing: "border-box" as const,
  borderRadius: "3px",
};

export default function EbookOptinForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/ebook-optin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => null);
        setErrorMsg(data?.error || "");
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{
        background: "rgba(46,125,82,0.08)",
        border: "1px solid #2E7D52",
        color: "#2E7D52",
        padding: "14px 16px",
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: "0.88rem",
        lineHeight: 1.6,
        borderRadius: "3px",
      }}>
        You&apos;re all set. Watch your phone for a text with your free guide.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" as const }}>
      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoComplete="name"
        style={inputStyle}
      />
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
        style={inputStyle}
      />
      <input
        type="tel"
        placeholder="Cell phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        autoComplete="tel"
        style={inputStyle}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          background: "#0F2A44",
          color: "#F4EFE6",
          border: "none",
          padding: "13px 20px",
          fontSize: "0.82rem",
          fontFamily: "var(--font-inter), sans-serif",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          cursor: status === "loading" ? "wait" : "pointer",
          whiteSpace: "nowrap" as const,
          flex: "1 1 100%",
          borderRadius: "3px",
        }}
      >
        {status === "loading" ? "Sending..." : "Get the Free Guide"}
      </button>
      {status === "error" && (
        <p style={{ width: "100%", fontSize: "11px", color: "#B5432F", margin: "4px 0 0", fontFamily: "var(--font-inter), sans-serif" }}>
          {errorMsg || "Something went wrong. Try again in a moment."}
        </p>
      )}
    </form>
  );
}
