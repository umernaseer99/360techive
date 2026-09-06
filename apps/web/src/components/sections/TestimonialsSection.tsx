"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

/**
 * TODO: replace the placeholder quotes and attributions in
 * `testimonials.items` with real client wording once it is cleared for
 * publication. Add avatar images if provided.
 */
const quotes = ["support", "sales", "finance"] as const;

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <SectionHeading title={t("title")} accent={t("accent")} />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {quotes.map((key, i) => (
            <RevealOnScroll key={key} delay={i * 0.1}>
              <Card className="flex flex-col">
                <blockquote className="flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{t(`items.${key}.quote`)}&rdquo;
                </blockquote>
                <div className="mt-6 border-t border-border/10 pt-4">
                  <p className="text-sm font-medium text-foreground">
                    &mdash; {t(`items.${key}.attribution`)}
                  </p>
                </div>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
