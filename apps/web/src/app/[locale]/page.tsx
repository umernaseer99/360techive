import {
  HomeHero,
  WhatWeDoSection,
  AutomationSection,
  CustomSolutionsSection,
  ProductsSection,
  BuildingNextSection,
  SelectedWorkSection,
  AboutSection,
  StartProjectSection,
} from "@/components/sections/home";

/**
 * The homepage answers one question at a time, in the order a buyer asks them.
 *
 *   1. who are you                     (hero)
 *   2. how do you work                 (built around how your business works)
 *   3. what is the differentiator      (AI inside your own processes)
 *   4. what can you build for me       (custom solutions)
 *   5. do you build anything yourself  (products)
 *   6. where is this going             (the AI lab)
 *   7. has this worked before          (selected work)
 *   8. who is behind it                (about)
 *   9. the ask                         (start a project)
 *
 * AI automation sits third on purpose. It is the reason to choose this firm
 * over a general development shop, so it is stated before the capability list
 * rather than after it.
 *
 * Tone alternates plain and tinted down the page, and the closing section
 * breaks the rhythm deliberately.
 *
 * The AI story in full lives at /ai-automation.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WhatWeDoSection />
      <AutomationSection />
      <CustomSolutionsSection />
      <ProductsSection />
      <BuildingNextSection />
      <SelectedWorkSection />
      <AboutSection />
      <StartProjectSection />
    </>
  );
}
