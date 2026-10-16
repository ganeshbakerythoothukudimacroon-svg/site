import { siteConfig } from "@/lib/site-config";

/**
 * "Shop No. 532", highlighted inline — the branch number is how customers
 * tell this bakery apart from others using the Ganesh Bakery name, so it
 * should stand out wherever it appears in running text.
 */
export function ShopBranch() {
  return (
    <strong className="whitespace-nowrap rounded-md border border-[color:var(--gold-400)]/40 bg-[color:var(--gold-400)]/10 px-1.5 py-0.5 font-semibold text-[color:var(--gold-300)] shadow-[0_0_14px_-4px_var(--gold-glow)]">
      {siteConfig.shopBranch}
    </strong>
  );
}
