"use client";

import Link from "next/link";
import Script from "next/script";
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

interface RazorpaySuccessResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: "payment.failed", handler: (response: { error: { description: string } }) => void) => void;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "paying" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<AccountPrefill | null>(null);
  const [razorpayReady, setRazorpayReady] = useState(false);

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
    setError(null);

    if (!razorpayReady || !window.Razorpay) {
      setError("Payment is still loading — please wait a moment and try again.");
      return;
    }

    setStatus("loading");
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
      // Step 1: create the real WooCommerce order (unpaid, "pending") —
      // this is what actually prices and reserves the order.
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const checkoutJson = await checkoutRes.json();

      if (!checkoutRes.ok || !checkoutJson.ok) {
        setError(checkoutJson.error || "Something went wrong — please try again.");
        setStatus("idle");
        return;
      }

      const order = checkoutJson.order;

      // Step 2: open a Razorpay order for that order's real, server-priced total.
      const rpOrderRes = await fetch("/api/payments/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.orderId }),
      });
      const rpOrderJson = await rpOrderRes.json();

      if (!rpOrderRes.ok || !rpOrderJson.ok) {
        setError(rpOrderJson.error || "Couldn't start the payment — please try again.");
        setStatus("idle");
        return;
      }

      setStatus("paying");

      const razorpay = new window.Razorpay({
        key: rpOrderJson.keyId,
        amount: rpOrderJson.amount,
        currency: rpOrderJson.currency,
        order_id: rpOrderJson.razorpayOrderId,
        name: siteConfig.brandName,
        description: `Order #${order.orderNumber}`,
        prefill: {
          name: data.name,
          email: data.email || undefined,
          contact: data.phone,
        },
        theme: { color: "#e8a94a" },
        handler: async (response: RazorpaySuccessResponse) => {
          try {
            const verifyRes = await fetch("/api/payments/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: order.orderId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyJson = await verifyRes.json();

            if (!verifyRes.ok || !verifyJson.ok) {
              setError(verifyJson.error || "Payment could not be verified — please contact us before retrying.");
              setStatus("idle");
              return;
            }

            try {
              sessionStorage.setItem(`order-confirmation-${order.orderId}`, JSON.stringify(order));
            } catch {
              // Non-fatal — confirmation page just shows the generic fallback.
            }

            clearCart();
            router.push(`/order-confirmation/${order.orderId}`);
          } catch {
            setError("Payment succeeded but we couldn't confirm it here — please contact us with your order number.");
            setStatus("idle");
          }
        },
        modal: {
          // User closed the modal without paying — the order stays
          // "pending" in WooCommerce, so this is a safe, resumable state.
          ondismiss: () => {
            setStatus("idle");
          },
        },
      });

      razorpay.on("payment.failed", (response) => {
        setError(response.error?.description || "Payment failed — please try again.");
        setStatus("idle");
      });

      razorpay.open();
    } catch {
      setError("Something went wrong — please check your connection and try again.");
      setStatus("idle");
    }
  }

  const prefill = account?.address;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" onLoad={() => setRazorpayReady(true)} />
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
          disabled={status === "loading" || status === "paying" || !razorpayReady}
          className="glow-gold-hover flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-5 py-3 text-sm font-semibold text-[color:var(--bg-void)] disabled:opacity-60"
        >
          {status === "loading" ? "Placing Order…" : status === "paying" ? "Waiting for Payment…" : "Pay & Place Order"}
        </button>
        <p className="text-xs text-[color:var(--text-muted)]">
          Secure payment via UPI, cards, or netbanking through Razorpay.
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
