import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import {
  HomeHero,
  WhatWeDoSection,
  CustomSolutionsSection,
  AutomationSection,
  ProductsSection,
  BuildingNextSection,
  SelectedWorkSection,
  TechnologySection,
  WhyUsSection,
  AboutSection,
} from "@/components/sections/home";
import { toLocale } from "@/i18n/routing";

/**
 * The homepage answers six questions in order, and stops.
 *
 *   1.  who are you                     (hero)
 *   2.  how do you work                 (idea to something people use)
 *   3.  what can you build for me       (custom solutions)
 *   4.  what about AI                   (automation, then out to its own page)
 *   5.  do you build anything yourself  (products)
 *   6.  what are you working on now     (the lab)
 *   7.  has this worked before          (selected work)
 *   8.  what do you build it with       (technology)
 *   9.  why you                         (how we work)
 *   10. who are you, really             (about)
 *
 * Tone alternates plain and tinted down the page. Data lives in
 * config/company.ts (and company.de.ts), headings in messages/<locale>.json,
 * so this file stays a running order.
 *
 * The AI story that used to be this page now lives at /ai-automation in full.
 */
export default function HomePage({ params }: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale(use(params).locale);
  setRequestLocale(locale);

  return (
    <>
      <HomeHero />
      <WhatWeDoSection />
      <CustomSolutionsSection />
      <AutomationSection />
      <ProductsSection />
      <BuildingNextSection />
      <SelectedWorkSection />
      <TechnologySection />
      <WhyUsSection />
      <AboutSection />
    </>
  );
}
