import type { Metadata } from "next";
import { getBookHtml, getBookFrontMatter, BOOK_TOC } from "@/lib/book";
import BookFlipbook from "@/components/BookFlipbook";
import { BOOK_CSS } from "@/lib/book-css";

export const metadata: Metadata = {
  title: "Roth Conversion Do's & Don'ts | Retirement Education Network",
  description:
    "Five mistakes that can cost retirees six figures, and the simple checks that catch every one of them. A free guide from the Retirement Education Network.",
  robots: { index: false, follow: false },
};


export default function BookPage() {
  const bodyHtml = getBookHtml();
  const frontMatter = getBookFrontMatter();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BOOK_CSS }} />
      <BookFlipbook
        bodyHtml={bodyHtml}
        frontMatter={frontMatter}
        toc={BOOK_TOC}
        pdfHref="/downloads/roth-conversion-dos-and-donts.pdf"
        pdfFileName="Roth Conversion Dos and Donts - Retirement Education Network.pdf"
      />
    </>
  );
}
