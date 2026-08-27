export function Badge({
  children,
  tone = "gold",
}: {
  children: React.ReactNode;
  tone?: "gold" | "purple" | "neutral";
}) {
  const toneClasses = {
    gold: "bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] text-[color:var(--bg-void)] shadow-[0_0_12px_var(--gold-glow)]",
    purple: "glass-subtle text-[color:var(--purple-200)]",
    neutral: "glass-subtle text-[color:var(--text-secondary)]",
  }[tone];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${toneClasses}`}
    >
      {children}
    </span>
  );
}
