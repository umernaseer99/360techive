import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { agents, getAgentBySlug } from "@/config/agents";
import { routing, toLocale } from "@/i18n/routing";
import {
  AgentDetailHero,
  AgentResponsibilities,
  AgentFeatures,
  AgentBusinessBenefits,
  AgentUseCases,
  AgentInteractiveDemo,
  RelatedAgents,
} from "@/components/sections/ai-employee-detail";

interface Props {
  params: Promise<{ locale: string; agentId: string }>;
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    agents.map((agent) => ({ locale, agentId: agent.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, agentId } = await params;
  const locale = toLocale(rawLocale);
  const agent = getAgentBySlug(agentId, locale);
  const t = await getTranslations({ locale, namespace: "AgentDetail" });

  if (!agent) return { title: t("notFound") };

  return {
    title: t("metaTitle", { name: agent.name }),
    description: agent.description,
    openGraph: {
      title: t("metaTitle", { name: agent.name }),
      description: agent.tagline,
    },
  };
}

export default async function AIEmployeeDetailPage({ params }: Props) {
  const { locale: rawLocale, agentId } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);
  const agent = getAgentBySlug(agentId, locale);

  if (!agent) {
    notFound();
  }

  return (
    <>
      <AgentDetailHero agent={agent} />
      <AgentResponsibilities agent={agent} />
      <AgentFeatures agent={agent} />
      <AgentBusinessBenefits agent={agent} />
      <AgentUseCases agent={agent} />
      {agent.hasInteractiveDemo && <AgentInteractiveDemo agent={agent} />}
      <RelatedAgents current={agent} />
    </>
  );
}
