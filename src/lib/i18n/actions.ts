"use server";

import { cookies } from "next/headers";
import { isLocale, LOCALE_COOKIE } from "./config";

/**
 * Saves the visitor's language. Setting a cookie in a Server Action makes
 * Next.js re-render the current page on the server, so the new language
 * appears in place — no reload, and the cart and scroll position survive.
 */
export async function setLocale(locale: string) {
  if (!isLocale(locale)) return;

  (await cookies()).set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
