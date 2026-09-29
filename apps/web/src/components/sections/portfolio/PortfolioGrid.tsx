"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";
import { portfolio } from "@/config/company";

/**
 * The full set of work, with filters. This is the portfolio page; the homepage
 * carries a slider of the same cards.
 *
 * Filters are built from the tags the projects actually carry, so one can never
 * appear with nothing behind it. Tag a project "ai" and the AI filter shows up
 * on its own.
 */
export function PortfolioGrid() {
  const t = useTranslations("home.portfolio");
  const [active, setActive] = useState("all");

  const filters = useMemo(() => {
    const seen: string[] = [];
    for (const project of portfolio) {
      for (const tag of project.tags) if (!seen.includes(tag)) seen.push(tag);
    }
    return ["all", ...seen];
  }, []);

  const shown = useMemo(
    () =>
      active === "all"
        ? portfolio
        : portfolio.filter((project) => project.tags.includes(active)),
    [active]
  );

  return (
    <>
      <Reveal tier="quiet">
        <div
          role="group"
          aria-label={t("filterLabel")}
          className="flex flex-wrap gap-2"
        >
          {filters.map((filter) => {
            const isActive = filter === active;
            const count =
              filter === "all"
                ? portfolio.length
                : portfolio.filter((p) => p.tags.includes(filter)).length;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                  isActive
                    ? "border-primary bg-primary text-onPrimary"
                    : "border-border/15 text-muted hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {t(`filters.${filter}`)}
                <span
                  className={`text-[11px] tabular-nums ${
                    isActive ? "text-onPrimary/70" : "text-muted/60"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/*
        `layout` lets the cards that stay put slide into their new position
        instead of jumping, and popLayout stops a leaving card holding its slot
        while the rest reflow.
      */}
      <motion.div
        layout
        className="mt-12 grid gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {shown.map((project, i) => (
            <ProjectCard key={project.key} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {shown.length === 0 && (
        <p className="mt-10 text-sm text-muted">{t("empty")}</p>
      )}
    </>
  );
}
