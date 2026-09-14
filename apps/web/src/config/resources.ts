import type { LucideIcon } from "lucide-react";
import { resourceTopicsDe } from "./resources.de";
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

export interface ResourceTopic {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

/** English copy. German lives in resources.de.ts; read through getResourceTopics(locale). */
export const resourceTopics: ResourceTopic[] = [
  {
    slug: "what-is-an-ai-employee",
    title: "What Is an AI Employee?",
    description:
      "Unlike a chatbot that answers questions, an AI Employee is a persistent autonomous agent that takes action across your tools — creating tickets, updating records, generating reports, and more.",
    icon: Bot,
  },
  {
    slug: "how-we-build-agents",
    title: "How We Build Agents",
    description:
      "Each agent is purpose-built for one department using a modular architecture: perception layer, reasoning engine, tool integrations, and an escalation gate to human reviewers.",
    icon: Cpu,
  },
  {
    slug: "data-security-and-compliance",
    title: "Data Security & Compliance",
    description:
      "Agents operate in dedicated virtual private clouds with encryption at rest and in transit. We never train base models on your data, and you control retention policies.",
    icon: Shield,
  },
  {
    slug: "costs-and-roi",
    title: "Costs & ROI",
    description:
      "Pricing is per-agent per-month with volume discounts. Most clients see a positive return within the first quarter from reduced staffing costs and faster throughput.",
    icon: DollarSign,
  },
  {
    slug: "ai-employee-vs-chatbot",
    title: "AI Employee vs. Chatbot",
    description:
      "A chatbot waits for questions. An AI Employee owns outcomes — it monitors systems, initiates actions, escalates intelligently, and improves from feedback without retraining from scratch.",
    icon: Scale,
  },
  {
    slug: "glossary",
    title: "Glossary of Terms",
    description:
      "From retrieval-augmented generation (RAG) and tool-calling to escalation gates and confidence thresholds — plain-English definitions of the concepts behind autonomous agents.",
    icon: Library,
  },
  {
    slug: "build-vs-buy",
    title: "Build vs. Buy",
    description:
      "Building an in-house AI agent means hiring ML engineers, maintaining infrastructure, and iterating for months. Our agents deploy in weeks and improve continuously.",
    icon: BookOpen,
  },
  {
    slug: "roi-calculator",
    title: "Understanding ROI",
    description:
      "Estimating savings from department automation: hours reclaimed, reduced escalation volume, faster response times, and fewer errors — all measurable from week one.",
    icon: ChartNoAxesColumn,
  },
  {
    slug: "readiness-check",
    title: "Are You Ready for an AI Employee?",
    description:
      "The best candidates have documented workflows, structured data sources, repetitive but rule-based tasks, and a clear handoff point where human judgment is required.",
    icon: ClipboardCheck,
  },
];

export function getResourceTopics(locale: string): ResourceTopic[] {
  return locale === "de" ? resourceTopicsDe : resourceTopics;
}
