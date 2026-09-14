"use client";

import {
  motion,
} from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { getCompany, type Project } from "@/config/company";
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
  const t = useTranslations("Home.Work");
  const { projects } = getCompany(useLocale());

  return (
    <Section id="work">
      <div className="flex flex-col gap-4">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-[2.7rem]">
          <LineReveal>{t.rich("title", { em: accent })}</LineReveal>
        </h2>
        <Reveal tier="quiet" delay={0.08}>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted">
            {t("body")}
          </p>
        </Reveal>
      </div>

      <div className="mt-16 flex flex-col gap-24 md:gap-32">
        {projects.map((project, i) => (
          <ProjectRow key={project.title} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reduced = useSafeReducedMotion();
  const t = useTranslations("Home.Work");

  return (
    <motion.article
      initial="rest"
      animate="rest"
      whileHover={reduced ? undefined : "hover"}
      className="flex flex-col gap-8"
    >
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-b border-border/10 pb-5">
          <div className="flex items-baseline gap-4">
            <span className="text-[11px] font-medium tabular-nums text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-balance text-xl font-semibold tracking-tight text-foreground md:text-[1.7rem]">
              {project.title}
            </h3>
          </div>
          <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
            {project.sector}
          </span>
        </div>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
        <Reveal delay={0.06}>
          <ProjectFrame variant={index} />
        </Reveal>

        <Reveal delay={0.12}>
          <dl className="flex flex-col gap-6">
            <Field label={t("problem")} value={project.problem} />
            <Field label={t("built")} value={project.built} />
            <Field label={t("approach")} value={project.approach} mono />
            <Field label={t("outcome")} value={project.outcome} accent />
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
