"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { useSafeReducedMotion } from "@/components/ui/useSafeReducedMotion";
import { stages } from "@/config/company";

/**
 * The delivery process, read left to right.
 *
 * Horizontal is the right axis for this: a buyer is being shown a sequence
 * with a beginning and an end, and four stages side by side make the whole
 * engagement legible at a glance instead of one stage at a time. The rail
 * behind the markers fills with scroll, so the eye is pulled along the order
 * of the work.
 *
 * Below `md` the row becomes a vertical rail, because four columns on a phone
 * would leave each stage too narrow to read. The rail simply changes axis, so
 * the sequence still reads the same way.
 */
export function WhatWeDoSection() {
  const t = useTranslations("home.whatWeDo");
  const railRef = useRef<HTMLOListElement>(null);
  const reduced = useSafeReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 85%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <Section id="what-we-do" glow="right" glowStrength="soft">
      {/* heading sits above the row, so the process gets the full width */}
      <div className="flex max-w-3xl flex-col gap-4">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-[2.7rem]">
          <LineReveal>{t("headline.first")}</LineReveal>
          <LineReveal delay={0.08}>
            {t("headline.second")}{" "}
            <span className="font-serif font-normal italic text-primary">
              {t("headline.accent")}
            </span>
          </LineReveal>
        </h2>
        <Reveal tier="quiet" delay={0.12}>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted">
            {t("body")}
          </p>
        </Reveal>
      </div>

      <ol
        ref={railRef}
        className="relative mt-16 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-8"
      >
        {/* the rail. Horizontal from md up, vertical below it. */}
        {/* Height has to come from a class, not an inline style: an inline
            style beats `md:h-px`, which turned this hairline into a full size
            block covering the steps at desktop widths. */}
        <span
          aria-hidden="true"
          className="absolute left-[13px] top-2 h-[calc(100%-1rem)] w-px bg-border/10 md:left-0 md:top-[13px] md:h-px md:w-full"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: fill, height: "calc(100% - 1rem)" }}
          className="absolute left-[13px] top-2 w-px origin-top bg-primary md:hidden"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleX: fill }}
          className="absolute left-0 top-[13px] hidden h-px w-full origin-left bg-primary md:block"
        />

        {/*
          Each stage animates itself rather than sitting inside a RevealGroup.
          The group wrapper needs `display: contents` to keep the items as grid
          children, and an element with no box has no measurable area, so its
          in-view trigger never fires and every stage stays at opacity zero.
          A motion list item has a real box and keeps the list semantics.
        */}
        {stages.map((stage, i) => (
          <motion.li
            key={stage}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: reduced ? 0.2 : 0.4,
              delay: reduced ? 0 : i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex gap-6 md:flex-col md:gap-0"
          >
            <span className="relative z-10 mt-1 shrink-0 md:mt-0">
              <span className="flex size-[27px] items-center justify-center rounded-full border border-primary/40 bg-background">
                <span className="text-[11px] font-semibold tabular-nums text-primary">
                  {i + 1}
                </span>
              </span>
            </span>

            <div className="flex flex-col gap-2 md:mt-6 md:pr-4">
              <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-[1.4rem]">
                {t(`stages.${stage}.name`)}
              </h3>
              <p className="text-pretty text-[15px] font-medium leading-relaxed text-foreground/85">
                {t(`stages.${stage}.line`)}
              </p>
              <p className="text-pretty text-sm leading-relaxed text-muted">
                {t(`stages.${stage}.note`)}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
