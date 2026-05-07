"use client";

import { useEffect, useState } from "react";

type Bill = {
  title: string;
  link: string;
  status: string;
  date: string;
  snippet: string;
};

const STATUS_COLORS: Record<string, string> = {
  Enacted: "#2E7D52",
  Passed: "#2E7D52",
  "Floor Vote": "#B5432F",
  "In Committee": "#8B6914",
  Proposed: "#0F2A44",
  Introduced: "#0F2A44",
};

export default function LegislationWatch() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/legislation")
      .then((r) => r.json())
      .then((d) => { setBills(d.bills || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const card: React.CSSProperties = {
    borderBottom: "1px solid rgba(15,42,68,0.1)",
    padding: "12px 0",
    cursor: "pointer",
  };

  const statusBadge = (status: string): React.CSSProperties => ({
    display: "inline-block",
    background: STATUS_COLORS[status] || "#0F2A44",
    color: "#fff",
    fontFamily: "var(--font-inter), sans-serif",
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    padding: "2px 7px",
    borderRadius: "2px",
    marginRight: "8px",
    flexShrink: 0,
  });

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "14px" }}>
        <h3 style={{
          fontFamily: "var(--font-source-serif), Georgia, serif",
          fontSize: "15px",
          fontWeight: 700,
          color: "#0F2A44",
          margin: 0,
          textTransform: "uppercase" as const,
          letterSpacing: "0.06em",
        }}>
          Washington Watch
        </h3>
        <span style={{ fontSize: "10px", color: "#B5432F", fontWeight: 700, letterSpacing: "0.1em" }}>
          LIVE
        </span>
      </div>
      <p style={{ fontSize: "12px", color: "#6B6B6B", marginBottom: "16px", lineHeight: 1.5 }}>
        Bills in Congress that could affect your retirement.
      </p>

      {loading && (
        <p style={{ fontSize: "12px", color: "#6B6B6B" }}>Loading legislation...</p>
      )}

      {bills.map((bill, i) => (
        <div key={i} style={card} onClick={() => setExpanded(expanded === i ? null : i)}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "4px", marginBottom: "4px" }}>
            <span style={statusBadge(bill.status)}>{bill.status}</span>
            {bill.date && (
              <span style={{ fontSize: "10px", color: "#9B9B9B", whiteSpace: "nowrap" as const }}>{bill.date}</span>
            )}
          </div>
          <a
            href={bill.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#0F2A44",
              textDecoration: "none",
              lineHeight: 1.4,
              display: "block",
              marginBottom: expanded === i ? "8px" : "0",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {bill.title}
          </a>
          {expanded === i && bill.snippet && (
            <p style={{ fontSize: "12px", color: "#3A3A3A", lineHeight: 1.6, margin: 0 }}>
              {bill.snippet}
            </p>
          )}
        </div>
      ))}

      <a
        href="https://www.congress.gov/search?q=%7B%22source%22%3A%22legislation%22%2C%22search%22%3A%22retirement+OR+social+security+OR+medicare%22%7D"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: "11px", color: "#B5432F", textDecoration: "none", display: "block", marginTop: "12px" }}
      >
        View all retirement bills on Congress.gov
      </a>
    </div>
  );
}
