import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { agents, getAgentBySlug } from "@/config/agents";
import {
  AgentDetailHero,
  AgentResponsibilities,
  AgentFeatures,
  AgentBusinessBenefits,
  AgentUseCases,
  AgentInteractiveDemo,
  RelatedAgents,
} from "@/components/sections/ai-employee-detail";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { routing } from "@/i18n/routing";
import { localeMetadata } from "@/i18n/metadata";

interface Props {
  params: Promise<{ locale: string; agentId: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    agents.map((agent) => ({ locale, agentId: agent.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, agentId } = await params;
  const agent = getAgentBySlug(agentId);

  if (!agent) return { title: "Not Found" };

  const t = await getTranslations({ locale, namespace: "agents" });
  const name = t(`${agent.slug}.name`);

  return localeMetadata({
    locale,
    path: `/ai-employees/${agent.slug}`,
    title: `${name} — 360 Techive`,
    description: t(`${agent.slug}.description`),
  });
}

export default async function AIEmployeeDetailPage({ params }: Props) {
  const { locale, agentId } = await params;
  setRequestLocale(locale);

  const agent = getAgentBySlug(agentId);
  if (!agent) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "agents" });

  return (
    <>
      <AgentDetailHero agent={agent} />
      <AgentResponsibilities agent={agent} />
      <AgentFeatures agent={agent} />
      <AgentBusinessBenefits agent={agent} />
      <AgentUseCases agent={agent} />
      {agent.hasInteractiveDemo && <AgentInteractiveDemo agent={agent} />}
      <RelatedAgents current={agent} />
      <ContactCTASection agentName={t(`${agent.slug}.name`)} />
    </>
  );
}
