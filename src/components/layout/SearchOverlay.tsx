"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, X, Clock, TrendingUp } from "lucide-react";

const RECENT_KEY = "ganeshbakery-recent-searches";
const MAX_RECENT = 5;

const CATEGORIES = [
  { label: "Biscuits", slug: "biscuits" },
  { label: "Rusks", slug: "rusks" },
  { label: "Macaroons", slug: "macaroons" },
  { label: "Bakery Snacks", slug: "bakery-snacks" },
];

const POPULAR = ["Thoothukudi Macaroons", "Butter Biscuit", "Tea Rusk", "Nutbar"];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      // Mount-then-animate on open plus a one-time localStorage read —
      // not a reactive subscription, so this doesn't cascade.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      try {
        setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"));
      } catch {
        setRecent([]);
      }
      const raf = requestAnimationFrame(() => {
        setEntered(true);
        inputRef.current?.focus();
      });
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = "";
      };
    }
    setEntered(false);
    const t = setTimeout(() => setMounted(false), 250);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function runSearch(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;
    try {
      const next = [trimmed, ...recent.filter((r) => r !== trimmed)].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      // ignore storage failures
    }
    onClose();
    router.push(`/shop?q=${encodeURIComponent(trimmed)}`);
  }

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[color:var(--bg-void)]/75 backdrop-blur-sm transition-opacity duration-250 motion-reduce:transition-none"
        style={{ opacity: entered ? 1 : 0 }}
      />
      <div
        className="glass-premium no-scrollbar absolute left-1/2 top-[6vh] max-h-[88dvh] w-[92%] max-w-xl overflow-y-auto overscroll-contain rounded-3xl p-5 transition-all duration-250 ease-out motion-reduce:transition-none sm:top-[12vh] sm:max-h-[76dvh] sm:p-6"
        style={{
          opacity: entered ? 1 : 0,
          transform: entered ? "translate(-50%, 0) scale(1)" : "translate(-50%, -8px) scale(0.98)",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch(query);
          }}
          role="search"
          className="glass-subtle flex items-center gap-3 rounded-full px-4 py-3"
        >
          <Search className="h-5 w-5 shrink-0 text-[color:var(--gold-400)]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search macaroons, biscuits, rusk…"
            className="w-full bg-transparent text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </form>

        {recent.length > 0 && (
          <div className="mt-5">
            <p className="label-tracked mb-2 flex items-center gap-1.5 text-[color:var(--text-muted)]">
              <Clock className="h-3 w-3" /> Recent
            </p>
            <div className="flex flex-wrap gap-2">
              {recent.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => runSearch(term)}
                  className="glass-button rounded-full px-3.5 py-1.5 text-sm text-[color:var(--text-secondary)]"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5">
          <p className="label-tracked mb-2 flex items-center gap-1.5 text-[color:var(--text-muted)]">
            <TrendingUp className="h-3 w-3" /> Popular
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => runSearch(term)}
                className="glass-button rounded-full px-3.5 py-1.5 text-sm text-[color:var(--text-secondary)]"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="label-tracked mb-2 text-[color:var(--text-muted)]">Categories</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                onClick={onClose}
                className="glass-subtle glow-gold-hover rounded-xl px-3 py-2.5 text-center text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--gold-300)]"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
