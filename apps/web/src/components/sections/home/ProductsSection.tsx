"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineReveal } from "@/components/ui/TextReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { products, type Product, type ProductStatus } from "@/config/company";
import { ProductMock } from "./visuals/ProductMock";
import { useSafeReducedMotion } from "@/components/ui/useSafeReducedMotion";

/**
 * Our own products.
 *
 * Interactive index on the left, one live preview pane on the right: hovering
 * or focusing a row swaps the mockup shown. Below `lg` each row carries its
 * own preview inline. Status is a small live indicator rather than a loud
 * badge. Products with a `url` field get a "View Project" link that opens in
 * a new tab.
 */

export function ProductsSection() {
  const t = useTranslations("home.products");
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useSafeReducedMotion();
  const active = products[activeIndex];

  return (
    <Section id="products" tone="tinted">
      <div className="flex flex-col gap-4">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-[2.7rem]">
          <LineReveal>
            {t("headline.first")}{" "}
            <span className="font-serif font-normal italic text-primary">
              {t("headline.accent")}
            </span>
          </LineReveal>
        </h2>
        <Reveal tier="quiet" delay={0.08}>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted">
            {t("body")}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <RevealGroup className="flex flex-col" stagger={0.05}>
          {products.map((product, i) => {
            const isActive = i === activeIndex;
            return (
              <RevealItem key={product.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                  aria-pressed={isActive}
                  className="group relative w-full border-t border-border/10 py-6 text-left last:border-b focus-visible:outline-none"
                >
                  {/* accent rail */}
                  <motion.span
                    aria-hidden="true"
                    animate={{ scaleY: isActive ? 1 : 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -left-4 top-0 h-full w-[2px] origin-center bg-primary md:-left-6"
                  />

                  <div className="flex items-baseline gap-4">
                    <span
                      className={`shrink-0 text-[11px] font-medium tabular-nums transition-colors duration-200 ${
                        isActive ? "text-primary" : "text-muted/50"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <h3
                          className={`text-xl font-semibold tracking-tight transition-colors duration-200 md:text-2xl ${
                            isActive ? "text-foreground" : "text-foreground/70"
                          }`}
                        >
                          {product.name}
                        </h3>
                        <StatusDot status={product.status} />
                      </div>

                      <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-muted">
                        {t(`items.${product.key}.category`)}
                      </span>

                      <p className="mt-2 max-w-lg text-pretty text-sm leading-relaxed text-muted">
                        {t(`items.${product.key}.description`)}
                      </p>

                      <ProductLinks product={product} />

                      {/* inline preview below lg */}
                      <div className="mt-5 h-44 lg:hidden">
                        <ProductMock mockId={product.mockId} />
                      </div>
                    </div>

                    <motion.span
                      aria-hidden="true"
                      animate={{
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : -6,
                      }}
                      transition={{ duration: 0.24 }}
                      className="hidden shrink-0 text-primary lg:block"
                    >
                      &rarr;
                    </motion.span>
                  </div>
                </button>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* the pane. Sticky so it stays with the index as the list scrolls. */}
        <div className="hidden lg:block">
          <div className="sticky top-32">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/10 bg-surface/40 p-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.mockId}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="size-full"
                >
                  <ProductMock mockId={active.mockId} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">
                  {active.name}
                </span>
                {active.projectName && (
                  <span className="text-[11px] text-muted">
                    {active.projectName}
                  </span>
                )}
              </div>
              <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
                {t("counter", {
                  current: String(activeIndex + 1).padStart(2, "0"),
                  total: String(products.length).padStart(2, "0"),
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ProductLinks({ product }: { product: Product }) {
  const t = useTranslations("home.products");

  if (!product.url) {
    return (
      <div className="mt-3 flex items-center gap-2 text-sm text-foreground/50">
        <span className="h-px w-6 bg-border/30" />
        <span>{t("ownedByUs")}</span>
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-4">
      <Link
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-3 py-1 text-xs font-medium text-primary transition-colors duration-200 hover:bg-primary/10"
        onClick={(e) => e.stopPropagation()}
      >
        {t("viewProject")}
        <svg
          viewBox="0 0 12 12"
          className="size-3"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3.5 2.5h6v6M9.5 2.5 2.5 9.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      {product.projectName && (
        <span className="text-[11px] text-muted">
          {t("featured", { name: product.projectName })}
        </span>
      )}
    </div>
  );
}

function StatusDot({ status }: { status: ProductStatus }) {
  const t = useTranslations("home.products.status");
  const reduced = useSafeReducedMotion();
  const live = status === "live" || status === "beta";

  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex size-1.5">
        {live && !reduced && (
          <motion.span
            animate={{ scale: [1, 2.8, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-primary"
          />
        )}
        <span
          className={`relative size-1.5 rounded-full ${
            live ? "bg-primary" : "bg-muted/50"
          }`}
        />
      </span>
      <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
        {t(status)}
      </span>
    </span>
  );
}
