"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import type { CheckoutResult } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

/**
 * Deliberately does not re-fetch the order from WooCommerce by ID on the
 * server — order IDs are sequential and guessable, and this page has no
 * way to verify the visitor is the person who placed the order (that's
 * exactly the problem /track-order solves with an email/phone check).
 * Instead, checkout hands the confirmation data to this page via
 * sessionStorage at redirect time, so only the browser that just placed
 * the order ever has it. A direct/refreshed visit without that data shows
 * a generic confirmation instead of trying to look anything up.
 */
export default function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<CheckoutResult | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(`order-confirmation-${orderId}`);
      // One-time read on mount (sessionStorage needs the browser) — not a
      // reactive subscription, so this doesn't cascade.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      // Ignore — falls through to the generic confirmation below.
    }
    setChecked(true);
  }, [orderId]);

  if (!checked) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <span className="glass-premium glow-gold mx-auto flex h-16 w-16 items-center justify-center rounded-full text-[color:var(--gold-400)]">
        <CheckCircle2 className="h-8 w-8" />
      </span>

      <h1 className="mt-6 font-display text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">
        {order ? "Thank You — Order Placed!" : "Thank You!"}
      </h1>

      {order ? (
        <>
          <p className="mt-3 text-[color:var(--text-secondary)]">
            Your order <span className="font-medium text-[color:var(--gold-400)]">#{order.orderNumber}</span> has
            been received. We&apos;ll confirm payment and delivery details with you directly.
          </p>

          <div className="glass-card mt-8 rounded-[var(--radius-card)] p-6 text-left">
            <ul className="space-y-2 text-sm text-[color:var(--text-secondary)]">
              {order.items.map((item, i) => (
                <li key={i} className="flex justify-between">
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-[color:var(--glass-border)] pt-4 font-semibold">
              <span className="text-[color:var(--text-primary)]">Total</span>
              <span className="text-gradient-gold">{inr.format(order.total)}</span>
            </div>
          </div>
        </>
      ) : (
        <p className="mt-3 text-[color:var(--text-secondary)]">
          Your order has been placed. Use the order number we sent you to check its status any time.
        </p>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="glow-gold-hover inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-6 py-3 text-sm font-semibold text-[color:var(--bg-void)]"
        >
          <MessageCircle className="h-4 w-4" /> Chat With Us
        </a>
        <Link
          href="/track-order"
          className="glass-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)]"
        >
          Track Order
        </Link>
        <Link
          href="/shop"
          className="glass-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)]"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
