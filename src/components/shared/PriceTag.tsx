const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function PriceTag({
  price,
  regularPrice,
  size = "md",
  from = false,
}: {
  price: number | null;
  regularPrice?: number | null;
  size?: "sm" | "md" | "lg";
  /** Show "From ₹…" — for products sold in several sizes. */
  from?: boolean;
}) {
  const textSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-lg";

  if (price === null) {
    return <span className={`${textSize} font-semibold text-gradient-gold`}>Price on request</span>;
  }

  const onSale = regularPrice && regularPrice > price;

  return (
    <span className="inline-flex items-baseline gap-2">
      {from && <span className="text-sm font-medium text-[color:var(--text-muted)]">From</span>}
      <span className={`${textSize} font-bold text-gradient-gold`}>{inr.format(price)}</span>
      {onSale && (
        <span className="text-sm text-[color:var(--text-muted)] line-through">{inr.format(regularPrice!)}</span>
      )}
    </span>
  );
}
