"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";

const I18nContext = createContext<Locale>(DEFAULT_LOCALE);

/** Hands the server-chosen language down to Client Components. */
export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <I18nContext.Provider value={locale}>{children}</I18nContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(I18nContext);
}

/** Copy for the current language, for Client Components. */
export function useT(): Dictionary {
  return getDictionary(useLocale());
}
