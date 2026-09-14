import { hasLocale } from "next-intl";
import { defineRouting } from "next-intl/routing";

/**
 * English lives at the root (/pricing), German under a prefix (/de/pricing).
 * Which one a first-time visitor sees is decided in middleware.ts.
 */
export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

/** Cookie next-intl reads to remember an explicit language choice. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Narrows a route param to a supported locale, falling back to the default. */
export function toLocale(value: string): Locale {
  return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}
