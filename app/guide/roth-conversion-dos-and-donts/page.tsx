import type { Metadata } from "next";
import { getBookHtml, getBookFrontMatter, BOOK_TOC } from "@/lib/book";
import BookFlipbook from "@/components/BookFlipbook";

export const metadata: Metadata = {
  title: "Roth Conversion Do's & Don'ts | Retirement Education Network",
  description:
    "Five mistakes that can cost retirees six figures, and the simple checks that catch every one of them. A free guide from the Retirement Education Network.",
  robots: { index: false, follow: false },
};

const BOOK_CSS = `
.bk-stage { max-width: 1020px; margin: 0 auto; padding: 24px 4px 8px; }
.bk-book { margin: 0 auto; }
.bk-page {
  background: #FEFCF7;
  color: #2A2A2A;
  overflow: hidden;
  border: 1px solid rgba(15,42,68,0.12);
}
.bk-page.bk-text, .bk-page.bk-toc, .bk-page.bk-copyright { padding: 44px 40px 52px; }
.bk-flow { font-family: var(--font-inter), sans-serif; font-size: 13.5px; line-height: 1.62; }
.bk-flow p { margin: 0 0 11px; }
.bk-flow h2 {
  font-family: var(--font-source-serif), Georgia, serif;
  font-size: 19px; font-weight: 700; color: #0F2A44;
  margin: 18px 0 10px; line-height: 1.25;
}
.bk-flow h3 {
  font-family: var(--font-inter), sans-serif;
  font-size: 13px; font-weight: 700; color: #0F2A44;
  margin: 14px 0 6px;
}
.bk-flow ul { margin: 0 0 11px; padding-left: 20px; }
.bk-flow li { margin-bottom: 6px; }
.bk-flow strong { color: #0F2A44; }
.bk-flow table {
  width: 100%; border-collapse: collapse; font-size: 11px; margin: 12px 0;
}
.bk-flow th {
  font-family: var(--font-inter), sans-serif; text-align: left;
  background: #0F2A44; color: #F4EFE6; padding: 6px 7px; font-weight: 600;
}
.bk-flow td { padding: 6px 7px; border-bottom: 1px solid rgba(15,42,68,0.15); }
.bk-flow tr:last-child td { font-weight: 700; }

.bk-section-open {
  font-family: var(--font-source-serif), Georgia, serif;
  font-size: 24px; font-weight: 700; color: #0F2A44;
  border-top: 4px solid #B5432F; padding-top: 14px;
  margin: 0 0 16px; line-height: 1.2;
}

.bk-page.bk-chapter {
  background: #0F2A44; display: flex; align-items: center; justify-content: center;
}
.bk-chapter-open { display: flex; flex-direction: column; gap: 18px; padding: 0 48px; text-align: left; }
.bk-ch-kicker {
  font-family: var(--font-inter), sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.28em; text-transform: uppercase; color: #E89A7A;
}
.bk-ch-title {
  font-family: var(--font-source-serif), Georgia, serif;
  font-size: 34px; font-weight: 700; color: #F4EFE6; line-height: 1.18;
}

.bk-pull {
  border-left: 4px solid #E89A7A;
  padding: 6px 0 6px 16px; margin: 14px 0;
  font-family: var(--font-source-serif), Georgia, serif;
  font-size: 17.5px; line-height: 1.4; font-weight: 600; color: #B5432F;
}
.bk-box {
  background: #F4EFE6; border: 1px solid rgba(15,42,68,0.18);
  border-top: 3px solid #0F2A44; padding: 14px 16px; margin: 14px 0;
  font-size: 12.5px; line-height: 1.6;
}
.bk-chart { margin: 14px 0; }
.bk-chart-title {
  font-family: var(--font-inter), sans-serif; font-size: 10.5px; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase; color: #0F2A44;
  border-bottom: 2px solid #0F2A44; padding-bottom: 5px; margin-bottom: 10px;
}
.bk-chart-note { font-size: 10px; color: #6B6B6B; margin-top: 6px; }

.bk-page.bk-cover { padding: 0; background: #0F2A44; }
.bk-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
.bk-copyright { display: flex; flex-direction: column; justify-content: flex-end; }
.bk-copyright p { font-family: var(--font-inter), sans-serif; font-size: 10px; line-height: 1.65; color: #55606B; margin: 0 0 9px; }

.bk-toc-head {
  font-family: var(--font-source-serif), Georgia, serif; font-size: 26px; font-weight: 700;
  color: #0F2A44; border-top: 4px solid #B5432F; padding-top: 14px; margin-bottom: 18px;
}
.bk-toc-item {
  display: block; width: 100%; text-align: left; background: none; border: none;
  border-bottom: 1px solid rgba(15,42,68,0.14); cursor: pointer;
  font-family: var(--font-inter), sans-serif; font-size: 12.5px; color: #2A2A2A;
  padding: 8px 2px;
}
.bk-toc-item:hover { color: #B5432F; }

.bk-page.bk-backcover { background: #0F2A44; display: flex; align-items: center; justify-content: center; }
.bk-back-inner { text-align: center; color: #F4EFE6; padding: 0 48px; }
.bk-back-mark { font-family: var(--font-source-serif), Georgia, serif; font-size: 40px; font-weight: 700; letter-spacing: 0.06em; }
.bk-back-name { font-family: var(--font-inter), sans-serif; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: rgba(244,239,230,0.75); margin-top: 4px; }
.bk-back-rule { width: 44px; height: 3px; background: #E89A7A; margin: 22px auto; }
.bk-back-tag { font-family: var(--font-inter), sans-serif; font-size: 12.5px; line-height: 1.7; color: rgba(244,239,230,0.85); }
.bk-back-url { font-family: var(--font-inter), sans-serif; font-size: 12px; color: #E89A7A; margin-top: 18px; letter-spacing: 0.04em; }

.bk-folio {
  position: absolute; bottom: 20px; left: 0; right: 0; text-align: center;
  font-family: var(--font-inter), sans-serif; font-size: 10px; color: #8A8A8A;
}
.bk-runhead {
  position: absolute; top: 18px; left: 0; right: 0; text-align: center;
  font-family: var(--font-inter), sans-serif; font-size: 8.5px; letter-spacing: 0.22em; color: #A9A9A9;
}

.bk-controls { display: flex; align-items: center; justify-content: center; gap: 22px; margin-top: 18px; }
.bk-nav {
  background: #0F2A44; color: #F4EFE6; border: none; cursor: pointer;
  font-family: var(--font-inter), sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase; padding: 10px 18px; border-radius: 3px;
}
.bk-count { font-family: var(--font-inter), sans-serif; font-size: 12px; color: #6B6B6B; }
.bk-hint { text-align: center; font-family: var(--font-inter), sans-serif; font-size: 11px; color: #9A9A9A; margin-top: 10px; }
`;

export default function BookPage() {
  const bodyHtml = getBookHtml();
  const frontMatter = getBookFrontMatter();

  return (
    <main style={{ background: "#EAE3D6", minHeight: "100vh", paddingBottom: "40px" }}>
      <style dangerouslySetInnerHTML={{ __html: BOOK_CSS }} />
      <div style={{ textAlign: "center", padding: "28px 16px 0" }}>
        <p style={{
          fontFamily: "var(--font-inter),sans-serif", fontSize: "10px", fontWeight: 700,
          letterSpacing: "0.24em", textTransform: "uppercase", color: "#B5432F", margin: "0 0 6px",
        }}>
          Your Free Guide from the Retirement Education Network
        </p>
        <h1 style={{
          fontFamily: "var(--font-source-serif),Georgia,serif", fontWeight: 700,
          fontSize: "1.6rem", color: "#0F2A44", margin: 0,
        }}>
          Roth Conversion Do&apos;s &amp; Don&apos;ts
        </h1>
      </div>
      <BookFlipbook bodyHtml={bodyHtml} frontMatter={frontMatter} toc={BOOK_TOC} />
      <p style={{
        textAlign: "center", maxWidth: "560px", margin: "6px auto 0", padding: "0 16px",
        fontFamily: "var(--font-inter),sans-serif", fontSize: "11px", lineHeight: 1.6, color: "#6B6B6B",
      }}>
        Educational purposes only. Not tax, financial, or legal advice. Talk to a qualified
        professional about your situation before making any decisions.
      </p>
    </main>
  );
}
