import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

interface ContactCTASectionProps {
  agentName?: string;
}

export function ContactCTASection({ agentName }: ContactCTASectionProps) {
  const t = useTranslations("contactCta");

  return (
    <Section>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border/10 bg-surface/40 px-8 py-16 text-center md:px-16 md:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--color-primary)/0.12),transparent_65%)]"
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <Eyebrow tone="primary">{t("eyebrow")}</Eyebrow>

            <h2 className="text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-foreground md:text-[2.6rem]">
              {agentName ? (
                <>
                  {t("agent.lead")}{" "}
                  <span className="font-serif font-normal italic text-primary">
                    {t("agent.accent", { name: agentName })}
                  </span>
                </>
              ) : (
                <>
                  {t("generic.lead")}{" "}
                  <span className="font-serif font-normal italic text-primary">
                    {t("generic.accent")}
                  </span>
                </>
              )}
            </h2>

            <p className="text-pretty text-base leading-relaxed text-muted">
              {t("body")}
            </p>

            <div className="mt-3 flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" variant="primary">
                  {t("primary")}
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  {t("secondary")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
