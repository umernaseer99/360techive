"use client";

import {
  Headphones,
  TrendingUp,
  Wallet,
  Search,
  FileText,
  Crown,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { IconBox } from "@/components/ui/IconBox";
import type { AgentMeta } from "@/config/agents";

const iconMap: Record<string, LucideIcon> = {
  Headphones,
  TrendingUp,
  Wallet,
  Search,
  FileText,
  Crown,
};

interface AgentCardProps {
  agent: AgentMeta;
  descriptionLength?: number;
}

export function AgentCard({ agent, descriptionLength = 140 }: AgentCardProps) {
  const t = useTranslations("agents");
  const Icon = iconMap[agent.icon] ?? Headphones;
  const description = t(agent.slug + ".description");

  return (
    <Link
      href={`/ai-employees/${agent.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-border/10 bg-background p-7 transition-all duration-300 hover:border-primary/30 hover:bg-surface/60 hover:shadow-[0_12px_32px_-16px_rgb(0_0_0/0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <IconBox color="primary">
        <Icon className="size-5" />
      </IconBox>

      <h3 className="mt-5 text-lg font-semibold text-foreground">
        {t(agent.slug + ".name")}
      </h3>
      <p className="mt-1 text-sm text-primary">{t(agent.slug + ".tagline")}</p>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {description.slice(0, descriptionLength)}
        {description.length > descriptionLength ? "\u2026" : ""}
      </p>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        {t("learnMore")}
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transform-none"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}
