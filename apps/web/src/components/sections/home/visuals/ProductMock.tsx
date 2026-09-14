"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

/**
 * Product interface mockups.
 *
 * Chosen by index rather than by product name so a new entry in the products
 * config renders something sensible on day one. Four variants, cycled. All of
 * them are structure only: no invented numbers, no fake logos.
 */

const line = "rounded-full bg-border/25";

export function ProductMock({ variant }: { variant: number }) {
  const Variant = [SharedInbox, Onboarding, WeeklyReport, FieldSchedule][
    variant % 4
  ];
  return (
    <div className="size-full rounded-xl border border-border/10 bg-background/50 p-4 md:p-5">
      <Variant />
    </div>
  );
}

/** Shared inbox: a message list beside the item that is open. */
function SharedInbox() {
  return (
    <div className="flex h-full gap-3">
      <div className="flex w-[38%] flex-col gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className={`rounded-lg border p-2 ${
              i === 1
                ? "border-primary/30 bg-primary/20"
                : "border-border/10 bg-surface/50"
            }`}
          >
            <div className="mb-1.5 flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-border/25" />
              <span className={`h-1 w-10 ${line}`} />
            </div>
            <span className={`block h-1 w-full ${line}`} />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2 rounded-lg border border-border/10 bg-surface/40 p-3">
        <div className="h-2 w-2/3 rounded-full bg-border/30" />
        <div className={`h-1.5 w-full ${line}`} />
        <div className={`h-1.5 w-5/6 ${line}`} />
        <div className={`h-1.5 w-3/4 ${line}`} />
        <div className="mt-auto flex items-center gap-2">
          <span className="h-5 w-16 rounded-md bg-primary/30" />
          <span className="h-5 w-12 rounded-md border border-border/10" />
        </div>
      </div>
    </div>
  );
}

/** Onboarding: a checklist that ticks itself as it comes into view. */
function Onboarding() {
  const rows = [0, 1, 2, 3];
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="h-2 w-24 rounded-full bg-border/30" />
        <span className="h-4 w-14 rounded-full border border-primary/30 bg-primary/15" />
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-border/20">
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="block h-full origin-left rounded-full bg-primary"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2.5">
        {rows.map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.32, delay: 0.15 + i * 0.08 }}
            className="flex items-center gap-2.5 rounded-lg border border-border/10 bg-surface/50 p-2.5"
          >
            <span
              className={`flex size-4 shrink-0 items-center justify-center rounded-[5px] border ${
                i < 2
                  ? "border-primary/50 bg-primary/20"
                  : "border-border/15 bg-transparent"
              }`}
            >
              {i < 2 && (
                <svg viewBox="0 0 12 12" className="size-2.5 text-primary" fill="none">
                  <path
                    d="M2.5 6.2 5 8.6 9.5 3.6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span className={`h-1.5 flex-1 ${line}`} />
            <span className="h-3 w-10 rounded-full border border-border/10" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** Weekly report: a written update beside a small trend shape. */
function WeeklyReport() {
  const t = useTranslations("Home.Products.mock");
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <span className="h-2.5 w-28 rounded-full bg-border/30" />
        <span className="text-[9px] uppercase tracking-[0.16em] text-muted">
          {t("thisWeek")}
        </span>
      </div>
      <div className="flex flex-1 gap-3">
        <div className="flex flex-1 flex-col gap-1.5">
          {[100, 92, 84, 96, 70, 88, 60].map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: `${w}%` }}
              className={`h-1.5 origin-left ${
                i === 0 ? "bg-primary/40" : "bg-border/20"
              } rounded-full`}
            />
          ))}
        </div>
        <div className="relative w-[38%] rounded-lg border border-border/10 bg-surface/40 p-2">
          <svg viewBox="0 0 100 60" className="size-full" fill="none">
            <motion.path
              d="M4 48 L22 38 L40 42 L58 24 L76 28 L96 10"
              stroke="rgb(var(--color-primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.25 }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** Field schedule: a day column view with jobs placed on it. */
function FieldSchedule() {
  const t = useTranslations("Home.Products.mock");
  const jobs = [
    { col: 0, top: 12, h: 28 },
    { col: 1, top: 32, h: 22 },
    { col: 2, top: 8, h: 34 },
    { col: 1, top: 62, h: 18 },
    { col: 3, top: 44, h: 26 },
  ];
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex gap-2">
        {(t.raw("days") as string[]).map((d) => (
          <span
            key={d}
            className="flex-1 text-center text-[9px] uppercase tracking-[0.14em] text-muted"
          >
            {d}
          </span>
        ))}
      </div>
      <div className="relative flex flex-1 gap-2">
        {[0, 1, 2, 3].map((c) => (
          <div
            key={c}
            className="relative flex-1 rounded-lg border border-border/10 bg-surface/40"
          >
            {jobs
              .filter((j) => j.col === c)
              .map((j, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scaleY: 0.6 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.36, delay: 0.1 + i * 0.1 }}
                  style={{ top: `${j.top}%`, height: `${j.h}%` }}
                  className={`absolute inset-x-1 origin-top rounded-md border ${
                    c === 2
                      ? "border-primary/35 bg-primary/20"
                      : "border-border/10 bg-border/[0.12]"
                  }`}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
