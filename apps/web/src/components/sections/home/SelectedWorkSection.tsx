"use client";

import {
  motion,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { projects, type Project } from "@/config/company";
import { ProjectFrame } from "./visuals/ProjectFrame";
import { useSafeReducedMotion } from "@/components/ui/useSafeReducedMotion";

/**
 * Selected work.
 *
 * Large previews, one project per row, with the story told in four short
 * fields: what was wrong, what we built, what it was built with, what changed.
 * No percentages and no invented numbers anywhere, which is also why the
 * outcome field is written as a sentence rather than a statistic.
 *
 * Real case studies drop straight into `projects` in config/company.ts.
 */
export function SelectedWorkSection() {
  const t = useTranslations("home.work");

  return (
    <Section id="work" glow="bottom" glowStrength="soft">
      <div className="flex flex-col gap-4">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-[2.7rem]">
          <LineReveal>
            {t("headline.first")}{" "}
            <span className="font-serif font-normal italic text-primary">
              {t("headline.accent")}
            </span>{" "}
            {t("headline.second")}
          </LineReveal>
        </h2>
        <Reveal tier="quiet" delay={0.08}>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted">
            {t("body")}
          </p>
        </Reveal>
      </div>

      <div className="mt-16 flex flex-col gap-24 md:gap-32">
        {projects.map((project, i) => (
          <ProjectRow key={project.key} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const t = useTranslations("home.work");
  const reduced = useSafeReducedMotion();

  return (
    <motion.article
      initial="rest"
      animate="rest"
      whileHover={reduced ? undefined : "hover"}
      className="group flex flex-col gap-8"
    >
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-b border-border/10 pb-5">
          <div className="flex items-baseline gap-4">
            <span className="text-[11px] font-medium tabular-nums text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-balance text-xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary md:text-[1.7rem]">
              {t(`projects.${project.key}.title`)}
            </h3>
          </div>
          <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
            {t(`projects.${project.key}.sector`)}
          </span>
        </div>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
        <Reveal delay={0.06}>
          <div className="relative">
            <motion.span
              aria-hidden="true"
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute -inset-3 -z-10 rounded-[44px] md:-inset-8"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgb(var(--color-primary) / 0.20), transparent 70%)",
              }}
            />
            <ProjectFrame variant={index} />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <dl className="flex flex-col gap-6">
            <Field
              label={t("fields.problem")}
              value={t(`projects.${project.key}.problem`)}
            />
            <Field
              label={t("fields.built")}
              value={t(`projects.${project.key}.built`)}
            />
            <Field label={t("fields.approach")} value={project.approach} mono />
            <Field
              label={t("fields.outcome")}
              value={t(`projects.${project.key}.outcome`)}
              accent
            />
          </dl>
        </Reveal>
      </div>
    </motion.article>
  );
}

function Field({
  label,
  value,
  mono = false,
  accent = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="text-[11px] uppercase tracking-[0.14em] text-muted/70">
        {label}
      </dt>
      <dd
        className={`text-pretty text-[15px] leading-relaxed ${
          accent ? "text-foreground" : "text-muted"
        } ${mono ? "font-medium text-foreground/80" : ""}`}
      >
        {accent && (
          <span
            aria-hidden="true"
            className="mr-2.5 inline-block h-px w-5 align-middle bg-primary"
          />
        )}
        {value}
      </dd>
    </div>
  );
}
