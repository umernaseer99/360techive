export interface NavLink {
  /** Message key under the `nav.links` namespace. */
  key: string;
  href: string;
}

/**
 * Navigation is deliberately short. Products, Work and About are sections of
 * the homepage rather than separate routes for now, so they are anchor links.
 * When any of them grows into its own page, change the href here and nothing
 * else needs to move.
 *
 * Labels live in messages/{locale}.json and are looked up by `key`, so the
 * order and the destinations stay in one place while the wording is
 * translated.
 */
export const siteConfig = {
  name: "360 Techive",
  contactEmail: "360techive@gmail.com",
  navLinks: [
    { key: "services", href: "/#services" },
    { key: "aiAutomation", href: "/ai-automation" },
    { key: "products", href: "/#products" },
    { key: "work", href: "/#work" },
    { key: "about", href: "/#about" },
    { key: "contact", href: "/contact" },
  ] satisfies NavLink[],
  footerLinks: {
    company: [
      { key: "customSolutions", href: "/#services" },
      { key: "products", href: "/#products" },
      { key: "work", href: "/#work" },
      { key: "about", href: "/#about" },
      { key: "contact", href: "/contact" },
    ] satisfies NavLink[],
    explore: [
      { key: "aiAutomation", href: "/ai-automation" },
      { key: "aiEmployees", href: "/ai-employees" },
      { key: "howItWorks", href: "/how-it-works" },
      { key: "pricing", href: "/pricing" },
    ] satisfies NavLink[],
    legal: [
      { key: "privacy", href: "/privacy" },
      { key: "terms", href: "/terms" },
    ] satisfies NavLink[],
  },
} as const;
