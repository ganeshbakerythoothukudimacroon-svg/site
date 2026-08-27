"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function CartPageContent() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center gap-4 rounded-[var(--radius-card)] p-10 text-center">
        <span className="glass-subtle flex h-14 w-14 items-center justify-center rounded-full text-[color:var(--gold-400)]">
          <ShoppingBag className="h-6 w-6" />
        </span>
        <div>
          <p className="font-display text-lg text-[color:var(--text-primary)]">Your collection is waiting.</p>
          <p className="mt-1 text-sm text-[color:var(--text-muted)]">Your cart is empty.</p>
        </div>
        <Link
          href="/shop"
          className="glow-gold-hover inline-flex rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-5 py-2.5 text-sm font-semibold text-[color:var(--bg-void)]"
        >
          Explore the Bakery
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ul className="glass-card divide-y divide-[color:var(--glass-border)] rounded-[var(--radius-card)]">
        {items.map((item) => (
          <li key={item.key} className="flex gap-4 p-4">
            <div className="glass-subtle relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
              {item.image && <Image src={item.image.url} alt={item.image.alt || item.name} fill className="object-cover" />}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex justify-between gap-4">
                <div>
                  <Link href={`/product/${item.slug}`} className="font-medium text-[color:var(--text-primary)] hover:text-[color:var(--gold-400)]">
                    {item.name}
                  </Link>
                  <p className="text-sm text-[color:var(--text-muted)]">{inr.format(item.unitPrice)} each</p>
                </div>
                <p className="font-semibold text-gradient-gold">{inr.format(item.lineTotal)}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="glass-subtle flex items-center rounded-full">
                  <button type="button" onClick={() => updateQuantity(item.key, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center text-[color:var(--text-secondary)] hover:text-[color:var(--gold-400)]" aria-label={`Decrease quantity of ${item.name}`}>
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm text-[color:var(--text-primary)]">{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.key, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center text-[color:var(--text-secondary)] hover:text-[color:var(--gold-400)]" aria-label={`Increase quantity of ${item.name}`}>
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button type="button" onClick={() => removeItem(item.key)} className="text-xs font-medium text-[color:var(--text-muted)] hover:text-[color:var(--gold-400)]">
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="glass-premium rounded-[var(--radius-card)] p-6">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span className="text-[color:var(--text-primary)]">Subtotal</span>
          <span className="text-gradient-gold">{inr.format(subtotal)}</span>
        </div>
        <p className="mt-1 text-xs text-[color:var(--text-muted)]">Shipping and taxes calculated at checkout.</p>
        <Link
          href="/checkout"
          className="glow-gold-hover mt-5 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-5 py-3 text-sm font-semibold text-[color:var(--bg-void)]"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
