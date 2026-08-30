import { NextResponse } from "next/server";
import { notifyContactEnquiry } from "@/lib/brevo";

interface ContactPayload {
  name: string;
  contact: string;
  message: string;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  if (!body?.name?.trim() || !body?.contact?.trim() || !body?.message?.trim()) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  // Best-effort: the visitor's submission is valid regardless of whether
  // Brevo is reachable, so a transient failure there shouldn't fail the
  // request — it's already logged server-side inside notifyContactEnquiry.
  await notifyContactEnquiry({
    name: body.name.trim(),
    contact: body.contact.trim(),
    message: body.message.trim(),
  });

  return NextResponse.json({ ok: true });
}
