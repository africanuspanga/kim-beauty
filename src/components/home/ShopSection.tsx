import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/shop/ProductCard";
import type { ContentMap } from "@/lib/content";
import { pick } from "@/lib/content";
import type { Product } from "@/lib/types";

export function ShopSection({
  content,
  products,
}: {
  content: ContentMap;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section id="shop" className="py-20 md:py-28">
      <div className="container-kb">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow={pick(content, "shop_section", "eyebrow", "Kim Shop")}
            title={pick(content, "shop_section", "title", "Take The Salon Home")}
            description={pick(content, "shop_section", "description")}
            className="max-w-xl"
          />
          <ButtonLink
            href={pick(content, "shop_section", "cta_href", "/shop")}
            variant="outline"
            size="md"
            className="group shrink-0"
          >
            {pick(content, "shop_section", "cta_label", "Browse The Shop")}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </ButtonLink>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {products.slice(0, 8).map((product, i) => (
            <Reveal key={product.id} delay={i * 60}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
