const CATEGORIES = [
  { title: "Safe Money",      slug: "safe-money" },
  { title: "Long-Term Care",  slug: "long-term-care" },
  { title: "Medicare",        slug: "medicare" },
  { title: "Social Security", slug: "social-security" },
  { title: "Trusts & Wills",  slug: "trusts-and-wills" },
  { title: "Tax Planning",    slug: "tax-planning" },
];

const DISCLAIMER =
  "This content is for educational purposes only and does not constitute financial, tax, or legal advice. " +
  "Please consult a qualified professional before making any financial decisions. " +
  "© 2025 Retirement Education Network LLC";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-ivory px-6 py-20 flex flex-col items-center text-center gap-6">
        {/* REN mark */}
        <div className="w-20 h-20 text-navy">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            aria-label="Retirement Education Network mark"
            role="img"
          >
            <circle cx="50" cy="50" r="46"/>
            <line x1="14" y1="58" x2="86" y2="58" strokeLinecap="square"/>
            <path d="M22 58 A28 28 0 0 1 78 58"/>
            <path d="M32 58 A18 18 0 0 1 68 58"/>
          </svg>
        </div>

        {/* Headline */}
        <h1
          className="text-navy text-4xl md:text-5xl font-bold leading-tight max-w-2xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Smarter retirement starts here.
        </h1>

        {/* Subheadline */}
        <p className="text-charcoal text-lg md:text-xl max-w-xl leading-relaxed">
          Clear, unbiased education on the decisions that shape your retirement —
          Medicare, Social Security, taxes, and beyond.
        </p>
      </section>

      {/* ── Category Grid ──────────────────────────────────────────────── */}
      <section className="bg-paper px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-charcoal text-2xl font-semibold mb-10"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Explore Topics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map(({ title, slug }) => (
              <a
                key={slug}
                href={`/${slug}`}
                className="bg-navy text-ivory rounded-sm px-7 py-10 flex flex-col justify-between min-h-40 hover:bg-navy/90 transition-colors duration-150 group"
              >
                <span
                  className="text-xl font-semibold leading-snug"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {title}
                </span>
                <span className="text-ivory/50 text-sm mt-4 group-hover:text-ivory/70 transition-colors">
                  Coming soon →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disclaimer Bar ─────────────────────────────────────────────── */}
      <section className="bg-charcoal text-ivory/60 px-6 py-5">
        <p className="max-w-6xl mx-auto text-xs leading-relaxed">
          {DISCLAIMER}
        </p>
      </section>
    </>
  );
}
