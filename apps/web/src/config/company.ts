/**
 * Everything the homepage says about the company lives here.
 *
 * Sections read from this file and render whatever they find, so adding a
 * service, a product, a project or a research area is a data edit rather than
 * a component edit. Order in these arrays is the order on the page.
 *
 * Copy rule for this file: plain sentences, no dashes of any kind.
 *
 * This file is the English copy. The German copy lives in company.de.ts with
 * the same shape; components read whichever matches the page through
 * getCompany(locale).
 */

import { companyDe } from "./company.de";

export type ProductStatus = "building" | "beta" | "research";

export interface Capability {
  /** Stable key, also used as the preview id. */
  id: string;
  name: string;
  description: string;
  /** Three short nouns shown inside the preview panel. */
  detail: [string, string, string];
}

export interface Product {
  name: string;
  category: string;
  status: ProductStatus;
  description: string;
}

export interface LabArea {
  name: string;
  note: string;
}

export interface Project {
  title: string;
  sector: string;
  problem: string;
  built: string;
  approach: string;
  outcome: string;
}

/** Section 3. Each one gets an interface preview, so keep the list tight. */
export const capabilities: Capability[] = [
  {
    id: "web-apps",
    name: "Web Applications",
    description:
      "Powerful web applications built around real business requirements, from the first internal tool to the platform your whole company runs on.",
    detail: ["Dashboards", "Workflows", "Roles"],
  },
  {
    id: "mobile",
    name: "Mobile Applications",
    description:
      "Mobile experiences designed for customers, teams and everyday workflows, on both iOS and Android.",
    detail: ["iOS", "Android", "Offline"],
  },
  {
    id: "web",
    name: "Web Development",
    description:
      "Fast, modern, scalable websites and digital platforms that stay quick as the content and the traffic grow.",
    detail: ["Marketing", "CMS", "Commerce"],
  },
  {
    id: "design",
    name: "UI and UX Design",
    description:
      "Interfaces that are simple to understand and enjoyable to use, designed before anyone writes code.",
    detail: ["Research", "Prototypes", "Systems"],
  },
  {
    id: "agents",
    name: "AI Agents and Chatbots",
    description:
      "Intelligent systems that can hold a conversation, work with your information and handle the repetitive parts of a job.",
    detail: ["Assistants", "Retrieval", "Actions"],
  },
  {
    id: "automation",
    name: "Business Automation",
    description:
      "Connect the systems you already use, remove repeated manual steps and turn a process into something that runs on its own.",
    detail: ["Integrations", "Triggers", "Reporting"],
  },
];

/** Section 2. Four stages, walked through on scroll. */
export const stages = [
  {
    name: "Problem",
    line: "Understanding the business and the real problem.",
    note: "We start with how the work happens today, who does it and where it breaks.",
  },
  {
    name: "Design",
    line: "Turning the idea into a clear experience.",
    note: "Flows, screens and the shape of the product, agreed before code starts.",
  },
  {
    name: "Build",
    line: "Developing the software and the technology.",
    note: "Built in working pieces you can use and react to, not one long silence.",
  },
  {
    name: "Launch",
    line: "Putting the product into the hands of real users.",
    note: "Release, watch how it is used, and keep improving it after day one.",
  },
];

/**
 * Section 5. PLACEHOLDER CONCEPTS.
 *
 * These are real ideas we are exploring, written so a genuine product can
 * replace an entry without touching the component. No metrics here on purpose:
 * nothing has numbers worth publishing yet.
 */
export const products: Product[] = [
  {
    name: "Deskline",
    category: "Internal tools",
    status: "building",
    description:
      "A shared inbox and task board for small teams that still run most of their work through email. Every message becomes something someone owns.",
  },
  {
    name: "Handoff",
    category: "Client operations",
    status: "beta",
    description:
      "Client onboarding without the back and forth. Documents, approvals and next steps in one place, so both sides can see what is outstanding.",
  },
  {
    name: "Cadence",
    category: "Reporting",
    status: "research",
    description:
      "Turns the numbers a business already collects into a short written update every week, in language the whole team can read.",
  },
  {
    name: "Fieldmark",
    category: "Field operations",
    status: "research",
    description:
      "Scheduling and site reporting for teams that work away from a desk, built to keep working when the signal does not.",
  },
];

/** Section 6. The current lab. */
export const labAreas: LabArea[] = [
  { name: "AI Agents", note: "Systems that carry a task through to the end." },
  { name: "Business Automation", note: "Removing the steps nobody should do twice." },
  { name: "Web Applications", note: "Platforms teams live in all day." },
  { name: "Mobile Products", note: "Software that travels with the work." },
  { name: "Internal Business Tools", note: "The unglamorous software that runs a company." },
  { name: "AI Powered Customer Experiences", note: "Support and sales that answer properly." },
  { name: "Intelligent Workflows", note: "Processes that decide, not just forward." },
  { name: "Digital Platforms", note: "Products with more than one kind of user." },
];

/**
 * Section 7. PLACEHOLDER PROJECTS.
 *
 * Written as project types rather than named clients, and deliberately free of
 * statistics. Swap in real case studies with the same shape when they are
 * cleared for publication.
 */
export const projects: Project[] = [
  {
    title: "Operations platform for a service business",
    sector: "Field services",
    problem:
      "Jobs were booked in one system, scheduled in a spreadsheet and invoiced in a third place. Nobody could answer where a job actually stood.",
    built:
      "One web application covering bookings, scheduling, job history and invoicing, with a mobile view for the crew on site.",
    approach: "Next.js, TypeScript, PostgreSQL",
    outcome:
      "One place to look for the state of any job, and an office team that stopped rekeying the same details three times.",
  },
  {
    title: "Customer support assistant",
    sector: "Ecommerce",
    problem:
      "The same questions arrived every day about delivery, returns and sizing, and the small support team answered each one by hand.",
    built:
      "An assistant trained on the company's own policies and product data, handing anything unusual to a person with the full history attached.",
    approach: "AI APIs, retrieval, Node.js",
    outcome:
      "Routine questions answered immediately, and a support team that now spends its day on the cases that need judgement.",
  },
  {
    title: "Internal approval workflow",
    sector: "Professional services",
    problem:
      "Approvals lived in email threads. Requests were missed, and no one could reconstruct who signed off on what.",
    built:
      "A workflow tool with structured requests, clear ownership at every step and a permanent record of each decision.",
    approach: "Laravel, MySQL, integrations",
    outcome:
      "Requests that move on their own and an audit trail that exists without anyone maintaining it.",
  },
];

/** Section 8. Grouped so the section reads as thinking, not a stack list. */
export const technology = {
  build: ["React", "Next.js", "TypeScript", "Node.js", "React Native"],
  platform: ["Laravel", "WordPress", "PostgreSQL", "MySQL"],
  intelligence: ["AI APIs", "Vector search", "Cloud infrastructure"],
};

/** Section 9. */
export const principles = [
  {
    title: "We understand the business first",
    body: "Before anything gets designed we want to know how the work happens now, who touches it and what actually goes wrong.",
  },
  {
    title: "We design before we build",
    body: "Deciding how something should work is cheaper on a screen than in code. The design is where the arguments happen.",
  },
  {
    title: "We build systems that can grow",
    body: "The first version should not be the thing that has to be thrown away. We build so the second year is easier than the first.",
  },
  {
    title: "We automate where it makes sense",
    body: "Automation is worth it when a process is repetitive and well understood. When it is not, adding AI just hides the problem.",
  },
  {
    title: "We write software other people can maintain",
    body: "You should not need us forever. Clear structure, sensible naming and documentation are part of the work, not a favour.",
  },
  {
    title: "We work closely with you",
    body: "Short feedback loops, working software early and honest answers about what is hard. No long silences.",
  },
];

const companyEn = {
  capabilities,
  stages,
  products,
  labAreas,
  projects,
  technology,
  principles,
};

export type CompanyContent = typeof companyEn;

export function getCompany(locale: string): CompanyContent {
  return locale === "de" ? companyDe : companyEn;
}
