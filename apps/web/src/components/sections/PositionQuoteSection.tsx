import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The thesis, stated once, in the largest serif on the page.
 * Attributed to the company rather than a person — swap in a named
 * founder attribution when there's someone to name.
 */
export function PositionQuoteSection() {
  const t = useTranslations("aiAutomation.quote");

  return (
    <Section tone="tinted">
      <Reveal>
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-7">
          <Eyebrow tone="primary">{t("eyebrow")}</Eyebrow>

          <blockquote className="text-pretty font-serif text-2xl font-normal italic leading-[1.3] tracking-tight text-foreground md:text-[2.15rem]">
            &ldquo;{t("quote")}&rdquo;
          </blockquote>

          <footer className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-foreground">
              360 Techive
            </span>
            <span className="text-[13px] text-muted">
              {t("attribution")}
            </span>
          </footer>
        </div>
      </Reveal>
    </Section>
  );
}
