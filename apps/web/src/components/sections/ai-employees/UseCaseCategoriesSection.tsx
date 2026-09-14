import {
  Users,
  FileSearch,
  Headphones,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";

/** Icons in category order; copy comes from `AiEmployees.UseCases.items`. */
const categoryIcons: LucideIcon[] = [Users, FileSearch, Headphones, Zap];

export function UseCaseCategoriesSection() {
  const t = useTranslations("AiEmployees.UseCases");
  const categories = (
    t.raw("items") as { title: string; description: string }[]
  ).map((cat, i) => ({ ...cat, icon: categoryIcons[i] }));

  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <SectionHeading
            title={t("title")}
            accent={t("accent")}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card
                key={cat.title}
                icon={
                  <IconBox color="primary">
                    <Icon className="size-5" />
                  </IconBox>
                }
                title={cat.title}
              >
                <p className="text-sm leading-relaxed text-muted">
                  {cat.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
