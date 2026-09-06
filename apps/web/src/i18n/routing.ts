import { defineRouting } from "next-intl/routing";

/**
 * Both locales carry a prefix (/en, /de) so every page has one canonical,
 * indexable URL per language. Locale detection is switched off here because
 * middleware.ts decides the locale itself: a stored choice first, then the
 * visitor's country, and only then the default.
 */
export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

/** Cookie next-intl reads, and the one middleware writes a manual choice to. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Countries that get the German site by default. */
export const GERMAN_COUNTRIES = ["DE"];
