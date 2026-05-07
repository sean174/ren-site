import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "data/ebook-leads.json");

function ensureFile() {
  const dir = path.dirname(LEADS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(LEADS_FILE)) fs.writeFileSync(LEADS_FILE, "[]", "utf-8");
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    ensureFile();
    const leads = JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));

    // Deduplicate
    if (!leads.find((l: { email: string }) => l.email === email.toLowerCase().trim())) {
      leads.push({
        email: email.toLowerCase().trim(),
        source: "ebook-roth-conversion",
        createdAt: new Date().toISOString(),
      });
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
