"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import type { CustomerAddress } from "@/lib/types";

export function AddressForm({ address }: { address: CustomerAddress | null }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/account/address", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Couldn't save your address.");
        setStatus("error");
        return;
      }
      setStatus("saved");
      router.refresh();
      window.setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setError("Couldn't save your address — please check your connection.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-4 rounded-[var(--radius-card)] p-6">
      <h2 className="font-display text-lg font-semibold text-[color:var(--text-primary)]">
        {address ? "Your Delivery Address" : "Add a Delivery Address"}
      </h2>
      <p className="text-sm text-[color:var(--text-muted)]">Saved here to speed up checkout on future orders.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Full Name" required defaultValue={address?.name} />
        <Field id="phone" label="Phone" type="tel" required defaultValue={address?.phone} />
      </div>
      <Field id="address" label="Address" required defaultValue={address?.address} />
      <div className="grid gap-4 sm:grid-cols-3">
        <Field id="city" label="City" required defaultValue={address?.city} />
        <Field id="state" label="State" required defaultValue={address?.state || siteConfig.address.state} />
        <Field id="pincode" label="Pincode" required defaultValue={address?.pincode} />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="glow-gold-hover flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-5 py-3 text-sm font-semibold text-[color:var(--bg-void)] disabled:opacity-60 sm:w-fit"
      >
        {status === "loading" ? "Saving…" : status === "saved" ? (
          <>
            <CheckCircle2 className="h-4 w-4" /> Saved
          </>
        ) : (
          "Save Address"
        )}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  defaultValue,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[color:var(--text-primary)]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="glass-subtle mt-1.5 w-full rounded-lg px-3.5 py-2.5 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[color:var(--gold-500)]"
      />
    </div>
  );
}
