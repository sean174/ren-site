"use client";

import { useState } from "react";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/ebook-optin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        style={{
          fontSize: "0.9rem",
          lineHeight: 1.6,
          color: "#A8D5B5",
          margin: 0,
        }}
      >
        You&apos;re subscribed. Look for The Weekly in your inbox on Thursday.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          padding: "9px 12px",
          fontSize: "0.9rem",
          border: "1px solid rgba(244,239,230,0.25)",
          background: "rgba(244,239,230,0.1)",
          color: "#F4EFE6",
          outline: "none",
          width: "100%",
        }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          background: "#F4EFE6",
          color: "#0F2A44",
          border: "none",
          padding: "9px",
          fontSize: "0.85rem",
          fontFamily: "inherit",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: status === "loading" ? "wait" : "pointer",
          width: "100%",
        }}
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p style={{ fontSize: "10px", color: "#E8A0A0", margin: "2px 0 0" }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
