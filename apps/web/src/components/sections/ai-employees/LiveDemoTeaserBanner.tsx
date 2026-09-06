import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";

export function LiveDemoTeaserBanner() {
  const t = useTranslations("aiEmployees.demoBanner");

  return (
    <GlassPanel className="border-dashed text-center">
      <div className="flex flex-col items-center gap-3 py-4">
        <Badge icon={<span className="size-2 rounded-full bg-primary" />}>
          {t("badge")}
        </Badge>
        <p className="text-sm text-muted">{t("body")}</p>
      </div>
    </GlassPanel>
  );
}
