import type { MetadataRoute } from "next";
import { getServices } from "@/lib/content";
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
  try {
    services = (await getServices()).map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));
  } catch {
    /* database unreachable — still publish the static routes */
  }

  return [...staticPages, ...services];
}
