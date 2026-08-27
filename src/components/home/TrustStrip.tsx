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
              className="glass-card glow-gold-hover flex flex-col items-center gap-3 rounded-2xl px-4 py-6 text-center"
            >
              <span className="glass-subtle flex h-11 w-11 items-center justify-center rounded-full text-[color:var(--gold-400)]">
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="text-xs font-medium text-[color:var(--text-secondary)] sm:text-sm">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
