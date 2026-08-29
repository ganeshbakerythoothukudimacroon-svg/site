"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { siteConfig } from "@/lib/site-config";
import type { CheckoutRequest, CustomerAddress } from "@/lib/types";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

interface AccountPrefill {
  email: string;
  address: CustomerAddress | null;
}

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<AccountPrefill | null>(null);

  useEffect(() => {
    // Not signed in is a completely normal outcome here (checkout works
    // fine as a guest) — only prefill the form when it succeeds.
    fetch("/api/account")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.ok) setAccount({ email: json.user.email, address: json.user.address });
      })
      .catch(() => {});
  }, []);

  if (items.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center gap-4 rounded-[var(--radius-card)] p-10 text-center">
        <span className="glass-subtle flex h-14 w-14 items-center justify-center rounded-full text-[color:var(--gold-400)]">
          <ShoppingBag className="h-6 w-6" />
        </span>
        <p className="text-[color:var(--text-muted)]">Your cart is empty.</p>
        <Link href="/shop" className="glow-gold-hover inline-flex rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-5 py-2.5 text-sm font-semibold text-[color:var(--bg-void)]">
          Browse Products
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;

    const payload: CheckoutRequest = {
      customer: {
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
      },
      items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setError(json.error || "Something went wrong — please try again.");
        setStatus("idle");
        return;
      }

      try {
        sessionStorage.setItem(`order-confirmation-${json.order.orderId}`, JSON.stringify(json.order));
      } catch {
        // Non-fatal — confirmation page just shows the generic fallback.
      }

      clearCart();
      router.push(`/order-confirmation/${json.order.orderId}`);
    } catch {
      setError("Something went wrong — please check your connection and try again.");
      setStatus("idle");
    }
  }

  const prefill = account?.address;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Remounts once with prefilled values when a saved address loads —
          simpler than converting every field to controlled state, and the
          fetch resolves fast enough that a guest typing in that instant is
          the rare case, not the common one. */}
      <form
        key={account ? "account" : "guest"}
        onSubmit={handleSubmit}
        className="glass-card space-y-4 rounded-[var(--radius-card)] p-6"
      >
        {account && (
          <p className="rounded-lg bg-[color:var(--glass-bg-2)] px-3 py-2 text-xs text-[color:var(--gold-300)]">
            Using your saved address — edit any field below if this order ships somewhere else.
          </p>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="name" label="Full Name" required defaultValue={prefill?.name} />
          <Field id="phone" label="Phone" type="tel" required defaultValue={prefill?.phone} />
        </div>
        <Field id="email" label="Email (optional)" type="email" defaultValue={account?.email} />
        <Field id="address" label="Address" required defaultValue={prefill?.address} />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field id="city" label="City" required defaultValue={prefill?.city} />
          <Field id="state" label="State" required defaultValue={prefill?.state || siteConfig.address.state} />
          <Field id="pincode" label="Pincode" required defaultValue={prefill?.pincode} />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={status === "loading"}
          className="glow-gold-hover flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-5 py-3 text-sm font-semibold text-[color:var(--bg-void)] disabled:opacity-60"
        >
          {status === "loading" ? "Placing Order…" : "Place Order"}
        </button>
        <p className="text-xs text-[color:var(--text-muted)]">
          Online payment is being finalized — your order is recorded and we&apos;ll confirm payment and delivery
          with you directly.
        </p>
      </form>

      <div className="glass-premium h-fit rounded-[var(--radius-card)] p-6">
        <h2 className="font-display text-lg font-semibold text-[color:var(--text-primary)]">Order Summary</h2>
        <ul className="mt-4 space-y-2 text-sm text-[color:var(--text-secondary)]">
          {items.map((item) => (
            <li key={item.key} className="flex justify-between">
              <span>
                {item.quantity} × {item.name}
              </span>
              <span>{inr.format(item.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-[color:var(--glass-border)] pt-4 font-semibold">
          <span className="text-[color:var(--text-primary)]">Subtotal</span>
          <span className="text-gradient-gold">{inr.format(subtotal)}</span>
        </div>
      </div>
    </div>
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
