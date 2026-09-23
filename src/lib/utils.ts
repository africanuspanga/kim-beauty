import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number, currency = "TZS") {
  const rounded = Math.round(value);
  return `${currency} ${rounded.toLocaleString("en-US")}`;
}

export function formatDate(value: string | Date) {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(value: string | Date) {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * How a service option's price reads on the site.
 * A ranged price becomes "TZS 35,000 – 50,000"; no price at all becomes
 * "Price on request", so an unpriced style still books cleanly.
 */
export function formatPriceRange(
  from?: number | null,
  to?: number | null,
  currency = "TZS"
) {
  if (from == null && to == null) return "Price on request";
  if (from == null) return formatPrice(to!, currency);
  if (to == null || to <= from) return formatPrice(from, currency);
  return `${formatPrice(from, currency)} – ${Math.round(to).toLocaleString("en-US")}`;
}

/** The label shown on a service option card. */
export function optionPriceLabel(option: {
  price?: number | null;
  price_max?: number | null;
  price_label?: string | null;
}) {
  return option.price_label?.trim()
    ? option.price_label
    : formatPriceRange(option.price, option.price_max);
}
