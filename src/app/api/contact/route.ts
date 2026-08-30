import { NextResponse } from "next/server";
import { notifyContactEnquiry } from "@/lib/brevo";
import { getAdminEmail, saveEnquiry } from "@/lib/wordpress";

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

  // The notification's destination comes from WordPress's own admin email
  // setting — not a hardcoded address — so it has to resolve before we can
  // send it. Saving the enquiry doesn't depend on that, so it still runs
  // alongside rather than waiting on it.
  const adminEmail = await getAdminEmail();

  const tasks: Promise<void>[] = [saveEnquiry({ name, contact, message, formType })];
  if (adminEmail) {
    tasks.push(notifyContactEnquiry({ name, contact, message, adminEmail }));
  } else {
    console.error("[api/contact] couldn't resolve WordPress admin email — skipping notification email.");
  }

  // Best-effort: the visitor's submission is valid regardless of whether
  // Brevo or WordPress are reachable, so a transient failure in either
  // shouldn't fail the request — both log their own errors server-side
  // rather than throwing.
  await Promise.all(tasks);

  return NextResponse.json({ ok: true });
}
