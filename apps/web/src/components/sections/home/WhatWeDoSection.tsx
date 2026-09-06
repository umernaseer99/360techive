"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { stages } from "@/config/company";

/**
 * Four stages, walked rather than listed.
 *
 * The rail behind the stages fills with scroll progress, and each stage marks
 * itself active while it sits in the middle band of the viewport. Reading down
 * the section feels like moving through the process, which is the point: the
 * usual four card grid says nothing about sequence.
 */
export function WhatWeDoSection() {
  const t = useTranslations("home.whatWeDo");
  const railRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 72%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <Section id="what-we-do" glow="right" glowStrength="soft">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-[2.7rem]">
            <LineReveal>{t("headline.first")}</LineReveal>
            <LineReveal delay={0.08}>
              {t("headline.second")}{" "}
              <span className="font-serif font-normal italic text-primary">
                {t("headline.accent")}
              </span>
            </LineReveal>
          </h2>

          <Reveal tier="quiet" delay={0.12}>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted">
              {t("body")}
            </p>
          </Reveal>
        </div>

        <ol ref={railRef} className="relative flex flex-col">
          {/* the rail: a static hairline with a progress line drawn over it */}
          <span
            aria-hidden="true"
            className="absolute left-[13px] top-2 w-px bg-border/10"
            style={{ height: "calc(100% - 1rem)" }}
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: fill, height: "calc(100% - 1rem)" }}
            className="absolute left-[13px] top-2 w-px origin-top bg-primary"
          />

          {stages.map((stage, i) => (
            <Stage
              key={stage}
              index={i}
              name={t(`stages.${stage}.name`)}
              line={t(`stages.${stage}.line`)}
              note={t(`stages.${stage}.note`)}
            />
          ))}
        </ol>
      </div>
    </Section>
  );
}

function Stage({
  index,
  name,
  line,
  note,
}: {
  index: number;
  name: string;
  line: string;
  note: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // Active only while the stage occupies the middle band of the viewport, so
  // exactly one stage leads at a time as the page moves.
  const active = useInView(ref, { margin: "-42% 0px -42% 0px" });

  return (
    <li ref={ref} className="relative flex gap-6 pb-14 pl-0 last:pb-0">
      <span className="relative z-10 mt-1 shrink-0">
        <motion.span
          animate={{
            backgroundColor: active
              ? "rgb(var(--color-primary))"
              : "rgb(var(--color-surface))",
            borderColor: active
              ? "rgb(var(--color-primary))"
              : "rgb(var(--color-border) / 0.2)",
            scale: active ? 1.12 : 1,
          }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="flex size-[27px] items-center justify-center rounded-full border"
        >
          <motion.span
            animate={{ opacity: active ? 1 : 0.55 }}
            transition={{ duration: 0.32 }}
            className={`text-[11px] font-semibold tabular-nums ${
              active ? "text-white" : "text-muted"
            }`}
          >
            {index + 1}
          </motion.span>
        </motion.span>
      </span>

      <motion.div
        animate={{ opacity: active ? 1 : 0.48 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-2"
      >
        <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {name}
        </h3>
        <p className="text-pretty text-[15px] leading-relaxed text-foreground/80">
          {line}
        </p>
        <motion.p
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : -4 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md text-pretty text-sm leading-relaxed text-muted"
        >
          {note}
        </motion.p>
      </motion.div>
    </li>
  );
}
