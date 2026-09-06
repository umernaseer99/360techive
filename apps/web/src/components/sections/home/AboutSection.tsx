"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineReveal } from "@/components/ui/TextReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * The company, briefly. Confident, not corporate, and short enough that
 * somebody actually reads it before the closing ask.
 */

const disciplines = ["design", "engineering", "ai", "product"] as const;

export function AboutSection() {
  const t = useTranslations("home.about");

  return (
    <Section id="about" tone="tinted" glow="center" glowStrength="medium">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="flex flex-col gap-5">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-[2.7rem]">
            <LineReveal>{t("headline.first")}</LineReveal>
            <LineReveal delay={0.08}>
              {t("headline.second")}{" "}
              <span className="font-serif font-normal italic text-primary">
                {t("headline.accent")}
              </span>{" "}
              {t("headline.third")}
            </LineReveal>
          </h2>

          <Reveal tier="quiet" delay={0.1}>
            <p className="max-w-lg text-pretty text-base leading-relaxed text-muted">
              {t("bodyOne")}
            </p>
          </Reveal>

          <Reveal tier="quiet" delay={0.16}>
            <p className="max-w-lg text-pretty text-base leading-relaxed text-muted">
              {t("bodyTwo")}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/10 bg-border/10">
          {disciplines.map((d) => (
            <RevealItem key={d} className="bg-background">
              <div className="group flex h-full flex-col gap-2 p-6 transition-colors duration-300 hover:bg-surface/60 md:p-8">
                <span className="h-px w-6 bg-primary transition-all duration-300 group-hover:w-10" />
                <span className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                  {t(`disciplines.${d}.label`)}
                </span>
                <span className="text-pretty text-sm leading-relaxed text-muted">
                  {t(`disciplines.${d}.note`)}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
