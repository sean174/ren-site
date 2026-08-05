import { NextResponse } from "next/server";

// Leads flow into the same funnel as the ANOFE Roth book: the distributor
// assigns an advisor, creates the GHL contact, and the ebook delivery + SMS
// sequence take over from there.
const DISTRIBUTOR_URL =
  process.env.ROTH_DISTRIBUTOR_URL ||
  "https://anofe-roth.elevatedadvisor.co/api/leads/distribute";

function normalizePhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 10) return "+1" + digits;
  if (digits.length === 11 && digits.startsWith("1")) return "+" + digits;
  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = normalizePhone(String(body.phone ?? ""));

    if (!name) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ error: "Please enter a valid US cell phone number." }, { status: 400 });
    }
    if (body.consent !== true) {
      return NextResponse.json({ error: "Please check the consent box to continue." }, { status: 400 });
    }

    const secret = process.env.ROTH_DISTRIBUTOR_SECRET;
    if (!secret) {
      console.error("ebook-optin: ROTH_DISTRIBUTOR_SECRET is not set");
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    const res = await fetch(DISTRIBUTOR_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": secret,
        "X-Source": "ren-website",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        source: "ren-website-roth-ebook",
        consent: true,
        consent_at: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`ebook-optin: distributor returned ${res.status}: ${text}`);
      return NextResponse.json(
        { error: "Something went wrong. Try again in a moment." },
        { status: 502 }
      );
    }

    // Duplicates come back 200 from the distributor; the lead is already in
    // the funnel, so the visitor still gets a success state.
    const data = await res.json().catch(() => ({}));
    return NextResponse.json({ ok: true, duplicate: !!data.duplicate });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
