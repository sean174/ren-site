"use client";

import { useState } from "react";

const inputStyle: React.CSSProperties = {
  flex: "1 1 100%",
  padding: "10px 14px",
  fontSize: "0.9rem",
  border: "1px solid rgba(244,239,230,0.25)",
  background: "rgba(244,239,230,0.08)",
  color: "#F4EFE6",
  outline: "none",
  fontFamily: "var(--font-inter), sans-serif",
  boxSizing: "border-box" as const,
};

export default function EbookOptinForm({ compact = false }: { compact?: boolean }) {
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
        background: "rgba(46,125,82,0.18)",
        border: "1px solid #2E7D52",
        color: "#A8D5B5",
        padding: "12px 16px",
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: compact ? "0.8rem" : "0.88rem",
        maxWidth: compact ? undefined : "400px",
      }}>
        You&apos;re all set. Watch your phone for a text with your free guide.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", maxWidth: compact ? undefined : "420px", flexWrap: "wrap" as const }}>
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
          background: "#E89A7A",
          color: "#0F2A44",
          border: "none",
          padding: compact ? "11px 16px" : "10px 20px",
          fontSize: "0.82rem",
          fontFamily: "var(--font-inter), sans-serif",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          cursor: status === "loading" ? "wait" : "pointer",
          whiteSpace: "nowrap" as const,
          flex: "1 1 100%",
        }}
      >
        {status === "loading" ? "Sending..." : "Get the Free Guide"}
      </button>
      {status === "error" && (
        <p style={{ width: "100%", fontSize: "11px", color: "#D9534F", margin: "4px 0 0" }}>
          {errorMsg || "Something went wrong. Try again in a moment."}
        </p>
      )}
    </form>
  );
}
