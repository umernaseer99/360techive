import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";
import { Badge } from "@/components/ui/Badge";
import { resourceTopics } from "@/config/resources";

export function ResourcesGridSection() {
  const t = useTranslations("resources");

  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <SectionHeading title={t("title")} accent={t("accent")} />
          <p className="mt-4 text-muted">{t("body")}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resourceTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <Card
                key={topic.slug}
                icon={
                  <IconBox color="primary">
                    <Icon className="size-5" />
                  </IconBox>
                }
                title={t("topics." + topic.slug + ".title")}
                className="relative flex h-full flex-col"
              >
                <p className="flex-1 text-sm leading-relaxed text-muted">
                  {t("topics." + topic.slug + ".description")}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted/40">
                    {t("comingSoon")}
                  </span>
                  <Badge className="text-[10px]">{t("article")}</Badge>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
