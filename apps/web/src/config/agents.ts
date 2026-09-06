import type { AgentProfile } from "@ai-software-house/shared-types";

/**
 * Structure of the six AI Employees: which ones exist, what they look like and
 * what they can do. Every piece of language — name, tagline, description,
 * features, responsibilities, benefits and use cases — lives in
 * messages/{locale}.json under `agents.<slug>` and is read with the slug as
 * the key.
 *
 * `featureCount`, `responsibilityCount`, `benefitCount` and `useCaseCount` say
 * how many entries each translated list has, so a component can render the
 * list without loading the catalogue itself.
 */
export interface AgentMeta {
  slug: AgentProfile["slug"];
  department: AgentProfile["department"];
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  status: AgentProfile["status"];
  hasInteractiveDemo: boolean;
  featureCount: number;
  responsibilityCount: number;
  benefitCount: number;
  useCaseCount: number;
}

const GRADIENT = { gradientFrom: "#DC2626", gradientTo: "#B91C1C" } as const;

export const agents: AgentMeta[] = [
  {
    slug: "support",
    department: "customer-support",
    icon: "Headphones",
    ...GRADIENT,
    status: "available",
    hasInteractiveDemo: true,
    featureCount: 4,
    responsibilityCount: 4,
    benefitCount: 3,
    useCaseCount: 2,
  },
  {
    slug: "sales",
    department: "sales",
    icon: "TrendingUp",
    ...GRADIENT,
    status: "available",
    hasInteractiveDemo: true,
    featureCount: 4,
    responsibilityCount: 4,
    benefitCount: 3,
    useCaseCount: 2,
  },
  {
    slug: "finance",
    department: "finance",
    icon: "Wallet",
    ...GRADIENT,
    status: "available",
    hasInteractiveDemo: true,
    featureCount: 4,
    responsibilityCount: 4,
    benefitCount: 3,
    useCaseCount: 2,
  },
  {
    slug: "research",
    department: "research",
    icon: "Search",
    ...GRADIENT,
    status: "available",
    hasInteractiveDemo: true,
    featureCount: 4,
    responsibilityCount: 4,
    benefitCount: 3,
    useCaseCount: 2,
  },
  {
    slug: "document",
    department: "documents",
    icon: "FileText",
    ...GRADIENT,
    status: "available",
    hasInteractiveDemo: true,
    featureCount: 4,
    responsibilityCount: 4,
    benefitCount: 3,
    useCaseCount: 2,
  },
  {
    slug: "executive-assistant",
    department: "executive",
    icon: "Crown",
    ...GRADIENT,
    status: "available",
    hasInteractiveDemo: true,
    featureCount: 4,
    responsibilityCount: 4,
    benefitCount: 3,
    useCaseCount: 2,
  },
];

export function getAgentBySlug(slug: string): AgentMeta | undefined {
  return agents.find((a) => a.slug === slug);
}
