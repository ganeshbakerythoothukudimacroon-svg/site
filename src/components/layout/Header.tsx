"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, ShoppingBag, UserCircle2 } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { siteConfig } from "@/lib/site-config";
import { MobileDrawer } from "./MobileDrawer";
import { SearchOverlay } from "./SearchOverlay";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/gifting", label: "Gifting" },
  { href: "/bulk-orders", label: "Bulk Orders" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemsCount, openCart } = useCart();
  const pathname = usePathname();
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Edge-swipe to open the drawer: a touch starting near the left screen
    // edge that drags rightward opens it, matching how the panel itself
    // slides in from the left (translateX(-100%) -> 0 in MobileDrawer).
    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      swipeStart.current = t.clientX <= 24 && !menuOpen && !searchOpen ? { x: t.clientX, y: t.clientY } : null;
    }
    function onTouchMove(e: TouchEvent) {
      const start = swipeStart.current;
      if (!start) return;
      const t = e.touches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (dx > 60 && Math.abs(dy) < 40) {
        setMenuOpen(true);
        swipeStart.current = null;
      }
    }
    function onTouchEnd() {
      swipeStart.current = null;
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [menuOpen, searchOpen]);

  return (
    <>
      <header className="sticky top-[env(safe-area-inset-top)] z-30 glass-panel border-b border-[color:var(--glass-border)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Mobile: hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="glass-button flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--text-secondary)] lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2.5 lg:mr-4" aria-label="Ganesh Bakery home">
            <Image
              src="/brand/emblem.png"
              alt=""
              width={128}
              height={128}
              priority
              className="h-10 w-10 object-contain sm:h-12 sm:w-12 lg:h-14 lg:w-14"
            />
            <span className="hidden font-display text-xl italic leading-tight text-[color:var(--gold-400)] sm:inline sm:text-2xl">
              {siteConfig.brandName}
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`label-tracked relative py-2 transition-colors ${
                    active ? "text-[color:var(--gold-400)]" : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px w-full bg-gradient-to-r from-[color:var(--gold-500)] to-transparent transition-opacity ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="glass-button flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--text-secondary)]"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <Link
              href="/track-order"
              className="label-tracked hidden h-10 items-center rounded-full px-3 text-[color:var(--text-secondary)] hover:text-[color:var(--gold-400)] md:flex"
            >
              Track Order
            </Link>

            <Link
              href="/account"
              aria-label="Your account"
              prefetch={false}
              className="glass-button hidden h-10 w-10 items-center justify-center rounded-full text-[color:var(--text-secondary)] md:flex"
            >
              <UserCircle2 className="h-[18px] w-[18px]" />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${itemsCount} item${itemsCount === 1 ? "" : "s"}`}
              className="glass-button relative flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--text-secondary)]"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[color:var(--gold-500)] px-1 text-[11px] font-bold text-[color:var(--bg-void)] shadow-[0_0_8px_var(--gold-glow)]">
                  {itemsCount}
                </span>
              )}
            </button>

            <Link
              href="/shop"
              className="glow-gold-hover hidden items-center rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-5 py-2.5 text-sm font-semibold text-[color:var(--bg-void)] lg:inline-flex"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </header>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
