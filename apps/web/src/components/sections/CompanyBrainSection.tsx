"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const agentMarks = ["SUP", "SAL", "FIN", "RES", "DOC", "ASST"];

/**
 * Data-flow timing. The six dots are offset by STAGGER and each dot's full
 * cycle is exactly `agentMarks.length * STAGGER`, so arrivals at the brain
 * land on a perfectly even beat of one every STAGGER seconds. That lets the
 * brain's receive-pulse be a plain repeating animation on the same period
 * (delayed by TRAVEL) instead of a JS timer that would drift out of sync.
 */
const LINE_HEIGHT = 56; // matches h-14 on the connector line
const STAGGER = 0.5;
const TRAVEL = 1.3;
const CYCLE = agentMarks.length * STAGGER;

/**
 * The differentiator section: not six disconnected bots, one owned
 * knowledge base that every agent reads from and writes back to.
 */
export function CompanyBrainSection() {
  const t = useTranslations("aiAutomation.brain");
  const guarantees: string[] = t.raw("guarantees");
  const reduced = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  // once: false — the loops must stop again when the diagram scrolls away.
  const inView = useInView(visualRef, { once: false, margin: "-100px" });
  const flowing = inView && !reduced;

  return (
    <Section>
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="flex flex-col gap-4">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              accent={t("accent")}
              lead={t("lead")}
            />

            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted">
              {t("body")}
            </p>

            <ul className="mt-3 flex flex-col gap-3">
              {guarantees.map((g) => (
                <li
                  key={g}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex items-center justify-center">
            <div
              ref={visualRef}
              className="flex w-full max-w-[440px] flex-col items-center gap-6"
              role="img"
              aria-label={t("diagramLabel")}
            >
              <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
                {t("oneSource")}
              </span>

              <div className="grid w-full grid-cols-6 gap-2">
                {agentMarks.map((mark) => (
                  <div
                    key={mark}
                    className="flex h-11 items-center justify-center rounded-xl border border-primary/45 bg-background text-[9px] font-semibold text-primary"
                  >
                    {mark}
                  </div>
                ))}
              </div>

              {/* feed lines, each carrying one looping data dot down to the brain */}
              <div
                aria-hidden="true"
                className="grid w-full grid-cols-6 gap-2"
              >
                {agentMarks.map((mark, i) => (
                  <div key={mark} className="relative flex justify-center">
                    <span className="h-14 w-px bg-[repeating-linear-gradient(to_bottom,rgb(var(--color-primary)/0.5)_0_4px,transparent_4px_9px)]" />
                    <motion.span
                      className="pointer-events-none absolute left-1/2 top-0 -ml-[2.5px] size-[5px] rounded-full bg-primary"
                      style={{
                        boxShadow:
                          "0 0 7px 1px rgb(var(--color-primary) / 0.8)",
                      }}
                      initial={{ opacity: 0, y: 0 }}
                      animate={
                        flowing
                          ? { y: [0, LINE_HEIGHT], opacity: [0, 1, 1, 0] }
                          : { opacity: 0, y: 0 }
                      }
                      transition={
                        flowing
                          ? {
                              duration: TRAVEL,
                              delay: i * STAGGER,
                              repeat: Infinity,
                              repeatDelay: CYCLE - TRAVEL,
                              ease: "easeIn",
                              opacity: {
                                duration: TRAVEL,
                                delay: i * STAGGER,
                                repeat: Infinity,
                                repeatDelay: CYCLE - TRAVEL,
                                times: [0, 0.1, 0.92, 1],
                                ease: "linear",
                              },
                            }
                          : { duration: 0.2 }
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="relative w-full">
                {/* receive-pulse: fires once per dot arrival */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[999px] bg-primary/[0.12]"
                  style={{
                    boxShadow: "0 0 26px 3px rgb(var(--color-primary) / 0.32)",
                  }}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={
                    flowing
                      ? { opacity: [0, 0.9, 0, 0], scale: [1, 1.04, 1, 1] }
                      : { opacity: 0, scale: 1 }
                  }
                  transition={
                    flowing
                      ? {
                          duration: STAGGER,
                          delay: TRAVEL,
                          repeat: Infinity,
                          times: [0, 0.2, 0.62, 1],
                          ease: "easeOut",
                        }
                      : { duration: 0.2 }
                  }
                />

                <div className="relative flex w-full flex-col items-center gap-1 rounded-[999px] border border-primary/30 bg-primary/[0.06] px-8 py-7">
                  <span className="text-sm font-semibold text-foreground">
                    {t("brainLabel")}
                  </span>
                  <span className="text-[11px] text-muted">
                    {t("brainSub")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
