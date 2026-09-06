"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineReveal } from "@/components/ui/TextReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { technology } from "@/config/company";

/**
 * The stack, kept in its place.
 *
 * A business does not buy React. So the heading carries the argument, the
 * names are set small and quiet, and the section stays a single tinted band
 * rather than a wall of logos.
 */

/** Product names stay as they are; the grouping labels are translated. */
const groups: { key: string; items: readonly string[] }[] = [
  { key: "build", items: technology.build },
  { key: "platform", items: technology.platform },
  { key: "intelligence", items: technology.intelligence },
];

export function TechnologySection() {
  const t = useTranslations("home.technology");

  return (
    <Section tone="tinted" glow="left" glowStrength="soft">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-[2.7rem]">
            <LineReveal>{t("headline.first")}</LineReveal>
            <LineReveal delay={0.08}>
              {t("headline.second")}{" "}
              <span className="font-serif font-normal italic text-primary">
                {t("headline.accent")}
              </span>{" "}
              {t("headline.third")}
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
            <RevealItem key={group.key}>
              <div className="group/row rounded-lg border-t border-border/10 px-3 py-7 transition-colors duration-300 hover:bg-foreground/[0.02] last:border-b">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
                    {t(`groups.${group.key}.label`)}
                  </span>
                  <p className="text-[15px] text-foreground/80">
                    {t(`groups.${group.key}.note`)}
                  </p>
                </div>

                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="group/item flex cursor-default items-center gap-2 text-[15px] text-muted transition-all duration-300 hover:translate-x-1 hover:text-foreground motion-reduce:transform-none"
                    >
                      <span className="size-1 rounded-full bg-border/25 transition-all duration-300 group-hover/item:size-1.5 group-hover/item:bg-primary" />
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
