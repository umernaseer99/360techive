/**
 * The shape of the contact page: which routes into work we show, in which
 * order, and which questions we answer before the form. The wording is in
 * messages/{locale}.json under the `contact` namespace and is looked up by
 * these keys.
 */

/**
 * Set to false to hide the enquiry form and fall back to the email address
 * alone. The form, its API route and its copy stay in place either way.
 */
export const SHOW_CONTACT_FORM = true;

/** The three places client work begins. */
export const engagements = ["newProduct", "rebuild", "continuing"] as const;

/** What actually happens after the form is sent. */
export const conversationSteps = [
  "read",
  "business",
  "view",
  "proposal",
] as const;

/** The questions that decide whether an enquiry gets written at all. */
export const contactFaqs = [
  "ownTeam",
  "inherited",
  "ownership",
  "confidentiality",
  "brief",
  "pricing",
] as const;

/** Shown beside the form. Practical, and all of it true today. */
export const contactNotes = ["answered", "builders", "private"] as const;

/** Options offered in the enquiry form. */
export const projectTypes = [
  "webApp",
  "mobileApp",
  "agents",
  "automation",
  "unsure",
] as const;

export const timelines = [
  "asap",
  "oneToThree",
  "threeToSix",
  "planning",
] as const;
