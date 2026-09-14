import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

interface Props {
  params: Promise<{ agentId: string }>;
}

export async function generateStaticParams() {
  return agents.map((agent) => ({ agentId: agent.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { agentId } = await params;
  const agent = getAgentBySlug(agentId);

  if (!agent) return { title: "Not Found" };

  return {
    title: `${agent.name} — 360 Techive`,
    description: agent.description,
    openGraph: {
      title: `${agent.name} — 360 Techive`,
      description: agent.tagline,
    },
  };
}

export default async function AIEmployeeDetailPage({ params }: Props) {
  const { agentId } = await params;
  const agent = getAgentBySlug(agentId);

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
