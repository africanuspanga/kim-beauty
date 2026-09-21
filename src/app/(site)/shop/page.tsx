import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { CtaSection } from "@/components/home/CtaSection";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { Reveal } from "@/components/ui/Reveal";
import { getCategories, getProducts, getSiteContent, pick } from "@/lib/content";
import { MessageCircle, ShieldCheck, Truck } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop Kim Beauty hair products, the Kim Collection of wigs, lashes, nail care and more. Order straight to our WhatsApp.",
};

const PERKS = [
  {
    Icon: Truck,
    title: "Arusha Delivery",
    body: "Same-day delivery across Arusha, nationwide shipping on request.",
  },
  {
    Icon: ShieldCheck,
    title: "Salon Tested",
    body: "Every product on this page is used by our own stylists.",
  },
  {
    Icon: MessageCircle,
    title: "Order on WhatsApp",
    body: "Build your cart, send it over, and we confirm stock instantly.",
  },
];

export default async function ShopPage() {
  const [content, products, categories] = await Promise.all([
    getSiteContent(),
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <PageHero
        breadcrumb="Shop"
        eyebrow={pick(content, "shop_page", "eyebrow", "Kim Shop")}
        title={pick(content, "shop_page", "title", "Salon-Grade Beauty Essentials")}
        description={pick(content, "shop_page", "description")}
      />

      <section className="pb-6">
        <div className="container-kb">
          <Reveal className="grid gap-4 sm:grid-cols-3">
            {PERKS.map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-3.5 rounded-2xl border border-line bg-blush-50/60 p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream text-gold-600">
                  <p.Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{p.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-kb">
          <ShopBrowser products={products} categories={categories} />
        </div>
      </section>

      <CtaSection content={content} />
    </>
  );
}
