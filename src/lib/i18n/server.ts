import { cookies } from "next/headers";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Locale } from "./config";
import { getDictionary } from "./dictionaries";

/** The visitor's chosen language, read from their cookie. */
export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Copy for the current request, for Server Components. */
export async function getT() {
  return getDictionary(await getLocale());
}
