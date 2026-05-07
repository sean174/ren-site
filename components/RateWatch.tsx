"use client";

import { useEffect, useState } from "react";

type RatesData = {
  fedFunds: { value: number; date: string } | null;
  treasury10yr: { value: number; date: string } | null;
  cpi: { yoy: string; label: string } | null;
  updatedAt: string;
};

export default function RateWatch() {
  const [data, setData] = useState<RatesData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/rates")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError(true));
  }, []);

  const bar: React.CSSProperties = {
    background: "#0F2A44",
    color: "#F4EFE6",
    fontFamily: "var(--font-inter), sans-serif",
    fontSize: "11px",
    letterSpacing: "0.06em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0",
    flexWrap: "wrap" as const,
    padding: "0",
    minHeight: "32px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  };

  const sep: React.CSSProperties = {
    width: "1px",
    height: "16px",
    background: "rgba(255,255,255,0.2)",
    margin: "0 20px",
  };

  const label: React.CSSProperties = {
    textTransform: "uppercase" as const,
    letterSpacing: "0.14em",
    fontSize: "9px",
    color: "rgba(244,239,230,0.55)",
    marginRight: "6px",
  };

  const val: React.CSSProperties = {
    fontWeight: 700,
    fontSize: "12px",
    color: "#E89A7A",
  };

  // Always show something — use live data if available, fallback to last-known values
  const fedFundsVal  = data?.fedFunds?.value  ?? 4.33;
  const treasuryVal  = data?.treasury10yr?.value ?? 4.42;
  const cpiYoy       = data?.cpi?.yoy  ?? "2.4";
  const cpiLabel     = data?.cpi?.label ?? "Mar 2025";
  const isLive       = !!data && !error;

  return (
    <div style={bar} title={isLive ? `Updated ${new Date(data!.updatedAt).toLocaleTimeString()}` : "Showing last known rates"}>
      <span style={{ ...label, marginLeft: "16px" }}>Rate Watch</span>
      <div style={sep} />

      {data?.fedFunds !== undefined && (
        <>
          <span style={label}>Fed Funds Rate</span>
          <span style={val}>{fedFundsVal.toFixed(2)}%</span>
          <div style={sep} />
        </>
      )}

      {data?.treasury10yr !== undefined && (
        <>
          <span style={label}>10-Yr Treasury</span>
          <span style={val}>{treasuryVal.toFixed(2)}%</span>
          <div style={sep} />
        </>
      )}

      {(
        <>
          <span style={label}>CPI ({cpiLabel})</span>
          <span style={val}>{cpiYoy}% YoY</span>
        </>
      )}

      <span style={{ marginLeft: "20px", color: "rgba(244,239,230,0.28)", fontSize: "9px" }}>
        via FRED / Federal Reserve
      </span>
    </div>
  );
}
