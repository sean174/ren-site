// Shared flipbook stylesheet. Extracted from the Roth route so a second book can
// use the identical presentation without a duplicate copy drifting out of sync.
export const BOOK_CSS = `
html, body { height: 100%; overflow: hidden; }

.bkv-root {
  position: fixed; inset: 0;
  background: #0B1E33;
  display: flex; flex-direction: column;
  overflow: hidden;
}
.bkv-bar {
  height: 44px; flex: 0 0 44px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 16px;
  background: rgba(7,18,31,0.92);
  color: rgba(244,239,230,0.85);
  font-family: var(--font-inter), sans-serif;
  z-index: 30;
}
.bkv-brand { display: flex; align-items: baseline; gap: 12px; min-width: 0; }
.bkv-brand-mark {
  font-family: var(--font-source-serif), Georgia, serif;
  font-weight: 700; font-size: 17px; color: #F4EFE6; letter-spacing: 0.04em;
}
.bkv-brand-title {
  font-size: 12px; color: rgba(244,239,230,0.65);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.bkv-tools { display: flex; align-items: center; gap: 8px; flex: 0 0 auto; }
.bkv-tool {
  background: none; border: 1px solid rgba(244,239,230,0.3); color: rgba(244,239,230,0.85);
  font-family: var(--font-inter), sans-serif; font-size: 11.5px; line-height: 1;
  padding: 6px 12px; border-radius: 3px; cursor: pointer; white-space: nowrap;
  text-decoration: none; display: inline-flex; align-items: center; gap: 5px;
}
.bkv-tool:hover { border-color: #E89A7A; color: #E89A7A; }

.bkv-stage {
  flex: 1 1 auto; position: relative;
  display: flex; align-items: center; justify-content: center;
  min-height: 0;
}
.bkv-scaler { flex: 0 0 auto; transform-origin: center center; }
.bk-book { margin: 0 auto; }

.bkv-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  z-index: 20;
  width: 40px; height: 84px;
  background: rgba(244,239,230,0.12);
  border: none; color: #F4EFE6;
  font-size: 30px; line-height: 1; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  border-radius: 4px;
  transition: background 0.15s;
}
.bkv-arrow:hover { background: rgba(232,154,122,0.45); }
.bkv-arrow-left { left: 8px; }
.bkv-arrow-right { right: 8px; }

.bkv-pager { font-size: 12px; color: rgba(244,239,230,0.85); letter-spacing: 0.06em; }
.bkv-legal { font-size: 10px; color: rgba(244,239,230,0.4); flex: 1 1 0; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.bkv-legal-right { text-align: right; }
@media (max-width: 640px) { .bkv-legal-right { display: none; } .bkv-legal { font-size: 9px; } }

.bk-page {
  background: #FEFCF7;
  color: #2A2A2A;
  overflow: hidden;
  border: 1px solid rgba(15,42,68,0.12);
}
.bk-page.bk-text, .bk-page.bk-toc, .bk-page.bk-copyright { padding: 44px 40px 52px; }
.bk-flow { font-family: var(--font-inter), sans-serif; font-size: 16px; line-height: 1.6; }
.bk-flow p { margin: 0 0 11px; }
.bk-flow h2 {
  font-family: var(--font-source-serif), Georgia, serif;
  font-size: 23px; font-weight: 700; color: #0F2A44;
  margin: 18px 0 10px; line-height: 1.25;
}
.bk-flow h3 {
  font-family: var(--font-inter), sans-serif;
  font-size: 15.5px; font-weight: 700; color: #0F2A44;
  margin: 14px 0 6px;
}
.bk-flow ul { margin: 0 0 11px; padding-left: 20px; }
.bk-flow li { margin-bottom: 6px; }
.bk-flow strong { color: #0F2A44; }
.bk-flow table {
  width: 100%; border-collapse: collapse; font-size: 13px; margin: 12px 0;
}
.bk-flow th {
  font-family: var(--font-inter), sans-serif; text-align: left;
  background: #0F2A44; color: #F4EFE6; padding: 6px 7px; font-weight: 600;
}
.bk-flow td { padding: 6px 7px; border-bottom: 1px solid rgba(15,42,68,0.15); }
.bk-flow tr:last-child td { font-weight: 700; }

.bk-section-open {
  font-family: var(--font-source-serif), Georgia, serif;
  font-size: 27px; font-weight: 700; color: #0F2A44;
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
  font-size: 21px; line-height: 1.4; font-weight: 600; color: #B5432F;
}
.bk-box {
  background: #F4EFE6; border: 1px solid rgba(15,42,68,0.18);
  border-top: 3px solid #0F2A44; padding: 14px 16px; margin: 14px 0;
  font-size: 15px; line-height: 1.6;
}
.bk-chart { margin: 14px 0; }
sup { font-size: 0.62em; line-height: 0; vertical-align: super; color: #B5432F; font-weight: 700; padding-left: 1px; }
.bk-chart-title {
  font-family: var(--font-inter), sans-serif; font-size: 12.5px; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase; color: #0F2A44;
  border-bottom: 2px solid #0F2A44; padding-bottom: 5px; margin-bottom: 10px;
}
.bk-chart-note { font-size: 12px; color: #6B6B6B; margin-top: 6px; }

.bk-page.bk-cover { padding: 0; background: #0F2A44; }
.bk-cover img { width: 100%; height: 100%; object-fit: contain; display: block; }
.bk-copyright { display: flex; flex-direction: column; justify-content: flex-end; }
.bk-copyright p { font-family: var(--font-inter), sans-serif; font-size: 12px; line-height: 1.65; color: #55606B; margin: 0 0 9px; }

.bk-toc-head {
  font-family: var(--font-source-serif), Georgia, serif; font-size: 24px; font-weight: 700;
  color: #0F2A44; border-top: 4px solid #B5432F; padding-top: 12px; margin-bottom: 12px;
}
.bk-toc-item {
  display: block; width: 100%; text-align: left; background: none; border: none;
  border-bottom: 1px solid rgba(15,42,68,0.14); cursor: pointer;
  font-family: var(--font-inter), sans-serif; font-size: 13.5px; color: #2A2A2A;
  padding: 6px 2px;
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
  font-family: var(--font-inter), sans-serif; font-size: 11px; color: #8A8A8A;
}
.bk-runhead {
  position: absolute; top: 18px; left: 0; right: 0; text-align: center;
  font-family: var(--font-inter), sans-serif; font-size: 8.5px; letter-spacing: 0.22em; color: #A9A9A9;
}

.bk-cover-set {
  height: 100%; display: flex; flex-direction: column; justify-content: center;
  padding: 0 46px; background: #16283F; color: #F4EFE6;
}
.bk-cover-mark {
  font-family: var(--font-inter), sans-serif; font-size: 8.5px; letter-spacing: 0.22em;
  text-transform: uppercase; color: rgba(244,239,230,0.6); margin-bottom: 26px;
}
.bk-cover-title {
  font-family: var(--font-source-serif), Georgia, serif; font-size: 40px; line-height: 1.06;
  letter-spacing: -0.015em; margin-bottom: 20px;
}
.bk-cover-sub {
  font-family: var(--font-source-serif), Georgia, serif; font-style: italic;
  font-size: 15px; line-height: 1.45; color: rgba(244,239,230,0.8);
}
`;
