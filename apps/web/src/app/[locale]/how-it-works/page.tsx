import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Accordion, type AccordionItemData } from "@/components/ui/Accordion";
import { toLocale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string }>;
}

interface Step {
  num: string;
  title: string;
  content: string;
  details: string[];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "HowItWorksPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export default function HowItWorksPage({ params }: Props) {
  const locale = toLocale(use(params).locale);
  setRequestLocale(locale);
  const t = useTranslations("HowItWorksPage");
  const expandedSteps = t.raw("steps") as Step[];

  return (
    <div className="pt-24">
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <SectionHeading
              title={t("title")}
              accent={t("accent")}
            />
            <p className="mt-4 text-muted">
              {t("body")}
            </p>
          </div>

          <ProcessSteps />
        </div>
      </section>

      <section className="border-y border-border/10 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl">
            <SectionHeading
              align="center"
              title={t("phasesTitle")}
              accent={t("phasesAccent")}
            />
          </div>

          <div className="mx-auto max-w-3xl space-y-16">
            {expandedSteps.map((step) => (
              <div key={step.num}>
                <div className="mb-4 flex items-center gap-4">
                  <span className="font-serif text-4xl font-light leading-none text-primary">
                    {step.num}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="mb-4 text-base leading-relaxed text-muted">
                  {step.content}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
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
              title={t("faqTitle")}
              accent={t("faqAccent")}
            />
          </div>

          <Accordion items={t.raw("faqs") as AccordionItemData[]} />
        </div>
      </section>
    </div>
  );
}
