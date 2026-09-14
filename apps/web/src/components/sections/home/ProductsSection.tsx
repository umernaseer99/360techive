"use client";

import {
  motion,
} from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { getCompany, type Product, type ProductStatus } from "@/config/company";
import { ProductMock } from "./visuals/ProductMock";
import { useSafeReducedMotion } from "@/components/ui/useSafeReducedMotion";

/**
 * Our own products.
 *
 * Structurally different from the services index on purpose: full width
 * alternating rows with a large interface preview, so the page changes gear
 * here. A visitor should be able to tell at a glance that this is not another
 * list of things we will do for money.
 *
 * Status is a small live indicator rather than a loud badge.
 */

export function ProductsSection() {
  const t = useTranslations("Home.Products");
  const { products } = getCompany(useLocale());

  return (
    <Section id="products" tone="tinted">
      <div className="flex flex-col gap-4">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-[2.7rem]">
          <LineReveal>{t.rich("title", { em: accent })}</LineReveal>
        </h2>
        <Reveal tier="quiet" delay={0.08}>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted">
            {t("body")}
          </p>
        </Reveal>
      </div>

      <div className="mt-16 flex flex-col gap-20 md:gap-28">
        {products.map((product, i) => (
          <ProductRow key={product.name} product={product} index={i} />
        ))}
      </div>
    </Section>
  );
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  const reduced = useSafeReducedMotion();
  const t = useTranslations("Home.Products");
  const flipped = index % 2 === 1;

  return (
    <motion.article
      initial="rest"
      whileHover={reduced ? undefined : "hover"}
      whileFocus={reduced ? undefined : "hover"}
      animate="rest"
      className="group grid items-center gap-8 md:grid-cols-2 md:gap-14"
    >
      {/* preview */}
      <motion.div
        variants={{ rest: { y: 0 }, hover: { y: -6 } }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`relative ${flipped ? "md:order-2" : ""}`}
      >
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/10 bg-surface/50 p-3 md:p-4">
            {/* the preview itself lifts a little further than its frame */}
            <motion.div
              variants={{ rest: { scale: 1 }, hover: { scale: 1.02 } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="size-full"
            >
              <ProductMock variant={index} />
            </motion.div>

            <motion.span
              aria-hidden="true"
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/25"
            />
          </div>
        </Reveal>
      </motion.div>

      {/* copy */}
      <div className={flipped ? "md:order-1" : ""}>
        <Reveal delay={0.06}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
                {product.category}
              </span>
              <StatusDot status={product.status} />
            </div>

            <h3 className="text-2xl font-semibold tracking-tight text-foreground md:text-[2rem]">
              {product.name}
            </h3>

            <p className="max-w-md text-pretty text-base leading-relaxed text-muted">
              {product.description}
            </p>

            {/* revealed on hover: the row rewards attention without hiding anything essential */}
            <motion.div
              variants={{
                rest: { opacity: reduced ? 1 : 0.55 },
                hover: { opacity: 1 },
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 pt-1 text-sm text-foreground/70"
            >
              <span className="h-px w-6 bg-primary" />
              <span>{t("owned")}</span>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </motion.article>
  );
}

function StatusDot({ status }: { status: ProductStatus }) {
  const reduced = useSafeReducedMotion();
  const t = useTranslations("Home.Products.status");
  const live = status !== "research";

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
