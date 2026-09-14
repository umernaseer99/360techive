"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineReveal } from "@/components/ui/TextReveal";
import { BuildSystemVisual } from "./visuals/BuildSystemVisual";
import { useSafeReducedMotion } from "@/components/ui/useSafeReducedMotion";

/**
 * The opening screen. It has one job: say what the company is inside three
 * seconds, and show that we build more than one kind of thing.
 *
 * Load choreography, staggered rather than simultaneous:
 *   0.00  eyebrow
 *   0.08  headline, line by line
 *   0.44  supporting paragraph
 *   0.54  actions
 *   0.64  footnote
 * The visual runs its own entrance in parallel so nothing waits on it.
 */
export function HomeHero() {
  const reduced = useSafeReducedMotion();
  const t = useTranslations("Home.Hero");

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      {/* the one ambient wash on the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 -top-56 size-[760px] rounded-full bg-[radial-gradient(circle,rgb(var(--color-primary)/0.10),transparent_65%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20">
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </motion.div>

          <h1 className="text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.1rem]">
            <LineReveal trigger="mount" delay={0.08}>
              {t.rich("line1", { em: accent })}
            </LineReveal>
            <LineReveal trigger="mount" delay={0.19}>
              {t.rich("line2", { em: accent })}
            </LineReveal>
            <LineReveal trigger="mount" delay={0.3}>
              {t.rich("line3", { em: accent })}
            </LineReveal>
          </h1>

          <motion.p
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg"
          >
            {t("body")}
          </motion.p>

          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap"
          >
            <Link href="/#work" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto">
                {t("primary")}
              </Button>
            </Link>
            <Link href="/#services" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                {t("secondary")}
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.64 }}
            className="pt-3 text-sm text-muted/70"
          >
            {t("footnote")}
          </motion.p>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <BuildSystemVisual />
        </div>
      </div>
    </section>
  );
}
