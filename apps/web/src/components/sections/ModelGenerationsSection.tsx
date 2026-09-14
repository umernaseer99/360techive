"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/** Bar shape per generation; copy comes from `AiAutomation.Generations.items`. */
const bars = [
  { width: "34%", opacity: 1 },
  { width: "56%", opacity: 0.85 },
  { width: "78%", opacity: 0.7 },
  { width: "100%", opacity: 0.5 },
];

export function ModelGenerationsSection() {
  const t = useTranslations("AiAutomation.Generations");
  const generations = (
    t.raw("items") as { when: string; sub: string; body: string }[]
  ).map((g, i) => ({ ...g, ...bars[i] }));

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
          <RevealItem key={g.when} className="h-full">
            <div className="flex h-full flex-col gap-5 bg-background p-8">
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-foreground">
                  {g.when}
                </span>
                <span className="font-mono text-[11px] text-muted">
                  {g.sub}
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

              <p className="text-sm leading-relaxed text-muted">{g.body}</p>
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
