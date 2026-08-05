import Image from "next/image";
import EbookOptinForm from "./EbookOptinForm";

export default function EbookSidebarCard() {
  return (
    <div style={{ background: "#0F2A44", padding: "20px", color: "#F4EFE6", borderTop: "4px solid #E89A7A" }}>
      <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "12px" }}>
        <Image
          src="/images/ebook-roth-conversion.png"
          alt="Roth Conversion Do's and Don'ts — free guide from REN"
          width={64}
          height={84}
          style={{ objectFit: "contain", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.45))", flexShrink: 0 }}
        />
        <div>
          <p style={{
            fontFamily: "var(--font-inter),sans-serif",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            color: "#E89A7A",
            margin: "0 0 4px",
          }}>
            Free Resource of the Month
          </p>
          <h4 style={{ fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700, fontSize: "1rem", margin: 0, lineHeight: 1.25 }}>
            Roth Conversion Do&apos;s &amp; Don&apos;ts
          </h4>
        </div>
      </div>
      <p style={{ fontSize: "0.85rem", lineHeight: 1.65, margin: "0 0 14px", color: "rgba(244,239,230,0.85)", fontFamily: "var(--font-inter),sans-serif" }}>
        Five mistakes that can cost retirees six figures, and the simple checks that catch every one of them. Free, no strings attached.
      </p>
      <EbookOptinForm compact />
      <p style={{ fontSize: "10px", color: "rgba(244,239,230,0.5)", margin: "8px 0 0", letterSpacing: "0.04em", fontFamily: "var(--font-inter),sans-serif" }}>
        Educational purposes only. Not financial, tax, or legal advice.
      </p>
    </div>
  );
}
