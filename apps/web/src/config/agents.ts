import type { AgentProfile } from "@ai-software-house/shared-types";
import { agentsDe } from "./agents.de";

/** English copy. German lives in agents.de.ts; read through getAgents(locale). */

export const agents: AgentProfile[] = [
  {
    slug: "support",
    name: "Support Agent",
    department: "customer-support",
    tagline: "Resolve tickets before they escalate",
    description:
      "An autonomous helpdesk agent that triages incoming requests, answers common questions from your knowledge base, and escalates only when human judgment is needed. It learns from resolved tickets to improve its own accuracy over time.",
    icon: "Headphones",
    gradientFrom: "#DC2626",
    gradientTo: "#B91C1C",
    features: [
      "Ticket triage and categorization",
      "Knowledge-base auto-reply",
      "Escalation routing",
      "Sentiment-aware responses",
    ],
    responsibilities: [
      "Answer customer questions from your documentation and FAQ",
      "Track and update support tickets across their lifecycle",
      "Escalate complex or sensitive issues to the right human team",
      "Surface recurring problems so your product team can fix root causes",
    ],
    businessBenefits: [
      "Respond to customers in seconds, not hours",
      "Reduce support ticket volume by 40–60%",
      "Free senior engineers from tier-1 triage",
    ],
    useCases: [
      "A SaaS company routes all tier-1 billing and account questions to the Support Agent, cutting average first-reply time from 4 hours to 30 seconds.",
      "An e-commerce brand deploys the agent on its help center to handle order-status lookups and return requests around the clock.",
    ],
    status: "available",
    hasInteractiveDemo: true,
  },
  {
    slug: "sales",
    name: "Sales Agent",
    department: "sales",
    tagline: "Qualify leads and book meetings",
    description:
      "An AI sales development representative that engages website visitors, answers product questions, qualifies inbound leads against your ICP, and schedules demos — all without a human in the loop until the meeting starts.",
    icon: "TrendingUp",
    gradientFrom: "#DC2626",
    gradientTo: "#B91C1C",
    features: [
      "Lead qualification and scoring",
      "Multi-channel outreach sequences",
      "Calendar booking and rescheduling",
      "CRM sync (HubSpot, Salesforce)",
    ],
    responsibilities: [
      "Explain your services and recommend the right solution for each prospect",
      "Qualify leads against your ideal customer profile",
      "Schedule meetings and demos with the right sales rep",
      "Follow up on stalled conversations automatically",
    ],
    businessBenefits: [
      "Convert more inbound traffic into qualified meetings",
      "Shorten the sales cycle with instant, informed responses",
      "Let your closers focus on the final conversation, not the first fifty",
    ],
    useCases: [
      "A B2B agency installs the Sales Agent on its pricing page; it answers technical questions and books 15-minute discovery calls, doubling the monthly meeting pipeline.",
      "A software company uses the agent to nurture trial users, answering feature questions and converting them to paid subscriptions.",
    ],
    status: "available",
    hasInteractiveDemo: true,
  },
  {
    slug: "finance",
    name: "Finance Agent",
    department: "finance",
    tagline: "Reconcile, report, forecast",
    description:
      "An AI finance analyst that connects to your accounting stack, generates expense summaries and revenue reports, flags anomalies, and answers natural-language questions about your financial data.",
    icon: "Wallet",
    gradientFrom: "#DC2626",
    gradientTo: "#B91C1C",
    features: [
      "Expense categorization and summary",
      "Revenue reporting and variance analysis",
      "Invoice lookup and payment reminders",
      "Anomaly detection on transactions",
    ],
    responsibilities: [
      "Summarize expenses by category, department, or project",
      "Generate weekly and monthly revenue reports with comparisons",
      "Look up invoices, payment status, and vendor history",
      "Send automated payment reminders to overdue accounts",
    ],
    businessBenefits: [
      "Close the books faster — no waiting for manual spreadsheet consolidation",
      "Get instant answers to financial questions without pulling a report",
      "Catch billing anomalies before they compound",
    ],
    useCases: [
      "A mid-market agency asks the Finance Agent for 'last month's ad spend by channel' and gets a categorized breakdown in seconds instead of waiting for accounting.",
      "A professional services firm automates weekly revenue reconciliation by having the agent cross-check Stripe, bank deposits, and invoices every Monday morning.",
    ],
    status: "available",
    hasInteractiveDemo: true,
  },
  {
    slug: "research",
    name: "Research Agent",
    department: "research",
    tagline: "Deep research at machine speed",
    description:
      "An AI research associate that gathers, synthesizes, and summarizes information from the web, documents, and databases. It produces structured briefs, competitor analyses, and trend reports on demand or on a schedule.",
    icon: "Search",
    gradientFrom: "#DC2626",
    gradientTo: "#B91C1C",
    features: [
      "Multi-source web research and citation",
      "Competitor and market landscape analysis",
      "Trend identification and summarization",
      "Scheduled recurring report generation",
    ],
    responsibilities: [
      "Conduct market research on industries, competitors, and emerging trends",
      "Produce competitor analysis with pricing, positioning, and feature comparisons",
      "Identify trends from news, reports, and social signals",
      "Generate concise business insight briefs for leadership",
    ],
    businessBenefits: [
      "Get research briefs in minutes instead of days",
      "Track competitors continuously instead of quarterly",
      "Free your strategy team from hours of manual reading and note-taking",
    ],
    useCases: [
      "A management consultancy asks the Research Agent to 'compare AI compliance frameworks across the EU, US, and UK' and receives a sourced, structured brief within five minutes.",
      "An investment firm schedules weekly competitor-movement reports; the agent monitors news, SEC filings, and press releases automatically.",
    ],
    status: "available",
    hasInteractiveDemo: true,
  },
  {
    slug: "document",
    name: "Document Agent",
    department: "documents",
    tagline: "Draft, review, distribute",
    description:
      "An AI document specialist that drafts proposals, reports, and contracts from templates and structured data. It can summarize long documents, extract key terms, and maintain version history across your document repository.",
    icon: "FileText",
    gradientFrom: "#DC2626",
    gradientTo: "#B91C1C",
    features: [
      "Template-based document generation",
      "Long-document summarization",
      "Key-term extraction and comparison",
      "Version tracking and change logs",
    ],
    responsibilities: [
      "Generate quotations, proposals, and invoices from structured data",
      "Summarize lengthy reports, contracts, and articles",
      "Extract key clauses and obligations from legal documents",
      "Maintain a versioned library of generated documents",
    ],
    businessBenefits: [
      "Reduce document drafting time by 70%",
      "Eliminate copy-paste errors in proposals and contracts",
      "Keep a searchable, version-controlled document history automatically",
    ],
    useCases: [
      "A professional services firm generates client proposals from a set of standardized modules — the agent populates pricing, scope, and timelines from the CRM in under a minute.",
      "A legal department feeds incoming contracts to the Document Agent, which extracts termination clauses, renewal dates, and liability caps into a comparison table.",
    ],
    status: "available",
    hasInteractiveDemo: true,
  },
  {
    slug: "executive-assistant",
    name: "Executive Assistant Agent",
    department: "executive",
    tagline: "Your AI chief of staff",
    description:
      "An AI executive assistant that coordinates schedules, drafts correspondence, sets reminders, and surfaces what needs your attention — across calendars, email, and task tools — so you can focus on decisions, not logistics.",
    icon: "Crown",
    gradientFrom: "#DC2626",
    gradientTo: "#B91C1C",
    features: [
      "Cross-calendar scheduling and conflict resolution",
      "Email drafting and follow-up reminders",
      "Priority triage across inbox and tasks",
      "Meeting preparation briefs and summaries",
    ],
    responsibilities: [
      "Manage schedules by finding availability across attendees and booking time",
      "Draft emails, meeting agendas, and follow-up messages",
      "Create and track reminders for deadlines, reviews, and follow-ups",
      "Organize meetings including agenda preparation and note distribution",
    ],
    businessBenefits: [
      "Recover hours per week spent on calendar wrangling",
      "Never miss a follow-up or deadline again",
      "Walk into every meeting with a prep brief already written",
    ],
    useCases: [
      "An executive asks the agent to 'find time next week for a 30-minute sync with each department head' — it cross-references calendars and books five slots in one request.",
      "A busy founder has the agent draft weekly status emails to the board, pulling in project updates from the task management system automatically.",
    ],
    status: "available",
    hasInteractiveDemo: true,
  },
];

export function getAgents(locale: string): AgentProfile[] {
  return locale === "de" ? agentsDe : agents;
}

export function getAgentBySlug(
  slug: string,
  locale: string
): AgentProfile | undefined {
  return getAgents(locale).find((a) => a.slug === slug);
}
