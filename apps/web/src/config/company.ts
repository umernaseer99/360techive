/**
 * The structure of the homepage: what exists, in what order, and which visual
 * belongs to it. The wording lives in messages/{locale}.json and is looked up
 * by the keys below, so adding a service, a product or a project is still a
 * data edit — it just happens in two files instead of one.
 *
 * Anything that is not language (ids, URLs, technology names, mock ids) stays
 * here.
 */

export interface Capability {
  /** Stable key, also used as the preview id and the message key. */
  id: string;
}

/** Section 3. Each one gets an interface preview, so keep the list tight. */
export const capabilities: Capability[] = [
  { id: "web-apps" },
  { id: "mobile" },
  { id: "agents" },
  { id: "automation" },
];

/** Section 2. Four stages, walked through on scroll. */
export const stages = ["problem", "design", "build", "launch"] as const;

/**
 * Client work.
 *
 * `image` is a screenshot of the live site, 16:9, in public/images/work. Add a
 * project by adding an entry here plus its copy under `home.portfolio.items`
 * in both message catalogues. The grid handles any number of them.
 *
 * `url` is the live site. Anything without one renders without the visit link
 * rather than a dead button.
 */
export interface Project {
  /** Message key under `home.portfolio.items`. */
  key: string;
  name: string;
  image: string;
  url?: string;
  /** Short stack line, kept out of the catalogues since it is not language. */
  stack: string[];
  /**
   * Filter keys. The filter bar is built from the keys actually used here, so
   * a filter can never appear with nothing behind it. Add "ai" to a project
   * and the AI filter shows up on its own. Each key needs a label under
   * `home.portfolio.filters` in both catalogues.
   */
  tags: string[];
}

export const portfolio: Project[] = [
  {
    key: "coinstudy",
    name: "CoinStudy",
    image: "/images/work/coinstudy.jpg",
    url: "https://coinstudy.co/",
    stack: ["Next.js", "TypeScript", "Live market data"],
    tags: ["nextjs", "webApp"],
  },
  {
    key: "aqgimel",
    name: "AQ Gimel",
    image: "/images/work/aqgimel.jpg",
    url: "https://aqgimel.com/",
    stack: ["WooCommerce", "Multi currency", "Multi language"],
    tags: ["wordpress", "ecommerce"],
  },
  {
    key: "bureauauditec",
    name: "Bureau Auditec",
    image: "/images/work/bureauauditec.jpg",
    url: "https://bureauauditec.com/",
    stack: ["WordPress", "Custom design", "Lead capture"],
    tags: ["wordpress", "website"],
  },
  {
    key: "hrmhelp",
    name: "HRM Help",
    image: "/images/work/hrmhelp.jpg",
    url: "https://hrm-help.co.uk/",
    stack: ["WordPress", "Custom design", "Enquiry funnel"],
    tags: ["wordpress", "website"],
  },
  {
    key: "drlasmith",
    name: "Dr. LaTisha Smith",
    image: "/images/work/drlasmith.jpg",
    url: "https://drlasmith.org/",
    stack: ["WooCommerce", "Storefront", "Accounts"],
    tags: ["wordpress", "ecommerce"],
  },
];

/** Section 6. The current lab. */
export const labAreas = [
  "agents",
  "automation",
  "webApps",
  "mobile",
  "internalTools",
  "customerExperience",
  "workflows",
  "platforms",
] as const;
