"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  motion,
  useInView,
} from "framer-motion";
import { Inbox, Bot, GitBranch, Zap, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { LineReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { useSafeReducedMotion } from "@/components/ui/useSafeReducedMotion";

/**
 * The bridge to the AI Automation page.
 *
 * AI is one of the things we do, so it gets one section here and the full
 * argument lives on its own page. The diagram is the whole point of the
 * section: it shows the shape of an automated process rather than decorating
 * the copy. Steps draw in on scroll, then a single packet runs the route on a
 * loop while the diagram is on screen and stops when it is not.
 */

/** Icons only; the labels come from the message catalogue. */
const steps = [
  { icon: Inbox, key: "input" },
  { icon: Bot, key: "agent" },
  { icon: GitBranch, key: "decision" },
  { icon: Zap, key: "action" },
  { icon: CheckCircle2, key: "result" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function AutomationSection() {
  const t = useTranslations("home.automation");
  const reduced = useSafeReducedMotion();
  const diagramRef = useRef<HTMLDivElement>(null);
  // once: false, so the loop stops when the diagram leaves the viewport.
  const inView = useInView(diagramRef, { once: false, margin: "-80px" });
  const flowing = inView && !reduced;

  return (
    <Section id="ai-automation" glow="right" glowStrength="strong">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="flex flex-col gap-5 lg:pt-4">
          <Eyebrow tone="primary">{t("eyebrow")}</Eyebrow>

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
              {t("body")}
            </p>
          </Reveal>

          <Reveal tier="quiet" delay={0.16}>
            <div className="pt-2">
              <Link href="/ai-automation">
                <Button size="lg" variant="secondary">
                  {t("cta")}
                  <span aria-hidden="true">&rarr;</span>
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>

        <div
          ref={diagramRef}
          role="img"
          aria-label={t("diagramLabel")}
          className="rounded-2xl border border-border/10 bg-surface/30 p-6 md:p-8"
        >
          <div className="flex flex-col gap-0 md:flex-row md:items-start">
            {steps.map((step, i) => (
              <div
                key={step.key}
                className="flex flex-1 flex-row items-start gap-4 md:flex-col md:items-center md:gap-0"
              >
                {/* node */}
                <div className="flex shrink-0 flex-col items-center md:w-full">
                  <div className="flex w-full items-center">
                    {/* left connector, desktop only */}
                    <Connector
                      hidden={i === 0}
                      delay={i * 0.12}
                      flowing={flowing}
                      reduced={!!reduced}
                    />

                    <motion.span
                      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.36, delay: i * 0.12, ease: EASE }}
                      className={`relative z-10 flex size-11 shrink-0 items-center justify-center rounded-xl border ${
                        i === 1
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border/10 bg-surface text-foreground/70"
                      }`}
                    >
                      <step.icon className="size-[18px]" strokeWidth={1.6} />
                    </motion.span>

                    <Connector
                      hidden={i === steps.length - 1}
                      delay={i * 0.12 + 0.06}
                      flowing={flowing}
                      reduced={!!reduced}
                    />
                  </div>

                  {/* mobile connector runs downward instead */}
                  {i !== steps.length - 1 && (
                    <motion.span
                      aria-hidden="true"
                      initial={reduced ? { opacity: 0 } : { scaleY: 0 }}
                      whileInView={{ scaleY: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.3, delay: i * 0.12 + 0.06, ease: EASE }}
                      className="h-10 w-px origin-top bg-border/15 md:hidden"
                    />
                  )}
                </div>

                <motion.div
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.34, delay: i * 0.12 + 0.1, ease: EASE }}
                  className="pb-8 md:px-2 md:pb-0 md:pt-4 md:text-center"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {t(`steps.${step.key}.label`)}
                  </p>
                  <p className="mt-1 text-pretty text-[13px] leading-relaxed text-muted">
                    {t(`steps.${step.key}.note`)}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-2 border-t border-border/10 pt-5 md:mt-6">
            <span className="relative flex size-1.5">
              {flowing && (
                <motion.span
                  animate={{ scale: [1, 2.6, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-primary"
                />
              )}
              <span className="relative size-1.5 rounded-full bg-primary" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
              {t("footnote")}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}

/**
 * A horizontal segment of the route. The line draws itself in on scroll, then
 * carries a repeating packet while the diagram is in view.
 */
function Connector({
  hidden,
  delay,
  flowing,
  reduced,
}: {
  hidden: boolean;
  delay: number;
  flowing: boolean;
  reduced: boolean;
}) {
  if (hidden) return <span className="hidden flex-1 md:block" />;

  return (
    <span className="relative hidden h-px flex-1 md:block">
      <motion.span
        aria-hidden="true"
        initial={reduced ? { opacity: 0 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.34, delay, ease: EASE }}
        className="absolute inset-0 origin-left bg-border/15"
      />
      {flowing && (
        <motion.span
          aria-hidden="true"
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            repeatDelay: 3.4,
            delay: 1 + delay * 4,
            ease: "easeInOut",
            times: [0, 0.2, 0.8, 1],
          }}
          className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary"
        />
      )}
    </span>
  );
}
