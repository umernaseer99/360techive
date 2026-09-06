import type { Metadata } from "next";
import { Bot, Cable, RefreshCw, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { localeMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.services" });
  return localeMetadata({
    locale,
    path: "/services",
    title: t("title"),
    description: t("description"),
  });
}

const services = [
  { key: "development", icon: Bot },
  { key: "integration", icon: Cable },
  { key: "operation", icon: RefreshCw },
];

const includedKeys = [
  "architecture",
  "integration",
  "monitoring",
  "noLockIn",
  "engineer",
  "roi",
] as const;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesPageContent />;
}

function ServicesPageContent() {
  const t = useTranslations("services");

  return (
    <div className="pt-24">
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <SectionHeading
              title={t("hero.title")}
              accent={t("hero.accent")}
            />
            <p className="mt-4 text-muted">{t("hero.body")}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <Card
                key={s.key}
                icon={
                  <IconBox>
                    <s.icon className="size-5" />
                  </IconBox>
                }
                title={t(`items.${s.key}.title`)}
              >
                <p className="text-sm leading-relaxed text-muted">
                  {t(`items.${s.key}.description`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/10 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <SectionHeading
              align="center"
              title={t("included.title")}
              accent={t("included.accent")}
            />
            <p className="mt-4 text-muted">{t("included.body")}</p>
          </div>

          <div className="mx-auto max-w-3xl space-y-5">
            {includedKeys.map((key) => (
              <div key={key} className="flex items-start gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="size-4 text-primary" />
                </span>
                <p className="pt-1 text-base leading-relaxed text-muted">
                  {t(`included.items.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTASection />
    </div>
  );
}
