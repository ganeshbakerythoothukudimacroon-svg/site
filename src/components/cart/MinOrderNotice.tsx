import { Truck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export const meetsMinOrder = (subtotal: number) => subtotal >= siteConfig.minOrderValue;

/** Free-delivery note, plus a progress bar towards the minimum order while
 *  the cart is below it. The server enforces the same minimum at checkout. */
export function MinOrderNotice({ subtotal }: { subtotal: number }) {
  const min = siteConfig.minOrderValue;
  const reached = meetsMinOrder(subtotal);
  const progress = Math.min(100, (subtotal / min) * 100);

  return (
    <div className="text-xs">
      {!reached && (
        <div className="mb-3">
          <p className="text-[color:var(--text-secondary)]">
            Add <span className="font-semibold text-[color:var(--gold-300)]">{inr.format(min - subtotal)}</span> more
            — minimum order is {inr.format(min)}.
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[color:var(--glass-bg-3)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-300)] shadow-[0_0_10px_var(--gold-glow)] transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      <p className="flex items-center gap-1.5 text-[color:var(--text-muted)]">
        <Truck className="h-3.5 w-3.5 text-[color:var(--gold-400)]" /> Free delivery across India
      </p>
    </div>
  );
}
