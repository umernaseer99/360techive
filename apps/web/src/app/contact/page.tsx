import { redirect } from "next/navigation";

/**
 * Contact is hidden for now. The previous page lives in git history; restore
 * it and the nav, footer and CTA sections together when an inbox is ready.
 */
export default function ContactPage() {
  redirect("/");
}
