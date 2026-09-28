"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useT } from "@/components/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory } from "@/lib/types";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

const SORTS: Sort[] = ["featured", "price-asc", "price-desc", "name"];

export function ShopBrowser({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) {
  const t = useT();
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = products.filter((p) => {
      const inCategory =
        category === "all" || p.product_categories?.slug === category;
      const matches =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q);
      return inCategory && matches;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort(
          (a, b) =>
            Number(b.is_featured) - Number(a.is_featured) ||
            a.sort_order - b.sort_order
        );
    }
    return sorted;
  }, [products, category, query, sort]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: products.length };
    for (const p of products) {
      const slug = p.product_categories?.slug;
      if (slug) map[slug] = (map[slug] ?? 0) + 1;
    }
    return map;
  }, [products]);

  return (
    <div>
      {/* search + sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.shop.searchPlaceholder}
            aria-label={t.shop.searchLabel}
            className="h-12 w-full rounded-full border border-line bg-cream pl-11 pr-4 text-sm outline-none transition focus:border-gold-400"
          />
        </div>

        <div className="relative">
          <SlidersHorizontal
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label={t.shop.sortLabel}
            className="h-12 w-full cursor-pointer appearance-none rounded-full border border-line bg-cream pl-11 pr-10 text-sm outline-none transition focus:border-gold-400 sm:w-56"
          >
            {SORTS.map((s) => (
              <option key={s} value={s}>
                {t.shop.sorts[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* category chips */}
      <div className="no-scrollbar -mx-5 mt-5 flex gap-2.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        <button
          onClick={() => setCategory("all")}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition",
            category === "all"
              ? "border-transparent bg-gold-gradient text-white"
              : "border-line bg-cream text-ink-soft hover:border-gold-300 hover:text-gold-700"
          )}
        >
          {t.shop.allProducts}
          <span className="ml-1.5 opacity-60">{counts.all ?? 0}</span>
        </button>

        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.slug)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition",
              category === c.slug
                ? "border-transparent bg-gold-gradient text-white"
                : "border-line bg-cream text-ink-soft hover:border-gold-300 hover:text-gold-700"
            )}
          >
            {c.name}
            <span className="ml-1.5 opacity-60">{counts[c.slug] ?? 0}</span>
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted">
        {t.shop.showing(visible.length)}
      </p>

      {visible.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-line py-20 text-center">
          <p className="text-lg text-ink">{t.shop.noMatch}</p>
          <p className="mt-2 text-sm text-muted">
            {t.shop.noMatchHint}
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
