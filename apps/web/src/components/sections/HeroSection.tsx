"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { AgentNetworkVisual } from "./hero/AgentNetworkVisual";

export function HeroSection() {
  const t = useTranslations("AiAutomation.Hero");

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden px-4 pb-24 pt-32 md:px-8">
      {/* single ambient wash — the only decorative gradient on the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[680px] rounded-full bg-[radial-gradient(circle,rgb(var(--color-primary)/0.10),transparent_65%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 md:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col gap-6">
          <Reveal tier="hero">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </Reveal>

          <Reveal tier="hero" delay={0.06}>
            <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
              {t.rich("title", { em: accent })}
            </h1>
          </Reveal>

          <Reveal tier="hero" delay={0.12}>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">
              {t("body")}
            </p>
          </Reveal>

          <Reveal tier="hero" delay={0.18}>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="lg" variant="primary">
                {t("primary")}
              </Button>
              <Button size="lg" variant="secondary">
                {t("secondary")}
              </Button>
            </div>
          </Reveal>

          <Reveal tier="quiet" delay={0.26}>
            <p className="pt-4 text-sm text-muted/70">
              {t("footnote")}
            </p>
          </Reveal>
        </div>

        <Reveal tier="hero" delay={0.1} className="hidden md:block">
          <div className="flex items-center justify-center">
            <AgentNetworkVisual />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
