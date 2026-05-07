export default function Footer() {
  return (
    <footer className="bg-navy text-ivory/70">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

        {/* Brand block */}
        <div className="flex flex-col gap-2">
          <span
            className="text-ivory font-serif text-base tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Retirement Education Network
          </span>
          <span className="text-xs">© 2025 Retirement Education Network LLC. All rights reserved.</span>
        </div>

        {/* Disclaimer */}
        <p className="text-xs leading-relaxed max-w-xl">
          This content is for educational purposes only and does not constitute
          financial, tax, or legal advice. Please consult a qualified professional
          before making any financial decisions.
        </p>

      </div>
    </footer>
  );
}
