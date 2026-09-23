import type { ContentMap } from "@/lib/content";
import { pick } from "@/lib/content";
import type { Product, Service } from "@/lib/types";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.kimbeauty.store"
).replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  // Admin uploads already come back as full Supabase storage URLs.
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Drops a JSON-LD block into the page for Google's rich results. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own database, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** "Mon – Fri · 8:00 AM – 8:00 PM" → { opens: "08:00", closes: "20:00" } */
function parseHours(label: string) {
  const times = label.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/gi);
  if (!times || times.length < 2) return null;

  const to24 = (t: string) => {
    const [, h, m, ap] = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)!;
    let hour = Number(h) % 12;
    if (ap.toUpperCase() === "PM") hour += 12;
    return `${String(hour).padStart(2, "0")}:${m}`;
  };

  return { opens: to24(times[0]), closes: to24(times[1]) };
}

function openingHours(content: ContentMap) {
  const windows: { field: string; days: string[] }[] = [
    { field: "hours_weekday", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
    { field: "hours_saturday", days: ["Saturday"] },
    { field: "hours_sunday", days: ["Sunday"] },
  ];

  return windows
    .map(({ field, days }) => {
      const hours = parseHours(pick(content, "contact", field));
      return hours
        ? {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: days,
            opens: hours.opens,
            closes: hours.closes,
          }
        : null;
    })
    .filter(Boolean);
}

const SOCIAL_FIELDS = [
  "instagram",
  "tiktok",
  "facebook",
  "youtube",
  "x",
  "pinterest",
  "threads",
  "linktree",
];

/**
 * The salon itself — this is the block that feeds the Google Business
 * style knowledge panel, so it carries address, hours, phone and socials.
 */
export function localBusinessSchema(content: ContentMap, services: Service[] = []) {
  const address = pick(content, "contact", "address");
  const [street] = address.split(",");

  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": absoluteUrl("/#business"),
    name: pick(content, "branding", "site_name", "Kim Beauty"),
    alternateName: "Kim Beauty Salons",
    description: pick(
      content,
      "footer",
      "tagline",
      "A modern beauty studio on Pangani Street, Arusha."
    ),
    url: SITE_URL,
    telephone: pick(content, "contact", "phone"),
    email: pick(content, "contact", "email"),
    image: absoluteUrl("/images/hero.jpg"),
    logo: absoluteUrl("/images/logo.png"),
    priceRange: "TZS",
    currenciesAccepted: "TZS",
    address: {
      "@type": "PostalAddress",
      streetAddress: street?.trim() || address,
      addressLocality: "Arusha",
      addressRegion: "Arusha",
      addressCountry: "TZ",
    },
    geo: { "@type": "GeoCoordinates", latitude: -3.3869, longitude: 36.6829 },
    areaServed: [
      { "@type": "City", name: "Arusha" },
      { "@type": "Country", name: "Tanzania" },
    ],
    openingHoursSpecification: openingHours(content),
    sameAs: SOCIAL_FIELDS.map((f) => pick(content, "contact", f)).filter(Boolean),
    hasOfferCatalog: services.length
      ? {
          "@type": "OfferCatalog",
          name: "Kim Beauty Services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              url: absoluteUrl(`/services/${s.slug}`),
            },
            ...(s.price_from != null
              ? { price: s.price_from, priceCurrency: "TZS" }
              : {}),
          })),
        }
      : undefined,
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * One service and every style inside it, as an offer catalog — this is
 * what lets "Miracle Knotless" surface in search on its own price.
 */
export function serviceSchema(service: Service, content: ContentMap) {
  const options = service.service_options ?? [];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: service.title,
    serviceType: service.title,
    description: service.description ?? service.tagline ?? undefined,
    url: absoluteUrl(`/services/${service.slug}`),
    image: service.image_url ? absoluteUrl(service.image_url) : undefined,
    provider: { "@id": absoluteUrl("/#business") },
    areaServed: { "@type": "City", name: "Arusha" },
    ...(options.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.title} — styles and prices`,
            itemListElement: options.map((option) => ({
              "@type": "Offer",
              name: option.name,
              description: option.description ?? undefined,
              url: absoluteUrl(`/services/${service.slug}#${option.slug}`),
              availability: "https://schema.org/InStock",
              ...(option.price != null
                ? option.price_max != null && option.price_max > option.price
                  ? {
                      priceSpecification: {
                        "@type": "PriceSpecification",
                        minPrice: option.price,
                        maxPrice: option.price_max,
                        priceCurrency: "TZS",
                      },
                    }
                  : { price: option.price, priceCurrency: "TZS" }
                : {}),
              itemOffered: {
                "@type": "Service",
                name: `${service.title} — ${option.name}`,
                provider: { "@id": absoluteUrl("/#business") },
              },
            })),
          },
        }
      : {}),
    ...(pick(content, "contact", "phone")
      ? { telephone: pick(content, "contact", "phone") }
      : {}),
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    image: product.image_url ? absoluteUrl(product.image_url) : undefined,
    brand: { "@type": "Brand", name: "Kim Beauty" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency || "TZS",
      availability: product.in_stock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: absoluteUrl("/shop"),
      seller: { "@id": absoluteUrl("/#business") },
    },
  };
}

export function websiteSchema(content: ContentMap) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: SITE_URL,
    name: pick(content, "branding", "site_name", "Kim Beauty"),
    inLanguage: "en-TZ",
    publisher: { "@id": absoluteUrl("/#business") },
  };
}
