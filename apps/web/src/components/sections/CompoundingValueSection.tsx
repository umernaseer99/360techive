"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * The "start now" argument: an agent system accumulates rather than
 * depreciating. Each stage shows more of the bar row filled — the visual
 * carries the point without a chart.
 *
 * The story is told by the COUNT of filled bars, never by their height. Every
 * bar — filled or empty, in every card — is the same width, height, gap and
 * radius, so the four mini-charts read as one instrument with four readings.
 */
const BAR_COUNT = 6;

/** Order and fill level only; the wording comes from the catalogue. */
const stages: { key: string; filled: number }[] = [
  { key: "monthOne", filled: 1 },
  { key: "monthThree", filled: 3 },
  { key: "monthSix", filled: 5 },
  { key: "yearOne", filled: 6 },
];

/**
 * The cards fill in temporal order rather than all at once, so the row reads
 * as the growth story unfolding left to right. Cards overlap deliberately —
 * Month 3 starts while Month 1 is still finishing — which keeps the whole
 * sequence under 2s (last bar lands at ~1.88s) instead of feeling sluggish.
 */
const EASE = [0.16, 1, 0.3, 1] as const;
const BASE_DELAY = 0.15; // let the card itself arrive first
const CARD_STEP = 0.32;
const BAR_STAGGER = 0.07;
const BAR_DURATION = 0.42;

export function CompoundingValueSection() {
  const t = useTranslations("aiAutomation.compounding");
  const reduced = useReducedMotion();

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

      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, stageIndex) => (
          <RevealItem key={stage.key} className="h-full">
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-border/10 bg-surface/30 p-6">
              <Eyebrow tone="primary">{t("stages." + stage.key + ".when")}</Eyebrow>

              <div
                className="flex h-16 items-stretch gap-1.5"
                role="img"
                aria-label={t("coverage", {
                  filled: stage.filled,
                  total: BAR_COUNT,
                })}
              >
                {Array.from({ length: BAR_COUNT }, (_, i) =>
                  i < stage.filled ? (
                    <motion.span
                      key={i}
                      className="flex-1 rounded-[3px] bg-primary"
                      style={{ transformOrigin: "bottom" }}
                      initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-64px" }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : {
                              duration: BAR_DURATION,
                              ease: EASE,
                              delay:
                                BASE_DELAY +
                                stageIndex * CARD_STEP +
                                i * BAR_STAGGER,
                            }
                      }
                    />
                  ) : (
                    // an empty slot is a full-height placeholder bar, not a
                    // baseline tick — it reads as "a department not covered yet"
                    <span
                      key={i}
                      className="flex-1 rounded-[3px] border border-foreground/10 bg-foreground/[0.04]"
                    />
                  )
                )}
              </div>

              <h3 className="text-[15px] font-semibold text-foreground">
                {t("stages." + stage.key + ".title")}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {t("stages." + stage.key + ".body")}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
