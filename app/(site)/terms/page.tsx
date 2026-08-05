import { COMPANY } from "@/lib/site";

export const metadata = {
  title: "Terms & Conditions | Retirement Education Network",
  description: "Terms and conditions for using the Retirement Education Network website.",
};

const EFFECTIVE_DATE = COMPANY.launchDate;

export default function TermsPage() {
  return (
    <main style={{ background: "var(--color-ivory, #F4EFE6)", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ background: "#0F2A44", color: "#F4EFE6", padding: "56px 32px 48px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,239,230,0.5)", marginBottom: "16px" }}>
          Legal
        </p>
        <h1 style={{ fontFamily: "var(--font-source-serif), Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, margin: "0 auto 16px", maxWidth: "700px" }}>
          Terms and Conditions
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
          <p>This website is owned and operated by Walker Thomas LLC. Walker Thomas LLC operates Retirement Education Network (&ldquo;REN,&rdquo; an education service) and Elevated Advisor (a retirement planning service). In these terms, &ldquo;we,&rdquo; &ldquo;us,&rdquo; and &ldquo;our&rdquo; mean Walker Thomas LLC. By using this website or submitting your information through our forms, you agree to these Terms and Conditions and to our Privacy Policy.</p>
          <p>If you do not agree with these terms, please do not use this site.</p>

          <h2>2. What This Site Is For</h2>
          <p>Retirement Education Network publishes educational information about retirement topics such as Medicare, Social Security, taxes, and safe money. This content is for general education only. It is not investment, legal, or tax advice, and it is not a recommendation to buy or sell any product. Always talk with a qualified professional about your own situation before making financial decisions.</p>
          <p>If you request a consultation, you are asking to speak with the Elevated Advisor team, also a service of Walker Thomas LLC. A consultation is optional and free.</p>

          <h2>3. Using This Site</h2>
          <p>You agree to use this site only for lawful purposes and only for your own personal use. You agree not to:</p>
          <ul>
            <li>Copy, resell, or republish any part of this site without our written permission</li>
            <li>Use bots, scrapers, or other automated tools to access the site</li>
            <li>Interfere with the site&rsquo;s security or operation</li>
            <li>Impersonate another person or submit false information through our forms</li>
          </ul>

          <h2>4. Text Message (SMS) Program</h2>
          <p><strong>a. Consent.</strong> When you provide your mobile phone number through our consultation form and check the consent box, you agree to receive phone calls and text messages from Elevated Advisor (Walker Thomas LLC), including through automated technology. These messages may include appointment scheduling, appointment reminders, and follow-ups about your request.</p>
          <p><strong>b. Consent is optional.</strong> Agreeing to receive calls or texts is not required to buy anything or to receive our free educational content.</p>
          <p><strong>c. Message frequency.</strong> Message frequency varies based on your activity and requests.</p>
          <p><strong>d. Cost.</strong> Message and data rates may apply. Any charges are billed by your mobile carrier, not by us.</p>
          <p><strong>e. Opting out.</strong> You can stop receiving texts at any time by replying STOP to any message. After you reply STOP, we will send one final message confirming you have been opted out.</p>
          <p><strong>f. Help.</strong> Reply HELP to any message for assistance, or contact us at the email address below.</p>
          <p><strong>g. Your consent stays with us.</strong> Your phone number and your SMS consent are not shared with or sold to third parties or affiliates for their marketing purposes. See our Privacy Policy for full details.</p>
          <p><strong>h. Carriers.</strong> Mobile carriers are not liable for delayed or undelivered messages.</p>

          <h2>5. Email Communications</h2>
          <p>By submitting your email address, you agree to receive emails from us related to your request and our services. You can unsubscribe at any time using the link at the bottom of any marketing email.</p>

          <h2>6. Our Content</h2>
          <p>The content on this site, including text, graphics, logos, and downloads, belongs to Walker Thomas LLC or its content providers and is protected by copyright and other intellectual property laws. You may view and print pages for your own personal use, but you may not reuse our content for any other purpose without written permission.</p>

          <h2>7. Links to Other Websites</h2>
          <p>This site may link to websites run by others. We do not control those sites and are not responsible for their content, accuracy, or privacy practices. Visiting any third-party site is at your own risk and subject to that site&rsquo;s own terms and privacy policy.</p>

          <h2>8. Disclaimer of Warranties</h2>
          <p>This site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; To the fullest extent allowed by law, we make no warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy, or non-infringement. We do not promise that the site will always be available, secure, or error-free.</p>

          <h2>9. Limitation of Liability</h2>
          <p>To the fullest extent allowed by law, Walker Thomas LLC and its members, managers, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of this site or its content, even if we have been told such damages are possible. Where liability cannot be fully excluded, our total liability is limited to the amount you paid us, if anything, in the twelve months before the claim arose. Some states do not allow certain limitations, so some of these limits may not apply to you.</p>

          <h2>10. Indemnification</h2>
          <p>You agree to defend and hold harmless Walker Thomas LLC and its members, managers, employees, and agents from any claims, damages, or expenses (including reasonable attorney fees) that arise from your misuse of this site or your violation of these terms.</p>

          <h2>11. Changes to These Terms</h2>
          <p>We may update these Terms and Conditions from time to time. The current version, with its effective date, will always be posted on this page. Your continued use of the site after changes are posted means you accept the updated terms.</p>

          <h2>12. Governing Law and Disputes</h2>
          <p>These terms are governed by the laws of the Commonwealth of Virginia, without regard to conflict of law rules. Any dispute that cannot be resolved informally will be brought in the state or federal courts located in the City of Norfolk, Virginia, and you consent to jurisdiction and venue there.</p>

          <h2>13. Severability</h2>
          <p>If any part of these terms is found to be invalid or unenforceable, the rest of the terms remain in full effect.</p>

          <h2>14. Contact Us</h2>
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
