import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

const CATEGORY_LABELS: Record<string, string> = {
  "safe-money": "Safe Money",
  "long-term-care": "Long-Term Care",
  "medicare": "Medicare",
  "social-security": "Social Security",
  "wills-and-trusts": "Wills & Trusts",
  "tax-planning": "Tax Planning",
};

type Props = {
  params: Promise<{ category: string }>;
};

function getArticlesForCategory(category: string) {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  const articles = files
    .map((f) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, f), "utf-8");
      const { data } = matter(raw);
      return { slug: f.replace(/\.md$/, ""), ...data };
    })
    .filter((a: any) => a.category === category)
    .sort((a: any, b: any) => (b.date ?? "").localeCompare(a.date ?? ""));
  return articles;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const title = CATEGORY_LABELS[category] ?? category
    .split("-")
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const articles = getArticlesForCategory(category);

  return (
    <section className="flex-1 bg-paper px-6 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <a
            href="/"
            className="text-xs font-semibold tracking-widest uppercase text-navy/60 hover:text-navy transition-colors mb-4 inline-block"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            ← All Topics
          </a>
          <h1
            className="text-navy font-bold leading-tight"
            style={{ fontFamily: "var(--font-source-serif)", fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            {title}
          </h1>
        </div>

        {/* Articles */}
        {articles.length > 0 ? (
          <div className="space-y-8">
            {articles.map((article: any) => (
              <a
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="block bg-ivory border border-navy/15 p-8 hover:border-navy transition-colors duration-150 group"
              >
                <h2
                  className="text-navy font-semibold mb-3 group-hover:underline"
                  style={{ fontFamily: "var(--font-source-serif)", fontSize: "1.25rem" }}
                >
                  {article.title}
                </h2>
                {article.excerpt && (
                  <p className="text-charcoal leading-relaxed mb-4" style={{ fontSize: "1rem", lineHeight: "1.75" }}>
                    {article.excerpt}
                  </p>
                )}
                <span className="text-navy text-sm font-semibold">Read article →</span>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-charcoal/60 text-lg">
              In-depth guides on <strong>{title}</strong> are coming soon.
            </p>
            <a
              href="/"
              className="mt-6 inline-block border border-navy text-navy text-sm px-6 py-3 hover:bg-navy hover:text-ivory transition-colors duration-150"
            >
              ← Back to home
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
