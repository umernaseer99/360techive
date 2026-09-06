import type { Metadata } from "next";
import { routing } from "./routing";

/**
 * Metadata for a translated page: the canonical URL for this locale plus the
 * hreflang alternates that tell a search engine the other language exists.
 */
export function localeMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  /** Route without a locale prefix, e.g. "/pricing". */
  path: string;
  title: string;
  description: string;
}): Metadata {
  const languages = Object.fromEntries([
    ...routing.locales.map((l) => [l, `/${l}${path}`]),
    ["x-default", `/${routing.defaultLocale}${path}`],
  ]);

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages,
    },
    openGraph: {
      title,
      description,
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
  };
}
