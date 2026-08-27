export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}>
      {eyebrow && <p className="label-tracked mb-3 text-[color:var(--gold-400)]">{eyebrow}</p>}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-balance text-[color:var(--text-primary)]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-[color:var(--text-secondary)] text-pretty">{description}</p>
      )}
    </div>
  );
}
