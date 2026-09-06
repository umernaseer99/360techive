"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineReveal } from "@/components/ui/TextReveal";
import { labAreas } from "@/config/company";
import { useSafeReducedMotion } from "@/components/ui/useSafeReducedMotion";

/**
 * A look at the current lab.
 *
 * Not a bullet list: the areas are set as a field of large type, and attention
 * moves through them on a slow cycle so the section reads as something that is
 * running rather than something that was written down. Pointing at an area
 * takes over the cycle, which makes the whole field feel live.
 *
 * The cycle only runs while the section is on screen, and never under reduced
 * motion.
 */

const DWELL = 2600;

export function BuildingNextSection() {
  const t = useTranslations("home.lab");
  const reduced = useSafeReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-120px" });

  const [index, setIndex] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);

  const running = inView && !reduced && pinned === null;

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % labAreas.length),
      DWELL
    );
    return () => clearInterval(timer);
  }, [running]);

  const activeIndex = pinned ?? index;
  const active = labAreas[activeIndex];

  return (
    <Section id="lab" glow="left" glowStrength="medium">
      <div ref={ref} className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-[2.7rem]">
            <LineReveal>
              {t("headline.first")}{" "}
              <span className="font-serif font-normal italic text-primary">
                {t("headline.accent")}
              </span>
            </LineReveal>
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          {/* the field */}
          <ul className="flex flex-wrap items-baseline gap-x-7 gap-y-3 md:gap-x-10 md:gap-y-4">
            {labAreas.map((area, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={area}>
                  <button
                    type="button"
                    onMouseEnter={() => setPinned(i)}
                    onMouseLeave={() => setPinned(null)}
                    onFocus={() => setPinned(i)}
                    onBlur={() => setPinned(null)}
                    className="group relative block text-left transition-transform duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none motion-reduce:transform-none"
                  >
                    <motion.span
                      animate={{
                        opacity: isActive ? 1 : 0.34,
                        color: isActive
                          ? "rgb(var(--color-foreground))"
                          : "rgb(var(--color-foreground))",
                      }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="block text-2xl font-semibold tracking-tight md:text-[2.1rem]"
                    >
                      {t(`areas.${area}.name`)}
                    </motion.span>

                    {/* underline that draws under whichever area currently leads */}
                    <motion.span
                      aria-hidden="true"
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-1 block h-px origin-left bg-primary"
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* the readout */}
          <div className="lg:border-l lg:border-border/10 lg:pl-10">
            <div className="flex items-center gap-2">
              <span className="relative flex size-1.5">
                {running && (
                  <motion.span
                    animate={{ scale: [1, 2.6, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 rounded-full bg-primary"
                  />
                )}
                <span className="relative size-1.5 rounded-full bg-primary" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
                {t("exploring")}
              </span>
            </div>

            <div className="relative mt-5 min-h-[6.5rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-base font-medium text-foreground">
                    {t(`areas.${active}.name`)}
                  </p>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                    {t(`areas.${active}.note`)}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-6 border-t border-border/10 pt-5 text-pretty text-sm leading-relaxed text-muted/80">
              {t("footnote")}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
