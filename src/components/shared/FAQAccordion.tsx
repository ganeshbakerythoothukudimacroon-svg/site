"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <dl className="glass-card divide-y divide-[color:var(--glass-border)] rounded-[var(--radius-card)] overflow-hidden">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-panel-${i}`;
        return (
          <div key={item.question}>
            <dt>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[color:var(--glass-bg-1)]"
              >
                <span className={`font-medium ${isOpen ? "text-[color:var(--gold-300)]" : "text-[color:var(--text-primary)]"}`}>
                  {item.question}
                </span>
                <Plus
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 text-[color:var(--gold-400)] transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`}
                />
              </button>
            </dt>
            <dd
              id={panelId}
              className="grid text-sm text-[color:var(--text-secondary)] transition-all duration-300 ease-out motion-reduce:transition-none"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-pretty">{item.answer}</p>
              </div>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
