import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import {
  GERMAN_COUNTRIES,
  LOCALE_COOKIE,
  routing,
  type Locale,
} from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

/**
 * Locale resolution, in priority order:
 *
 *   1. a locale the visitor picked themselves, stored in a cookie
 *   2. the country the request comes from — Germany gets German
 *   3. the default locale
 *
 * Browser language is deliberately not part of this. A German-language browser
 * in Zurich is not the signal we were asked for, and a visitor in Germany with
 * an English browser still gets German. The switcher in the header overrides
 * whatever this decides, and that choice wins on every later visit.
 */
function readCountry(request: NextRequest): string | undefined {
  // Vercel and Cloudflare both publish the edge geo lookup as a header.
  const header =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-country-code");

  return header?.toUpperCase() || undefined;
}

function readClientIp(request: NextRequest): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip");
  if (!ip) return undefined;
  // Loopback and private ranges tell us nothing, so don't spend a lookup.
  if (
    ip === "::1" ||
    ip.startsWith("127.") ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("172.16.")
  ) {
    return undefined;
  }
  return ip;
}

/**
 * Fallback for hosts that do not publish a geo header. One short lookup, and
 * the answer is cached in the locale cookie so it happens at most once per
 * visitor.
 */
async function lookupCountry(ip: string): Promise<string | undefined> {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/country/`, {
      signal: AbortSignal.timeout(800),
      headers: { "User-Agent": "360techive-locale" },
    });
    if (!response.ok) return undefined;
    const country = (await response.text()).trim().toUpperCase();
    return /^[A-Z]{2}$/.test(country) ? country : undefined;
  } catch {
    return undefined;
  }
}

async function resolveLocale(request: NextRequest): Promise<Locale> {
  const stored = request.cookies.get(LOCALE_COOKIE)?.value;
  if (stored && routing.locales.includes(stored as Locale)) {
    return stored as Locale;
  }

  let country = readCountry(request);
  if (!country) {
    const ip = readClientIp(request);
    if (ip) country = await lookupCountry(ip);
  }

  return country && GERMAN_COUNTRIES.includes(country) ? "de" : "en";
}

function pathLocale(pathname: string): Locale | undefined {
  return routing.locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const current = pathLocale(pathname);

  // Already on a locale route: let next-intl handle it, and remember the
  // locale so a visitor who switched by hand keeps their choice.
  if (current) {
    const response = intlMiddleware(request);
    if (request.cookies.get(LOCALE_COOKIE)?.value !== current) {
      response.cookies.set(LOCALE_COOKIE, current, {
        path: "/",
        maxAge: YEAR_IN_SECONDS,
        sameSite: "lax",
      });
    }
    return response;
  }

  const locale = await resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: YEAR_IN_SECONDS,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  // Everything except Next internals, the API routes and anything with a file
  // extension (favicons, images, robots.txt).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
