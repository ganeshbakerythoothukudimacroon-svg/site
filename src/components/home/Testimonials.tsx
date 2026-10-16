import { SectionHeading } from "@/components/shared/SectionHeading";
import { GoogleReviewCard } from "@/components/shared/GoogleReviewCard";
import { googleReviews } from "@/lib/content/reviews";

const homeReviews = googleReviews.filter((r) => r.home);

export function Testimonials() {
  if (homeReviews.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="From Our Google Reviews" title="What Our Customers Say" align="center" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {homeReviews.map((review) => (
          <GoogleReviewCard key={review.name} review={review} />
        ))}
      </div>
    </section>
  );
}
