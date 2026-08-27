"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, updateQuantity, removeItem } = useCart();
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Mount-then-animate on open — a one-off transition trigger, not a
      // reactive subscription, so this doesn't cascade.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      const raf = requestAnimationFrame(() => setEntered(true));
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = "";
      };
    }
    setEntered(false);
    const t = setTimeout(() => setMounted(false), 300);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        aria-hidden="true"
        onClick={closeCart}
        className="absolute inset-0 bg-[color:var(--bg-void)]/70 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none"
        style={{ opacity: entered ? 1 : 0 }}
      />
      <div
        className="glass-premium absolute right-0 top-0 flex h-full w-full max-w-md flex-col rounded-l-[1.75rem] transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ transform: entered ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="pt-[max(1.25rem,env(safe-area-inset-top))]" />
        <div className="flex items-center justify-between border-b border-[color:var(--glass-border)] px-5 pb-4">
          <h2 className="font-display text-xl text-[color:var(--text-primary)]">
            Your Cart{" "}
            {items.length > 0 && (
              <span className="text-base font-sans text-[color:var(--text-muted)]">({items.length})</span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="glass-button flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--text-secondary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="glass-subtle flex h-16 w-16 items-center justify-center rounded-full text-[color:var(--gold-400)]">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <div>
              <p className="font-display text-lg text-[color:var(--text-primary)]">Your collection is waiting.</p>
              <p className="mt-1 text-sm text-[color:var(--text-muted)]">Nothing here yet.</p>
            </div>
            <Link
              href="/shop"
              onClick={closeCart}
              className="glow-gold-hover rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-6 py-2.5 text-sm font-semibold text-[color:var(--bg-void)]"
            >
              Explore the Bakery
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-[color:var(--glass-border)] px-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3 py-4">
                  <div className="glass-subtle relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    {item.image && (
                      <Image src={item.image.url} alt={item.image.alt || item.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm font-medium text-[color:var(--text-primary)]">{item.name}</p>
                      <p className="text-sm text-[color:var(--text-muted)]">{inr.format(item.unitPrice)} each</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="glass-subtle flex items-center rounded-full">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-[color:var(--text-secondary)] hover:text-[color:var(--gold-400)]"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm text-[color:var(--text-primary)]">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-[color:var(--text-secondary)] hover:text-[color:var(--gold-400)]"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="text-xs font-medium text-[color:var(--text-muted)] hover:text-[color:var(--gold-400)]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-[color:var(--glass-border)] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
              <div className="mb-4 flex items-center justify-between text-base font-semibold">
                <span className="text-[color:var(--text-primary)]">Subtotal</span>
                <span className="text-gradient-gold text-lg font-bold">{inr.format(subtotal)}</span>
              </div>
              <p className="mb-4 text-xs text-[color:var(--text-muted)]">Shipping and taxes calculated at checkout.</p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="glow-gold-hover flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-5 py-3 text-sm font-semibold text-[color:var(--bg-void)]"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="glass-button mt-2 flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-[color:var(--text-secondary)]"
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
