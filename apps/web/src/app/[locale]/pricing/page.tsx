import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Settings, Database, Activity, Users, Headphones } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";
import { Accordion, type AccordionItemData } from "@/components/ui/Accordion";
import { toLocale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string }>;
}

/** Icons in factor order; copy comes from `PricingPage.factors`. */
const factorIcons = [Settings, Database, Activity, Users, Headphones];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "PricingPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export default function PricingPage({ params }: Props) {
  const locale = toLocale(use(params).locale);
  setRequestLocale(locale);
  const t = useTranslations("PricingPage");
  const costFactors = (
    t.raw("factors") as { title: string; description: string }[]
  ).map((f, i) => ({ ...f, icon: factorIcons[i] }));

  return (
    <div className="pt-24">
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <SectionHeading
              title={t("title")}
              accent={t("accent")}
            />
            <p className="mt-4 text-muted">
              {t("body")}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/10 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <SectionHeading
              title={t("factorsTitle")}
              accent={t("factorsAccent")}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {costFactors.map((f) => (
              <Card
                key={f.title}
                icon={<IconBox><f.icon className="size-5" /></IconBox>}
                title={f.title}
              >
                <p className="text-sm leading-relaxed text-muted">
                  {f.description}
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
              title={t("quoteTitle")}
              accent={t("quoteAccent")}
            />
            <p className="mt-4 text-muted">
              {t.rich("quoteBody", {
                link: (chunks) => (
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
                {t("rangeLabel")}
              </span>
              <span className="mt-2 block">
                {t("rangeBefore")}{" "}
                <span className="text-foreground">[X–Y]</span>
                {t("rangeAfter")}{" "}
                <span className="italic text-muted/40">{t("rangeNote")}</span>
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
              title={t("faqTitle")}
              accent={t("faqAccent")}
            />
          </div>

          <Accordion items={t.raw("faqs") as AccordionItemData[]} />
        </div>
      </section>
    </div>
  );
}
