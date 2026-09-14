"use client";

import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineReveal } from "@/components/ui/TextReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getCompany } from "@/config/company";

/**
 * The stack, kept in its place.
 *
 * A business does not buy React. So the heading carries the argument, the
 * names are set small and quiet, and the section stays a single tinted band
 * rather than a wall of logos.
 */

const groupKeys = ["build", "platform", "intelligence"] as const;

export function TechnologySection() {
  const t = useTranslations("Home.Technology");
  const { technology } = getCompany(useLocale());
  const groups = groupKeys.map((key) => ({
    label: t(`groups.${key}.label`),
    note: t(`groups.${key}.note`),
    items: technology[key],
  }));

  return (
    <Section tone="tinted">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-[2.7rem]">
            <LineReveal>{t.rich("line1", { em: accent })}</LineReveal>
            <LineReveal delay={0.08}>
              {t.rich("line2", { em: accent })}
            </LineReveal>
          </h2>
          <Reveal tier="quiet" delay={0.12}>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted">
              {t("body")}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="flex flex-col" stagger={0.07}>
          {groups.map((group) => (
            <RevealItem key={group.label}>
              <div className="border-t border-border/10 py-7 last:border-b">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
                    {group.label}
                  </span>
                  <p className="text-[15px] text-foreground/80">{group.note}</p>
                </div>

                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="group/item flex items-center gap-2 text-[15px] text-muted transition-colors duration-200 hover:text-foreground"
                    >
                      <span className="size-1 rounded-full bg-border/25 transition-colors duration-200 group-hover/item:bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
