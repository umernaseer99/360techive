import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Fraunces } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

  // The live property. A measurement id is public by design, it appears in
  // the page source of every site that uses one, so it lives here rather than
  // in an environment variable that has to be present at build time on every
  // machine that compiles the site. NEXT_PUBLIC_GA_ID still overrides it, so a
  // staging build can point somewhere else or switch analytics off with an
  // empty value.
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-7867YNSS39";

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      {/*
        Google Analytics 4, exactly the snippet the GA console gives you: the
        async gtag.js loader followed by the dataLayer bootstrap and config.

        These are written into <head> rather than installed by a component on
        purpose. The component version injected the tag after hydration, so the
        server rendered HTML held only a preload hint and anything reading the
        raw response, a tag checker, a crawler, or view source, saw no
        analytics at all. Here it is in the document as delivered.

        gaId defaults to the live property and NEXT_PUBLIC_GA_ID overrides it,
        so a staging build can point elsewhere or set it empty to opt out.
      */}
      <head>
        {gaId ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`,
              }}
            />
          </>
        ) : null}
      </head>
      <body>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Shell>{children}</Shell>
          </ThemeProvider>
        </NextIntlClientProvider>


      </body>
    </html>
  );
}
