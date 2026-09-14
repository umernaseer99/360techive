import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingCart, HeartPulse, Landmark, Building, Truck, Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";

export const metadata: Metadata = {
  title: "Industries — 360 Techive",
  description:
    "AI Employees purpose-built for E-commerce, Healthcare, Finance, Real Estate, Logistics, and Professional Services.",
  openGraph: {
    title: "Industries — 360 Techive",
    description:
      "AI Employees purpose-built for E-commerce, Healthcare, Finance, Real Estate, Logistics, and Professional Services.",
  },
};

const industries = [
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Online retailers handle high volumes of orders, support tickets, and inventory updates daily. AI Employees keep operations running without scaling headcount.",
    useCases: [
      <>The <Link href="/ai-employees/support" className="text-primary underline underline-offset-2 hover:no-underline">Support Agent</Link> resolves order issues and return requests autonomously.</>,
      <>The <Link href="/ai-employees/sales" className="text-primary underline underline-offset-2 hover:no-underline">Sales Agent</Link> qualifies leads and triggers abandoned-cart follow-ups.</>,
      <>The <Link href="/ai-employees/documents" className="text-primary underline underline-offset-2 hover:no-underline">Documents Agent</Link> generates and files invoices and packing slips at scale.</>,
    ],
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description:
      "Clinics and health-tech companies deal with sensitive data, complex scheduling, and regulatory workflows. AI Employees handle the administrative load securely.",
    useCases: [
      <>The <Link href="/ai-employees/support" className="text-primary underline underline-offset-2 hover:no-underline">Support Agent</Link> triages patient inquiries and routes urgent requests to the right team.</>,
      <>The <Link href="/ai-employees/executive-assistant" className="text-primary underline underline-offset-2 hover:no-underline">Executive Assistant</Link> coordinates provider schedules and meeting preparation.</>,
      <>The <Link href="/ai-employees/documents" className="text-primary underline underline-offset-2 hover:no-underline">Documents Agent</Link> organizes patient records and consent forms for audit readiness.</>,
    ],
  },
  {
    icon: Landmark,
    title: "Finance",
    description:
      "Finance teams manage high-stakes reconciliations, reporting cycles, and client communications. AI Employees reduce manual effort and error risk.",
    useCases: [
      <>The <Link href="/ai-employees/finance" className="text-primary underline underline-offset-2 hover:no-underline">Finance Agent</Link> automates invoice processing and payment reminders.</>,
      <>The <Link href="/ai-employees/support" className="text-primary underline underline-offset-2 hover:no-underline">Support Agent</Link> handles client account inquiries and statement requests.</>,
      <>The <Link href="/ai-employees/research" className="text-primary underline underline-offset-2 hover:no-underline">Research Agent</Link> compiles market data and generates compliance summaries.</>,
    ],
  },
  {
    icon: Building,
    title: "Real Estate",
    description:
      "Agencies and property managers juggle listings, inquiries, showings, and contracts across dozens of properties. AI Employees automate the coordination.",
    useCases: [
      <>The <Link href="/ai-employees/sales" className="text-primary underline underline-offset-2 hover:no-underline">Sales Agent</Link> qualifies leads and schedules property viewings automatically.</>,
      <>The <Link href="/ai-employees/executive-assistant" className="text-primary underline underline-offset-2 hover:no-underline">Executive Assistant</Link> manages agent calendars and listing updates.</>,
      <>The <Link href="/ai-employees/documents" className="text-primary underline underline-offset-2 hover:no-underline">Documents Agent</Link> generates lease agreements and disclosure packets.</>,
    ],
  },
  {
    icon: Truck,
    title: "Logistics",
    description:
      "Shipping and warehousing operations depend on real-time tracking, route optimization, and exception handling. AI Employees monitor and respond around the clock.",
    useCases: [
      <>The <Link href="/ai-employees/support" className="text-primary underline underline-offset-2 hover:no-underline">Support Agent</Link> tracks shipments and resolves delivery exceptions.</>,
      <>The <Link href="/ai-employees/finance" className="text-primary underline underline-offset-2 hover:no-underline">Finance Agent</Link> reconciles carrier invoices and processes freight payments.</>,
      <>The <Link href="/ai-employees/research" className="text-primary underline underline-offset-2 hover:no-underline">Research Agent</Link> analyzes route efficiency and identifies cost-saving opportunities.</>,
    ],
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description:
      "Consulting, legal, and advisory firms rely on billable hours, client communication, and document precision. AI Employees streamline the overhead.",
    useCases: [
      <>The <Link href="/ai-employees/executive-assistant" className="text-primary underline underline-offset-2 hover:no-underline">Executive Assistant</Link> manages client scheduling and meeting prep across the firm.</>,
      <>The <Link href="/ai-employees/documents" className="text-primary underline underline-offset-2 hover:no-underline">Documents Agent</Link> drafts proposals, engagement letters, and status reports.</>,
      <>The <Link href="/ai-employees/research" className="text-primary underline underline-offset-2 hover:no-underline">Research Agent</Link> gathers competitive intelligence and case law summaries.</>,
    ],
  },
];

export default function IndustriesPage() {
  return (
    <div className="pt-24">
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <SectionHeading
              title="AI Employees for"
              accent="every industry."
            />
            <p className="mt-4 text-muted">
              Every department has repetitive workflows. Our agents handle them so
              your team can focus on the work that matters.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Card
                key={ind.title}
                icon={<IconBox><ind.icon className="size-5" /></IconBox>}
                title={ind.title}
              >
                <p className="mb-4 text-sm leading-relaxed text-muted">
                  {ind.description}
                </p>
                <ul className="space-y-1.5">
                  {ind.useCases.map((uc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{uc}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
