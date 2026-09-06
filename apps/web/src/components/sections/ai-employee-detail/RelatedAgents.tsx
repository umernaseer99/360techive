"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AgentCard } from "@/components/sections/AgentCard";
import { agents, type AgentMeta } from "@/config/agents";

interface RelatedAgentsProps {
  current: AgentMeta;
}

export function RelatedAgents({ current }: RelatedAgentsProps) {
  const t = useTranslations("agentDetail");
  const others = agents.filter((a) => a.slug !== current.slug).slice(0, 3);

  return (
    <section className="border-y border-border/10 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <SectionHeading title={t("related.title")} accent={t("related.accent")} />
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
