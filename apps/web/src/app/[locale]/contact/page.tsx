import { use } from "react";
import { redirect } from "@/i18n/navigation";
import { toLocale } from "@/i18n/routing";

/**
 * Contact is hidden for now. The previous page lives in git history; restore
 * it and the nav, footer and CTA sections together when an inbox is ready.
 */
export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale(use(params).locale);
  redirect({ href: "/", locale });
}
