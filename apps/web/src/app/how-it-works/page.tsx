import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "How It Works — 360 Techive",
  description:
    "From discovery to deployment and beyond — our four-phase process for building and operating custom AI Employees.",
  openGraph: {
    title: "How It Works — 360 Techive",
    description:
      "From discovery to deployment and beyond — our four-phase process for building and operating custom AI Employees.",
  },
};

const expandedSteps = [
  {
    num: "01",
    title: "Discovery",
    content:
      "Every engagement begins with a structured discovery phase. We conduct a workshop with your department heads and key stakeholders to map out current workflows, identify bottlenecks, and document the decision points and data sources involved in each process. We also audit your existing tool stack — CRM, helpdesk, ERP, calendars, document storage — to understand what APIs and data formats the agents will need to work with.",
    details: [
      "Identify 3–5 high-impact workflows per department that are candidates for automation",
      "Map data sources, tool permissions, and security requirements",
      "Define success metrics and baseline current performance (time spent, error rates, throughput)",
      "Typical timeframe: 3–5 business days",
    ],
  },
  {
    num: "02",
    title: "Agent Architecture Design",
    content:
      "Based on the discovery findings, we produce a detailed architecture document for each AI Employee. This specifies which tools the agent connects to, how it reasons through each workflow, which decisions it can make autonomously versus escalate to a human, and how its performance is measured. The architecture is reviewed and signed off by your team before any code is written.",
    details: [
      "Select the appropriate AI model and reasoning framework for each agent's domain",
      "Design tool integrations and data flow diagrams",
      "Define escalation rules, confidence thresholds, and human-in-the-loop handoffs",
      "Typical timeframe: 3–5 business days",
    ],
  },
  {
    num: "03",
    title: "Build & Integrate",
    content:
      "Each agent is built iteratively in two-week sprints. We connect the agent to your existing tools, configure its knowledge base from your documentation and historical data, and run it against real scenarios from your team. Every integration is tested for correctness, latency, and edge cases before the agent is deployed to a staging environment for user acceptance testing.",
    details: [
      "Concurrent build sprints for each AI Employee in the engagement",
      "Real-data testing using anonymized or sandboxed versions of your tools",
      "User acceptance testing with a small group of your team members",
      "Typical timeframe: 2–4 weeks depending on number of agents and integration complexity",
    ],
  },
  {
    num: "04",
    title: "Operate & Iterate",
    content:
      "Go-live is not the finish line. We monitor every agent's performance continuously, track resolution rates and time saved against the baselines established in discovery, and ship improvements on a weekly cycle. As your business processes evolve, we update agent configurations, add new tool integrations, and retrain on fresh data — all without any engineering work on your side.",
    details: [
      "Weekly performance reviews and improvement deployments",
      "Real-time dashboard showing agent metrics and ROI per department",
      "Quarterly business reviews with your leadership team",
      "No handoff, no vendor lock-in — full visibility into how every agent operates",
    ],
  },
];

const processFaqs = [
  {
    label: "How long does a typical build take?",
    content:
      "Most single-agent deployments are live within 2–4 weeks from kickoff. Multi-agent engagements typically take 4–8 weeks, with agents rolling out one at a time so your team can adapt gradually. The timeline depends primarily on the number of integrations and the complexity of the workflows being automated.",
  },
  {
    label: "Do we need to prepare anything before Discovery?",
    content:
      "No preparation is required. Our discovery workshop is designed to extract everything we need from your team's existing knowledge. If you want to get a head start, you can list the top 3–5 workflows per department that feel most repetitive or error-prone, but even that is optional. We do recommend having department heads available for the workshop sessions.",
  },
  {
    label: "What happens after an agent goes live?",
    content:
      "We transition into the ongoing operations phase. Your team gets a performance dashboard, we monitor agent decisions daily, and we ship improvements on a weekly cycle. If a workflow changes — a new CRM field, a modified approval process, a new tool — we handle the configuration update. You never need to write code or manage infrastructure.",
  },
  {
    label: "Can we see a prototype before committing?",
    content:
      "Yes. After the discovery and architecture phases, we build a working prototype connected to sandbox versions of your tools. Your team tests it against real scenarios. Only after you approve the prototype do we proceed to production deployment. This ensures there are no surprises and the agent meets your expectations from day one.",
  },
  {
    label: "What if our tool stack changes mid-engagement?",
    content:
      "That's normal. We design agents with loosely coupled integrations so that swapping a CRM, helpdesk, or data source is a configuration change, not a rebuild. If a new tool is introduced during the build phase, we adjust the integration scope and timeline accordingly — no penalties, just clear communication.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="pt-24">
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <SectionHeading
              title="How we build and operate"
              accent="your AI Employees."
            />
            <p className="mt-4 text-muted">
              A structured four-phase process from discovery to ongoing
              improvement — built for real business outcomes, not theoretical
              demos.
            </p>
          </div>

          <ProcessSteps />
        </div>
      </section>

      <section className="border-y border-border/10 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl">
            <SectionHeading
              align="center"
              title="What happens in"
              accent="each phase."
            />
          </div>

          <div className="mx-auto max-w-3xl space-y-16">
            {expandedSteps.map((step) => (
              <div key={step.num}>
                <div className="mb-4 flex items-center gap-4">
                  <span className="font-serif text-4xl font-light leading-none text-primary">
                    {step.num}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="mb-4 text-base leading-relaxed text-muted">
                  {step.content}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl">
            <SectionHeading
              align="center"
              title="Process & timeline"
              accent="FAQs."
            />
          </div>

          <Accordion items={processFaqs} />
        </div>
      </section>
    </div>
  );
}
