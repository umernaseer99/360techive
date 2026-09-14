import type { Metadata } from "next";
import { Bot, Cable, RefreshCw, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";

export const metadata: Metadata = {
  title: "Services — 360 Techive",
  description:
    "Custom AI Employee development, integration, and ongoing improvement — from discovery to deployment and beyond.",
  openGraph: {
    title: "Services — 360 Techive",
    description:
      "Custom AI Employee development, integration, and ongoing improvement — from discovery to deployment and beyond.",
  },
};

const services = [
  {
    icon: Bot,
    title: "Custom Agent Development",
    description:
      "We build purpose-built AI Employees for each department in your business — not generic chatbots, but autonomous agents with access to your tools, data, and workflows. Each agent is designed around your specific processes, decision trees, and escalation paths, and is fully tested against real scenarios before deployment.",
  },
  {
    icon: Cable,
    title: "Integration & Data Connection",
    description:
      "Your new AI Employees connect directly to the tools your team already uses — CRM, helpdesk, accounting platforms, calendars, document storage, and internal APIs. We handle authentication, data mapping, and bidirectional sync so agents can read, write, and take action within your existing ecosystem without disruptions.",
  },
  {
    icon: RefreshCw,
    title: "Operation & Ongoing Improvement",
    description:
      "Deployment is just the start. We monitor every agent's performance, retrain on new data, and ship improvements weekly. Your team gets a dashboard showing resolution rates, time saved, and ROI per department. We adapt agent behavior as your business evolves — no handoff, no vendor lock-in.",
  },
];

const whatsIncluded = [
  "Dedicated agent architecture — each AI Employee is designed for your specific workflows, not a one-size-fits-all template",
  "Seamless integration with your existing tools — CRM, helpdesk, accounting, calendars, and internal APIs",
  "Ongoing monitoring and weekly improvement cycles — agents improve automatically over time",
  "No vendor lock-in — full visibility into how your agents work and the ability to adjust configurations",
  "Dedicated support engineer assigned to your account for the duration of the engagement",
  "ROI tracking dashboard showing time saved, resolution rates, and cost per department",
];

export default function ServicesPage() {
  return (
    <div className="pt-24">
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <SectionHeading
              title="We build AI Employees —"
              accent="not software."
            />
            <p className="mt-4 text-muted">
              This is not a self-serve platform. We design, build, integrate, and
              operate custom AI agents for each department — matching your tools,
              your workflows, and your standards.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <Card key={s.title} icon={<IconBox><s.icon className="size-5" /></IconBox>} title={s.title}>
                <p className="text-sm leading-relaxed text-muted">
                  {s.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/10 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <SectionHeading
              align="center"
              title="What's"
              accent="included."
            />
            <p className="mt-4 text-muted">
              Every engagement includes architecture, integration, monitoring, and
              full transparency — no hidden fees or handoffs.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-5">
            {whatsIncluded.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="size-4 text-primary" />
                </span>
                <p className="pt-1 text-base leading-relaxed text-muted">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
