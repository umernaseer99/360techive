export interface NavLink {
  label: string;
  href: string;
}

/**
 * Navigation is deliberately short. Products, Work and About are sections of
 * the homepage rather than separate routes for now, so they are anchor links.
 * When any of them grows into its own page, change the href here and nothing
 * else needs to move.
 */
export const siteConfig = {
  name: "360 Techive",
  tagline:
    "We build custom software, digital products and intelligent systems.",
  /** TODO: replace with the real inbox before launch. */
  contactEmail: "hello@360techive.com",
  navLinks: [
    { label: "Services", href: "/#services" },
    { label: "AI Automation", href: "/ai-automation" },
    { label: "Products", href: "/#products" },
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
  ] satisfies NavLink[],
  footerLinks: {
    company: [
      { label: "What we do", href: "/#what-we-do" },
      { label: "Custom solutions", href: "/#services" },
      { label: "Our products", href: "/#products" },
      { label: "Selected work", href: "/#work" },
      { label: "About", href: "/#about" },
      ],
    product: [
      { label: "AI Automation", href: "/ai-automation" },
      { label: "All AI Employees", href: "/ai-employees" },
      { label: "Support", href: "/ai-employees/support" },
      { label: "Sales", href: "/ai-employees/sales" },
      { label: "Finance", href: "/ai-employees/finance" },
      { label: "Research", href: "/ai-employees/research" },
      { label: "Documents", href: "/ai-employees/document" },
    ],
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
} as const;
