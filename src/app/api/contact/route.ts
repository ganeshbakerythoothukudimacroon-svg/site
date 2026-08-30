import { NextResponse } from "next/server";
import { notifyContactEnquiry } from "@/lib/brevo";
import { saveEnquiry } from "@/lib/wordpress";

interface ContactPayload {
  name: string;
  contact: string;
  message: string;
  formType?: "contact" | "bulk-order";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  if (!body?.name?.trim() || !body?.contact?.trim() || !body?.message?.trim()) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  const name = body.name.trim();
  const contact = body.contact.trim();
  const message = body.message.trim();
  const formType = body.formType === "bulk-order" ? "bulk-order" : "contact";

  // Best-effort, both in parallel: the visitor's submission is valid
  // regardless of whether Brevo or WordPress are reachable, so a transient
  // failure in either shouldn't fail the request — both log their own
  // errors server-side rather than throwing.
  await Promise.all([
    notifyContactEnquiry({ name, contact, message }),
    saveEnquiry({ name, contact, message, formType }),
  ]);

  return NextResponse.json({ ok: true });
}
