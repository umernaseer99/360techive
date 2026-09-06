"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/** Bar geometry only; every label is translated. */
const generations = [
  { key: "today", width: "34%", opacity: 1 },
  { key: "next", width: "56%", opacity: 0.85 },
  { key: "after", width: "78%", opacity: 0.7 },
  { key: "onward", width: "100%", opacity: 0.5 },
];

export function ModelGenerationsSection() {
  const t = useTranslations("aiAutomation.generations");

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

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border/10 bg-border/10 sm:grid-cols-2 lg:grid-cols-4">
        {generations.map((g) => (
          <RevealItem key={g.key} className="h-full">
            <div className="flex h-full flex-col gap-5 bg-background p-8">
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-foreground">
                  {t("items." + g.key + ".when")}
                </span>
                <span className="font-mono text-[11px] text-muted">
                  {t("items." + g.key + ".sub")}
                </span>
              </div>

              <div
                className="h-1.5 overflow-hidden rounded-full bg-foreground/[0.08]"
                aria-hidden="true"
              >
                <span
                  className="block h-full rounded-full bg-primary"
                  style={{ width: g.width, opacity: g.opacity }}
                />
              </div>

              <p className="text-sm leading-relaxed text-muted">
                {t("items." + g.key + ".body")}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal tier="quiet">
        <p className="mt-6 text-xs text-muted/60">
          {t("footnote")}
        </p>
      </Reveal>
    </Section>
  );
}
