import Image from "next/image";
import Link from "next/link";
import { formatAddress, siteConfig } from "@/lib/site-config";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All Products" },
      { href: "/bakery-in-thoothukudi", label: "Categories" },
      { href: "/gifting", label: "Gift Boxes" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/about#story", label: "Our Story" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Customer",
    links: [
      { href: "/track-order", label: "Track Order" },
      { href: "/shipping-policy", label: "Shipping" },
      { href: "/returns-policy", label: "Returns" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
      { href: "/returns-policy", label: "Refund Policy" },
      { href: "/shipping-policy", label: "Shipping Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-[color:var(--glass-border)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 400px at 15% 0%, rgba(122,6,66,0.28), transparent 60%), radial-gradient(600px 400px at 90% 100%, rgba(232,169,74,0.08), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="glow-gold relative h-12 w-12 shrink-0 rounded-full">
                <Image src="/brand/emblem.png" alt="Ganesh Bakery" fill className="object-contain" />
              </span>
              <div>
                <p className="font-display text-xl italic text-[color:var(--gold-400)]">{siteConfig.brandName}</p>
                <p className="label-tracked text-[10px] text-[color:var(--text-muted)]">
                  Est. {siteConfig.since} · {siteConfig.locality}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm text-[color:var(--text-secondary)]">
              Authentic Tuticorin bakery specialities from {siteConfig.brandName}, {siteConfig.shopBranch} — baking
              since {siteConfig.since}.
            </p>
            <div className="mt-5 flex gap-3">
              <SocialIcon href={siteConfig.instagramUrl} label="Instagram">
                <InstagramGlyph className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={siteConfig.facebookUrl} label="Facebook">
                <FacebookGlyph className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={`https://wa.me/${siteConfig.whatsappNumber}`} label="WhatsApp">
                <WhatsAppGlyph className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="label-tracked text-[color:var(--gold-500)]">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="glass-subtle mt-12 rounded-2xl p-6 text-sm text-[color:var(--text-secondary)]">
          <p className="font-display text-base text-[color:var(--text-primary)]">
            {siteConfig.brandName} — {siteConfig.shopBranch}
          </p>
          <p className="mt-1">{formatAddress()}</p>
          <p className="mt-1">GSTIN: {siteConfig.gstNumber}</p>
        </div>

        <p className="mt-8 text-xs text-[color:var(--text-muted)]">
          © {new Date().getFullYear()} {siteConfig.brandName}, {siteConfig.shopBranch}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="glass-button flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--text-secondary)] hover:text-[color:var(--gold-400)]"
    >
      {children}
    </a>
  );
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46H16.5V4.35C16.24 4.3 15.35 4.2 14.3 4.2c-2.2 0-3.7 1.34-3.7 3.8v2.5H8v3h2.6V21z" />
    </svg>
  );
}
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2z" />
    </svg>
  );
}
