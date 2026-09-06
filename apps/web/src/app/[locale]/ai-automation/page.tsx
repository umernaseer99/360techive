import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeMetadata } from "@/i18n/metadata";
import {
  HeroSection,
  TransformationSection,
  AIEmployeeShowcaseSection,
  CompoundingValueSection,
  ImpactMetricsSection,
  CostComparisonSection,
  SavingsCalculatorSection,
  CompanyBrainSection,
  ModelGenerationsSection,
  CapabilityCurveSection,
  PositionQuoteSection,
  HowItWorksSection,
  FAQSection,
  ContactCTASection,
} from "@/components/sections";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.aiAutomation" });
  return localeMetadata({
    locale,
    path: "/ai-automation",
    title: t("title"),
    description: t("description"),
  });
}

/**
 * This page is the argument that used to live on the homepage. It is one
 * continuous case, and each section answers the objection raised by the one
 * before it:
 *
 *   1.  the shift on offer                  (hero)
 *   2.  your day, before and after          (transformation)
 *   3.  who does the work                   (the six agents)
 *   4.  "why not wait?"                     (compounding value)
 *   5.  "does it actually move numbers?"    (impact metrics)
 *   6.  "why not just hire someone?"        (cost comparison)
 *   7.  "what about MY numbers?"            (savings calculator)
 *   8.  "isn't this just chatbots?"         (company brain)
 *   9.  "won't it be obsolete in a year?"   (model generations)
 *   10. "says who?"                         (METR capability curve)
 *   11. the thesis, in one line             (position quote)
 *   12. how we get there                    (process)
 *   13. everything else                     (FAQ)
 *   14. the ask                             (CTA)
 *
 * The homepage now carries the whole company. AI automation is one of the
 * things we do, and this is where that story is told in full.
 */
export default async function AIAutomationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <TransformationSection />
      <AIEmployeeShowcaseSection />
      <CompoundingValueSection />
      <ImpactMetricsSection />
      <CostComparisonSection />
      <SavingsCalculatorSection />
      <CompanyBrainSection />
      <ModelGenerationsSection />
      <CapabilityCurveSection />
      <PositionQuoteSection />
      <HowItWorksSection />
      <FAQSection />
      <ContactCTASection />
    </>
  );
}
