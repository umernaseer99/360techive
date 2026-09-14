import type { Messages } from "next-intl";

type NavKey = keyof Messages["Nav"]["links"];

export interface NavLink {
  /** Key into the `Nav.links` messages. */
  key: NavKey;
  href: string;
}

/**
 * Navigation is deliberately short. Products, Work and About are sections of
 * the homepage rather than separate routes for now, so they are anchor links.
 * When any of them grows into its own page, change the href here and nothing
 * else needs to move.
 *
 * Labels live in messages/<locale>.json under `Nav.links`.
 */
export const siteConfig = {
  name: "360 Techive",
  /** TODO: replace with the real inbox before launch. */
  contactEmail: "hello@360techive.com",
  navLinks: [
    { key: "services", href: "/#services" },
    { key: "aiAutomation", href: "/ai-automation" },
    { key: "products", href: "/#products" },
    { key: "work", href: "/#work" },
    { key: "about", href: "/#about" },
  ] satisfies NavLink[],
  footerLinks: {
    company: [
      { key: "whatWeDo", href: "/#what-we-do" },
      { key: "customSolutions", href: "/#services" },
      { key: "ourProducts", href: "/#products" },
      { key: "selectedWork", href: "/#work" },
      { key: "about", href: "/#about" },
    ],
    product: [
      { key: "aiAutomation", href: "/ai-automation" },
      { key: "allAiEmployees", href: "/ai-employees" },
      { key: "support", href: "/ai-employees/support" },
      { key: "sales", href: "/ai-employees/sales" },
      { key: "finance", href: "/ai-employees/finance" },
      { key: "research", href: "/ai-employees/research" },
      { key: "documents", href: "/ai-employees/document" },
    ],
    legal: [
      { key: "privacy", href: "/privacy" },
      { key: "terms", href: "/terms" },
    ],
  },
} as const;
