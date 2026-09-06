/**
 * The structure of the homepage: what exists, in what order, and which visual
 * belongs to it. The wording lives in messages/{locale}.json and is looked up
 * by the keys below, so adding a service, a product or a project is still a
 * data edit — it just happens in two files instead of one.
 *
 * Anything that is not language (ids, URLs, technology names, mock ids) stays
 * here.
 */

export type ProductStatus = "building" | "beta" | "research" | "live";

export interface Capability {
  /** Stable key, also used as the preview id and the message key. */
  id: string;
}

export interface Product {
  /** Proper noun, the same in every language. */
  name: string;
  /** Message key under `home.products.items`. */
  key: string;
  status: ProductStatus;
  /** Stable key used to select the correct preview mockup. */
  mockId: string;
  /** External URL for live/shipped products. Opens in a new tab. */
  url?: string;
  /** Name of the featured project, shown alongside the View Project link. */
  projectName?: string;
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
 * Section 5.
 *
 * Five products: two reference real, live external projects (CoinStudy and
 * AQ Gimel). The other three are in active development.
 */
export const products: Product[] = [
  { name: "WA Agent", key: "waAgent", status: "building", mockId: "wa-agent" },
  { name: "Chatbots", key: "chatbots", status: "building", mockId: "chatbots" },
  {
    name: "Websites",
    key: "websites",
    status: "live",
    mockId: "websites",
    url: "https://coinstudy.co/",
    projectName: "CoinStudy",
  },
  {
    name: "E-commerce Platforms",
    key: "ecommerce",
    status: "live",
    mockId: "ecommerce",
    url: "https://aqgimel.com/",
    projectName: "AQ Gimel",
  },
  {
    name: "Management System",
    key: "management",
    status: "building",
    mockId: "management",
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


