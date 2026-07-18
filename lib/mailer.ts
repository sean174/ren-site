// Sends consultation-request emails via Gmail SMTP using nodemailer.
// Mirrors the proven pattern from the IRA/Roth apps: the LEADS_GMAIL_* env vars
// point at leads@ElevatedAdvisor.com. Submissions are emailed to that inbox so
// the Elevated Advisor team can follow up.
//
// Required env vars (add to the Vercel project for ren-site):
//   LEADS_GMAIL_USER          leads@elevatedadvisor.com
//   LEADS_GMAIL_APP_PASSWORD  Gmail app password for that account
//   LEADS_GMAIL_FROM_NAME     optional, defaults to "REN Consultation Requests"
//   CONSULTATION_TO           optional, defaults to leads@elevatedadvisor.com

import nodemailer from "nodemailer";

function getTransport() {
  const user = process.env.LEADS_GMAIL_USER;
  const pass = process.env.LEADS_GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("LEADS_GMAIL_USER or LEADS_GMAIL_APP_PASSWORD not set");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendConsultationEmail(opts: {
  subject: string;
  html: string;
  text: string;
}) {
  const transport = getTransport();
  const fromName = process.env.LEADS_GMAIL_FROM_NAME || "REN Consultation Requests";
  const fromUser = process.env.LEADS_GMAIL_USER!;
  const to = process.env.CONSULTATION_TO || "leads@elevatedadvisor.com";

  return transport.sendMail({
    from: `"${fromName}" <${fromUser}>`,
    to,
    replyTo: fromUser,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
}
