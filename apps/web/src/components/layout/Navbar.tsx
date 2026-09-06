"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Button } from "../ui/Button";
import { ThemeToggle } from "../ui/ThemeToggle";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { siteConfig } from "@/config/site";
import { useSafeReducedMotion } from "@/components/ui/useSafeReducedMotion";

import { BrandLogo } from "@/components/ui/BrandLogo";

/**
 * Minimal navigation with two states.
 *
 *   at rest   — roomy, transparent enough to sit over the hero wash
 *   condensed — after ~80px of downward scroll: shorter, opaque, hairline rule
 *
 * Scrolling back up restores the roomy state before you reach the top, which
 * is what makes reaching for the nav feel immediate rather than delayed.
 * Links get a rule that grows from the left on hover, matching the accent
 * gesture used by the capability index and the principles list.
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const { scrollY } = useScroll();
  const reduced = useSafeReducedMotion();
  const pathname = usePathname();
  const t = useTranslations("nav");

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (y > 80 && y > previous) setCondensed(true);
    else if (y < previous || y <= 80) setCondensed(false);
  });

  function isActive(href: string) {
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <motion.header
      animate={{
        backgroundColor: condensed
          ? "rgb(var(--color-background) / 0.92)"
          : "rgb(var(--color-background) / 0.7)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/10 backdrop-blur-xl"
    >
      <motion.nav
        animate={{ paddingTop: condensed ? 10 : 16, paddingBottom: condensed ? 10 : 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 md:px-8"
        aria-label={t("primary")}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="group flex items-center text-foreground focus-visible:outline-none"
        >
          <BrandLogo height={44} />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 lg:flex">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`group relative py-1 text-sm font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-foreground"
                  : "text-foreground/65 hover:text-foreground"
              }`}
            >
              {t(`links.${link.key}`)}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-300 ease-out motion-reduce:transition-none ${
                  isActive(link.href)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          ))}

          <div className="flex items-center gap-2 pl-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link href="/contact">
              <Button size="sm" variant="primary">
                {t("cta")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex size-10 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground"
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={isOpen}
          >
            {/* two rules that cross rather than a swapped icon */}
            <span className="relative block h-3 w-5">
              <motion.span
                animate={{ y: isOpen ? 5 : 0, rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 top-0 h-px bg-current"
              />
              <motion.span
                animate={{ y: isOpen ? -5 : 0, rotate: isOpen ? -45 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 bottom-0 h-px bg-current"
              />
            </span>
          </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu: items arrive one after another rather than as a slab */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border/10 lg:hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: reduced ? 0 : 0.05, delayChildren: 0.05 } },
              }}
              className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-5 md:px-8"
            >
              {siteConfig.navLinks.map((link) => (
                <motion.div
                  key={link.key}
                  variants={{
                    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                  >
                    {t(`links.${link.key}`)}
                    <span aria-hidden="true" className="text-muted/50">
                      &rarr;
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 px-3"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button size="lg" variant="primary" className="w-full">
                    {t("cta")}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
