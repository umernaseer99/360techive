"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { PenTool, Code2, Sparkles, Package } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useSafeReducedMotion } from "@/components/ui/useSafeReducedMotion";

/**
 * The company, briefly.
 *
 * The four disciplines are the argument here: they are what makes "one
 * accountable team" true rather than a claim, so they are given a panel of
 * their own with an icon each and a numbered index. The pull quote carries the
 * point in the page's own serif, which is the same device the AI Automation
 * page uses for its thesis.
 *
 * Each tile animates itself. A RevealGroup wrapper would need display:contents
 * to stay a grid child, and an element with no box never satisfies its own
 * in-view trigger.
 */

const disciplines = [
  { key: "design", Icon: PenTool },
  { key: "engineering", Icon: Code2 },
  { key: "ai", Icon: Sparkles },
  { key: "product", Icon: Package },
] as const;

export function AboutSection() {
  const t = useTranslations("home.about");
  const reduced = useSafeReducedMotion();

  return (
    <Section id="about" glow="center" glowStrength="strong">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div className="flex flex-col gap-6">
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

          {/* the thesis, in the page's own serif */}
          <Reveal tier="quiet" delay={0.22}>
            <blockquote className="mt-2 border-l-2 border-primary pl-5">
              <p className="text-pretty font-serif text-xl font-normal italic leading-[1.35] text-foreground md:text-[1.6rem]">
                {t("pullQuote")}
              </p>
            </blockquote>
          </Reveal>

          <Reveal tier="quiet" delay={0.28}>
            <div className="pt-2">
              <Link href="/contact">
                <Button size="lg" variant="primary">
                  {t("cta")}
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* the four disciplines, as one panel */}
        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-2xl border border-border/15 bg-surface/40 shadow-[0_24px_60px_-40px_rgb(0_0_0/0.45)] backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-border/10 px-6 py-4">
              <span className="text-[11px] uppercase tracking-[0.15em] text-muted">
                {t("gridLabel")}
              </span>
              <span className="text-[11px] font-medium tabular-nums text-primary">
                {String(disciplines.length).padStart(2, "0")}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-px bg-border/10 sm:grid-cols-2">
              {disciplines.map(({ key, Icon }, i) => (
                <motion.div
                  key={key}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: reduced ? 0.2 : 0.4,
                    delay: reduced ? 0 : i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative bg-background p-6 transition-colors duration-300 hover:bg-surface/70 md:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl border border-border/15 bg-surface/60 text-primary transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
                      <Icon className="size-[18px]" strokeWidth={1.6} />
                    </span>
                    <span className="text-[11px] font-medium tabular-nums text-muted/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                    {t(`disciplines.${key}.label`)}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                    {t(`disciplines.${key}.note`)}
                  </p>

                  {/* accent rule that grows on hover, the page's standard gesture */}
                  <span
                    aria-hidden="true"
                    className="mt-5 block h-px w-6 bg-primary transition-all duration-300 group-hover:w-12"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
