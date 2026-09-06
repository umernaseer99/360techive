import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Cpu,
  Shield,
  DollarSign,
  BookOpen,
  Scale,
  Library,
  ChartNoAxesColumn,
  ClipboardCheck,
} from "lucide-react";

/**
 * Reference topics we plan to publish. Titles and descriptions live in
 * messages/{locale}.json under `resources.topics`, keyed by slug.
 */
export interface ResourceTopic {
  slug: string;
  icon: LucideIcon;
}

export const resourceTopics: ResourceTopic[] = [
  { slug: "what-is-an-ai-employee", icon: Bot },
  { slug: "how-we-build-agents", icon: Cpu },
  { slug: "data-security-and-compliance", icon: Shield },
  { slug: "costs-and-roi", icon: DollarSign },
  { slug: "ai-employee-vs-chatbot", icon: Scale },
  { slug: "glossary", icon: Library },
  { slug: "build-vs-buy", icon: BookOpen },
  { slug: "roi-calculator", icon: ChartNoAxesColumn },
  { slug: "readiness-check", icon: ClipboardCheck },
];
