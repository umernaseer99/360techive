import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";

export function HowWeBuildAgentsSection() {
  const t = useTranslations("aiEmployees.lifecycle");

  return (
    <section className="border-y border-border/10 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <SectionHeading title={t("title")} accent={t("accent")} />
          <p className="mt-4 text-muted">{t("body")}</p>
        </div>

        <ProcessSteps />
      </div>
    </section>
  );
}
