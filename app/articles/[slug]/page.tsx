import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export async function generateStaticParams() {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  return files.map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return (
      <section className="flex-1 flex flex-col items-center justify-center bg-paper px-6 py-32 text-center gap-6">
        <h1 className="text-navy text-3xl font-bold" style={{ fontFamily: "var(--font-source-serif)" }}>
          Article not found
        </h1>
        <a href="/" className="border border-navy text-navy text-sm px-6 py-3 hover:bg-navy hover:text-ivory transition-colors">
          ← Back to home
        </a>
      </section>
    );
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Simple markdown → HTML conversion (headings, bold, blockquote, paragraphs, lists, hr, tables)
  function mdToHtml(md: string): string {
    const lines = md.split("\n");
    const out: string[] = [];
    let inList = false;
    let inTable = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // HR
      if (/^---+$/.test(line.trim())) {
        if (inList) { out.push("</ul>"); inList = false; }
        if (inTable) { out.push("</tbody></table>"); inTable = false; }
        out.push('<hr class="border-navy/20 my-8" />');
        continue;
      }

      // Table header
      if (line.startsWith("|") && lines[i + 1]?.match(/^\|[-| ]+\|$/)) {
        if (inList) { out.push("</ul>"); inList = false; }
        const headers = line.split("|").slice(1, -1).map((h) => h.trim());
        out.push('<div class="overflow-x-auto my-8"><table class="w-full text-left border-collapse">');
        out.push("<thead><tr>" + headers.map((h) => `<th class="border border-navy/20 px-4 py-2 bg-ivory text-navy font-semibold text-sm">${h}</th>`).join("") + "</tr></thead><tbody>");
        inTable = true;
        i++; // skip separator line
        continue;
      }

      // Table row
      if (inTable && line.startsWith("|")) {
        const cells = line.split("|").slice(1, -1).map((c) => c.trim());
        out.push("<tr>" + cells.map((c) => `<td class="border border-navy/20 px-4 py-2 text-sm">${inlineFormat(c)}</td>`).join("") + "</tr>");
        continue;
      } else if (inTable) {
        out.push("</tbody></table></div>");
        inTable = false;
      }

      // Headings
      if (line.startsWith("### ")) {
        if (inList) { out.push("</ul>"); inList = false; }
        out.push(`<h3 class="text-navy font-semibold mt-8 mb-3" style="font-family:var(--font-source-serif);font-size:1.2rem">${inlineFormat(line.slice(4))}</h3>`);
        continue;
      }
      if (line.startsWith("## ")) {
        if (inList) { out.push("</ul>"); inList = false; }
        out.push(`<h2 class="text-navy font-bold mt-10 mb-4" style="font-family:var(--font-source-serif);font-size:1.4rem">${inlineFormat(line.slice(3))}</h2>`);
        continue;
      }

      // Blockquote
      if (line.startsWith("> ")) {
        if (inList) { out.push("</ul>"); inList = false; }
        out.push(`<blockquote class="border-l-4 border-navy/30 pl-4 my-6 text-charcoal/70 italic text-sm">${inlineFormat(line.slice(2))}</blockquote>`);
        continue;
      }

      // List item
      if (line.startsWith("- ")) {
        if (!inList) { out.push('<ul class="list-disc pl-6 my-4 space-y-2">'); inList = true; }
        out.push(`<li class="leading-relaxed">${inlineFormat(line.slice(2))}</li>`);
        continue;
      }

      // Close list if needed
      if (inList && line.trim() === "") {
        out.push("</ul>");
        inList = false;
      }

      // Empty line → paragraph break
      if (line.trim() === "") {
        continue;
      }

      // Regular paragraph
      if (!inList) {
        out.push(`<p class="leading-relaxed mb-5" style="font-size:1.1rem;line-height:1.85">${inlineFormat(line)}</p>`);
      }
    }

    if (inList) out.push("</ul>");
    if (inTable) out.push("</tbody></table></div>");
    return out.join("\n");
  }

  function inlineFormat(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, '<code class="bg-ivory px-1 rounded text-sm font-mono">$1</code>');
  }

  const htmlContent = mdToHtml(content);
  const dateFormatted = data.date
    ? new Date(data.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

  const categoryLabel: Record<string, string> = {
    "safe-money": "Safe Money",
    "long-term-care": "Long-Term Care",
    "medicare": "Medicare",
    "social-security": "Social Security",
    "wills-and-trusts": "Wills & Trusts",
    "tax-planning": "Tax Planning",
  };

  return (
    <article className="bg-paper">
      {/* Article header */}
      <header className="bg-ivory px-6 py-16 border-b border-navy/10">
        <div className="max-w-2xl mx-auto">
          {data.category && (
            <a
              href={`/${data.category}`}
              className="inline-block text-xs font-semibold tracking-widest uppercase text-navy/60 mb-4 hover:text-navy transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              ← {categoryLabel[data.category] ?? data.category}
            </a>
          )}
          <h1
            className="text-navy font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-source-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            {data.title}
          </h1>
          {dateFormatted && (
            <p className="text-charcoal/50 text-sm">{dateFormatted}</p>
          )}
        </div>
      </header>

      {/* Article hero image — slug-specific first, category fallback */}
      {data.category && (() => {
        const fs2 = require("fs");
        const slugImg = `/images/articles/${slug}.jpg`;
        const slugImgPath = require("path").join(process.cwd(), "public", slugImg);
        const imgSrc = fs2.existsSync(slugImgPath)
          ? slugImg
          : `/images/${data.category}.jpg`;

        // Pull photographer credit from image-log.json if available
        let creditName = "";
        let creditUrl = "https://unsplash.com";
        try {
          const logPath = "/home/sean/ren/content/image-log.json";
          if (fs2.existsSync(logPath)) {
            const log = JSON.parse(fs2.readFileSync(logPath, "utf-8"));
            const entry = (log.images || []).find(
              (e: { used_for?: string; photographer?: string; photo_url?: string }) =>
                e.used_for === `article:${slug}`
            );
            if (entry) {
              creditName = entry.photographer || "";
              creditUrl = entry.photo_url || (entry.source === "pexels" ? "https://www.pexels.com" : "https://unsplash.com");
            }
          }
        } catch {}

        return (
          <div style={{ maxWidth: "672px", margin: "0 auto", padding: "0 24px" }}>
            <img
              src={imgSrc}
              alt={data.title}
              style={{ width: "100%", height: "300px", objectFit: "cover", display: "block", marginTop: "32px" }}
            />
            <p style={{ fontSize: "11px", color: "#6B6B6B", marginTop: "6px", fontFamily: "var(--font-inter)" }}>
              {creditName
                ? <>Photo: <a href={creditUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#6B6B6B" }}>{creditName} / Unsplash</a></>
                : <>Photo via <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" style={{ color: "#6B6B6B" }}>Unsplash</a></>
              }
            </p>
          </div>
        );
      })()}

      {/* Article body */}
      <div className="px-6 py-14">
        <div
          className="max-w-2xl mx-auto text-charcoal"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>

      {/* Disclaimer */}
      <footer className="px-6 py-8 border-t border-navy/10 bg-ivory">
        <p className="text-center text-charcoal/50 text-sm max-w-2xl mx-auto leading-relaxed">
          Educational purposes only. Not financial, tax, or legal advice. Please consult a qualified professional before making any financial decisions.
        </p>
      </footer>
    </article>
  );
}
