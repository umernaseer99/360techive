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
  StartProjectSection,
} from "@/components/sections/home";

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
 *   11. the ask                         (start a project)
 *
 * Tone alternates plain and tinted down the page, and the closing section
 * breaks the rhythm deliberately. All copy and data live in
 * config/company.ts so this file stays a running order.
 *
 * The AI story that used to be this page now lives at /ai-automation in full.
 */
export default function HomePage() {
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
      <StartProjectSection />
    </>
  );
}
