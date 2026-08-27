import Link from "next/link";
import { Gift, Users, ArrowRight, MessageCircle } from "lucide-react";

export function GiftingAndBulk() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="glass-card relative overflow-hidden rounded-[var(--radius-card)] p-8">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, var(--gold-glow), transparent 70%)" }}
          />
          <span className="glass-subtle flex h-11 w-11 items-center justify-center rounded-full text-[color:var(--gold-400)]">
            <Gift className="h-5 w-5" />
          </span>
          <p className="label-tracked mt-5 text-[color:var(--gold-400)]">Gifting</p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-[color:var(--text-primary)]">
            Festival &amp; Family Gift Boxes
          </h3>
          <p className="mt-3 text-sm text-[color:var(--text-secondary)]">
            Share the taste of Tuticorin with family and friends — thoughtfully packed gift boxes for festivals
            and special occasions.
          </p>
          <Link
            href="/gifting"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]"
          >
            Explore Gifting <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="glass-premium relative overflow-hidden rounded-[var(--radius-card)] p-8">
          <div
            className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, var(--purple-glow), transparent 70%)" }}
          />
          <span className="glass-subtle flex h-11 w-11 items-center justify-center rounded-full text-[color:var(--gold-400)]">
            <Users className="h-5 w-5" />
          </span>
          <p className="label-tracked mt-5 text-[color:var(--gold-400)]">Bulk &amp; Corporate</p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-[color:var(--text-primary)]">
            Planning a Large Order?
          </h3>
          <p className="mt-3 text-sm text-[color:var(--text-secondary)]">
            Weddings, corporate gifting, festival orders or return gifts — get in touch and we&apos;ll work out
            the details with you directly.
          </p>
          <Link
            href="/bulk-orders"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]"
          >
            <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}
