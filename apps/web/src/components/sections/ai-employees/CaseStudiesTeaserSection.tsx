import {
  Building2,
  FileText,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";

export function CaseStudiesTeaserSection() {
  const t = useTranslations("aiEmployees.cases");

  return (
    <section className="border-y border-border/10 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <SectionHeading title={t("title")} accent={t("accent")} />
          <p className="mt-4 text-muted">{t("body")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card
            icon={
              <IconBox color="primary">
                <Building2 className="size-5" />
              </IconBox>
            }
            title={t("study.title")}
            className="flex flex-col"
          >
            <p className="text-sm leading-relaxed text-muted">
              {t("study.body")}
              <br />
              <br />
              <span className="text-xs italic text-muted/60">
                {t("study.note")}
              </span>
            </p>
          </Card>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/15 bg-surface/60 p-8 text-center">
            <IconBox color="surface">
              <FileText className="size-5" />
            </IconBox>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {t("more.title")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t("more.body")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
