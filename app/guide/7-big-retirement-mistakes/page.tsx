import type { Metadata } from "next";
import { getMistakesBookHtml, getMistakesFrontMatter, MISTAKES_TOC } from "@/lib/book-mistakes";
import BookFlipbook from "@/components/BookFlipbook";
import { BOOK_CSS } from "@/lib/book-css";

export const metadata: Metadata = {
  title: "The 7 1/2 Retirement Mistakes | Retirement Education Network",
  description:
    "The quiet mistakes that can hide in the retirement you spent a lifetime building, and how to catch them in time. A free guide from the Retirement Education Network.",
  robots: { index: false, follow: false },
};

export default function MistakesBookPage() {
  const bodyHtml = getMistakesBookHtml();
  const frontMatter = getMistakesFrontMatter();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BOOK_CSS }} />
      <BookFlipbook
        bodyHtml={bodyHtml}
        frontMatter={frontMatter}
        toc={MISTAKES_TOC}
        title="The 7 1/2 Retirement Mistakes"
        coverSrc="/images/book-cover-mistakes.png"
        coverSubtitle="The quiet mistakes that can hide in the retirement you spent a lifetime building, and how to catch them in time."
        pdfHref="/downloads/7-big-retirement-mistakes.pdf"
        pdfFileName="The 7 and a Half Retirement Mistakes - Retirement Education Network.pdf"
      />
    </>
  );
}
