import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Customer Love" title="What Our Customers Say" align="center" />
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="glass-subtle flex flex-col justify-between rounded-[var(--radius-card)] border border-dashed border-[color:var(--glass-border-strong)] p-6"
          >
            <Quote className="h-6 w-6 text-[color:var(--gold-500)]/60" />
            <p className="mt-3 text-sm text-[color:var(--text-muted)]">
              [CLIENT TO PROVIDE: a real customer review for Shop No. 532 — quote, name, and location]
            </p>
            <p className="label-tracked mt-4 text-[color:var(--text-muted)]">Reserved slot {i}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
