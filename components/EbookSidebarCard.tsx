import Image from "next/image";
import EbookOptinForm from "./EbookOptinForm";

export default function EbookSidebarCard() {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid rgba(15,42,68,0.14)",
      borderTop: "4px solid #B5432F",
      borderRadius: "4px",
      padding: "28px 24px 24px",
      boxShadow: "0 10px 30px rgba(15,42,68,0.08)",
      textAlign: "center" as const,
    }}>
      <p style={{
        fontFamily: "var(--font-inter),sans-serif",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase" as const,
        color: "#B5432F",
        margin: "0 0 18px",
      }}>
        Free Resource of the Month
      </p>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <Image
          src="/images/ebook-roth-conversion.png"
          alt="Roth Conversion Do's and Don'ts — free guide from REN"
          width={888}
          height={1026}
          style={{
            objectFit: "contain",
            width: "100%",
            maxWidth: "250px",
            height: "auto",
          }}
        />
      </div>
      <h4 style={{
        fontFamily: "var(--font-source-serif),Georgia,serif",
        fontWeight: 700,
        fontSize: "1.35rem",
        color: "#0F2A44",
        margin: "0 0 10px",
        lineHeight: 1.25,
      }}>
        Roth Conversion Do&apos;s &amp; Don&apos;ts
      </h4>
      <p style={{
        fontSize: "0.88rem",
        lineHeight: 1.65,
        margin: "0 0 18px",
        color: "#3A3A3A",
        fontFamily: "var(--font-inter),sans-serif",
      }}>
        Five mistakes that can cost retirees six figures, and the simple checks that catch every one of them. Free, no strings attached.
      </p>
      <div style={{ textAlign: "left" as const }}>
        <EbookOptinForm />
      </div>
      <p style={{
        fontSize: "10px",
        color: "#6B6B6B",
        margin: "12px 0 0",
        letterSpacing: "0.04em",
        fontFamily: "var(--font-inter),sans-serif",
      }}>
        Educational purposes only. Not financial, tax, or legal advice.
      </p>
    </div>
  );
}
