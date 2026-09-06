import { useTranslations } from "next-intl";
import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const faqKeys = [
  "fit",
  "vsChatbot",
  "timeline",
  "data",
  "expertise",
  "vsChatGpt",
] as const;

export function FAQSection() {
  const t = useTranslations("aiAutomation.faq");

  return (
    <Section tone="tinted">
      <Reveal>
        <SectionHeading
          align="center"
          className="max-w-3xl"
          eyebrow={t("eyebrow")}
          title={t("title")}
          accent={t("accent")}
        />
      </Reveal>

      <Reveal className="mt-12">
        <Accordion
          items={faqKeys.map((key) => ({
            label: t("items." + key + ".label"),
            content: t("items." + key + ".content"),
          }))}
        />
      </Reveal>
    </Section>
  );
}
