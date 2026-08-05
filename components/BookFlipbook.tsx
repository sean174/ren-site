"use client";

import { useEffect, useRef, useState } from "react";

const PAGE_W = 460;
const PAGE_H = 660;

type TocEntry = { label: string; id: string };

export default function BookFlipbook({
  bodyHtml,
  frontMatter,
  toc,
}: {
  bodyHtml: string;
  frontMatter: string[];
  toc: TocEntry[];
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<any>(null);
  const idPageMapRef = useRef<Record<string, number>>({});
  const [pageInfo, setPageInfo] = useState({ current: 0, total: 0 });
  const [scale, setScale] = useState(1);
  const [portrait, setPortrait] = useState(false);

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
      cover.innerHTML = `<img src="/images/book-cover.png" alt="Roth Conversion Do's and Don'ts" />`;
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

      // Hidden sizer with real page typography for measurement
      const sizer = document.createElement("div");
      sizer.className = "bk-page bk-text bk-sizer";
      sizer.style.cssText = `position:absolute;left:-9999px;top:0;width:${PAGE_W}px;height:auto;min-height:0;visibility:hidden;`;
      const sizerInner = document.createElement("div");
      sizerInner.className = "bk-flow";
      sizer.appendChild(sizerInner);
      document.body.appendChild(sizer);
      const LIMIT = PAGE_H - 96; // padding + folio line

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

      // TOC page placeholder inserted after copyright; links resolved later.
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

      // ---- Back cover ----
      const back = mkPage("bk-backcover");
      back.setAttribute("data-density", "hard");
      back.innerHTML = `<div class="bk-back-inner"><div class="bk-back-mark">REN</div><div class="bk-back-name">Retirement Education Network</div><div class="bk-back-rule"></div><div class="bk-back-tag">Plain-language retirement education for Americans 59 and older.</div><div class="bk-back-url">retirementeducationnetwork.com</div></div>`;
      pages.push(back);

      document.body.removeChild(sizer);
      idPageMapRef.current = idPageMap;

      // folios
      pages.forEach((p, i) => {
        if (p.classList.contains("bk-text") || p.classList.contains("bk-toc")) {
          const folio = document.createElement("div");
          folio.className = "bk-folio";
          folio.textContent = String(i);
          p.appendChild(folio);
          const head = document.createElement("div");
          head.className = "bk-runhead";
          head.textContent = "ROTH CONVERSION DO'S & DON'TS";
          p.appendChild(head);
        }
      });

      const isPortrait = window.innerWidth < 1020;
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

      // TOC clicks
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

      const fit = () => {
        const stage = stageRef.current;
        if (!stage) return;
        const needW = (isPortrait ? 1 : 2) * PAGE_W;
        const avail = stage.clientWidth - 8;
        setScale(Math.min(1, avail / needW));
      };
      fit();
      window.addEventListener("resize", fit);

      return () => {
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("resize", fit);
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
    <div ref={stageRef} className="bk-stage">
      <div
        className="bk-scaler"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          height: `${PAGE_H * scale + 8}px`,
        }}
      >
        <div ref={bookRef} className="bk-book" />
      </div>
      <div className="bk-controls">
        <button className="bk-nav" onClick={() => flipRef.current?.flipPrev()} aria-label="Previous page">
          &#8592; Previous
        </button>
        <span className="bk-count">
          Page {pageInfo.current + 1} of {pageInfo.total}
        </span>
        <button className="bk-nav" onClick={() => flipRef.current?.flipNext()} aria-label="Next page">
          Next &#8594;
        </button>
      </div>
      <p className="bk-hint">Click or drag a page corner to turn it, use the arrow keys, or tap the buttons.</p>
    </div>
  );
}
