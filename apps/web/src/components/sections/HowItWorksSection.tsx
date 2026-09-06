import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessSteps } from "./ProcessSteps";

export function HowItWorksSection() {
  const t = useTranslations("aiAutomation.process");

  return (
    <Section id="how-it-works">
      <Reveal>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          accent={t("accent")}
          lead={t("lead")}
        />
      </Reveal>

      <div className="mt-14">
        <ProcessSteps />
      </div>
    </Section>
  );
}
