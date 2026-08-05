import Image from "next/image";
import EbookOptinForm from "./EbookOptinForm";

export default function EbookBanner() {
  return (
    <section
      className="ren-ebook-banner"
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

        <EbookOptinForm />

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
