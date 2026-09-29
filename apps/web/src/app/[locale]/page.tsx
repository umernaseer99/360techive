import {
  HomeHero,
  WhatWeDoSection,
  PortfolioSection,
  CustomSolutionsSection,
  AutomationSection,
  BuildingNextSection,
  AboutSection,
  StartProjectSection,
} from "@/components/sections/home";

/**
 * The homepage answers one question at a time, in the order a buyer asks them.
 *
 *   1. who are you                     (hero)
 *   2. how do you work                 (built around how your business works)
 *   3. has this worked before          (portfolio, with the rest on its page)
 *   4. what can you build for me       (custom solutions)
 *   5. what is the differentiator      (AI inside your own processes)
 *   6. where is this going             (the AI lab)
 *   7. who is behind it                (about)
 *   8. the ask                         (start a project)
 *
 * Proof comes third: the work is shown before anything is claimed about how
 * we do it. AI automation then follows the capability list, as the thing that
 * separates this firm from a general development shop.
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
      <PortfolioSection />
      <CustomSolutionsSection />
      <AutomationSection />
      <BuildingNextSection />
      <AboutSection />
      <StartProjectSection />
    </>
  );
}
