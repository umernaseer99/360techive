"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { AgentCard } from "@/components/sections/AgentCard";
import { agents } from "@/config/agents";

export function AIEmployeeShowcaseSection() {
  const t = useTranslations("aiAutomation.showcase");

  return (
    <Section tone="tinted" id="ai-employees">
      <Reveal>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          accent={t("accent")}
          lead={t("lead")}
        />
      </Reveal>

      <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <RevealItem key={agent.slug} className="h-full">
            <AgentCard agent={agent} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
