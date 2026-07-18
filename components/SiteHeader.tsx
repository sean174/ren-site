"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { COMPANY } from "@/lib/site";

const NAV_LINKS: [string, string][] = [
  ["Front Page", "/"],
  ["Medicare", "/medicare"],
  ["Social Security", "/social-security"],
  ["Safe Money", "/safe-money"],
  ["Wills & Trusts", "/wills-and-trusts"],
  ["Tax Planning", "/tax-planning"],
  ["Long-Term Care", "/long-term-care"],
];

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const [menuOpen, setMenuOpen] = useState(false);

  // Rendered in a client component so the dateline reflects the real current
  // date on every visit (a live publication never shows a frozen date).
  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const ctaBtn: React.CSSProperties = {
    background: "#B5432F",
    color: "#F4EFE6",
    fontFamily: "var(--font-inter), sans-serif",
    fontWeight: 700,
    fontSize: "10px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    padding: "7px 14px",
    textDecoration: "none",
    borderRadius: "2px",
    whiteSpace: "nowrap",
  };

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div
        className="ren-topbar"
        style={{
          background: "var(--color-navy, #0F2A44)",
          color: "rgba(244,239,230,0.85)",
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 32px",
          fontWeight: 500,
        }}
      >
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span suppressHydrationWarning>{todayStr}</span>
          <a
            href="https://www.congress.gov/congressional-record"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#E89A7A", textDecoration: "none", display: "flex", alignItems: "center", gap: "7px" }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#B5432F",
                display: "inline-block",
                animation: "ren-pulse 1.8s infinite",
              }}
            />
            Live: Congressional Record
          </a>
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <a href="/about" style={{ color: "inherit", textDecoration: "none" }}>About</a>
          <a href="/contact" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
          <a href="/consultation" style={ctaBtn}>Book a Free Consultation</a>
        </div>
      </div>

      {/* ── Masthead ────────────────────────────────────────────────────── */}
      <header
        className="ren-masthead"
        style={{
          background: "#FBF8F2",
          padding: "24px 32px 20px",
          borderBottom: "3px double #0F2A44",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div className="ren-masthead-meta-left" style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", letterSpacing: "0.04em", color: "#6B6B6B", lineHeight: 1.7 }}>
          <strong style={{ fontWeight: 700, color: "#0F2A44", textTransform: "uppercase", letterSpacing: "0.18em", fontSize: "10px", display: "block" }}>
            Educational · Independent · Free
          </strong>
          <span suppressHydrationWarning>{todayStr}</span>
        </div>

        {/* Nameplate */}
        <a href="/" className="ren-masthead-nameplate" style={{ display: "flex", alignItems: "center", gap: "18px", justifyContent: "center", textDecoration: "none" }}>
          <svg width="56" height="56" viewBox="0 0 100 100" fill="none" stroke="#0F2A44" strokeWidth="2.5" aria-hidden="true">
            <circle cx="50" cy="50" r="46" />
            <line x1="14" y1="58" x2="86" y2="58" strokeLinecap="square" />
            <path d="M22 58 A28 28 0 0 1 78 58" />
            <path d="M32 58 A18 18 0 0 1 68 58" />
          </svg>
          <div style={{ width: "1px", height: "64px", background: "rgba(15,42,68,0.35)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "center", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "60px", lineHeight: 0.9, letterSpacing: "-0.015em", color: "#0F2A44" }} className="ren-nameplate-text">
              REN
            </div>
            <div style={{ fontFamily: "var(--font-inter),sans-serif", fontWeight: 600, fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#3A3A3A" }}>
              Retirement Education Network
            </div>
          </div>
        </a>

        <div className="ren-masthead-meta-right" style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", letterSpacing: "0.04em", color: "#6B6B6B", lineHeight: 1.7, textAlign: "right" }}>
          <strong style={{ fontWeight: 700, color: "#0F2A44", textTransform: "uppercase", letterSpacing: "0.18em", fontSize: "10px", display: "block" }}>
            America&apos;s Retirement Resource
          </strong>
          {COMPANY.domain}
        </div>
      </header>

      {/* ── Primary nav ─────────────────────────────────────────────────── */}
      <nav
        style={{
          background: "#FBF8F2",
          borderBottom: "1px solid rgba(15,42,68,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "12px 32px",
        }}
      >
        <div
          className="ren-primary-nav"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            fontFamily: "var(--font-inter),sans-serif",
            fontWeight: 600,
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {NAV_LINKS.map(([label, href]) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <a
                key={href}
                href={href}
                style={{
                  color: "#0F2A44",
                  textDecoration: "none",
                  paddingBottom: "4px",
                  borderBottom: active ? "2px solid #0F2A44" : "2px solid transparent",
                }}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Hamburger (mobile only, per globals.css @media rules) */}
        <button
          className="ren-hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)" }}
        >
          <span style={{ background: "#0F2A44" }} />
          <span style={{ background: "#0F2A44" }} />
          <span style={{ background: "#0F2A44" }} />
        </button>
      </nav>

      {/* ── Mobile nav drawer ───────────────────────────────────────────── */}
      <div className={`ren-mobile-nav${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a href="/about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
        <a href="/consultation" onClick={() => setMenuOpen(false)} style={{ color: "#E89A7A" }}>Book a Free Consultation</a>
      </div>

      <style>{`
        @keyframes ren-pulse {
          0% { box-shadow: 0 0 0 0 rgba(181,67,47,0.6); }
          70% { box-shadow: 0 0 0 8px rgba(181,67,47,0); }
          100% { box-shadow: 0 0 0 0 rgba(181,67,47,0); }
        }
        .ren-primary-nav a:hover { border-bottom-color: #B5432F !important; }
        .ren-topbar a:hover { opacity: 0.85; }
      `}</style>
    </>
  );
}
