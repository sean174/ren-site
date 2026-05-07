"use client";

import { useEffect, useState } from "react";

type KeyDate = {
  label: string;
  date: Date;
  daysAway: number;
  note: string;
  urgent: boolean;
};

function buildKeyDates(): KeyDate[] {
  const now = new Date();
  const year = now.getFullYear();

  const candidates = [
    {
      label: "Medicare Open Enrollment Ends",
      date: new Date(`${year}-12-07T23:59:00`),
      note: "Change your Medicare Advantage or Part D plan",
      urgent: false,
    },
    {
      label: "Medicare Open Enrollment Opens",
      date: new Date(`${year}-10-15T00:00:00`),
      note: "First day you can switch Medicare plans",
      urgent: false,
    },
    {
      label: "RMD Deadline",
      date: new Date(`${year}-12-31T23:59:00`),
      note: "Required Minimum Distributions must be taken by Dec 31",
      urgent: false,
    },
    {
      label: "SS COLA Announcement",
      date: new Date(`${year}-10-10T00:00:00`),
      note: "Social Security announces next year cost-of-living adjustment",
      urgent: false,
    },
    {
      label: "Federal Tax Filing Deadline",
      date: new Date(`${year}-04-15T23:59:00`),
      note: "File or request extension. Roth IRA contributions due",
      urgent: false,
    },
    {
      label: "Medicare Part B Open Enrollment",
      date: new Date(`${year + 1}-03-31T23:59:00`),
      note: "General Enrollment Period: Jan 1 - Mar 31",
      urgent: false,
    },
    // Next year versions if this year's already passed
    {
      label: "Medicare Open Enrollment Ends",
      date: new Date(`${year + 1}-12-07T23:59:00`),
      note: "Change your Medicare Advantage or Part D plan",
      urgent: false,
    },
    {
      label: "Medicare Open Enrollment Opens",
      date: new Date(`${year + 1}-10-15T00:00:00`),
      note: "First day you can switch Medicare plans",
      urgent: false,
    },
    {
      label: "SS COLA Announcement",
      date: new Date(`${year + 1}-10-10T00:00:00`),
      note: "Social Security announces next year cost-of-living adjustment",
      urgent: false,
    },
    {
      label: "RMD Deadline",
      date: new Date(`${year + 1}-12-31T23:59:00`),
      note: "Required Minimum Distributions must be taken by Dec 31",
      urgent: false,
    },
    {
      label: "Federal Tax Filing Deadline",
      date: new Date(`${year + 1}-04-15T23:59:00`),
      note: "File or request extension. Roth IRA contributions due",
      urgent: false,
    },
  ];

  const upcoming: KeyDate[] = [];
  const seen = new Set<string>();

  for (const c of candidates) {
    const days = Math.ceil((c.date.getTime() - now.getTime()) / 86400000);
    if (days < 0) continue; // already passed
    if (seen.has(c.label)) continue; // deduplicate
    seen.add(c.label);
    upcoming.push({ ...c, daysAway: days, urgent: days <= 30 });
    if (upcoming.length >= 5) break;
  }

  return upcoming.sort((a, b) => a.daysAway - b.daysAway);
}

export default function KeyDates() {
  const [dates, setDates] = useState<KeyDate[]>([]);

  useEffect(() => {
    setDates(buildKeyDates());
  }, []);

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      <h3 style={{
        fontFamily: "var(--font-source-serif), Georgia, serif",
        fontSize: "15px",
        fontWeight: 700,
        color: "#0F2A44",
        margin: "0 0 16px",
        textTransform: "uppercase" as const,
        letterSpacing: "0.06em",
      }}>
        Key Dates
      </h3>

      {dates.map((d, i) => (
        <div key={i} style={{
          borderBottom: "1px solid rgba(15,42,68,0.1)",
          padding: "10px 0",
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
        }}>
          <div style={{
            minWidth: "48px",
            textAlign: "center" as const,
            background: d.urgent ? "#B5432F" : "#0F2A44",
            color: "#fff",
            borderRadius: "3px",
            padding: "4px 6px",
            flexShrink: 0,
          }}>
            <div style={{ fontSize: "18px", fontWeight: 700, lineHeight: 1 }}>
              {d.daysAway}
            </div>
            <div style={{ fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginTop: "2px" }}>
              days
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#0F2A44", lineHeight: 1.3 }}>
              {d.label}
            </div>
            <div style={{ fontSize: "10px", color: "#6B6B6B", marginTop: "2px", lineHeight: 1.4 }}>
              {d.date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </div>
            <div style={{ fontSize: "11px", color: "#3A3A3A", marginTop: "3px", lineHeight: 1.4 }}>
              {d.note}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
