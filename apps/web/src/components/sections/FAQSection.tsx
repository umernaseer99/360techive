import { useTranslations } from "next-intl";
import { Accordion, type AccordionItemData } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function FAQSection() {
  const t = useTranslations("AiAutomation.Faq");

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
        <Accordion items={t.raw("items") as AccordionItemData[]} />
      </Reveal>
    </Section>
  );
}
