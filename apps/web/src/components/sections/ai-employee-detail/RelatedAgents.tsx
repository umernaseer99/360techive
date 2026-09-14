"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AgentCard } from "@/components/sections/AgentCard";
import { getAgents } from "@/config/agents";
import type { AgentProfile } from "@ai-software-house/shared-types";

interface RelatedAgentsProps {
  current: AgentProfile;
}

export function RelatedAgents({ current }: RelatedAgentsProps) {
  const t = useTranslations("AgentDetail");
  const others = getAgents(useLocale())
    .filter((a) => a.slug !== current.slug)
    .slice(0, 3);

  return (
    <section className="border-y border-border/10 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <SectionHeading title={t("relatedTitle")} accent={t("relatedAccent")} />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {others.map((agent, i) => (
            <motion.div
              key={agent.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <AgentCard agent={agent} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
