import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware replacements for next/link and next/navigation. Components use
 * these so an href written as "/contact" resolves to "/de/contact" for a
 * German visitor without every call site knowing about locales.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
