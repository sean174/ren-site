const CATEGORIES = [
  { title: "Safe Money",      slug: "safe-money",        desc: "Principal protection, fixed rates, and the difference between guaranteed and safe." },
  { title: "Long-Term Care",  slug: "long-term-care",    desc: "What care costs, what Medicare covers (and doesn't), and how to plan ahead." },
  { title: "Medicare",        slug: "medicare",           desc: "Parts A, B, C, and D explained. Enrollment windows, penalties, and tradeoffs." },
  { title: "Social Security", slug: "social-security",   desc: "When to claim, spousal benefits, the earnings test, and the breakeven math." },
  { title: "Trusts & Wills",  slug: "trusts-and-wills",  desc: "Probate, living trusts, pour-over wills, and beneficiary designation mistakes." },
  { title: "Tax Planning",    slug: "tax-planning",      desc: "RMDs, Roth conversions, IRMAA surcharges, and the early-retirement tax window." },
];

const DISCLAIMER =
  "This content is for educational purposes only and does not constitute financial, tax, or legal advice. " +
  "Please consult a qualified professional before making any financial decisions. " +
  "© 2025 Retirement Education Network";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-ivory px-6 py-24 flex flex-col items-center text-center gap-8">
        {/* REN mark */}
        <div className="w-16 h-16 text-navy opacity-80">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" aria-label="Retirement Education Network mark" role="img">
            <circle cx="50" cy="50" r="46"/>
            <line x1="14" y1="58" x2="86" y2="58" strokeLinecap="square"/>
            <path d="M22 58 A28 28 0 0 1 78 58"/>
            <path d="M32 58 A18 18 0 0 1 68 58"/>
          </svg>
        </div>

        <h1
          className="text-navy text-4xl md:text-5xl font-bold leading-tight max-w-3xl"
          style={{ fontFamily: "var(--font-source-serif)", fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
        >
          Smart Retirement Information for Americans 59 and Older
        </h1>

        <p className="text-charcoal text-xl leading-relaxed max-w-2xl" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)" }}>
          Clear, current, and trustworthy content on the topics that matter most in your retirement years.
        </p>
      </section>

      {/* ── Category Cards ───────────────────────────────────────────────── */}
      <section className="bg-paper px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-navy text-2xl font-bold mb-10 text-center"
            style={{ fontFamily: "var(--font-source-serif)" }}
          >
            Explore by Topic
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.slug}
                href={`/${cat.slug}`}
                className="block border border-navy/20 bg-ivory p-6 hover:border-navy transition-colors duration-150 group"
              >
                <h3
                  className="text-navy text-lg font-semibold mb-2 group-hover:underline"
                  style={{ fontFamily: "var(--font-source-serif)" }}
                >
                  {cat.title}
                </h3>
                <p className="text-charcoal text-sm leading-relaxed" style={{ fontSize: "1rem" }}>
                  {cat.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We Are ───────────────────────────────────────────────────── */}
      <section className="bg-navy px-6 py-20">
        <div className="max-w-3xl mx-auto text-ivory">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "var(--font-source-serif)", fontSize: "clamp(1.6rem, 4vw, 2.25rem)" }}
          >
            Who We Are
          </h2>

          <p className="leading-relaxed mb-5" style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", lineHeight: "1.8" }}>
            Retirement Education Network is a content company built for Americans 59 and older. We research the most current and trusted advice on the topics that matter most in retirement, then share it in plain language you can use.
          </p>
          <p className="leading-relaxed mb-10" style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", lineHeight: "1.8" }}>
            Our team tracks the latest updates on taxes, Social Security, Medicare, Roth conversions, estate planning, and market trends. We pull from credible sources and expert research to bring you content that is honest, clear, and timely.
          </p>

          <h3 className="text-xl font-semibold mb-4 text-ivory/90" style={{ fontFamily: "var(--font-source-serif)" }}>
            What we do not do
          </h3>
          <p className="leading-relaxed mb-5" style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", lineHeight: "1.8" }}>
            We do not give personal financial advice. We do not meet with readers, take appointments, or manage anyone's money. We are not advisors, accountants, or attorneys.
          </p>
          <p className="leading-relaxed mb-10" style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", lineHeight: "1.8" }}>
            What we are is a trusted source for staying informed. We bring you the information. You take it from there — ideally with a professional you trust.
          </p>

          <h3 className="text-xl font-semibold mb-4 text-ivory/90" style={{ fontFamily: "var(--font-source-serif)" }}>
            Why this matters
          </h3>
          <p className="leading-relaxed" style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", lineHeight: "1.8" }}>
            Retirement is one of the biggest financial chapters of your life, and the rules change every year. Most people get their information from headlines, sales pitches, or whoever called them last. You deserve better. Our job is to keep you current and confident in the questions you ask.
          </p>
        </div>
      </section>

      {/* ── Disclaimer ───────────────────────────────────────────────────── */}
      <section className="bg-paper px-6 py-8 border-t border-navy/10">
        <p className="text-center text-charcoal/60 text-sm max-w-3xl mx-auto leading-relaxed">
          {DISCLAIMER}
        </p>
      </section>
    </>
  );
}
