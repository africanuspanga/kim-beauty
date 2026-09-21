"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory } from "@/lib/types";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" },
];

export function ShopBrowser({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) {
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
            placeholder="Search products…"
            aria-label="Search products"
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
            aria-label="Sort products"
            className="h-12 w-full cursor-pointer appearance-none rounded-full border border-line bg-cream pl-11 pr-10 text-sm outline-none transition focus:border-gold-400 sm:w-56"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
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
          All Products
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
        Showing <span className="font-semibold text-ink">{visible.length}</span>{" "}
        {visible.length === 1 ? "product" : "products"}
      </p>

      {visible.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-line py-20 text-center">
          <p className="text-lg text-ink">No products match that search</p>
          <p className="mt-2 text-sm text-muted">
            Try a different keyword or browse another category.
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
