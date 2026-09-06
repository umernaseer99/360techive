import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Accordion } from "@/components/ui/Accordion";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { localeMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.howItWorks" });
  return localeMetadata({
    locale,
    path: "/how-it-works",
    title: t("title"),
    description: t("description"),
  });
}

const phases = ["discovery", "architecture", "build", "operate"] as const;
const faqs = [
  "duration",
  "preparation",
  "afterLive",
  "prototype",
  "stackChange",
] as const;

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HowItWorksContent />;
}

function HowItWorksContent() {
  const t = useTranslations("howItWorks");

  return (
    <div className="pt-24">
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <SectionHeading title={t("hero.title")} accent={t("hero.accent")} />
            <p className="mt-4 text-muted">{t("hero.body")}</p>
          </div>

          <ProcessSteps />
        </div>
      </section>

      <section className="border-y border-border/10 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl">
            <SectionHeading
              align="center"
              title={t("phases.title")}
              accent={t("phases.accent")}
            />
          </div>

          <div className="mx-auto max-w-3xl space-y-16">
            {phases.map((phase, index) => (
              <div key={phase}>
                <div className="mb-4 flex items-center gap-4">
                  <span className="font-serif text-4xl font-light leading-none text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">
                    {t(`phases.items.${phase}.title`)}
                  </h3>
                </div>
                <p className="mb-4 text-base leading-relaxed text-muted">
                  {t(`phases.items.${phase}.content`)}
                </p>
                <ul className="space-y-2">
                  {t
                    .raw(`phases.items.${phase}.details`)
                    .map((detail: string) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl">
            <SectionHeading
              align="center"
              title={t("faq.title")}
              accent={t("faq.accent")}
            />
          </div>

          <Accordion
            items={faqs.map((key) => ({
              label: t(`faq.items.${key}.label`),
              content: t(`faq.items.${key}.content`),
            }))}
          />
        </div>
      </section>

      <ContactCTASection />
    </div>
  );
}
