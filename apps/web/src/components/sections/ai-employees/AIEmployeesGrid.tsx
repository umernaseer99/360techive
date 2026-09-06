"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { AgentCard } from "@/components/sections/AgentCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { agents } from "@/config/agents";
import type { Department } from "@ai-software-house/shared-types";

const departments: (Department | "all")[] = [
  "all",
  "customer-support",
  "sales",
  "finance",
  "research",
  "documents",
  "executive",
];

export function AIEmployeesGrid() {
  const t = useTranslations("aiEmployees.grid");
  const tDetail = useTranslations("agentDetail.departments");
  const [activeDept, setActiveDept] = useState<Department | "all">("all");

  const filtered =
    activeDept === "all"
      ? agents
      : agents.filter((a) => a.department === activeDept);

  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <SectionHeading title={t("title")} accent={t("accent")} />
          <p className="mt-4 text-muted">{t("body")}</p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2" role="tablist">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              role="tab"
              aria-selected={activeDept === dept}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                activeDept === dept
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/15 text-muted hover:border-foreground/20 hover:text-foreground"
              }`}
            >
              {dept === "all" ? t("all") : tDetail(dept)}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((agent) => (
              <motion.div
                key={agent.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <AgentCard agent={agent} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
