import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ShopSection } from "@/components/home/ShopSection";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaSection } from "@/components/home/CtaSection";
import {
  getProducts,
  getServices,
  getSiteContent,
  getTestimonials,
} from "@/lib/content";
import { JsonLd, localBusinessSchema, websiteSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [content, allServices, products, testimonials] = await Promise.all([
    getSiteContent(),
    getServices(),
    getProducts(true),
    getTestimonials(),
  ]);

  const services = allServices.filter((s) => s.is_featured);

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(content, allServices),
          websiteSchema(content),
        ]}
      />
      <Hero content={content} />
      <AboutSection content={content} />
      <ServicesSection content={content} services={services} />
      <ShopSection content={content} products={products} />
      <Testimonials content={content} testimonials={testimonials} />
      <CtaSection content={content} />
    </>
  );
}
