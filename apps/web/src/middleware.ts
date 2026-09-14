import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing, LOCALE_COOKIE } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

/** Visitors browsing from these countries get German unless they chose otherwise. */
const GERMAN_COUNTRIES = new Set(["DE", "AT"]);

/**
 * Language resolution for a path without a locale prefix, in order:
 *
 *   1. an explicit choice from the language switcher (NEXT_LOCALE cookie)
 *   2. the visitor's country, from the hosting edge (Vercel or Cloudflare)
 *   3. the browser's Accept-Language header, handled by next-intl
 *   4. English
 *
 * Prefixed paths (/de/...) are always served as requested.
 */
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = routing.locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (!hasPrefix && !request.cookies.has(LOCALE_COOKIE)) {
    const country =
      request.headers.get("x-vercel-ip-country") ??
      request.headers.get("cf-ipcountry");

    if (country && GERMAN_COUNTRIES.has(country.toUpperCase())) {
      const url = request.nextUrl.clone();
      url.pathname = pathname === "/" ? "/de" : `/de${pathname}`;
      return NextResponse.redirect(url);
    }
  }

  return handleI18n(request);
}

export const config = {
  // Everything except API routes, Next internals, generated icons and files
  // with an extension.
  matcher: "/((?!api|_next|_vercel|apple-icon|.*\\..*).*)",
};
