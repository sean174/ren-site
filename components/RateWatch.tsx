"use client";

import { useEffect, useState } from "react";

type RatesData = {
  fedFunds: { value: number; date: string } | null;
  treasury10yr: { value: number; date: string } | null;
  cpi: { yoy: string; label: string } | null;
  cd1yr: { value: number; date: string } | null;
  updatedAt: string;
};

// Historical monthly data for sparklines (last 12 points, oldest first)
// Fed Funds Rate (FEDFUNDS) — monthly avg
const FED_HISTORY = [5.33, 5.33, 5.33, 5.33, 5.33, 5.08, 4.83, 4.58, 4.33, 4.33, 4.33, 4.33];
// 10-yr Treasury (DGS10) — monthly avg
const TREAS_HISTORY = [4.25, 4.36, 4.48, 4.40, 4.28, 3.90, 3.65, 3.75, 4.15, 4.28, 4.42, 4.42];
// CPI YoY %
const CPI_HISTORY = [3.2, 3.0, 2.9, 2.7, 2.6, 2.5, 2.4, 2.4, 2.5, 2.6, 2.5, 2.4];
// 1-Yr CD Rate (national avg, monthly)
const CD_HISTORY = [5.25, 5.20, 5.15, 5.05, 4.85, 4.65, 4.45, 4.25, 4.15, 4.10, 4.05, 4.05];
// SS COLA — annual rates 2020–2025 (6 points, one per year)
const COLA_HISTORY = [1.6, 1.3, 5.9, 8.7, 3.2, 2.5];

function Sparkline({ data, color = "#E89A7A" }: { data: number[]; color?: string }) {
  const w = 64;
  const h = 22;
  const pad = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 0.01;

  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const polyline = pts.join(" ");
  const lastPt = pts[pts.length - 1].split(",");

  // Direction vs 6 months ago (or beginning if shorter)
  const lookback = Math.max(0, data.length - 7);
  const trend = data[data.length - 1] - data[lookback];
  const trendColor = trend > 0.05 ? "#D9534F" : trend < -0.05 ? "#5CB85C" : "#8B9DA8";

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      {/* baseline dotted */}
      <line
        x1={pad} y1={h / 2} x2={w - pad} y2={h / 2}
        stroke="rgba(244,239,230,0.15)" strokeWidth="1" strokeDasharray="2,3"
      />
      {/* sparkline */}
      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* end dot */}
      <circle
        cx={lastPt[0]} cy={lastPt[1]} r="2.5"
        fill={trendColor} stroke="rgba(15,42,68,0.6)" strokeWidth="0.75"
      />
    </svg>
  );
}

export default function RateWatch() {
  const [data, setData] = useState<RatesData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/rates")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError(true));
  }, []);

  const fedFundsVal = data?.fedFunds?.value ?? 4.33;
  const treasuryVal = data?.treasury10yr?.value ?? 4.42;
  const cpiYoy = data?.cpi?.yoy ?? "2.4";
  const cpiLabel = data?.cpi?.label ?? "Mar 2025";
  const cdVal = data?.cd1yr?.value ?? 4.05;
  const isLive = !!data && !error;

  // Patch last point with live value
  const fedHistory = [...FED_HISTORY.slice(0, -1), fedFundsVal];
  const treasHistory = [...TREAS_HISTORY.slice(0, -1), treasuryVal];
  const cpiHistory = [...CPI_HISTORY.slice(0, -1), parseFloat(cpiYoy) || 2.4];
  const cdHistory = [...CD_HISTORY.slice(0, -1), cdVal];
  // COLA is annual — 2026 not announced yet, last point stays 2.5%
  const colaHistory = COLA_HISTORY;

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
    padding: "0 16px",
    minHeight: "38px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  };

  const sep: React.CSSProperties = {
    width: "1px",
    height: "20px",
    background: "rgba(255,255,255,0.15)",
    margin: "0 14px",
  };

  const label: React.CSSProperties = {
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
    fontSize: "9px",
    color: "rgba(244,239,230,0.5)",
    marginRight: "7px",
  };

  const val: React.CSSProperties = {
    fontWeight: 700,
    fontSize: "12px",
    color: "#E89A7A",
    marginRight: "8px",
  };

  const header: React.CSSProperties = {
    textTransform: "uppercase" as const,
    letterSpacing: "0.18em",
    fontSize: "9px",
    color: "rgba(244,239,230,0.38)",
    marginRight: "16px",
    fontWeight: 600,
  };

  return (
    <div
      style={bar}
      title={isLive ? `Updated ${new Date(data!.updatedAt).toLocaleTimeString()}` : "Showing last known rates"}
    >
      <span style={header}>Rate Watch</span>

      {/* Fed Funds */}
      <span style={label}>Fed Funds</span>
      <span style={val}>{fedFundsVal.toFixed(2)}%</span>
      <Sparkline data={fedHistory} />

      <div style={sep} />

      {/* 10-yr Treasury */}
      <span style={label}>10-Yr Treasury</span>
      <span style={val}>{treasuryVal.toFixed(2)}%</span>
      <Sparkline data={treasHistory} />

      <div style={sep} />

      {/* CPI */}
      <span style={label}>CPI ({cpiLabel})</span>
      <span style={val}>{cpiYoy}% YoY</span>
      <Sparkline data={cpiHistory} />

      <div style={sep} />

      {/* 1-Yr CD Rate */}
      <span style={label}>1-Yr CD Avg</span>
      <span style={val}>{cdVal.toFixed(2)}%</span>
      <Sparkline data={cdHistory} />

      <div style={sep} />

      {/* SS COLA */}
      <span style={label}>SS COLA 2025</span>
      <span style={val}>2.5%</span>
      <Sparkline data={colaHistory} />

      <span style={{ marginLeft: "14px", color: "rgba(244,239,230,0.22)", fontSize: "9px" }}>
        via FRED / Federal Reserve
      </span>
    </div>
  );
}
