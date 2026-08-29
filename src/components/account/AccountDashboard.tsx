"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, UserCircle2 } from "lucide-react";
import { AddressForm } from "./AddressForm";
import { OrderHistoryList } from "./OrderHistoryList";
import type { CustomerAddress, PublicOrder } from "@/lib/types";

export function AccountDashboard({
  name,
  email,
  address,
  orders,
}: {
  name: string;
  email: string;
  address: CustomerAddress | null;
  orders: PublicOrder[];
}) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <div className="glass-card flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-card)] p-6">
        <div className="flex items-center gap-3">
          <span className="glass-subtle flex h-11 w-11 items-center justify-center rounded-full text-[color:var(--gold-400)]">
            <UserCircle2 className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-base font-semibold text-[color:var(--text-primary)]">{name}</p>
            <p className="text-sm text-[color:var(--text-muted)]">{email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="glass-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)] disabled:opacity-60"
        >
          <LogOut className="h-4 w-4" /> {signingOut ? "Signing out…" : "Sign Out"}
        </button>
      </div>

      <AddressForm address={address} />

      <div>
        <h2 className="font-display text-lg font-semibold text-[color:var(--text-primary)]">Your Orders</h2>
        <div className="mt-4">
          <OrderHistoryList orders={orders} />
        </div>
      </div>
    </div>
  );
}
