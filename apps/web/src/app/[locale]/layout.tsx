import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Fraunces } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Shell } from "@/components/layout/Shell";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Both language versions of a page point at each other with hreflang, so a
 * search engine serving Germany can index the German page rather than guessing
 * from the English one.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return {
    title: {
      default: t("title"),
      template: "%s",
    },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        de: "/de",
        "x-default": "/en",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Shell>{children}</Shell>
          </ThemeProvider>
        </NextIntlClientProvider>

        {/*
          Google Analytics 4. The measurement id comes from the environment, so
          nothing is hardcoded and a local or preview build stays out of the
          production property. With NEXT_PUBLIC_GA_ID unset this renders
          nothing at all, which is also what keeps development traffic from
          being counted.

          Loaded through @next/third-parties, which defers gtag.js instead of
          blocking the first paint. Note that the component only installs the
          tag: page views for client side navigations come from GA4's own
          enhanced measurement, which listens for history changes and is a
          setting on the property rather than something in this code.
        */}
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
