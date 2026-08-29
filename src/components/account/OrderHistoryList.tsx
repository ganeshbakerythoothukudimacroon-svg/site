import { Package } from "lucide-react";
import type { PublicOrder } from "@/lib/types";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function OrderHistoryList({ orders }: { orders: PublicOrder[] }) {
  if (orders.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center gap-3 rounded-[var(--radius-card)] p-8 text-center">
        <span className="glass-subtle flex h-11 w-11 items-center justify-center rounded-full text-[color:var(--gold-400)]">
          <Package className="h-5 w-5" />
        </span>
        <p className="text-sm text-[color:var(--text-muted)]">No orders yet — your first order will show up here.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {orders.map((order) => (
        <li key={order.id} className="glass-card rounded-[var(--radius-card)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm text-[color:var(--text-muted)]">Order #{order.id}</p>
              <p className="font-display text-base font-semibold capitalize text-[color:var(--text-primary)]">
                {order.status.replace(/-/g, " ")}
              </p>
            </div>
            <p className="text-xs text-[color:var(--text-muted)]">
              {new Date(order.dateCreated).toLocaleDateString("en-IN", { dateStyle: "medium" })}
            </p>
          </div>
          <ul className="mt-3 space-y-1 text-sm text-[color:var(--text-secondary)]">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.quantity} × {item.name}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm font-semibold text-gradient-gold">{inr.format(order.total)}</p>
        </li>
      ))}
    </ul>
  );
}
