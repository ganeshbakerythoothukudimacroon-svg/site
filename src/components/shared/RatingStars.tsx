import { Star } from "lucide-react";

export function RatingStars({
  rating,
  reviewCount,
}: {
  rating: number | null;
  reviewCount: number;
}) {
  if (rating === null || reviewCount === 0) return null;

  return (
    <div className="flex items-center gap-1.5 text-sm" aria-label={`Rated ${rating} out of 5`}>
      <span className="flex text-[color:var(--gold-400)]" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="h-3.5 w-3.5" fill={i < Math.round(rating) ? "currentColor" : "none"} />
        ))}
      </span>
      <span className="text-[color:var(--text-muted)]">
        {rating.toFixed(1)} ({reviewCount})
      </span>
    </div>
  );
}
