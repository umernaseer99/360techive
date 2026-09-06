"use client";

import { ArrowRight, ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function TransformationSection() {
  const t = useTranslations("aiAutomation.transformation");
  const chaos: string[] = t.raw("today.items");
  const order: string[] = t.raw("withAgents.items");

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

      <div className="relative mt-14 grid gap-6 lg:grid-cols-2">
        {/* today */}
        <Reveal>
          <div className="flex h-full flex-col rounded-2xl border border-border/10 bg-surface/30 p-8">
            <Eyebrow>{t("today.eyebrow")}</Eyebrow>
            <h3 className="mt-3 text-xl font-semibold text-foreground">
              {t("today.title")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t("today.body")}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {chaos.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-border/10 bg-background/60 px-3 py-1.5 text-xs text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* connector */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <div className="flex size-11 items-center justify-center rounded-full border border-border/15 bg-background text-primary">
            <ArrowRight className="size-4" />
          </div>
        </div>
        <div className="flex justify-center lg:hidden">
          <div className="flex size-11 items-center justify-center rounded-full border border-border/15 bg-background text-primary">
            <ArrowDown className="size-4" />
          </div>
        </div>

        {/* with agents */}
        <Reveal delay={0.08}>
          <div className="flex h-full flex-col rounded-2xl border border-primary/25 bg-primary/[0.03] p-8">
            <Eyebrow tone="primary">{t("withAgents.eyebrow")}</Eyebrow>
            <h3 className="mt-3 text-xl font-semibold text-foreground">
              {t("withAgents.title")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t("withAgents.body")}
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {order.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
