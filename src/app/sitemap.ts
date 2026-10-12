import type { MetadataRoute } from "next";
import { getProducts, getServices } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

// Services are edited in the admin, so the sitemap is built per request
// rather than frozen at build time.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/shop"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/booking"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  let services: MetadataRoute.Sitemap = [];
  let products: MetadataRoute.Sitemap = [];
  try {
    const [allServices, allProducts] = await Promise.all([getServices(), getProducts()]);

    services = allServices.flatMap((service) => [
      {
        url: absoluteUrl(`/services/${service.slug}`),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      },
      ...(service.service_options ?? []).map((option) => ({
        url: absoluteUrl(`/services/${service.slug}/${option.slug}`),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ]);

    products = allProducts.map((product) => ({
      url: absoluteUrl(`/shop/${product.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    /* database unreachable — still publish the static routes */
  }

  return [...staticPages, ...services, ...products];
}
