"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineReveal } from "@/components/ui/TextReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getCompany } from "@/config/company";
import { CapabilityPreview } from "./visuals/CapabilityPreview";
import { useSafeReducedMotion } from "@/components/ui/useSafeReducedMotion";

/**
 * The capability index.
 *
 * Deliberately not a grid of six cards. It is an editorial index on the left
 * and a single live preview pane on the right: hovering or focusing a row
 * swaps the interface shown, so the section behaves like one instrument
 * rather than six tiles. Below `lg` the pane cannot follow a pointer, so each
 * row carries its own preview inline and the layout becomes a proper reading
 * order instead of a squashed two column grid.
 */
export function CustomSolutionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useSafeReducedMotion();
  const t = useTranslations("Home.CustomSolutions");
  const { capabilities } = getCompany(useLocale());
  const active = capabilities[activeIndex];

  return (
    <Section id="services" tone="tinted">
      <div className="flex flex-col gap-4">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-[2.7rem]">
          <LineReveal>{t.rich("line1", { em: accent })}</LineReveal>
          <LineReveal delay={0.08}>
            {t.rich("line2", { em: accent })}
          </LineReveal>
        </h2>
        <Reveal tier="quiet" delay={0.1}>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted">
            {t("body")}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <RevealGroup className="flex flex-col" stagger={0.05}>
          {capabilities.map((c, i) => {
            const isActive = i === activeIndex;
            return (
              <RevealItem key={c.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                  aria-pressed={isActive}
                  className="group relative w-full border-t border-border/10 py-6 text-left last:border-b focus-visible:outline-none"
                >
                  {/* the accent rail that grows in from the left edge */}
                  <motion.span
                    aria-hidden="true"
                    animate={{ scaleY: isActive ? 1 : 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -left-4 top-0 h-full w-[2px] origin-center bg-primary md:-left-6"
                  />

                  <div className="flex items-baseline gap-4">
                    <span
                      className={`shrink-0 text-[11px] font-medium tabular-nums transition-colors duration-200 ${
                        isActive ? "text-primary" : "text-muted/50"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex-1">
                      <h3
                        className={`text-xl font-semibold tracking-tight transition-colors duration-200 md:text-2xl ${
                          isActive ? "text-foreground" : "text-foreground/70"
                        }`}
                      >
                        {c.name}
                      </h3>

                      <p className="mt-2 max-w-lg text-pretty text-sm leading-relaxed text-muted">
                        {c.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {c.detail.map((d) => (
                          <span
                            key={d}
                            className={`rounded-full border px-2.5 py-0.5 text-[11px] tracking-wide transition-colors duration-200 ${
                              isActive
                                ? "border-primary/30 text-foreground/80"
                                : "border-border/10 text-muted/70"
                            }`}
                          >
                            {d}
                          </span>
                        ))}
                      </div>

                      {/* inline preview: the pointer pane does not exist below lg */}
                      <div className="mt-5 h-44 lg:hidden">
                        <CapabilityPreview id={c.id} />
                      </div>
                    </div>

                    <motion.span
                      aria-hidden="true"
                      animate={{
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : -6,
                      }}
                      transition={{ duration: 0.24 }}
                      className="hidden shrink-0 text-primary lg:block"
                    >
                      &rarr;
                    </motion.span>
                  </div>
                </button>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* the pane. Sticky so it stays with the index as the list scrolls. */}
        <div className="hidden lg:block">
          <div className="sticky top-32">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/10 bg-surface/40 p-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="size-full"
                >
                  <CapabilityPreview id={active.id} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {active.name}
              </span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
                {t("counter", {
                  current: String(activeIndex + 1).padStart(2, "0"),
                  total: String(capabilities.length).padStart(2, "0"),
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
