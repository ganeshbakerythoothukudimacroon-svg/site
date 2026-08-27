"use client";

import Link from "next/link";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { siteConfig } from "@/lib/site-config";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

// Real online payment (WooCommerce Store API + Razorpay) isn't wired up
// yet — until then, checkout hands the order off to WhatsApp with everything
// prefilled, rather than pretending to process a payment that doesn't exist.
export function CheckoutForm() {
  const { items, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center gap-4 rounded-[var(--radius-card)] p-10 text-center">
        <span className="glass-subtle flex h-14 w-14 items-center justify-center rounded-full text-[color:var(--gold-400)]">
          <ShoppingBag className="h-6 w-6" />
        </span>
        <p className="text-[color:var(--text-muted)]">Your cart is empty.</p>
        <Link
          href="/shop"
          className="glow-gold-hover inline-flex rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-5 py-2.5 text-sm font-semibold text-[color:var(--bg-void)]"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;

    const lines = items.map((i) => `• ${i.quantity} × ${i.name} — ${inr.format(i.lineTotal)}`).join("\n");
    const message = [
      `New order request — ${siteConfig.brandName}, ${siteConfig.shopBranch}`,
      "",
      lines,
      `Subtotal: ${inr.format(subtotal)}`,
      "",
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Address: ${data.address}, ${data.city}, ${data.state} - ${data.pincode}`,
    ].join("\n");

    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="glass-card space-y-4 rounded-[var(--radius-card)] p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="name" label="Full Name" required />
          <Field id="phone" label="Phone" type="tel" required />
        </div>
        <Field id="email" label="Email (optional)" type="email" />
        <Field id="address" label="Address" required />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field id="city" label="City" required />
          <Field id="state" label="State" required defaultValue={siteConfig.address.state} />
          <Field id="pincode" label="Pincode" required />
        </div>
        <button
          type="submit"
          className="glow-gold-hover flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-5 py-3 text-sm font-semibold text-[color:var(--bg-void)]"
        >
          <MessageCircle className="h-4 w-4" /> Send Order via WhatsApp
        </button>
        <p className="text-xs text-[color:var(--text-muted)]">
          Online payment is being finalized — for now, submitting sends your order details to us on WhatsApp so we
          can confirm and arrange payment with you directly.
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
