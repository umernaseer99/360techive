import type { Metadata } from "next";
import { Settings, Database, Activity, Users, Headphones } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";
import { Accordion } from "@/components/ui/Accordion";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { localeMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.pricing" });
  return localeMetadata({
    locale,
    path: "/pricing",
    title: t("title"),
    description: t("description"),
  });
}

const costFactors = [
  { key: "count", icon: Settings },
  { key: "integration", icon: Database },
  { key: "volume", icon: Activity },
  { key: "users", icon: Users },
  { key: "support", icon: Headphones },
];

const faqs = [
  "minimum",
  "support",
  "startSmall",
  "included",
  "contracts",
] as const;

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PricingContent />;
}

function PricingContent() {
  const t = useTranslations("pricing");

  return (
    <div className="pt-24">
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <SectionHeading title={t("hero.title")} accent={t("hero.accent")} />
            <p className="mt-4 text-muted">{t("hero.body")}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/10 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <SectionHeading
              title={t("factors.title")}
              accent={t("factors.accent")}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {costFactors.map((f) => (
              <Card
                key={f.key}
                icon={
                  <IconBox>
                    <f.icon className="size-5" />
                  </IconBox>
                }
                title={t(`factors.items.${f.key}.title`)}
              >
                <p className="text-sm leading-relaxed text-muted">
                  {t(`factors.items.${f.key}.description`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/10 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <SectionHeading
              title={t("quote.title")}
              accent={t("quote.accent")}
            />
            <p className="mt-4 text-muted">
              {t.rich("quote.body", {
                process: (chunks) => (
                  <Link
                    href="/how-it-works"
                    className="text-primary underline underline-offset-2 hover:no-underline"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
            <div className="mt-6 rounded-2xl border border-dashed border-muted/30 bg-surface/30 p-6 text-sm leading-relaxed text-muted">
              <span className="block text-xs font-semibold uppercase tracking-widest text-muted/50">
                {t("quote.rangeLabel")}
              </span>
              <span className="mt-2 block">
                {t.rich("quote.range", {
                  amount: (chunks) => (
                    <span className="text-foreground">{chunks}</span>
                  ),
                  note: (chunks) => (
                    <span className="italic text-muted/40">{chunks}</span>
                  ),
                })}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl">
            <SectionHeading
              align="center"
              title={t("faq.title")}
              accent={t("faq.accent")}
            />
          </div>

          <Accordion
            items={faqs.map((key) => ({
              label: t(`faq.items.${key}.label`),
              content: t(`faq.items.${key}.content`),
            }))}
          />
        </div>
      </section>

      <section className="px-4 py-24 pt-0 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="glass-panel relative overflow-hidden rounded-2xl p-10 text-center md:p-20">
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {t("cta.title")}
              </h2>
              <p className="mt-4 text-muted">{t("cta.body")}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" variant="primary">
                    {t("cta.primary")}
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="secondary">
                    {t("cta.secondary")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
