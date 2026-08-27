"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/types";

export function ProductGallery({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="glass-premium relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: "radial-gradient(circle at 30% 20%, var(--gold-glow), transparent 60%)" }}
        />
        {current ? (
          <Image
            src={current.url}
            alt={current.alt || productName}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="relative z-10 object-cover object-right"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[color:var(--text-muted)]">Image coming soon</div>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${productName}`}
              aria-current={i === active}
              className={`glass-subtle relative aspect-square overflow-hidden rounded-xl border-2 transition-colors ${
                i === active ? "border-[color:var(--gold-500)]" : "border-transparent"
              }`}
            >
              <Image src={img.url} alt="" fill sizes="10vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
