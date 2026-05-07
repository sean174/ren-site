"use client";

import { useState } from "react";
import Image from "next/image";

export default function EbookBanner() {
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
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      style={{
        background: "#0F2A44",
        borderTop: "4px solid #E89A7A",
        padding: "36px 32px",
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        gap: "36px",
        alignItems: "center",
      }}
    >
      {/* Book cover */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image
          src="/images/ebook-roth-conversion.png"
          alt="Roth Conversion Do's and Don'ts — free guide from REN"
          width={160}
          height={210}
          style={{
            objectFit: "contain",
            filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.45))",
          }}
        />
      </div>

      {/* Text + form */}
      <div>
        <p style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#E89A7A",
          margin: "0 0 8px",
        }}>
          Free Resource of the Month
        </p>
        <h2 style={{
          fontFamily: "var(--font-source-serif), Georgia, serif",
          fontWeight: 700,
          fontSize: "1.55rem",
          color: "#F4EFE6",
          margin: "0 0 10px",
          lineHeight: 1.2,
        }}>
          Roth Conversion Do&apos;s &amp; Don&apos;ts
        </h2>
        <p style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "0.88rem",
          color: "rgba(244,239,230,0.78)",
          lineHeight: 1.65,
          margin: "0 0 20px",
          maxWidth: "480px",
        }}>
          Five mistakes that can cost retirees six figures, and the simple checks that catch every one of them. Free, no strings attached.
        </p>

        {status === "success" ? (
          <div style={{
            background: "rgba(46,125,82,0.18)",
            border: "1px solid #2E7D52",
            color: "#A8D5B5",
            padding: "12px 16px",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.88rem",
            maxWidth: "400px",
          }}>
            Check your inbox. Your free guide is on the way.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", maxWidth: "420px", flexWrap: "wrap" }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: "1 1 200px",
                padding: "10px 14px",
                fontSize: "0.9rem",
                border: "1px solid rgba(244,239,230,0.25)",
                background: "rgba(244,239,230,0.08)",
                color: "#F4EFE6",
                outline: "none",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                background: "#E89A7A",
                color: "#0F2A44",
                border: "none",
                padding: "10px 20px",
                fontSize: "0.82rem",
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: status === "loading" ? "wait" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {status === "loading" ? "Sending..." : "Get the Free Guide"}
            </button>
            {status === "error" && (
              <p style={{ width: "100%", fontSize: "11px", color: "#D9534F", margin: "4px 0 0" }}>
                Something went wrong. Try again in a moment.
              </p>
            )}
          </form>
        )}

        <p style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "10px",
          color: "rgba(244,239,230,0.38)",
          margin: "10px 0 0",
          letterSpacing: "0.04em",
        }}>
          Educational purposes only. Not financial, tax, or legal advice.
        </p>
      </div>
    </section>
  );
}
