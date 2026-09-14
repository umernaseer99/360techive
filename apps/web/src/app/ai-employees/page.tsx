import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { AIEmployeesGrid } from "@/components/sections/ai-employees/AIEmployeesGrid";
import {
  LiveDemoTeaserBanner,
  UseCaseCategoriesSection,
  HowWeBuildAgentsSection,
  ResourcesGridSection,
  CaseStudiesTeaserSection,
} from "@/components/sections/ai-employees";

export const metadata: Metadata = {
  title: "AI Employees — 360 Techive",
  description:
    "Meet six purpose-built AI Employees for Support, Sales, Finance, Research, Documents, and Executive departments. Each agent automates an entire business function.",
  openGraph: {
    title: "AI Employees — 360 Techive",
    description:
      "Meet six purpose-built AI Employees for Support, Sales, Finance, Research, Documents, and Executive departments.",
  },
};

export default function AIEmployeesPage() {
  return (
    <div className="pt-24">
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <div className="mb-4">
              <Badge icon={<span className="size-3 rounded-full bg-primary" />}>
                Six specialized agents
              </Badge>
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
              Meet your future{" "}
              <span className="font-serif italic text-primary">
                AI workforce.
              </span>
            </h1>
            <p className="mt-4 text-muted">
              Each AI Employee is purpose-built for one department, connects to
              your existing tools, and operates autonomously — from triaging
              support tickets to reconciling financial reports.
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
