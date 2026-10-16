import { Quote, Star } from "lucide-react";
import type { GoogleReview } from "@/lib/content/reviews";

export function GoogleReviewCard({ review }: { review: GoogleReview }) {
  return (
    <figure className="glass-subtle flex flex-col rounded-[var(--radius-card)] border border-[color:var(--glass-border)] p-6 transition-shadow duration-300 hover:shadow-[0_10px_40px_-14px_var(--gold-glow)]">
      <div className="flex items-center justify-between">
        <Quote className="h-6 w-6 text-[color:var(--gold-500)]/60" />
        <span className="flex gap-0.5" role="img" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < review.rating ? "fill-[color:var(--gold-400)] text-[color:var(--gold-400)]" : "text-[color:var(--text-muted)]"}`}
            />
          ))}
        </span>
      </div>
      <blockquote className="mt-3 flex-1 text-sm text-[color:var(--text-secondary)] text-pretty">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="mt-4">
        <p className="text-sm font-semibold text-[color:var(--text-primary)]">{review.name}</p>
        <p className="label-tracked mt-0.5 text-[10px] text-[color:var(--text-muted)]">
          {review.detail ? `${review.detail} · ` : ""}Google review
        </p>
      </figcaption>
    </figure>
  );
}
