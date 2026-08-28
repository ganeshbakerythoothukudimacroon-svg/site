import { Award, Sparkles, ScrollText, Wheat, Heart, Truck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function TrustStrip() {
  const heritageYears = Math.floor((new Date().getFullYear() - siteConfig.since) / 10) * 10;

  const items = [
    { label: `${heritageYears}+ Years of Heritage`, icon: Award },
    { label: "Freshly Prepared", icon: Sparkles },
    { label: "Authentic Recipes", icon: ScrollText },
    { label: "Quality Ingredients", icon: Wheat },
    { label: "Trusted Family Bakery", icon: Heart },
    { label: "Delivery Available", icon: Truck },
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item) => (
            <li
              key={item.label}
              className="glass-card glow-gold-hover group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl px-4 py-7 text-center"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at 50% 0%, var(--gold-glow), transparent 65%)" }}
                aria-hidden="true"
              />
              <span className="glass-premium glow-gold relative flex h-12 w-12 items-center justify-center rounded-full text-[color:var(--gold-400)]">
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="relative text-xs font-medium text-[color:var(--text-primary)] sm:text-sm">
                {item.label}
              </span>
              <span
                className="relative h-px w-8 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, var(--gold-500), transparent)" }}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
