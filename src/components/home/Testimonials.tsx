import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const PLACEHOLDER_TESTIMONIALS = [
  {
    quote: "The butter biscuits taste exactly the way I remember — nothing has changed except I order a box every month now instead of walking to the shop.",
    attribution: "Customer, Thoothukudi",
  },
  {
    quote: "Ordered rusks and macaroons for a family function and everyone kept asking where they were from. Fresh, well packed, and gone within a day.",
    attribution: "Customer, Thoothukudi",
  },
  {
    quote: "Simple, honest baking — no shortcuts. This is the taste I grew up with.",
    attribution: "Customer, Thoothukudi",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Customer Love" title="What Our Customers Say" align="center" />
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {PLACEHOLDER_TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="glass-subtle flex flex-col justify-between rounded-[var(--radius-card)] border border-dashed border-[color:var(--glass-border-strong)] p-6"
          >
            <Quote className="h-6 w-6 text-[color:var(--gold-500)]/60" />
            <p className="mt-3 text-sm text-[color:var(--text-secondary)]">&ldquo;{t.quote}&rdquo;</p>
            <p className="label-tracked mt-4 text-[color:var(--text-muted)]">{t.attribution}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
