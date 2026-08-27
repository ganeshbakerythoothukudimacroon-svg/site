"use client";

import { useState } from "react";
import { Package } from "lucide-react";
import type { TrackedOrder } from "@/lib/repositories/order-repository";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function OrderTracker() {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<TrackedOrder | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    setOrder(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/track-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Something went wrong.");
        setStatus("idle");
        return;
      }
      setOrder(json.order);
      setStatus("idle");
    } catch {
      setError("Something went wrong — please try again.");
      setStatus("idle");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="glass-card space-y-4 rounded-[var(--radius-card)] p-6">
        <div>
          <label htmlFor="orderNumber" className="block text-sm font-medium text-[color:var(--text-primary)]">
            Order Number
          </label>
          <input
            id="orderNumber"
            name="orderNumber"
            type="text"
            required
            placeholder="e.g. 3041"
            className="glass-subtle mt-1.5 w-full rounded-lg px-3.5 py-2.5 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[color:var(--gold-500)]"
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-[color:var(--text-primary)]">
            Email or Phone Used to Order
          </label>
          <input
            id="contact"
            name="contact"
            type="text"
            required
            className="glass-subtle mt-1.5 w-full rounded-lg px-3.5 py-2.5 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[color:var(--gold-500)]"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={status === "loading"}
          className="glow-gold-hover w-full rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-5 py-3 text-sm font-semibold text-[color:var(--bg-void)] disabled:opacity-60"
        >
          {status === "loading" ? "Checking…" : "Track Order"}
        </button>
      </form>

      {order && (
        <div className="glass-premium mt-6 rounded-[var(--radius-card)] p-6">
          <div className="flex items-center gap-3">
            <span className="glass-subtle flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--gold-400)]">
              <Package className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-[color:var(--text-muted)]">Order #{order.id}</p>
              <p className="font-display text-lg font-semibold capitalize text-[color:var(--text-primary)]">
                {order.status.replace(/-/g, " ")}
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-[color:var(--text-muted)]">
            {new Date(order.dateCreated).toLocaleDateString("en-IN", { dateStyle: "medium" })}
          </p>
          <ul className="mt-4 space-y-1 text-sm text-[color:var(--text-secondary)]">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.quantity} × {item.name}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold text-gradient-gold">Total: {inr.format(Number(order.total))}</p>
        </div>
      )}
    </div>
  );
}
