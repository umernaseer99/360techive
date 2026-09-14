import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { accent } from "@/components/ui/Accent";
import { Badge } from "@/components/ui/Badge";
import { AIEmployeesGrid } from "@/components/sections/ai-employees/AIEmployeesGrid";
import {
  LiveDemoTeaserBanner,
  UseCaseCategoriesSection,
  HowWeBuildAgentsSection,
  ResourcesGridSection,
  CaseStudiesTeaserSection,
} from "@/components/sections/ai-employees";
import { toLocale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "AiEmployees" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("ogDescription"),
    },
  };
}

export default function AIEmployeesPage({ params }: Props) {
  const locale = toLocale(use(params).locale);
  setRequestLocale(locale);
  const t = useTranslations("AiEmployees");

  return (
    <div className="pt-24">
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <div className="mb-4">
              <Badge icon={<span className="size-3 rounded-full bg-primary" />}>
                {t("badge")}
              </Badge>
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
              {t.rich("title", { em: accent })}
            </h1>
            <p className="mt-4 text-muted">
              {t("body")}
            </p>
          </div>

          <LiveDemoTeaserBanner />
        </div>
      </section>

      <UseCaseCategoriesSection />
      <HowWeBuildAgentsSection />
      <AIEmployeesGrid />
      <ResourcesGridSection />
      <CaseStudiesTeaserSection />
    </div>
  );
}
