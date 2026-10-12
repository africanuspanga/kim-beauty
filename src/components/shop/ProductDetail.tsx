"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";
import { ProductImageCarousel, colorOptions, productImages } from "./ProductCard";
import { useT } from "@/components/i18n/I18nProvider";
import { buttonClass } from "@/components/ui/Button";
import { ShareButton } from "@/components/ui/ShareButton";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

/** The photo gallery, colour picker and cart button on a product's own page. */
export function ProductDetail({ product }: { product: Product }) {
  const t = useT();
  const { addItem } = useCart();
  const images = productImages(product);
  const colors = colorOptions(product);
  const [selectedColor, setSelectedColor] = useState<string | null>(colors[0]?.name ?? null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const onSale =
    product.compare_at_price != null && product.compare_at_price > product.price;

  function addToCart() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: images[activeImageIndex] ?? images[0] ?? null,
      slug: product.slug,
      ...(selectedColor
        ? {
            lineId: `${product.id}:${selectedColor}`,
            name: `${product.name} (${selectedColor})`,
          }
        : {}),
    });
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-12">
      <div>
        {/* Photos only: kept LTR so the swipe maths (scrollLeft) holds in Arabic. */}
        <div
          dir="ltr"
          className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-blush-100"
        >
          <ProductImageCarousel
            images={images}
            name={product.name}
            activeIndex={activeImageIndex}
            onActiveIndexChange={setActiveImageIndex}
            sizes="(max-width: 768px) 92vw, 46vw"
            priority
          />
          {!product.in_stock ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-cream/75 backdrop-blur-[2px]">
              <span className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cream">
                {t.product.soldOut}
              </span>
            </div>
          ) : null}
        </div>

        {images.length > 1 ? (
          <div dir="ltr" className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                aria-label={t.product.showPhoto(index + 1)}
                aria-current={activeImageIndex === index ? "true" : undefined}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                  activeImageIndex === index ? "border-gold-500" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col">
        {product.product_categories?.name ? (
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-600">
            {product.product_categories.name}
          </span>
        ) : null}

        <h1 className="mt-2 text-[clamp(1.8rem,4vw,2.8rem)] leading-tight">{product.name}</h1>

        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {formatPrice(product.price, product.currency)}
          </span>
          {onSale ? (
            <span className="text-[15px] text-muted line-through">
              {formatPrice(product.compare_at_price!, product.currency)}
            </span>
          ) : null}
        </div>

        {product.description ? (
          <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-ink-soft">
            {product.description}
          </p>
        ) : null}

        {colors.length ? (
          <div className="mt-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
              {t.product.colorOrNumber}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => {
                    setSelectedColor(color.name);
                    setActiveImageIndex(
                      Math.min(Math.max(color.image_index ?? 0, 0), Math.max(images.length - 1, 0))
                    );
                  }}
                  aria-pressed={selectedColor === color.name}
                  className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition ${
                    selectedColor === color.name
                      ? "border-transparent bg-ink text-cream"
                      : "border-line bg-white text-ink-soft hover:border-gold-300 hover:text-gold-700"
                  }`}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={addToCart}
            disabled={!product.in_stock}
            className={buttonClass("primary", "md", "w-full sm:w-auto")}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            {t.common.addToCart}
          </button>
          <ShareButton
            path={`/shop/${product.slug}`}
            title={product.name}
            text={`${product.name} — Kim Beauty`}
            variant="button"
            className="h-12 w-full sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
}
