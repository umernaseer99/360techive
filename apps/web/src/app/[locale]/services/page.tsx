import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Bot, Cable, RefreshCw, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";
import { toLocale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string }>;
}

/** Icons in service order; copy comes from `ServicesPage.services`. */
const serviceIcons = [Bot, Cable, RefreshCw];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "ServicesPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export default function ServicesPage({ params }: Props) {
  const locale = toLocale(use(params).locale);
  setRequestLocale(locale);
  const t = useTranslations("ServicesPage");
  const services = (
    t.raw("services") as { title: string; description: string }[]
  ).map((s, i) => ({ ...s, icon: serviceIcons[i] }));
  const whatsIncluded = t.raw("included") as string[];

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

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <Card key={s.title} icon={<IconBox><s.icon className="size-5" /></IconBox>} title={s.title}>
                <p className="text-sm leading-relaxed text-muted">
                  {s.description}
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
              title={t("includedTitle")}
              accent={t("includedAccent")}
            />
            <p className="mt-4 text-muted">
              {t("includedBody")}
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-5">
            {whatsIncluded.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="size-4 text-primary" />
                </span>
                <p className="pt-1 text-base leading-relaxed text-muted">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
