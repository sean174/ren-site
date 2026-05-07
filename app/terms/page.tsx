export const metadata = {
  title: "Terms of Use | Retirement Education Network",
  description: "Terms and conditions for using the Retirement Education Network website.",
};

const EFFECTIVE_DATE = "May 7, 2025";
const CONTACT_EMAIL = "legal@retirementeducationnetwork.com";
const SITE_NAME = "Retirement Education Network";
const SITE_URL = "https://retirementeducationnetwork.com";

export default function TermsPage() {
  return (
    <main style={{ background: "var(--color-ivory, #F4EFE6)", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ background: "#0F2A44", color: "#F4EFE6", padding: "56px 32px 48px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,239,230,0.5)", marginBottom: "16px" }}>
          Legal
        </p>
        <h1 style={{ fontFamily: "var(--font-source-serif), Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, margin: "0 auto 16px", maxWidth: "700px" }}>
          Terms of Use
        </h1>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", color: "rgba(244,239,230,0.6)", margin: 0 }}>
          Effective Date: {EFFECTIVE_DATE} · Last Updated: {EFFECTIVE_DATE}
        </p>
      </section>

      {/* Body */}
      <article style={{ maxWidth: "780px", margin: "0 auto", padding: "56px 32px 80px" }}>
        <style>{`
          .ren-legal h2 { font-family: var(--font-source-serif), Georgia, serif; font-size: 22px; font-weight: 700; color: #0F2A44; margin: 44px 0 14px; }
          .ren-legal h3 { font-family: var(--font-source-serif), Georgia, serif; font-size: 17px; font-weight: 600; color: #0F2A44; margin: 28px 0 10px; }
          .ren-legal p, .ren-legal li { font-family: var(--font-inter), sans-serif; font-size: 15.5px; line-height: 1.8; color: #3A3A3A; margin-bottom: 14px; }
          .ren-legal ul { padding-left: 22px; margin-bottom: 14px; }
          .ren-legal li { margin-bottom: 8px; }
          .ren-legal a { color: #B5432F; }
          .ren-legal .callout { background: rgba(15,42,68,0.06); border-left: 4px solid #0F2A44; padding: 20px 24px; margin: 28px 0; border-radius: 0 4px 4px 0; }
          .ren-legal .callout p { margin: 0; }
        `}</style>

        <div className="ren-legal">

          <p>
            Please read these Terms of Use ("<strong>Terms</strong>") carefully before using{" "}
            <a href={SITE_URL}>{SITE_URL}</a> (the "<strong>Site</strong>") operated by{" "}
            {SITE_NAME} ("<strong>REN</strong>," "<strong>we</strong>," "<strong>us</strong>," or
            "<strong>our</strong>"). By accessing or using the Site, you agree to be bound by these Terms.
            If you do not agree, do not use the Site.
          </p>

          {/* 1 */}
          <h2>1. Nature of the Site — Educational Content Only</h2>

          <div className="callout">
            <p>
              <strong>Important:</strong> Nothing on this Site constitutes financial, investment, tax, legal,
              insurance, or retirement planning advice. Content is provided for general educational and
              informational purposes only. Always consult a qualified professional before making any
              financial decision.
            </p>
          </div>

          <p>
            {SITE_NAME} is an independent educational media publication. We publish articles, guides, and
            commentary about Social Security, Medicare, retirement income, estate planning, tax planning,
            and related topics. Our content is intended to help Americans understand general rules,
            concepts, and publicly available information — not to provide personalized guidance for
            individual circumstances.
          </p>
          <p>
            Specifically, REN:
          </p>
          <ul>
            <li>Does <strong>not</strong> provide personalized financial, tax, investment, or legal advice</li>
            <li>Does <strong>not</strong> recommend specific products, advisors, strategies, or services</li>
            <li>Does <strong>not</strong> hold itself out as a registered investment adviser, broker-dealer,
              insurance producer, or law firm</li>
            <li>Does <strong>not</strong> establish any professional-client relationship through use of the Site</li>
          </ul>
          <p>
            Information on this Site may become outdated. Laws, regulations, benefit amounts, and tax rules
            change frequently. Always verify information with the relevant government agency or a qualified
            professional before relying on it.
          </p>

          {/* 2 */}
          <h2>2. Eligibility</h2>
          <p>
            This Site is intended for users who are 18 years of age or older. By using the Site, you
            represent that you are at least 18 years old. We designed our content primarily for Americans
            age 59 and older, though we do not restrict access by age.
          </p>

          {/* 3 */}
          <h2>3. Intellectual Property</h2>
          <p>
            All content on this Site — including articles, text, graphics, logos, images, and the
            selection and arrangement thereof — is the property of {SITE_NAME} or its content suppliers
            and is protected by applicable copyright, trademark, and other intellectual property laws.
          </p>
          <p>You may:</p>
          <ul>
            <li>View and read content for personal, non-commercial educational use</li>
            <li>Share links to individual pages on this Site</li>
            <li>Quote brief excerpts (up to 150 words) with clear attribution and a link back to the
              original page</li>
          </ul>
          <p>You may <strong>not</strong>:</p>
          <ul>
            <li>Reproduce, republish, or redistribute full articles without written permission</li>
            <li>Scrape, crawl, or systematically download content from the Site</li>
            <li>Use our content for commercial purposes without a license</li>
            <li>Remove or obscure any copyright or attribution notices</li>
          </ul>
          <p>
            To request permission for uses beyond fair use, contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>

          {/* 4 */}
          <h2>4. Third-Party Links and Sources</h2>
          <p>
            The Site contains links to external websites, including government sources (SSA, IRS, CMS),
            news organizations, and research institutions. These links are provided for your convenience
            and reference. We do not endorse, control, or take responsibility for the content, privacy
            practices, or accuracy of third-party websites. Accessing linked sites is at your own risk.
          </p>
          <p>
            We cite primary sources to support our editorial accuracy. Cited sources are provided for
            reference only and do not constitute an endorsement by those sources of REN or our content.
          </p>

          {/* 5 */}
          <h2>5. Newsletter and Email Communications</h2>
          <p>
            By subscribing to the REN newsletter, you consent to receive periodic email communications
            containing educational retirement content. Each email will include an unsubscribe link. You
            may opt out at any time. We will not use your email address to send commercial solicitations
            from third parties.
          </p>
          <p>
            Our email communications comply with the federal CAN-SPAM Act. Each commercial email we send
            includes: our physical or electronic address, a clear identification as an advertisement where
            applicable, and a functional opt-out mechanism honored within 10 business days.
          </p>

          {/* 6 */}
          <h2>6. No Warranties</h2>
          <p>
            THE SITE AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY
            KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
            FOR A PARTICULAR PURPOSE, ACCURACY, COMPLETENESS, OR NON-INFRINGEMENT.
          </p>
          <p>
            We do not warrant that: (a) the Site will be uninterrupted or error-free; (b) content is
            current, accurate, or complete; (c) the Site is free of viruses or other harmful components.
            Government benefit amounts, tax figures, and regulatory rules change frequently — always
            verify with the relevant agency.
          </p>

          {/* 7 */}
          <h2>7. Limitation of Liability</h2>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, {SITE_NAME.toUpperCase()} AND ITS
            OWNERS, OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
            SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE
            SITE OR ITS CONTENT — INCLUDING ANY FINANCIAL DECISIONS MADE IN RELIANCE ON INFORMATION
            PUBLISHED HERE — EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p>
            OUR TOTAL LIABILITY FOR ANY CLAIM ARISING FROM YOUR USE OF THE SITE SHALL NOT EXCEED
            ONE HUNDRED U.S. DOLLARS ($100.00).
          </p>
          <p>
            Some jurisdictions do not allow limitation of certain damages; in those jurisdictions, our
            liability is limited to the maximum extent permitted by law.
          </p>

          {/* 8 */}
          <h2>8. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless {SITE_NAME} and its owners, officers,
            employees, and agents from any claims, losses, damages, liabilities, costs, and expenses
            (including reasonable attorneys' fees) arising from: (a) your use of the Site; (b) your
            violation of these Terms; or (c) your violation of any applicable law or third-party right.
          </p>

          {/* 9 */}
          <h2>9. Privacy</h2>
          <p>
            Your use of the Site is also governed by our{" "}
            <a href="/privacy">Privacy Policy</a>, which is incorporated into these Terms by reference.
            The Privacy Policy describes how we collect, use, and share information — including our use of
            the Meta Pixel and your rights as a California resident.
          </p>

          {/* 10 */}
          <h2>10. Acceptable Use</h2>
          <p>You agree not to use the Site to:</p>
          <ul>
            <li>Violate any applicable federal, state, or local law or regulation</li>
            <li>Transmit any harmful, offensive, or disruptive content</li>
            <li>Attempt to gain unauthorized access to any portion of the Site or its servers</li>
            <li>Interfere with or disrupt the operation of the Site</li>
            <li>Use automated means (bots, scrapers, crawlers) to access or collect content without
              our express written permission</li>
          </ul>

          {/* 11 */}
          <h2>11. Modifications to the Site and Terms</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue the Site at any time without notice.
            We may also update these Terms at any time. The updated Terms will be posted with a revised
            effective date. Continued use of the Site after any update constitutes your acceptance of
            the revised Terms. It is your responsibility to check these Terms periodically.
          </p>

          {/* 12 */}
          <h2>12. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of the United States
            and the State of Virginia, without regard to conflict of law principles. Any dispute arising
            under these Terms shall be resolved exclusively in the state or federal courts located in
            Virginia, and you consent to personal jurisdiction in those courts.
          </p>
          <p>
            If you are a California resident, nothing in this section limits any rights you have under
            California consumer protection law.
          </p>

          {/* 13 */}
          <h2>13. Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy, constitute the entire agreement between you
            and {SITE_NAME} with respect to your use of the Site, and supersede any prior agreements.
            If any provision of these Terms is found to be unenforceable, the remaining provisions
            remain in full force and effect.
          </p>

          {/* 14 */}
          <h2>14. Contact Us</h2>
          <p>
            Questions about these Terms may be directed to:
          </p>
          <p>
            <strong>Retirement Education Network</strong><br />
            Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>

        </div>
      </article>
    </main>
  );
}
