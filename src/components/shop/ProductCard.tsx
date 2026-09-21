"use client";

import Image from "next/image";
import { Plus, ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const onSale =
    product.compare_at_price != null && product.compare_at_price > product.price;
  const discount = onSale
    ? Math.round(
        ((product.compare_at_price! - product.price) / product.compare_at_price!) * 100
      )
    : 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-cream transition-all duration-400 hover:-translate-y-1.5 hover:border-gold-200 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-blush-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : null}

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {onSale ? (
            <span className="rounded-full bg-gold-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              -{discount}%
            </span>
          ) : null}
          {product.is_featured ? (
            <span className="rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-700 backdrop-blur-sm">
              Bestseller
            </span>
          ) : null}
        </div>

        {!product.in_stock ? (
          <div className="absolute inset-0 flex items-center justify-center bg-cream/75 backdrop-blur-[2px]">
            <span className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cream">
              Sold Out
            </span>
          </div>
        ) : null}

        {/* desktop quick-add */}
        <button
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image_url: product.image_url,
              slug: product.slug,
            })
          }
          disabled={!product.in_stock}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-3 right-3 hidden h-11 w-11 items-center justify-center rounded-full bg-gold-gradient text-white opacity-0 shadow-lg transition-all duration-300 hover:scale-110 group-hover:opacity-100 disabled:pointer-events-none sm:flex"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {product.product_categories?.name ? (
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-600">
            {product.product_categories.name}
          </span>
        ) : null}

        <h3 className="mt-1.5 line-clamp-2 font-sans text-[15px] font-medium leading-snug text-ink">
          {product.name}
        </h3>

        {product.description ? (
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">
            {product.description}
          </p>
        ) : null}

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="whitespace-nowrap font-display text-lg font-semibold text-ink sm:text-xl">
              {formatPrice(product.price, product.currency)}
            </span>
            {onSale ? (
              <span className="whitespace-nowrap text-[12px] text-muted line-through sm:text-[13px]">
                {formatPrice(product.compare_at_price!, product.currency)}
              </span>
            ) : null}
          </div>

          {/* mobile add-to-cart */}
          <button
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                slug: product.slug,
              })
            }
            disabled={!product.in_stock}
            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-gold-500/40 text-sm font-medium text-gold-700 transition hover:bg-gold-gradient hover:text-white hover:border-transparent disabled:opacity-40 disabled:pointer-events-none sm:hidden"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
