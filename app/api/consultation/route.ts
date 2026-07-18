import { NextResponse } from "next/server";
import { sendConsultationEmail } from "@/lib/mailer";

// nodemailer requires the Node.js runtime (not edge).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const consent = body.consent === true;

    if (!firstName || !lastName) {
      return NextResponse.json({ error: "Please enter your first and last name." }, { status: 400 });
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const fullName = `${firstName} ${lastName}`;
    const submittedAt = new Date().toISOString();

    const text = [
      `New free consultation request from retirementeducationnetwork.com`,
      ``,
      `Name:  ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone || "(not provided)"}`,
      `SMS/call consent given: ${consent ? "YES" : "no"}`,
      `Submitted: ${submittedAt}`,
    ].join("\n");

    const html = `
      <div style="font-family:Arial,sans-serif;font-size:15px;color:#222;line-height:1.6">
        <h2 style="color:#0F2A44;margin:0 0 12px">New Free Consultation Request</h2>
        <p style="margin:0 0 12px;color:#666">Source: retirementeducationnetwork.com</p>
        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td style="font-weight:bold">Name</td><td>${escapeHtml(fullName)}</td></tr>
          <tr><td style="font-weight:bold">Email</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="font-weight:bold">Phone</td><td>${escapeHtml(phone || "(not provided)")}</td></tr>
          <tr><td style="font-weight:bold">SMS/call consent</td><td>${consent ? "YES" : "no"}</td></tr>
          <tr><td style="font-weight:bold">Submitted</td><td>${submittedAt}</td></tr>
        </table>
      </div>
    `;

    await sendConsultationEmail({
      subject: `Consultation request: ${fullName}`,
      html,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("consultation submit failed:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your request. Please try again or email support@elevatedadvisor.com." },
      { status: 500 },
    );
  }
}
