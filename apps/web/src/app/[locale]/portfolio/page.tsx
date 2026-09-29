import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { LineReveal } from "@/components/ui/TextReveal";
import { PortfolioGrid } from "@/components/sections/portfolio/PortfolioGrid";
import { localeMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.portfolio" });
  return localeMetadata({
    locale,
    path: "/portfolio",
    title: t("title"),
    description: t("description"),
  });
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home.portfolio" });

  return (
    <Section className="pt-32 md:pt-40" glow="top-right" glowStrength="medium">
      <div className="flex max-w-3xl flex-col gap-5">
        <Eyebrow tone="primary">{t("eyebrow")}</Eyebrow>
        <h1 className="text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-foreground md:text-6xl">
          <LineReveal trigger="mount">
            {t("headline.first")}{" "}
            <span className="font-serif font-normal italic text-primary">
              {t("headline.accent")}
            </span>
          </LineReveal>
        </h1>
        <Reveal tier="quiet" delay={0.1}>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">
            {t("body")}
          </p>
        </Reveal>
      </div>

      <div className="mt-14">
        <PortfolioGrid />
      </div>
    </Section>
  );
}
