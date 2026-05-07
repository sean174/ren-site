import Link from "next/link";

const NAV_LINKS = [
  { label: "Safe Money",        href: "/safe-money" },
  { label: "Medicare",          href: "/medicare" },
  { label: "Social Security",   href: "/social-security" },
  { label: "More",              href: "#more" },
];

export default function Nav() {
  return (
    <header className="bg-navy text-ivory">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* REN mark — scaled down for nav */}
          <span className="w-8 h-8 text-ivory">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
              <circle cx="50" cy="50" r="46"/>
              <line x1="14" y1="58" x2="86" y2="58" strokeLinecap="square"/>
              <path d="M22 58 A28 28 0 0 1 78 58"/>
              <path d="M32 58 A18 18 0 0 1 68 58"/>
            </svg>
          </span>
          <span
            className="font-serif text-lg tracking-tight leading-none"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Retirement Education Network
          </span>
        </Link>

        {/* Category links */}
        <nav aria-label="Main navigation">
          <ul className="hidden md:flex items-center gap-8 text-sm font-sans">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-ivory/80 hover:text-ivory transition-colors duration-150 tracking-wide"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </header>
  );
}
