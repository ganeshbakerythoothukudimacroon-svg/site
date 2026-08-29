"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface AccountPrefill {
  name: string;
  email: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [account, setAccount] = useState<AccountPrefill | null>(null);

  useEffect(() => {
    // Not signed in is a normal outcome (the form works fine as a guest) —
    // only prefill when a session actually resolves.
    fetch("/api/account")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.ok) setAccount({ name: json.user.name, email: json.user.email });
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass-card flex items-start gap-3 rounded-[var(--radius-card)] p-6 text-[color:var(--text-secondary)]">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-[color:var(--gold-400)]" />
        <p>Thanks for reaching out — we&apos;ll get back to you soon. For anything urgent, WhatsApp us directly.</p>
      </div>
    );
  }

  return (
    // Remounts once with prefilled values when a signed-in session loads —
    // simpler than converting fields to controlled state, and the fetch
    // resolves fast enough that a guest typing in that instant is the rare
    // case, not the common one (same pattern as CheckoutForm).
    <form
      key={account ? "account" : "guest"}
      onSubmit={handleSubmit}
      className="glass-card space-y-4 rounded-[var(--radius-card)] p-6"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[color:var(--text-primary)]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={account?.name}
          className="glass-subtle mt-1.5 w-full rounded-lg px-3.5 py-2.5 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[color:var(--gold-500)]"
        />
      </div>
      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-[color:var(--text-primary)]">
          Email or Phone
        </label>
        <input
          id="contact"
          name="contact"
          type="text"
          required
          defaultValue={account?.email}
          className="glass-subtle mt-1.5 w-full rounded-lg px-3.5 py-2.5 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[color:var(--gold-500)]"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[color:var(--text-primary)]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="glass-subtle mt-1.5 w-full rounded-lg px-3.5 py-2.5 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[color:var(--gold-500)]"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong — please try again or contact us on WhatsApp.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="glow-gold-hover w-full rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-5 py-3 text-sm font-semibold text-[color:var(--bg-void)] disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
