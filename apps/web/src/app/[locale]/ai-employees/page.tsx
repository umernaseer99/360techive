import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeMetadata } from "@/i18n/metadata";
import { Badge } from "@/components/ui/Badge";
import { AIEmployeesGrid } from "@/components/sections/ai-employees/AIEmployeesGrid";
import {
  LiveDemoTeaserBanner,
  UseCaseCategoriesSection,
  HowWeBuildAgentsSection,
  ResourcesGridSection,
  CaseStudiesTeaserSection,
} from "@/components/sections/ai-employees";
import { ContactCTASection } from "@/components/sections/ContactCTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.aiEmployees" });
  return localeMetadata({
    locale,
    path: "/ai-employees",
    title: t("title"),
    description: t("description"),
  });
}

export default async function AIEmployeesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AIEmployeesPageContent />;
}

function AIEmployeesPageContent() {
  const t = useTranslations("aiEmployees.hero");

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
              {t("title")}{" "}
              <span className="font-serif italic text-primary">
                {t("accent")}
              </span>
            </h1>
            <p className="mt-4 text-muted">{t("body")}</p>
          </div>

          <LiveDemoTeaserBanner />
        </div>
      </section>

      <UseCaseCategoriesSection />
      <HowWeBuildAgentsSection />
      <AIEmployeesGrid />
      <ResourcesGridSection />
      <CaseStudiesTeaserSection />
      <ContactCTASection />
    </div>
  );
}
