import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  contact: string;
  message: string;
}

// TODO(client): wire this up to a real email/CRM destination once one is
// chosen (e.g. Resend, SendGrid, or a HubSpot form). For now it validates
// and acknowledges the submission only — nothing is sent or stored yet.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  if (!body?.name?.trim() || !body?.contact?.trim() || !body?.message?.trim()) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
