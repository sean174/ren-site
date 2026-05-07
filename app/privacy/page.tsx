export const metadata = {
  title: "Privacy Policy | Retirement Education Network",
  description: "How Retirement Education Network collects, uses, and protects your personal information.",
};

const EFFECTIVE_DATE = "May 7, 2025";
const CONTACT_EMAIL = "privacy@retirementeducationnetwork.com";
const SITE_NAME = "Retirement Education Network";
const SITE_URL = "https://retirementeducationnetwork.com";

export default function PrivacyPage() {
  return (
    <main style={{ background: "var(--color-ivory, #F4EFE6)", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ background: "#0F2A44", color: "#F4EFE6", padding: "56px 32px 48px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,239,230,0.5)", marginBottom: "16px" }}>
          Legal
        </p>
        <h1 style={{ fontFamily: "var(--font-source-serif), Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, margin: "0 auto 16px", maxWidth: "700px" }}>
          Privacy Policy
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

          <div className="callout">
            <p>
              <strong>Plain-English Summary:</strong> We collect your email address if you sign up for our newsletter.
              We will place a Meta (Facebook) Pixel and may use analytics tools in the future, which collect
              browsing data. We do not sell your personal information. California residents have specific rights
              described below. You may opt out of tracking at any time.
            </p>
          </div>

          {/* 1 */}
          <h2>1. Who We Are</h2>
          <p>
            {SITE_NAME} ("<strong>REN</strong>," "<strong>we</strong>," "<strong>us</strong>," or
            "<strong>our</strong>") operates the website at <a href={SITE_URL}>{SITE_URL}</a> (the
            "<strong>Site</strong>"). REN is an independent educational media publication for Americans
            age 59 and older. We provide informational content about Social Security, Medicare, retirement
            income, estate planning, and related topics.
          </p>
          <p>
            For privacy inquiries, contact us at: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>

          {/* 2 */}
          <h2>2. Information We Collect</h2>

          <h3>A. Information You Provide</h3>
          <ul>
            <li>
              <strong>Email address</strong> — when you subscribe to our newsletter or email updates. We
              collect only your email address unless you voluntarily provide additional information.
            </li>
          </ul>

          <h3>B. Information Collected Automatically</h3>
          <p>
            When you visit the Site, certain information is collected automatically by our servers and
            third-party tools, including:
          </p>
          <ul>
            <li>IP address and approximate geographic location</li>
            <li>Browser type, operating system, and device type</li>
            <li>Pages viewed, time on page, and referring URL</li>
            <li>Date and time of your visit</li>
          </ul>

          <h3>C. Meta Pixel (Facebook Pixel)</h3>
          <p>
            This Site uses the <strong>Meta Pixel</strong> (also called the Facebook Pixel), a tracking
            code provided by Meta Platforms, Inc. The Meta Pixel collects data about your activity on this
            Site — including pages visited and actions taken — and transmits that data to Meta. Meta uses
            this data to:
          </p>
          <ul>
            <li>Measure the effectiveness of content shown on Facebook and Instagram</li>
            <li>Build and serve audiences for advertising purposes on Meta's platforms</li>
            <li>Enable retargeting (showing ads to people who have visited this Site)</li>
          </ul>
          <p>
            The Meta Pixel may combine Site visit data with other information Meta holds about you,
            including your Facebook profile data, if you are logged into Facebook. This constitutes
            "<strong>sharing</strong>" of personal information under California law.
          </p>
          <p>
            <strong>You can limit Meta Pixel tracking</strong> by:
          </p>
          <ul>
            <li>Adjusting your <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Facebook Ad Preferences</a></li>
            <li>Using the <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance opt-out tool</a></li>
            <li>Installing a browser-level ad blocker or tracker blocker</li>
            <li>Using your browser's "Do Not Track" setting (note: not all third parties honor this signal)</li>
          </ul>

          <h3>D. Analytics and Other Third-Party Tools</h3>
          <p>
            We may use web analytics services such as Google Analytics to understand how visitors use the
            Site. These services collect usage data through cookies and similar technologies. Google
            Analytics anonymizes IP addresses by default. We do not use these tools to identify individual
            visitors.
          </p>
          <p>
            Our Site loads fonts via <strong>Google Fonts</strong>. When your browser requests a font
            file, Google's servers receive your IP address. We use Google's privacy-preserving font
            loading methods where available. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.
          </p>

          {/* 3 */}
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Send you the REN newsletter and educational email updates you subscribed to</li>
            <li>Understand how visitors use the Site and improve our content</li>
            <li>Measure the reach of our content on social media platforms via the Meta Pixel</li>
            <li>Maintain the security and operation of the Site</li>
            <li>Comply with applicable legal obligations</li>
          </ul>
          <p>
            We do <strong>not</strong> use your information to make automated decisions that produce legal
            or similarly significant effects. We do not engage in profiling for those purposes.
          </p>

          {/* 4 */}
          <h2>4. How We Share Your Information</h2>
          <p>We do not sell your personal information. We may share information in the following circumstances:</p>
          <ul>
            <li>
              <strong>Email service providers</strong> — We use a third-party email platform to send
              newsletters. That provider processes email addresses on our behalf and is contractually
              prohibited from using them for any other purpose.
            </li>
            <li>
              <strong>Meta Platforms, Inc.</strong> — The Meta Pixel transmits browsing data to Meta, as
              described in Section 2(C). This is considered "sharing" under California law. You may opt
              out using the methods listed above or the link in Section 7(B).
            </li>
            <li>
              <strong>Analytics providers</strong> — Aggregated, non-identifiable usage data is processed
              by analytics services such as Google Analytics.
            </li>
            <li>
              <strong>Legal requirements</strong> — We may disclose information if required by law,
              subpoena, court order, or to protect our legal rights.
            </li>
            <li>
              <strong>Business transfer</strong> — In the event of a merger, acquisition, or sale of
              assets, personal information may be transferred to the successor entity.
            </li>
          </ul>

          {/* 5 */}
          <h2>5. Cookies and Tracking Technologies</h2>
          <p>
            We and our third-party partners use cookies, pixel tags, and similar tracking technologies.
            These may be "session" cookies (deleted when you close your browser) or "persistent" cookies
            (remaining until you delete them or they expire).
          </p>
          <p>
            <strong>Essential cookies:</strong> Required for the Site to function properly.
          </p>
          <p>
            <strong>Analytics cookies:</strong> Used to understand Site usage and improve content.
          </p>
          <p>
            <strong>Advertising/tracking pixels:</strong> The Meta Pixel, as described above.
          </p>
          <p>
            You can control cookies through your browser settings. Disabling certain cookies may affect
            Site functionality. Most browsers allow you to block third-party cookies specifically, which
            will limit advertising pixel functionality.
          </p>

          {/* 6 */}
          <h2>6. Data Retention</h2>
          <p>
            We retain email addresses for as long as you remain subscribed to our newsletter. You may
            unsubscribe at any time using the link in any email we send you, after which we will remove
            your address from our active mailing list. We may retain a suppression record to honor your
            opt-out.
          </p>
          <p>
            Server log data (IP addresses, page views) is retained for a limited period consistent with
            our security and operational needs, typically no longer than 24 months.
          </p>

          {/* 7 */}
          <h2>7. California Residents — Your Privacy Rights</h2>
          <p>
            This section applies to residents of California and supplements the rest of this Privacy Policy.
          </p>

          <h3>A. California Online Privacy Protection Act (CalOPPA)</h3>
          <p>
            CalOPPA requires operators of websites that collect personally identifiable information from
            California residents to post a privacy policy disclosing: the categories of PII collected, the
            categories of third parties with whom it is shared, and a description of how California
            residents may request changes to their information. This Privacy Policy fulfills those
            requirements.
          </p>
          <p>
            <strong>Do Not Track:</strong> California law requires us to disclose whether we honor browser
            "Do Not Track" (DNT) signals. We do not currently respond to DNT signals because no uniform
            standard exists for their implementation. Third-party services (Meta, Google) have their own
            policies regarding DNT.
          </p>

          <h3>B. California Consumer Privacy Act / CPRA — Opt-Out of Sharing</h3>
          <p>
            Although REN is a small business that may not meet all CCPA/CPRA applicability thresholds, we
            voluntarily provide the following rights as a matter of good practice:
          </p>
          <ul>
            <li>
              <strong>Right to Know:</strong> You may request what personal information we have collected
              about you and how it is used and shared.
            </li>
            <li>
              <strong>Right to Delete:</strong> You may request deletion of personal information we hold
              about you, subject to certain legal exceptions.
            </li>
            <li>
              <strong>Right to Opt Out of Sharing:</strong> The Meta Pixel constitutes "sharing" of
              personal information for cross-context behavioral advertising under the CPRA. You may opt
              out by emailing us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or by using
              the Global Privacy Control (GPC) browser signal, which we will honor for California
              residents.
            </li>
            <li>
              <strong>Right to Non-Discrimination:</strong> Exercising any of these rights will not
              result in denial of service or different pricing.
            </li>
          </ul>
          <p>
            To submit a privacy request, email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            We will respond within 45 days as required by law.
          </p>

          <div className="callout" style={{ borderLeftColor: "#B5432F" }}>
            <p>
              <strong>Do Not Sell or Share My Personal Information</strong><br />
              To opt out of the sharing of your personal information with Meta via the Pixel, email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the subject line
              "Do Not Share." We will process your request within 15 business days.
            </p>
          </div>

          {/* 8 */}
          <h2>8. Children's Privacy</h2>
          <p>
            This Site is intended for adults age 59 and older. We do not knowingly collect personal
            information from children under the age of 13. If you believe a child has submitted personal
            information, contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we
            will delete it promptly.
          </p>

          {/* 9 */}
          <h2>9. Security</h2>
          <p>
            We use commercially reasonable technical and organizational measures to protect your personal
            information. The Site is served over HTTPS. However, no method of transmission over the
            internet is 100% secure. We cannot guarantee absolute security of your data.
          </p>

          {/* 10 */}
          <h2>10. Links to Third-Party Sites</h2>
          <p>
            This Site contains links to external websites, including government sources (SSA, IRS, CMS),
            news outlets, and research institutions. We are not responsible for the privacy practices of
            those sites. We encourage you to review their privacy policies before submitting any
            information.
          </p>

          {/* 11 */}
          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the
            "Last Updated" date at the top of this page. Continued use of the Site after an update
            constitutes acceptance of the revised policy. If we make material changes affecting your
            rights, we will notify subscribers by email.
          </p>

          {/* 12 */}
          <h2>12. Contact Us</h2>
          <p>
            For questions, requests, or concerns about this Privacy Policy or our data practices:
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
