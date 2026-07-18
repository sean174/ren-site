import { COMPANY } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy | Retirement Education Network",
  description: "How Walker Thomas LLC collects, uses, and protects your information.",
};

const EFFECTIVE_DATE = COMPANY.launchDate;

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
          Retirement Education Network · Effective date: {EFFECTIVE_DATE}
        </p>
      </section>

      {/* Body */}
      <article style={{ maxWidth: "780px", margin: "0 auto", padding: "56px 32px 80px" }}>
        <style>{`
          .ren-legal h2 { font-family: var(--font-source-serif), Georgia, serif; font-size: 22px; font-weight: 700; color: #0F2A44; margin: 44px 0 14px; }
          .ren-legal p, .ren-legal li { font-family: var(--font-inter), sans-serif; font-size: 15.5px; line-height: 1.8; color: #3A3A3A; margin-bottom: 14px; }
          .ren-legal ul { padding-left: 22px; margin-bottom: 14px; }
          .ren-legal li { margin-bottom: 8px; }
          .ren-legal a { color: #B5432F; }
        `}</style>

        <div className="ren-legal">

          <h2>1. Who We Are</h2>
          <p>This Privacy Policy explains how Walker Thomas LLC, which operates Retirement Education Network (an education service) and Elevated Advisor (a retirement planning service), collects, uses, and protects your information. In this policy, &ldquo;we,&rdquo; &ldquo;us,&rdquo; and &ldquo;our&rdquo; mean Walker Thomas LLC.</p>

          <h2>2. Information We Collect</h2>
          <p><strong>Information you give us.</strong> When you fill out a form on this site, we may collect your first and last name, email address, and mobile phone number, along with any other details you choose to share with us.</p>
          <p><strong>Information collected automatically.</strong> Like most websites, we may collect basic technical information such as your IP address, browser type, device type, pages visited, and how you found our site. This may be collected through cookies and similar tools.</p>
          <p><strong>Communication records.</strong> If you communicate with us by text message, email, or phone, we may keep records of those conversations so we can serve you better.</p>

          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Respond to your questions and requests</li>
            <li>Schedule, confirm, and follow up on consultations you request</li>
            <li>Send you text messages, phone calls, and emails you have agreed to receive</li>
            <li>Provide and improve our services and website</li>
            <li>Meet our legal and regulatory obligations</li>
          </ul>

          <h2>4. Text Messaging (SMS) Privacy</h2>
          <p><strong>Your phone number stays with us.</strong> We do not share, sell, rent, or trade your mobile phone number or your SMS opt-in consent with third parties or affiliates for their marketing or promotional purposes. Text messaging opt-in data and consent are never shared with any third party for marketing.</p>
          <p>The only exception is service providers who work on our behalf to deliver messages (for example, our text messaging platform). These providers may process your number solely to send our messages to you, and they are not allowed to use it for anything else.</p>
          <p>You can opt out of text messages at any time by replying STOP to any message. Reply HELP for assistance, or contact us at {COMPANY.email}.</p>

          <h2>5. How We Share Information</h2>
          <p>We do not sell your personal information. We share it only in these limited situations:</p>
          <ul>
            <li><strong>Service providers.</strong> Companies that help us run our business, such as website hosting, scheduling, customer relationship management, email, and text messaging platforms. They may use your information only to provide services to us.</li>
            <li><strong>Legal reasons.</strong> If required by law, court order, or government request, or to protect our rights, safety, or property.</li>
            <li><strong>Business changes.</strong> If our business is sold or merged, your information may transfer to the new owner under the same protections in this policy.</li>
          </ul>

          <h2>6. Cookies and Analytics</h2>
          <p>We may use cookies and analytics tools to understand how visitors use our site and to improve it. You can control or block cookies in your browser settings. Blocking cookies may affect how parts of the site work.</p>

          <h2>7. How Long We Keep Information</h2>
          <p>We keep your information only as long as we need it for the purposes described in this policy, or as required by law. When it is no longer needed, we delete it or make it anonymous.</p>

          <h2>8. How We Protect Information</h2>
          <p>We use reasonable administrative, technical, and physical safeguards to protect your information. No website or system is 100% secure, so we cannot guarantee absolute security.</p>

          <h2>9. Your Choices and Rights</h2>
          <ul>
            <li><strong>Text messages:</strong> reply STOP to any message to opt out.</li>
            <li><strong>Emails:</strong> click the unsubscribe link at the bottom of any marketing email.</li>
            <li><strong>Access, correction, or deletion:</strong> you may ask us what personal information we hold about you, ask us to correct it, or ask us to delete it, by emailing {COMPANY.email}.</li>
          </ul>
          <p>Depending on where you live, you may have additional privacy rights under state law, including the Virginia Consumer Data Protection Act. We will honor valid requests as required by applicable law and will not treat you differently for exercising your rights.</p>

          <h2>10. Children&rsquo;s Privacy</h2>
          <p>This site is intended for adults. We do not knowingly collect personal information from anyone under 18. If you believe a minor has given us personal information, contact us and we will delete it.</p>

          <h2>11. Links to Other Websites</h2>
          <p>This site may link to websites run by others. This Privacy Policy does not apply to those sites. Please review the privacy policy of any site you visit.</p>

          <h2>12. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. The current version, with its effective date, will always be posted on this page.</p>

          <h2>13. Contact Us</h2>
          <p>
            Walker Thomas LLC<br />
            Retirement Education Network / Elevated Advisor<br />
            {COMPANY.address.street}<br />
            {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}<br />
            Email: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><br />
            Phone: <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
          </p>

        </div>
      </article>
    </main>
  );
}
