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
  /**
   * The address anything automated writes to: the mailto fallback when the
   * form cannot send, and the address quoted when it fails. The domain
   * mailbox leads because that is what the site sends from.
   */
  contactEmail: "info@360techive.com",
  /** Both published addresses, in the order they are shown. */
  contactEmails: ["info@360techive.com", "360techive@gmail.com"],
  /** Where the team is. Order is the order shown in the footer. */
  locations: ["Pakistan", "Germany", "Oman"],
  navLinks: [
    { key: "services", href: "/#services" },
    { key: "aiAutomation", href: "/ai-automation" },
    { key: "work", href: "/portfolio" },
    { key: "about", href: "/#about" },
    { key: "contact", href: "/contact" },
  ] satisfies NavLink[],
  footerLinks: {
    company: [
      { key: "customSolutions", href: "/#services" },
      { key: "work", href: "/portfolio" },
        { key: "about", href: "/#about" },
      { key: "contact", href: "/contact" },
    ] satisfies NavLink[],
    explore: [
      { key: "aiAutomation", href: "/ai-automation" },
      { key: "aiEmployees", href: "/ai-employees" },
      { key: "howItWorks", href: "/how-it-works" },
      { key: "pricing", href: "/pricing" },
    ] satisfies NavLink[],
  },
} as const;
