import { SectionHeading } from "@/components/shared/SectionHeading";
import { GoogleReviewCard } from "@/components/shared/GoogleReviewCard";
import { googleReviews } from "@/lib/content/reviews";

export function Testimonials() {
  if (googleReviews.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="From Our Google Reviews" title="What Our Customers Say" align="center" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {googleReviews.map((review) => (
          <GoogleReviewCard key={review.name} review={review} />
        ))}
      </div>
    </section>
  );
}
