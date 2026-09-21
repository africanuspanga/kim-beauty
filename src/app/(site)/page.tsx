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

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [content, services, products, testimonials] = await Promise.all([
    getSiteContent(),
    getServices(true),
    getProducts(true),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero content={content} />
      <AboutSection content={content} />
      <ServicesSection content={content} services={services} />
      <ShopSection content={content} products={products} />
      <Testimonials content={content} testimonials={testimonials} />
      <CtaSection content={content} />
    </>
  );
}
