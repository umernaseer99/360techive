"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, LOCALE_COOKIE, type Locale } from "@/i18n/routing";

/**
 * EN / DE toggle.
 *
 * The cookie is written before navigating so the choice wins over the
 * country and browser-language detection in middleware on every later visit.
 */
export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LocaleSwitcher");
  const [isPending, startTransition] = useTransition();

  function select(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`flex items-center rounded-lg border border-border/10 p-0.5 ${
        isPending ? "opacity-60" : ""
      } ${className}`}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => select(l)}
            aria-pressed={active}
            aria-label={t(l)}
            lang={l}
            className={`rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
              active
                ? "bg-foreground/[0.08] text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
