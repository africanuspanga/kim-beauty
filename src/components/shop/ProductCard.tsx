"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { useT } from "@/components/i18n/I18nProvider";
import { formatPrice } from "@/lib/utils";
import type { Product, ProductColorOption } from "@/lib/types";

function ProductImageCarousel({
  images,
  name,
  activeIndex,
  onActiveIndexChange,
}: {
  images: string[];
  name: string;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
}) {
  const t = useT();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: track.clientWidth * activeIndex, behavior: "smooth" });
  }, [activeIndex]);

  function goTo(index: number) {
    onActiveIndexChange((index + images.length) % images.length);
  }

  if (images.length === 0) return null;

  return (
    <>
      <div
        ref={trackRef}
        onScroll={(event) => {
          const width = event.currentTarget.clientWidth;
          if (width) onActiveIndexChange(Math.round(event.currentTarget.scrollLeft / width));
        }}
        className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
        aria-label={t.product.photos(name)}
      >
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className="relative h-full min-w-full snap-center">
            <Image
              src={image}
              alt={index === 0 ? name : t.product.photoN(name, index + 1)}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              unoptimized={!image.startsWith("/")}
            />
          </div>
        ))}
      </div>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label={t.product.previousPhoto}
            className="absolute left-2 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink shadow-sm transition hover:bg-cream sm:flex"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label={t.product.nextPhoto}
            className="absolute right-2 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink shadow-sm transition hover:bg-cream sm:flex"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink/55 px-2 py-1.5 backdrop-blur-sm">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={t.product.showPhoto(index + 1)}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all ${
                  activeIndex === index ? "w-4 bg-white" : "w-1.5 bg-white/55 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}

function colorOptions(product: Product): ProductColorOption[] {
  return (product.color_options ?? []).filter(
    (option): option is ProductColorOption =>
      typeof option?.name === "string" && option.name.trim().length > 0
  );
}

export function ProductCard({ product }: { product: Product }) {
  const t = useT();
  const { addItem } = useCart();
  const images = Array.from(
    new Set([product.image_url, ...(product.gallery ?? [])].filter((image): image is string => Boolean(image)))
  );
  const colors = colorOptions(product);
  const [selectedColor, setSelectedColor] = useState<string | null>(colors[0]?.name ?? null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const primaryImage = images[0] ?? null;

  const onSale =
    product.compare_at_price != null && product.compare_at_price > product.price;
  const discount = onSale
    ? Math.round(
        ((product.compare_at_price! - product.price) / product.compare_at_price!) * 100
      )
    : 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-cream transition-all duration-400 hover:-translate-y-1.5 hover:border-gold-200 hover:shadow-lift">
      {/* Photos only: kept LTR so the swipe maths (scrollLeft) holds in Arabic. */}
      <div dir="ltr" className="relative aspect-square overflow-hidden bg-blush-100">
        <ProductImageCarousel
          images={images}
          name={product.name}
          activeIndex={activeImageIndex}
          onActiveIndexChange={setActiveImageIndex}
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {onSale ? (
            <span className="rounded-full bg-gold-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              -{discount}%
            </span>
          ) : null}
          {product.is_featured ? (
            <span className="rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-700 backdrop-blur-sm">
              {t.product.bestseller}
            </span>
          ) : null}
        </div>

        {!product.in_stock ? (
          <div className="absolute inset-0 flex items-center justify-center bg-cream/75 backdrop-blur-[2px]">
            <span className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cream">
              {t.product.soldOut}
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
              image_url: images[activeImageIndex] ?? primaryImage,
              slug: product.slug,
              ...(selectedColor
                ? {
                    lineId: `${product.id}:${selectedColor}`,
                    name: `${product.name} (${selectedColor})`,
                  }
                : {}),
            })
          }
          disabled={!product.in_stock}
          aria-label={t.product.addToCartLabel(product.name)}
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

        {colors.length ? (
          <div className="mt-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              {t.product.colorOrNumber}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
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
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
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
              image_url: images[activeImageIndex] ?? primaryImage,
              slug: product.slug,
              ...(selectedColor
                ? {
                    lineId: `${product.id}:${selectedColor}`,
                    name: `${product.name} (${selectedColor})`,
                  }
                : {}),
              })
            }
            disabled={!product.in_stock}
            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-gold-500/40 text-sm font-medium text-gold-700 transition hover:bg-gold-gradient hover:text-white hover:border-transparent disabled:opacity-40 disabled:pointer-events-none sm:hidden"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            {t.common.addToCart}
          </button>
        </div>
      </div>
    </article>
  );
}
