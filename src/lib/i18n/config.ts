export const LOCALES = ["en", "sw", "fr", "zh", "ar"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Remembers the visitor's choice for a year. */
export const LOCALE_COOKIE = "kb-lang";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Value for <html lang>. */
export const HTML_LANG: Record<Locale, string> = {
  en: "en-TZ",
  sw: "sw-TZ",
  fr: "fr",
  zh: "zh-Hans",
  ar: "ar",
};

/** Value for <html dir>. Arabic reads right to left. */
export function htmlDir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}
