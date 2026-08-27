"use client";

import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  onChange,
  max,
}: {
  value: number;
  onChange: (value: number) => void;
  max?: number | null;
}) {
  return (
    <div className="glass-subtle inline-flex items-center rounded-full">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="flex h-11 w-11 items-center justify-center text-[color:var(--text-secondary)] hover:text-[color:var(--gold-400)]"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-base font-medium text-[color:var(--text-primary)]" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(max ? Math.min(max, value + 1) : value + 1)}
        className="flex h-11 w-11 items-center justify-center text-[color:var(--text-secondary)] hover:text-[color:var(--gold-400)]"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
