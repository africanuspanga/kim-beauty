"use client";

import { Plus, Trash2 } from "lucide-react";
import type { ProductColorOption } from "@/lib/types";

export function ColorOptionsField({
  value,
  onChange,
  imageCount,
}: {
  value: ProductColorOption[];
  onChange: (options: ProductColorOption[]) => void;
  imageCount: number;
}) {
  function update(index: number, patch: Partial<ProductColorOption>) {
    onChange(value.map((option, itemIndex) => (itemIndex === index ? { ...option, ...patch } : option)));
  }

  return (
    <div>
      <label className="block text-[13px] font-semibold text-ink">Color or hair number</label>
      <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
        Add choices such as 1B, 1/27 or Burgundy. You can link each choice to a product photo.
      </p>

      {value.length ? (
        <div className="mt-3 space-y-2.5">
          {value.map((option, index) => (
            <div key={`${option.name}-${index}`} className="grid grid-cols-[1fr_auto_auto] items-center gap-2.5 rounded-xl border border-line bg-cream p-2.5">
              <input
                value={option.name}
                onChange={(event) => update(index, { name: event.target.value })}
                placeholder="e.g. 1B"
                aria-label={`Color or hair number ${index + 1}`}
                className="h-10 min-w-0 rounded-lg border border-line bg-white px-3 text-sm outline-none transition focus:border-gold-400"
              />
              <select
                value={Math.min(option.image_index ?? 0, Math.max(0, imageCount - 1))}
                onChange={(event) => update(index, { image_index: Number(event.target.value) })}
                aria-label={`Photo for ${option.name || `choice ${index + 1}`}`}
                disabled={imageCount === 0}
                className="h-10 max-w-28 rounded-lg border border-line bg-white px-2 text-xs text-ink-soft outline-none transition focus:border-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {Array.from({ length: Math.max(imageCount, 1) }, (_, imageIndex) => (
                  <option key={imageIndex} value={imageIndex}>
                    Photo {imageIndex + 1}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}
                aria-label={`Remove ${option.name || "color choice"}`}
                className="rounded-lg p-2.5 text-muted transition hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => onChange([...value, { name: "", image_index: 0 }])}
        className="mt-3 inline-flex h-10 items-center gap-2 rounded-full border border-gold-500/40 px-4 text-[13px] font-medium text-gold-700 transition hover:bg-gold-50"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        Add color or number
      </button>
    </div>
  );
}
