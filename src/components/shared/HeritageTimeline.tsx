import { siteConfig } from "@/lib/site-config";

// Every milestone here is confirmed by the family or a published source —
// keep it that way. No invented "regional sensation" style milestones.
const milestones = [
  {
    year: String(siteConfig.since),
    title: "The Beginning",
    text: `Shri K. Dharmalingam founds ${siteConfig.brandName} at ${siteConfig.shopBranch}, V.E. Road, ${siteConfig.locality}.`,
  },
  {
    year: "1970 – 2020",
    title: "Five Decades of Care",
    text: "Smt. Poomani Ammal guides the bakery for fifty years, keeping its recipes, quality and loyal customers at the heart of everything.",
  },
  {
    year: "2012",
    title: "Featured in The Hindu",
    text: `The Hindu's MetroPlus calls ${siteConfig.brandName} "arguably the most popular in the city", with crowds at the counter at any time of the day.`,
  },
  {
    year: "2020 – 2023",
    title: "The Next Generation",
    text: "Shri T. Katteri Raj takes the bakery forward, carrying the family's standards into a new era.",
  },
  {
    year: "2023 – Today",
    title: "Leading Today",
    text: "Smt. Prabavathi Katteri Raj leads the bakery, continuing the same family recipes and care at our counter on V.E. Road.",
  },
  {
    year: "2026",
    title: "Across India",
    text: "Our online store opens, bringing the taste of Thoothukudi to homes across the country.",
  },
];

export function HeritageTimeline() {
  return (
    <ol className="relative mt-6 space-y-6 border-l border-[color:var(--gold-400)]/30 pl-6 sm:pl-8">
      {milestones.map((m) => (
        <li key={m.year} className="relative">
          <span
            className="glow-gold absolute -left-[31px] top-5 h-3.5 w-3.5 rounded-full bg-[color:var(--gold-400)] ring-4 ring-[color:var(--gold-400)]/20 sm:-left-[39px]"
            aria-hidden="true"
          />
          <div className="glass-subtle rounded-2xl p-5">
            <p className="label-tracked text-xs text-[color:var(--gold-400)]">{m.year}</p>
            <h3 className="mt-1.5 font-display text-xl font-semibold text-[color:var(--text-primary)]">{m.title}</h3>
            <p className="mt-2 text-sm text-[color:var(--text-secondary)] text-pretty">{m.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
