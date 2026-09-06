"use client";

import type { LucideIcon } from "lucide-react";
import { Headphones, TrendingUp, Wallet, Search, FileText, Crown } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NodeNetworkDiagram } from "@/components/ui/NodeNetworkDiagram";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { agents } from "@/config/agents";

const iconMap: Record<string, LucideIcon> = {
  Headphones,
  TrendingUp,
  Wallet,
  Search,
  FileText,
  Crown,
};

export function TeamOfDigitalEmployeesSection() {
  const t = useTranslations("team");
  const tAgents = useTranslations("agents");

  const diagramNodes = agents.map((a) => ({
    id: a.slug,
    label: tAgents(a.slug + ".short"),
    icon: iconMap[a.icon] ?? FileText,
    href: `/ai-employees/${a.slug}`,
  }));

  return (
    <section className="border-y border-border/10 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <RevealOnScroll direction="left">
            <SectionHeading title={t("title")} accent={t("accent")} />
            <p className="mt-4 text-muted">{t("body")}</p>
          </RevealOnScroll>

          <RevealOnScroll direction="right" className="flex justify-center">
            <NodeNetworkDiagram
              centerLabel={t("centerLabel")}
              nodes={diagramNodes}
              variant="orbit"
              animated
            />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
