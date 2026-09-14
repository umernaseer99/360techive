"use client";

import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineReveal } from "@/components/ui/TextReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getCompany } from "@/config/company";

/**
 * How we work, in plain sentences.
 *
 * Numbered entries rather than cards, so it reads as a position rather than a
 * feature grid. The hover state is a single accent rule on the left, which is
 * the same gesture used by the capability index.
 */
export function WhyUsSection() {
  const t = useTranslations("Home.WhyUs");
  const { principles } = getCompany(useLocale());

  return (
    <Section id="why-us">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-[2.7rem]">
            <LineReveal>{t.rich("line1", { em: accent })}</LineReveal>
            <LineReveal delay={0.08}>{t.rich("line2", { em: accent })}</LineReveal>
            <LineReveal delay={0.16}>
              {t.rich("line3", { em: accent })}
            </LineReveal>
          </h2>
          <Reveal tier="quiet" delay={0.16}>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted">
              {t("body")}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid gap-x-10 gap-y-8 sm:grid-cols-2" stagger={0.06}>
          {principles.map((p, i) => (
            <RevealItem key={p.title}>
              <div className="group relative pl-5">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-full w-px bg-border/10"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-full w-px origin-top scale-y-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-y-100 motion-reduce:transition-none"
                />
                <span className="text-[11px] font-medium tabular-nums text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1.5 text-[17px] font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
