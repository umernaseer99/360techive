"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Two-letter language toggle, sat next to the theme toggle.
 *
 * Geolocation only decides the first language a visitor sees. This is the
 * override, and because switching navigates to the other locale's URL the
 * middleware stores the choice in a cookie, so it survives the next visit
 * rather than being overruled by the country lookup again.
 */
export function LanguageSwitcher() {
  const t = useTranslations("nav.language");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error — pathname comes from the router, so its params
        // are already the ones this route needs.
        { pathname, params },
        { locale: next }
      );
    });
  }

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`flex items-center rounded-lg border border-border/15 p-0.5 text-[11px] font-medium ${
        pending ? "opacity-70" : ""
      }`}
    >
      {routing.locales.map((option) => {
        const active = option === locale;
        return (
          <button
            key={option}
            type="button"
            onClick={() => switchTo(option)}
            aria-current={active ? "true" : undefined}
            lang={option}
            title={t(option)}
            className={`rounded-md px-1.5 py-1 uppercase tracking-wide transition-colors ${
              active
                ? "bg-primary/10 text-primary"
                : "text-muted hover:text-foreground"
            }`}
          >
            {option}
            <span className="sr-only"> — {t(option)}</span>
          </button>
        );
      })}
    </div>
  );
}
