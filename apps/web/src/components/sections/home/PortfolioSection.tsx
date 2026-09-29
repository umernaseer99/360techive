"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/sections/portfolio/ProjectCard";
import { portfolio } from "@/config/company";

/**
 * Client work on the homepage, as a slider.
 *
 * It is a scroll-snap track rather than a JavaScript carousel. Native scrolling
 * gives touch, trackpad, keyboard and screen readers the behaviour they already
 * expect, it keeps every card in the DOM and in the tab order, and there is no
 * transform to fight with the card's own pointer tilt. The buttons just call
 * scrollBy, so the two never disagree about where the track is.
 *
 * Arrows disable at each end from the scroll position itself, which stays
 * correct however the visitor moved the track.
 *
 * The full set with filters lives on /portfolio.
 */
export function PortfolioSection() {
  const t = useTranslations("home.portfolio");
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // A page zoom or a fractional layout leaves a pixel or two over, so this
    // allows a small margin rather than testing for an exact end.
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  function page(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    // Move by one card plus the gap, so the track always lands on a snap point.
    const step = card ? card.getBoundingClientRect().width + 32 : el.clientWidth;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  return (
    <Section id="work" tone="tinted" glow="top-right" glowStrength="medium">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
        <div className="flex flex-col gap-4">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-[2.7rem]">
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

        {/* paging stays with the heading, top right */}
        <Reveal tier="quiet" delay={0.12}>
          <div className="flex shrink-0 items-center gap-3">
            <SliderButton
              direction="prev"
              label={t("previous")}
              disabled={atStart}
              onClick={() => page(-1)}
            />
            <SliderButton
              direction="next"
              label={t("next")}
              disabled={atEnd}
              onClick={() => page(1)}
            />
          </div>
        </Reveal>
      </div>

      <ul
        ref={trackRef}
        onScroll={sync}
        className="mt-14 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {portfolio.map((project, i) => (
          <li
            key={project.key}
            // Each card is a fixed share of the track so the next one peeks in
            // and the track reads as scrollable without a visible scrollbar.
            className="w-[86%] shrink-0 snap-start sm:w-[60%] lg:w-[calc((100%-4rem)/3)]"
          >
            <ProjectCard project={project} index={i} />
          </li>
        ))}
      </ul>

      <Reveal tier="quiet">
        <div className="mt-12 flex justify-center">
          <Link href="/portfolio">
            <Button size="lg" variant="primary">
              {t("viewAll")}
            </Button>
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}

function SliderButton({
  direction,
  label,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-full bg-primary-hover text-onPrimary shadow-sm transition-colors duration-200 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:bg-transparent disabled:text-muted/50 disabled:shadow-none disabled:ring-1 disabled:ring-inset disabled:ring-border/15"
    >
      <Icon className="size-4" strokeWidth={2} />
    </button>
  );
}
