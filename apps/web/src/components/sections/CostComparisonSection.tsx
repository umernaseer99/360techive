"use client";

import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function CostComparisonSection() {
  const t = useTranslations("aiAutomation.costs");
  const employeeCosts: string[] = t.raw("employee.items");
  const agentTraits: string[] = t.raw("agent.items");

  return (
    <Section>
      <Reveal>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          accent={t("accent")}
          lead={t("lead")}
        />
      </Reveal>

      <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-2">
        <RevealItem className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-border/10 bg-surface/30 p-8">
            <Eyebrow>{t("employee.eyebrow")}</Eyebrow>
            <h3 className="mt-3 text-xl font-semibold text-foreground">
              {t("employee.title")}
            </h3>

            <ul className="mt-8 flex flex-col divide-y divide-border/10">
              {employeeCosts.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between gap-4 py-3.5"
                >
                  <span className="text-sm text-muted line-through decoration-muted/30">
                    {item}
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted/50">
                    <X className="size-3" />
                    {t("employee.gone")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </RevealItem>

        <RevealItem className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-primary/25 bg-primary/[0.03] p-8">
            <Eyebrow tone="primary">{t("agent.eyebrow")}</Eyebrow>
            <h3 className="mt-3 text-xl font-semibold text-foreground">
              {t("agent.title")}
            </h3>

            <ul className="mt-8 flex flex-col divide-y divide-border/10">
              {agentTraits.map((item) => (
                <li key={item} className="flex items-start gap-3 py-3.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
