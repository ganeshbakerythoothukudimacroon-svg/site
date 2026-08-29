"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Home,
  ShoppingBag,
  LayoutGrid,
  Info,
  BookOpen,
  Truck,
  Gift,
  Users,
  Mail,
  HelpCircle,
  UserCircle2,
  X,
  ChevronRight,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Explore",
    items: [
      { href: "/", label: "Home", icon: Home },
      { href: "/shop", label: "Shop", icon: ShoppingBag },
      { href: "/bakery-in-thoothukudi", label: "Categories", icon: LayoutGrid },
    ],
  },
  {
    title: "Our Story",
    items: [
      { href: "/about", label: "About Us", icon: Info },
      { href: "/thoothukudi-macroons", label: "Our Story", icon: BookOpen },
    ],
  },
  {
    title: "Orders & Gifting",
    items: [
      { href: "/account", label: "My Account", icon: UserCircle2 },
      { href: "/track-order", label: "Track Order", icon: Truck },
      { href: "/gifting", label: "Gift Hampers", icon: Gift },
      { href: "/bulk-orders", label: "Bulk Orders", icon: Users },
    ],
  },
  {
    title: "Support",
    items: [
      { href: "/contact", label: "Contact Us", icon: Mail },
      { href: "/faq", label: "FAQs", icon: HelpCircle },
    ],
  },
];

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (open) {
      // Mount-then-animate on open — a one-off transition trigger, not a
      // reactive subscription, so this doesn't cascade.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      const raf = requestAnimationFrame(() => setEntered(true));
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = "";
      };
    }
    setEntered(false);
    const t = setTimeout(() => setMounted(false), 320);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }
  function handleTouchEnd(e: React.TouchEvent) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (dx < -60 && Math.abs(dy) < 60) onClose();
  }

  if (!mounted) return null;

  let itemIndex = 0;

  return (
    <div className="fixed inset-0 z-50">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[color:var(--bg-void)]/70 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none"
        style={{ opacity: entered ? 1 : 0 }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="glass-premium no-scrollbar absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto rounded-r-[1.75rem] transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ transform: entered ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="pt-[max(1.5rem,env(safe-area-inset-top))]" />

        <div className="flex items-start justify-between gap-2 px-6 pb-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="glow-gold relative h-12 w-12 shrink-0 rounded-full">
              <Image src="/brand/emblem.png" alt="" fill className="object-contain" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-xl italic text-[color:var(--gold-400)]">Ganesh Bakery</p>
              <p
                className="label-tracked mt-0.5 truncate text-[10px] text-[color:var(--text-muted)]"
                style={{ letterSpacing: "0.04em" }}
              >
                Est. {siteConfig.since} · {siteConfig.locality}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="glass-button flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[color:var(--text-secondary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 px-4 pb-4" aria-label="Mobile primary">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="mb-2">
              <p className="label-tracked px-3 pb-2 pt-3 text-[color:var(--text-muted)]">{group.title}</p>
              <ul className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  const delay = itemIndex++ * 35;
                  return (
                    <li
                      key={item.href}
                      className="transition-all duration-300 ease-out motion-reduce:transition-none"
                      style={{
                        transitionDelay: `${delay}ms`,
                        opacity: entered ? 1 : 0,
                        transform: entered ? "translateX(0)" : "translateX(-12px)",
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        prefetch={item.href === "/account" ? false : undefined}
                        className={`group relative flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors ${
                          active
                            ? "bg-gradient-to-r from-[color:var(--purple-500)]/40 to-[color:var(--gold-500)]/10 text-[color:var(--gold-300)]"
                            : "text-[color:var(--text-secondary)] hover:bg-[color:var(--glass-bg-2)] hover:text-[color:var(--text-primary)]"
                        }`}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-[color:var(--gold-500)] shadow-[0_0_10px_var(--gold-glow)]" />
                        )}
                        <item.icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-[color:var(--gold-400)]" : ""}`} />
                        <span className="flex-1 text-[15px] font-medium">{item.label}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-[color:var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="glass-subtle mx-4 mb-[max(1.25rem,env(safe-area-inset-bottom))] rounded-2xl p-5">
          <p className="font-display text-base text-[color:var(--text-primary)]">{siteConfig.brandName}</p>
          <p className="mt-1 text-sm text-[color:var(--text-secondary)]">{siteConfig.shopBranch}</p>
          <p className="text-sm text-[color:var(--text-muted)]">
            {siteConfig.locality}, {siteConfig.address.state}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <a
              href={`tel:${siteConfig.phone}`}
              aria-label="Call us"
              className="glass-button flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--text-secondary)]"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp us"
              className="glass-button flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--text-secondary)]"
            >
              <WhatsAppGlyph className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="glass-button flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--text-secondary)]"
            >
              <InstagramGlyph className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="glass-button flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--text-secondary)]"
            >
              <FacebookGlyph className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[color:var(--text-muted)]">
            <Link href="/privacy-policy" onClick={onClose} className="hover:text-[color:var(--text-secondary)]">
              Privacy
            </Link>
            <Link href="/terms" onClick={onClose} className="hover:text-[color:var(--text-secondary)]">
              Terms
            </Link>
            <Link href="/shipping-policy" onClick={onClose} className="hover:text-[color:var(--text-secondary)]">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2z" />
    </svg>
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
