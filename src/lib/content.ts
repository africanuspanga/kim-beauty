import { createServerClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { CONTENT_DEFAULTS, type ContentMap } from "./content-map";
import type {
  GalleryImage,
  Json,
  Product,
  ProductCategory,
  Service,
  Testimonial,
} from "@/lib/types";

export { CONTENT_DEFAULTS, pick, type ContentMap } from "./content-map";

/**
 * Every editable copy block, keyed by section, in the visitor's language.
 *
 * Translations sit beside the English in the same block as `<field>_<locale>`
 * (e.g. `title_sw`, `title_fr`), so the admin edits them side by side. A
 * blank translation falls back to the English.
 */
export async function getSiteContent(): Promise<ContentMap> {
  const supabase = createServerClient();
  const [{ data }, locale] = await Promise.all([
    supabase.from("site_content").select("key, value"),
    getLocale(),
  ]);

  const map: ContentMap = { ...CONTENT_DEFAULTS };
  for (const row of data ?? []) {
    map[row.key] = localize(
      { ...(CONTENT_DEFAULTS[row.key] ?? {}), ...(row.value as Json) },
      locale
    );
  }
  return map;
}

function localize(block: Json, locale: Locale): Json {
  if (locale === "en") return block;

  const suffix = `_${locale}`;
  const out: Json = { ...block };
  for (const [key, value] of Object.entries(block)) {
    if (key.endsWith(suffix) && typeof value === "string" && value.trim()) {
      out[key.slice(0, -suffix.length)] = value;
    }
  }
  return out;
}

/**
 * Services, each with the styles bookable inside it.
 *
 * RLS already hides inactive options from the public key, so the nested
 * select needs no extra filter — it only needs its own sort order.
 */
const SERVICE_SELECT = "*, service_options(*)";

export async function getServices(onlyFeatured = false): Promise<Service[]> {
  const supabase = createServerClient();
  let query = supabase
    .from("services")
    .select(SERVICE_SELECT)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("sort_order", { referencedTable: "service_options", ascending: true });

  if (onlyFeatured) query = query.eq("is_featured", true);

  const { data } = await query;
  return (data ?? []) as Service[];
}

/** One service and its styles, for /services/[slug]. */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("services")
    .select(SERVICE_SELECT)
    .eq("slug", slug)
    .eq("is_active", true)
    .order("sort_order", { referencedTable: "service_options", ascending: true })
    .maybeSingle();

  return (data as Service | null) ?? null;
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
