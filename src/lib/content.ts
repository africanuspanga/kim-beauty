import { createServerClient } from "@/lib/supabase/server";
import type {
  GalleryImage,
  Json,
  Product,
  ProductCategory,
  Service,
  Testimonial,
} from "@/lib/types";

/**
 * Defaults used when the database has no row for a key yet, so the site
 * always renders something sensible even before an admin edits anything.
 */
export const CONTENT_DEFAULTS: Record<string, Json> = {
  hero: {
    eyebrow: "Pangani Street · Arusha",
    title: "Beauty, Perfectly Crafted",
    description:
      "Braids, lashes, spa and glam by Arusha's most loved beauty team.",
    primary_cta_label: "Book Appointment",
    primary_cta_href: "/booking",
    secondary_cta_label: "Shop Now",
    secondary_cta_href: "/shop",
    image_url: "/images/hero.jpg",
    stat_1_value: "8+",
    stat_1_label: "Years of Craft",
    stat_2_value: "5K+",
    stat_2_label: "Happy Clients",
    stat_3_value: "4.9",
    stat_3_label: "Google Rating",
  },
  branding: {
    site_name: "Kim Beauty",
    logo_url: "/images/logo.png",
    whatsapp_prefill: "I am coming from Kim Beauty website",
  },
  contact: {
    phone: "+255 766 400 961",
    whatsapp: "255766400961",
    email: "kimbeautysaloons@gmail.com",
    address: "Pangani Street, Arusha, Tanzania",
    map_query: "Pangani Street, Arusha, Tanzania",
    hours_weekday: "Mon – Fri · 8:00 AM – 8:00 PM",
    hours_saturday: "Saturday · 8:00 AM – 9:00 PM",
    hours_sunday: "Sunday · 10:00 AM – 6:00 PM",
    instagram: "https://www.instagram.com/kim_beauty_salons",
    tiktok: "https://www.tiktok.com/@kimbeautysaloons",
    facebook: "https://www.facebook.com/profile.php?id=61594282689600",
    facebook_profile: "https://www.facebook.com/profile.php?id=61594686741887",
    youtube: "https://youtube.com/@kimbeautysalons",
    x: "https://x.com/kimbeautysalons",
    pinterest: "https://pin.it/6Xs5oO9fN",
    threads: "https://www.threads.com/@kim_beauty_salons",
    likee: "",
    linktree: "https://linktr.ee/kimbeautysalons",
  },
  payments: {
    title: "Ways To Pay",
    description:
      "Pay for your order or leave a deposit securely online — card, mobile money and bank transfer all supported. Prefer to pay in the salon? Just send your order on WhatsApp.",
    pesapal_url: "https://payments.pesapal.com/kim-tours",
    dpo_url:
      "https://shop.directpay.online/paymybills/KIMZEBRAADVENTURESANDSAFARISLIMITED",
    paypal_url: "",
  },
  footer: {
    tagline:
      "A modern beauty studio on Pangani Street, Arusha — hair, lashes, nails, spa and the Kim Collection.",
    copyright: "Kim Beauty. All rights reserved.",
  },
};

export type ContentMap = Record<string, Json>;

/** Every editable copy block, keyed by section. */
export async function getSiteContent(): Promise<ContentMap> {
  const supabase = createServerClient();
  const { data } = await supabase.from("site_content").select("key, value");

  const map: ContentMap = { ...CONTENT_DEFAULTS };
  for (const row of data ?? []) {
    map[row.key] = { ...(CONTENT_DEFAULTS[row.key] ?? {}), ...(row.value as Json) };
  }
  return map;
}

/** Reads one field out of a content map with a safe fallback. */
export function pick(
  content: ContentMap,
  section: string,
  field: string,
  fallback = ""
): string {
  return content?.[section]?.[field] ?? CONTENT_DEFAULTS[section]?.[field] ?? fallback;
}

export async function getServices(onlyFeatured = false): Promise<Service[]> {
  const supabase = createServerClient();
  let query = supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (onlyFeatured) query = query.eq("is_featured", true);

  const { data } = await query;
  return (data ?? []) as Service[];
}

export async function getProducts(onlyFeatured = false): Promise<Product[]> {
  const supabase = createServerClient();
  let query = supabase
    .from("products")
    .select("*, product_categories(name, slug)")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (onlyFeatured) query = query.eq("is_featured", true);

  const { data } = await query;
  return (data ?? []) as Product[];
}

export async function getCategories(): Promise<ProductCategory[]> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("product_categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  return (data ?? []) as ProductCategory[];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  return (data ?? []) as Testimonial[];
}

export async function getGallery(): Promise<GalleryImage[]> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  return (data ?? []) as GalleryImage[];
}
