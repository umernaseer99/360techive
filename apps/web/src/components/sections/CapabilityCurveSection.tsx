"use client";

import { useRef, useState } from "react";
import type { Variants } from "framer-motion";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface CurvePoint {
  x: number;
  y: number;
  year: string;
  /** Message key for the note above the dot. */
  key: string;
  /**
   * Seconds into the line's draw at which the stroke actually reaches this
   * point. Derived from each point's share of total path length pushed back
   * through the easeInOut curve, so a dot pops when the line arrives at it
   * rather than on an even stagger.
   */
  at: number;
  current?: boolean;
}

/**
 * A cited third-party data point. This is the single most credibility-dense
 * element on the page precisely because the source is external and named —
 * do not replace the attribution or extend the solid line past "Today".
 */
const points: CurvePoint[] = [
  { x: 110, y: 268, year: "2019", key: "y2019", at: 0 },
  { x: 210, y: 240, year: "2020", key: "y2020", at: 0.48 },
  { x: 350, y: 196, year: "2023", key: "y2023", at: 0.76 },
  { x: 470, y: 152, year: "2025", key: "y2025", at: 1.01 },
  { x: 574, y: 124, year: "today", key: "today", at: 1.5, current: true },
];

const axis = [
  { y: 270, key: "seconds" },
  { y: 212, key: "minutes" },
  { y: 154, key: "hours" },
  { y: 96, key: "days" },
  { y: 38, key: "weeks" },
];

const OBSERVED_D =
  "M110 268 C160 262 190 250 210 240 C280 222 320 208 350 196 C400 176 440 164 470 152 C510 138 550 130 574 124";
const PROJECTED_D = "M574 124 C620 108 670 76 716 44";

/**
 * Sequence: frame first, then the observed line draws across it, then a
 * deliberate beat before the projection starts, so "this happened" and
 * "this is a forecast" never draw at the same time.
 */
const FRAME_IN = 0.3;
const LINE_START = 0.3;
const LINE_DURATION = 1.5;
const PROJECTED_START = LINE_START + LINE_DURATION + 0.18;
const PROJECTED_DURATION = 0.8;

const PROJECTION_MASK_ID = "capability-curve-projection-mask";

export function CapabilityCurveSection() {
  const t = useTranslations("aiAutomation.curve");
  const reduced = useReducedMotion();
  const figureRef = useRef<HTMLElement>(null);
  // the draw fires once…
  const started = useInView(figureRef, { once: true, margin: "-80px" });
  // …but the projection's breathing loop stops again when it scrolls away.
  const visible = useInView(figureRef, { once: false, margin: "-100px" });
  const [projectionDrawn, setProjectionDrawn] = useState(false);

  const breathing = projectionDrawn && visible && !reduced;

  const frame: Variants = {
    hidden: { opacity: 0 },
    shown: {
      opacity: 1,
      transition: { duration: reduced ? 0 : FRAME_IN, ease: "easeOut" },
    },
  };

  const observedLine: Variants = {
    hidden: { pathLength: 0 },
    shown: {
      pathLength: 1,
      transition: reduced
        ? { duration: 0 }
        : { duration: LINE_DURATION, delay: LINE_START, ease: "easeInOut" },
    },
  };

  const projectedLine: Variants = {
    hidden: { pathLength: 0 },
    shown: {
      pathLength: 1,
      transition: reduced
        ? { duration: 0 }
        : {
            duration: PROJECTED_DURATION,
            delay: PROJECTED_START,
            ease: "easeInOut",
          },
    },
  };

  const dotVariants = (p: CurvePoint): Variants => {
    const r = p.current ? 5.5 : 4.5;
    return {
      hidden: { r: 0 },
      shown: {
        r: reduced ? r : [0, r * 1.5, r],
        transition: reduced
          ? { duration: 0 }
          : {
              duration: 0.42,
              delay: LINE_START + p.at,
              times: [0, 0.55, 1],
              ease: "easeOut",
            },
      },
    };
  };

  const noteVariants = (p: CurvePoint): Variants => ({
    hidden: { opacity: 0 },
    shown: {
      opacity: 1,
      transition: reduced
        ? { duration: 0 }
        : { duration: 0.24, delay: LINE_START + p.at + 0.08, ease: "easeOut" },
    },
  });

  const projectedLabel: Variants = {
    hidden: { opacity: 0 },
    shown: {
      opacity: 1,
      transition: reduced
        ? { duration: 0 }
        : { duration: 0.3, delay: PROJECTED_START + 0.3, ease: "easeOut" },
    },
  };

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

      <Reveal delay={0.06}>
        <figure
          ref={figureRef}
          className="mt-12 rounded-2xl border border-border/10 bg-surface/30 px-8 pb-7 pt-9"
        >
          <motion.svg
            viewBox="0 0 760 320"
            className="w-full overflow-visible"
            role="img"
            aria-label={t("chartLabel")}
            initial="hidden"
            animate={started || reduced ? "shown" : "hidden"}
          >
            <defs>
              {/*
                The projection is dashed, so its draw cannot use pathLength
                directly — Framer owns strokeDasharray to implement that. A
                fat solid stroke wipes across as a mask instead and reveals
                the dashes underneath, keeping the dash pattern intact.
              */}
              <mask
                id={PROJECTION_MASK_ID}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="760"
                height="320"
              >
                <motion.path
                  d={PROJECTED_D}
                  fill="none"
                  stroke="white"
                  strokeWidth="10"
                  strokeLinecap="round"
                  variants={projectedLine}
                  onAnimationComplete={(definition) => {
                    if (definition === "shown") setProjectionDrawn(true);
                  }}
                />
              </mask>
            </defs>

            {/* frame: gridlines + scale labels, established before the draw */}
            <motion.g variants={frame}>
              {axis.map((a) => (
                <line
                  key={a.key}
                  x1="86"
                  y1={a.y}
                  x2="740"
                  y2={a.y}
                  className="stroke-foreground/[0.08]"
                  strokeWidth="1"
                />
              ))}

              <g className="fill-muted" fontSize="11" textAnchor="end">
                {axis.map((a) => (
                  <text key={a.key} x="72" y={a.y + 4}>
                    {t("axis." + a.key)}
                  </text>
                ))}
              </g>
            </motion.g>

            {/* observed */}
            <motion.path
              d={OBSERVED_D}
              fill="none"
              className="stroke-primary"
              strokeWidth="2.5"
              strokeLinecap="round"
              variants={observedLine}
            />

            {/*
              projection — deliberately dashed and dimmed, and once drawn it
              breathes, so a forecast never reads as settled fact
            */}
            <motion.g
              mask={`url(#${PROJECTION_MASK_ID})`}
              initial={false}
              animate={
                breathing ? { opacity: [0.8, 0.5, 0.8] } : { opacity: 0.8 }
              }
              transition={
                breathing
                  ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.3, ease: "easeOut" }
              }
            >
              <path
                d={PROJECTED_D}
                fill="none"
                className="stroke-primary/70"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="6 7"
              />
            </motion.g>

            <g className="fill-primary">
              {points.map((p) => (
                <motion.circle
                  key={p.year}
                  cx={p.x}
                  cy={p.y}
                  r={p.current ? 5.5 : 4.5}
                  variants={dotVariants(p)}
                />
              ))}
            </g>

            {/* year labels belong to the frame, not to the data */}
            <motion.g fontSize="10.5" textAnchor="middle" variants={frame}>
              {points.map((p) => (
                <text
                  key={p.year}
                  x={p.x}
                  y="292"
                  className={p.current ? "fill-foreground" : "fill-muted"}
                  fontWeight={p.current ? 600 : 400}
                >
                  {p.current ? t("points.today.year") : p.year}
                </text>
              ))}
            </motion.g>

            <motion.text
              x="716"
              y="292"
              fontSize="10.5"
              textAnchor="middle"
              className="fill-muted/65"
              variants={projectedLabel}
            >
              {t("projected")}
            </motion.text>

            <g fontSize="10.5" textAnchor="middle">
              {points.map((p) => (
                <motion.text
                  key={p.year}
                  x={p.x}
                  y={p.y - 16}
                  className={p.current ? "fill-foreground" : "fill-muted/75"}
                  variants={noteVariants(p)}
                >
                  {t("points." + p.key + ".note")}
                </motion.text>
              ))}
            </g>
          </motion.svg>

          <figcaption className="mt-5 max-w-3xl text-xs leading-relaxed text-muted/60">
            {t.rich("caption", {
              source: (chunks) => <em>{chunks}</em>,
            })}
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
