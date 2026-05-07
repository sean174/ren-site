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

  if (error || !data) {
    // Static fallback — shows last known values while loading or on error
    return (
      <div style={bar}>
        <span style={{ ...label }}>Rate Watch</span>
        <span style={{ color: "rgba(244,239,230,0.4)", fontSize: "10px" }}>Loading market data...</span>
      </div>
    );
  }

  return (
    <div style={bar} title={`Updated ${new Date(data.updatedAt).toLocaleTimeString()}`}>
      <span style={{ ...label, marginLeft: "16px" }}>Rate Watch</span>
      <div style={sep} />

      {data.fedFunds && (
        <>
          <span style={label}>Fed Funds Rate</span>
          <span style={val}>{data.fedFunds.value.toFixed(2)}%</span>
          <div style={sep} />
        </>
      )}

      {data.treasury10yr && (
        <>
          <span style={label}>10-Yr Treasury</span>
          <span style={val}>{data.treasury10yr.value.toFixed(2)}%</span>
          <div style={sep} />
        </>
      )}

      {data.cpi && (
        <>
          <span style={label}>CPI ({data.cpi.label})</span>
          <span style={val}>{data.cpi.yoy}% YoY</span>
        </>
      )}

      <span style={{ marginLeft: "20px", color: "rgba(244,239,230,0.28)", fontSize: "9px" }}>
        via FRED / Federal Reserve
      </span>
    </div>
  );
}
