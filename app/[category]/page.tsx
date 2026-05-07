type Props = {
  params: Promise<{ category: string }>;
};

/** Format a URL slug into a readable title — e.g. "long-term-care" → "Long-Term Care" */
function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const title = slugToTitle(category);

  return (
    <section className="flex-1 flex flex-col items-center justify-center bg-paper px-6 py-32 text-center gap-6">
      <h1
        className="text-navy text-4xl md:text-5xl font-bold max-w-xl leading-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h1>
      <p className="text-charcoal text-lg max-w-md leading-relaxed">
        This section is coming soon. We're building in-depth, unbiased guides
        on <span className="font-semibold">{title}</span> — check back shortly.
      </p>
      <a
        href="/"
        className="mt-4 inline-block border border-navy text-navy text-sm px-6 py-3 hover:bg-navy hover:text-ivory transition-colors duration-150"
      >
        ← Back to home
      </a>
    </section>
  );
}
