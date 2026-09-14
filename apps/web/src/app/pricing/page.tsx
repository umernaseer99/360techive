import type { Metadata } from "next";
import Link from "next/link";
import { Settings, Database, Activity, Users, Headphones } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Pricing — 360 Techive",
  description:
    "Custom pricing for custom AI Employees. Every deployment is scoped, quoted, and built to match your specific workflows and tools.",
  openGraph: {
    title: "Pricing — 360 Techive",
    description:
      "Custom pricing for custom AI Employees. Every deployment is scoped, quoted, and built to match your specific workflows and tools.",
  },
};

const costFactors = [
  {
    icon: Settings,
    title: "Number of AI Employees",
    description:
      "A single-department deployment costs less than a multi-agent rollout across Support, Sales, and Finance. We offer volume structuring for teams deploying 3+ agents together.",
  },
  {
    icon: Database,
    title: "Integration Complexity",
    description:
      "Connecting to one CRM with a well-documented API is straightforward. Connecting to a legacy ERP, multiple data warehouses, or custom internal tools requires additional engineering and scoping.",
  },
  {
    icon: Activity,
    title: "Data Volume & Throughput",
    description:
      "Agents handling thousands of transactions per day require more robust infrastructure and monitoring than lower-volume deployments. We right-size the architecture to match your actual load.",
  },
  {
    icon: Users,
    title: "Number of Users & Departments",
    description:
      "An agent serving a 10-person team is configured differently than one supporting 200 users across multiple regions with role-based access and escalation chains.",
  },
  {
    icon: Headphones,
    title: "Support & Maintenance Level",
    description:
      "Standard ongoing support includes weekly monitoring and updates. Enterprise plans include dedicated support engineers, faster response SLAs, and custom reporting.",
  },
];

const pricingFaqs = [
  {
    label: "Is there a minimum project size?",
    content:
      "We typically start engagements with at least one full AI Employee deployment. There is no minimum seat count or revenue requirement — if a single agent can save your team meaningful hours per week, the engagement makes sense. We have clients with 10-person teams and clients with 1,000-person teams.",
  },
  {
    label: "Do you offer ongoing support contracts?",
    content:
      "Yes. Every deployment includes an initial operations period as part of the build. After that, we offer monthly support contracts that cover monitoring, updates, retraining, and ongoing integration maintenance. Enterprise contracts include dedicated support engineers and faster response times.",
  },
  {
    label: "Can we start with one AI Employee and add more later?",
    content:
      "Absolutely. Most clients start with one department — Support or Finance are common first choices — and expand to additional agents after seeing results. Adding agents later is faster and more cost-effective because the integration foundation is already in place.",
  },
  {
    label: "What is included in the build cost?",
    content:
      "The build cost covers discovery workshops, agent architecture design, development and testing, integration with your existing tools, user acceptance testing, and deployment. It also includes the first month of operations and performance monitoring.",
  },
  {
    label: "Do you require long-term contracts?",
    content:
      "No. Engagements are structured month-to-month after the initial build. We believe the value of the agents keeps clients on board — not lock-in clauses. You can scale up, scale down, or conclude the engagement at any time with 30 days' notice.",
  },
];

export default function PricingPage() {
  return (
    <div className="pt-24">
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <SectionHeading
              title="Pricing built for"
              accent="custom scope."
            />
            <p className="mt-4 text-muted">
              We build bespoke AI Employees — not SaaS subscriptions. Every
              deployment is different, so every price is quoted based on your
              actual requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/10 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <SectionHeading
              title="What determines"
              accent="the cost."
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {costFactors.map((f) => (
              <Card
                key={f.title}
                icon={<IconBox><f.icon className="size-5" /></IconBox>}
                title={f.title}
              >
                <p className="text-sm leading-relaxed text-muted">
                  {f.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/10 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <SectionHeading
              title="Getting an accurate"
              accent="quote."
            />
            <p className="mt-4 text-muted">
              The only way to get a real price is to scope your requirements. Our{" "}
              <Link href="/how-it-works" className="text-primary underline underline-offset-2 hover:no-underline">discovery process</Link>{" "}
              produces a detailed architecture document and a fixed-price quote —
              no bait-and-switch, no hidden fees.
            </p>
            <div className="mt-6 rounded-2xl border border-dashed border-muted/30 bg-surface/30 p-6 text-sm leading-relaxed text-muted">
              <span className="block text-xs font-semibold uppercase tracking-widest text-muted/50">
                Range indicator
              </span>
              <span className="mt-2 block">
                Most single-department deployments start in the{" "}
                <span className="text-foreground">[X–Y]</span> range. Multi-agent
                and enterprise deployments vary based on scope.{" "}
                <span className="italic text-muted/40">
                  (Your real numbers go here.)
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl">
            <SectionHeading
              align="center"
              title="Pricing"
              accent="FAQs."
            />
          </div>

          <Accordion items={pricingFaqs} />
        </div>
      </section>
    </div>
  );
}
