import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { CtaSection } from "@/components/home/CtaSection";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductDetail } from "@/components/shop/ProductDetail";
import { getProductBySlug, getProducts, getSiteContent } from "@/lib/content";
import { getT } from "@/lib/i18n/server";
import { absoluteUrl, breadcrumbSchema, JsonLd, productSchema } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [product, t] = await Promise.all([getProductBySlug(slug), getT()]);

  if (!product) return { title: t.detail.notFound };

  const description = (
    product.description ||
    `${product.name} — ${formatPrice(product.price, product.currency)} at Kim Beauty, Arusha.`
  ).slice(0, 300);

  return {
    title: product.name,
    description,
    alternates: { canonical: absoluteUrl(`/shop/${product.slug}`) },
    openGraph: {
      title: `${product.name} — Kim Beauty`,
      description,
      url: absoluteUrl(`/shop/${product.slug}`),
      type: "website",
      images: product.image_url ? [{ url: absoluteUrl(product.image_url) }] : undefined,
    },
  };
}

function categoryIdsOf(product: Product): string[] {
  if (product.category_ids?.length) return product.category_ids;
  return product.category_id ? [product.category_id] : [];
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const [content, product, allProducts, t] = await Promise.all([
    getSiteContent(),
    getProductBySlug(slug),
    getProducts(),
    getT(),
  ]);

  if (!product) notFound();

  // Same-category products first, then the rest, so the row is never empty.
  const mine = new Set(categoryIdsOf(product));
  const others = allProducts.filter((p) => p.id !== product.id);
  const related = [
    ...others.filter((p) => categoryIdsOf(p).some((id) => mine.has(id))),
    ...others.filter((p) => !categoryIdsOf(p).some((id) => mine.has(id))),
  ].slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: product.name, path: `/shop/${product.slug}` },
          ]),
        ]}
      />

      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="container-kb">
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
              <li>
                <Link href="/" className="transition hover:text-gold-700">
                  {t.common.home}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </li>
              <li>
                <Link href="/shop" className="transition hover:text-gold-700">
                  {t.shop.breadcrumb}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </li>
              <li className="line-clamp-1 font-medium text-ink" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <ProductDetail product={product} />
        </div>
      </section>

      {related.length > 0 ? (
        <section className="pb-14 md:pb-20">
          <div className="container-kb">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[clamp(1.4rem,3vw,2rem)]">{t.detail.moreProducts}</h2>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold-700 hover:text-gold-600"
              >
                <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                {t.detail.backToShop}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaSection content={content} />
    </>
  );
}
