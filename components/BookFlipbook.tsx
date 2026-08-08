"use client";

import { useEffect, useRef, useState } from "react";

const PAGE_W = 460;
const PAGE_H = 660;
const BAR_H = 44; // top and bottom bars

type TocEntry = { label: string; id: string };

export default function BookFlipbook({
  bodyHtml,
  frontMatter,
  toc,
  title = "Roth Conversion Do's & Don'ts",
  coverSrc = "/images/book-cover.png",
  coverSubtitle,
}: {
  bodyHtml: string;
  frontMatter: string[];
  toc: TocEntry[];
  /** Shown in the toolbar. Defaults to the Roth guide. */
  title?: string;
  /** Cover art. Pass null to render a typeset cover from title + coverSubtitle. */
  coverSrc?: string | null;
  coverSubtitle?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<any>(null);
  const idPageMapRef = useRef<Record<string, number>>({});
  const [pageInfo, setPageInfo] = useState({ current: 0, total: 0 });
  const [scale, setScale] = useState(1);
  const [portrait, setPortrait] = useState(false);
  const portraitRef = useRef(false);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      rootRef.current?.requestFullscreen?.().catch(() => {});
    }
  };

  useEffect(() => {
    let disposed = false;

    async function build() {
      const { PageFlip } = await import("page-flip");
      if (disposed || !bookRef.current) return;

      const pages: HTMLElement[] = [];
      const idPageMap: Record<string, number> = {};

      const mkPage = (cls = "") => {
        const p = document.createElement("div");
        p.className = `bk-page ${cls}`;
        p.setAttribute("data-density", "soft");
        return p;
      };

      // ---- Cover ----
      const cover = mkPage("bk-cover");
      cover.setAttribute("data-density", "hard");
      cover.innerHTML = coverSrc
        ? `<img src="${coverSrc}" alt="${title}" />`
        : `<div class="bk-cover-set">` +
          `<span class="bk-cover-mark">Retirement Education Network</span>` +
          `<span class="bk-cover-title">${title}</span>` +
          (coverSubtitle ? `<span class="bk-cover-sub">${coverSubtitle}</span>` : "") +
          `</div>`;
      pages.push(cover);

      // ---- Copyright page ----
      const copyright = mkPage("bk-copyright");
      copyright.innerHTML = frontMatter.map((p) => `<p>${p}</p>`).join("");
      pages.push(copyright);

      // ---- Content pagination ----
      const source = document.createElement("div");
      source.innerHTML = bodyHtml;
      source.querySelectorAll("p").forEach((p) => {
        if (!p.textContent?.trim() && !p.querySelector("img,svg")) p.remove();
      });
      const blocks = Array.from(source.children) as HTMLElement[];

      const sizer = document.createElement("div");
      sizer.className = "bk-page bk-text bk-sizer";
      sizer.style.cssText = `position:absolute;left:-9999px;top:0;width:${PAGE_W}px;height:auto;min-height:0;visibility:hidden;`;
      const sizerInner = document.createElement("div");
      sizerInner.className = "bk-flow";
      sizer.appendChild(sizerInner);
      document.body.appendChild(sizer);
      const LIMIT = PAGE_H - 96;

      let current: HTMLElement | null = null;
      let currentFlow: HTMLElement | null = null;

      const openTextPage = () => {
        current = mkPage("bk-text");
        const flow = document.createElement("div");
        flow.className = "bk-flow";
        current.appendChild(flow);
        currentFlow = flow;
        sizerInner.innerHTML = "";
        pages.push(current);
      };
      // Returns true when the orphan-heading rescue opened a fresh page that is
      // now current (the caller must NOT open another one).
      const closeTextPage = (): boolean => {
        // never keep a page that ended up with nothing on it
        if (currentFlow && currentFlow.children.length === 0 && current === pages[pages.length - 1]) {
          pages.pop();
          current = null;
          currentFlow = null;
          return false;
        }
        // orphan heading rescue: never end a page on a heading
        if (currentFlow && currentFlow.lastElementChild && /^H[23]$/.test(currentFlow.lastElementChild.tagName)) {
          const h = currentFlow.lastElementChild;
          currentFlow.removeChild(h);
          openTextPage();
          currentFlow!.appendChild(h);
          sizerInner.appendChild(h.cloneNode(true));
          return true;
        }
        current = null;
        currentFlow = null;
        return false;
      };

      const tocPage = mkPage("bk-toc");
      tocPage.innerHTML =
        `<div class="bk-toc-head">Contents</div>` +
        toc.map((t) => `<button class="bk-toc-item" data-target="${t.id}">${t.label}</button>`).join("");
      pages.push(tocPage);

      for (const block of blocks) {
        if (block.classList.contains("bk-chapter-open")) {
          if (current) closeTextPage();
          const ch = mkPage("bk-chapter");
          ch.appendChild(block);
          pages.push(ch);
          idPageMap[block.id] = pages.length - 1;
          continue;
        }
        if (block.classList.contains("bk-section-open")) {
          if (current) closeTextPage();
          openTextPage();
          idPageMap[block.id] = pages.length - 1;
          currentFlow!.appendChild(block);
          sizerInner.appendChild(block.cloneNode(true));
          continue;
        }
        if (!current) openTextPage();

        const probe = block.cloneNode(true) as HTMLElement;
        sizerInner.appendChild(probe);
        if (sizerInner.offsetHeight > LIMIT && currentFlow!.children.length > 0) {
          sizerInner.removeChild(probe);
          const rescued = closeTextPage();
          if (!rescued) openTextPage();
          sizerInner.appendChild(block.cloneNode(true));
        }
        currentFlow!.appendChild(block);
      }
      if (current) closeTextPage();

      const back = mkPage("bk-backcover");
      back.setAttribute("data-density", "hard");
      back.innerHTML = `<div class="bk-back-inner"><div class="bk-back-mark">REN</div><div class="bk-back-name">Retirement Education Network</div><div class="bk-back-rule"></div><div class="bk-back-tag">Plain-language retirement education for Americans 59 and older.</div><div class="bk-back-url">retirementeducationnetwork.com</div></div>`;
      pages.push(back);

      document.body.removeChild(sizer);
      idPageMapRef.current = idPageMap;

      pages.forEach((p, i) => {
        if (p.classList.contains("bk-text") || p.classList.contains("bk-toc")) {
          const folio = document.createElement("div");
          folio.className = "bk-folio";
          folio.textContent = String(i);
          p.appendChild(folio);
          const head = document.createElement("div");
          head.className = "bk-runhead";
          head.textContent = title.toUpperCase();
          p.appendChild(head);
        }
      });

      const isPortrait = window.innerWidth < 760;
      portraitRef.current = isPortrait;
      setPortrait(isPortrait);

      const flip = new PageFlip(bookRef.current, {
        width: PAGE_W,
        height: PAGE_H,
        size: "fixed" as any,
        usePortrait: isPortrait,
        showCover: true,
        maxShadowOpacity: 0.35,
        mobileScrollSupport: false,
        flippingTime: 700,
      });
      flip.loadFromHTML(pages as any);
      flipRef.current = flip;
      (window as any).__bookFlip = flip;
      setPageInfo({ current: 0, total: flip.getPageCount() });
      flip.on("flip", (e: any) => setPageInfo((s) => ({ ...s, current: e.data })));

      tocPage.querySelectorAll(".bk-toc-item").forEach((btn) => {
        btn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          const target = (ev.currentTarget as HTMLElement).getAttribute("data-target")!;
          const pg = idPageMapRef.current[target];
          if (pg != null) flip.flip(pg);
        });
      });

      const onKey = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") flip.flipNext();
        if (e.key === "ArrowLeft") flip.flipPrev();
      };
      window.addEventListener("keydown", onKey);

      // Fill the viewport, Paperturn style: scale the fixed-size book so it
      // consumes all available height between the slim bars.
      const fit = () => {
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const availH = vh - BAR_H * 2 - 12;
        const availW = vw - (portraitRef.current ? 16 : 96); // room for side arrows
        const needW = (portraitRef.current ? 1 : 2) * PAGE_W;
        setScale(Math.min(availH / PAGE_H, availW / needW, 1.8));
      };
      fit();
      window.addEventListener("resize", fit);
      document.addEventListener("fullscreenchange", fit);

      return () => {
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("resize", fit);
        document.removeEventListener("fullscreenchange", fit);
      };
    }

    const cleanup = build();
    return () => {
      disposed = true;
      cleanup.then((fn) => fn && fn());
      try {
        flipRef.current?.destroy();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="bkv-root">
      <div className="bkv-bar bkv-top">
        <div className="bkv-brand">
          <span className="bkv-brand-mark">REN</span>
          <span className="bkv-brand-title">{title}</span>
        </div>
        <button className="bkv-tool" onClick={toggleFullscreen}>
          <span aria-hidden="true">&#x26F6;</span> Full screen
        </button>
      </div>

      <div className="bkv-stage">
        <button className="bkv-arrow bkv-arrow-left" onClick={() => flipRef.current?.flipPrev()} aria-label="Previous page">
          &#8249;
        </button>
        <div
          className="bkv-scaler"
          style={{
            transform: `scale(${scale})`,
            width: `${(portrait ? 1 : 2) * PAGE_W}px`,
            height: `${PAGE_H}px`,
          }}
        >
          <div ref={bookRef} className="bk-book" />
        </div>
        <button className="bkv-arrow bkv-arrow-right" onClick={() => flipRef.current?.flipNext()} aria-label="Next page">
          &#8250;
        </button>
      </div>

      <div className="bkv-bar bkv-bottom">
        <span className="bkv-legal">Educational purposes only. Not tax, financial, or legal advice.</span>
        <span className="bkv-pager">
          {pageInfo.current + 1} / {pageInfo.total}
        </span>
        <span className="bkv-legal bkv-legal-right">retirementeducationnetwork.com</span>
      </div>
    </div>
  );
}
