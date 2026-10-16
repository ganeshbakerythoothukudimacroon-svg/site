import { getHeritageYears, siteConfig } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
    <div className="mt-10">
      <div className="relative">
      {/* Spine: a faint track, with a glowing gold fill that draws down as you scroll. */}
      <div
        className="absolute bottom-0 left-4 top-0 w-px bg-[color:var(--gold-400)]/15 md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      >
        <div
          className="cine-line-fill h-full w-full bg-gradient-to-b from-[color:var(--gold-300)] via-[color:var(--gold-500)] to-transparent"
          style={{ boxShadow: "0 0 12px 1px var(--gold-glow)" }}
        />
      </div>

      <ol className="relative space-y-16 md:space-y-20">
        {milestones.map((m, i) => {
          const onRight = i % 2 === 1;
          return (
            <li key={m.year} className="relative pl-11 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
              <span
                className="cine-pulse absolute left-4 top-8 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-gradient-to-br from-[color:var(--gold-300)] to-[color:var(--gold-600)] md:left-1/2"
                aria-hidden="true"
              />

              <div className={`relative ${onRight ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}>
                <span
                  className={`cine-watermark pointer-events-none absolute -top-9 select-none sm:-top-12 font-display text-6xl font-bold leading-none text-gradient-gold opacity-[0.14] sm:text-8xl ${
                    onRight ? "right-0" : "right-0 md:left-0 md:right-auto"
                  }`}
                  aria-hidden="true"
                >
                  {m.year.slice(0, 4)}
                </span>

                <div className="cine-reveal">
                  <div className="card-cinematic cine-sheen rounded-3xl p-5 sm:p-7">
                    <span className="label-tracked inline-block rounded-full border border-[color:var(--gold-400)]/30 bg-[color:var(--gold-400)]/10 px-3 py-1 text-[color:var(--gold-300)]">
                      {m.year}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold sm:text-2xl text-[color:var(--text-primary)] text-balance">
                      {m.title}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-[color:var(--text-secondary)] text-pretty sm:text-base">{m.text}</p>
                    <p className="label-tracked mt-5 text-[10px] text-[color:var(--gold-400)]/70">
                      {String(i + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      </div>

      <div className="cine-reveal relative mt-16 md:mx-auto md:max-w-md">
        <div className="card-cinematic cine-sheen glow-gold rounded-3xl px-6 py-8 text-center sm:p-8">
          <p className="label-tracked text-[color:var(--gold-400)]">Since {siteConfig.since}</p>
          <p className="mt-3 font-display text-[1.75rem] leading-tight font-semibold sm:text-3xl text-[color:var(--text-primary)] text-balance">
            {getHeritageYears()}+ years. <span className="italic text-gradient-gold">One family.</span>
          </p>
          <p className="mt-3 text-sm text-[color:var(--text-secondary)]">
            From one counter on V.E. Road to homes across India.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[color:var(--gold-300)] to-[color:var(--gold-500)] px-6 py-3 text-sm font-semibold text-[#1a0410] transition-transform duration-300 hover:scale-[1.03]"
          >
            Shop the Collection <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
