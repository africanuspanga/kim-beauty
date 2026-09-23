import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The admin panel is behind auth anyway — keep it out of the index.
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
