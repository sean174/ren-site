"use client";

export default function EmailForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <input
        type="email"
        placeholder="your@email.com"
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
          cursor: "pointer",
          width: "100%",
        }}
      >
        Subscribe
      </button>
    </form>
  );
}
