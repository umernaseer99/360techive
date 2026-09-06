"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Projected target values, not claimed client results.
 * Keep the disclaimer in place until real case-study numbers exist —
 * the credibility of this section depends entirely on it being honest.
 */
/** The figure stays as it is in every language; the label and detail do not. */
const metrics = [
  { key: "drafting", value: "\u221285%" },
  { key: "search", value: "\u221290%" },
  { key: "onboarding", value: "\u221288%" },
  { key: "capacity", value: "4\u00d7" },
  { key: "responsiveness", value: "10\u00d7" },
  { key: "audit", value: "\u221285%" },
];

export function ImpactMetricsSection() {
  const t = useTranslations("aiAutomation.impact");

  return (
    <Section tone="tinted">
      <Reveal>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          accent={t("accent")}
          lead={t("lead")}
        />
      </Reveal>

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border/10 bg-border/10 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m) => (
          <RevealItem key={m.key} className="h-full">
            <div className="group flex h-full flex-col gap-3 bg-background p-8 transition-colors duration-300 hover:bg-surface/60">
              <span className="font-serif text-4xl font-normal italic leading-none text-primary md:text-5xl">
                {m.value}
              </span>
              <h3 className="text-base font-semibold text-foreground">
                {t("metrics." + m.key + ".label")}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {t("metrics." + m.key + ".detail")}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal tier="quiet">
        <p className="mt-6 text-xs text-muted/60">
          {t("disclaimer")}
        </p>
      </Reveal>
    </Section>
  );
}
