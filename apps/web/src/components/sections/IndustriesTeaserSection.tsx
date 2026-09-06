"use client";

import {
  ShoppingCart,
  HeartPulse,
  Building2,
  Warehouse,
  Truck,
  Briefcase,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { IconBox } from "@/components/ui/IconBox";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const industries = [
  { key: "ecommerce", icon: ShoppingCart },
  { key: "healthcare", icon: HeartPulse },
  { key: "finance", icon: Building2 },
  { key: "realEstate", icon: Warehouse },
  { key: "logistics", icon: Truck },
  { key: "professional", icon: Briefcase },
];

export function IndustriesTeaserSection() {
  const t = useTranslations("teasers.industries");
  const tIndustries = useTranslations("industries.items");

  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="mb-12 max-w-2xl">
            <SectionHeading title={t("title")} accent={t("accent")} />
            <p className="mt-4 text-muted">{t("body")}</p>
          </div>
        </RevealOnScroll>

        <div className="mb-10 flex flex-wrap gap-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <RevealOnScroll key={ind.key} delay={i * 0.05}>
                <div className="flex items-center gap-3 rounded-2xl border border-border/15 bg-surface/60 px-5 py-3">
                  <IconBox color="surface">
                    <Icon className="size-4" />
                  </IconBox>
                  <span className="text-sm font-medium text-foreground">
                    {tIndustries(ind.key + ".title")}
                  </span>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll>
          <LinkArrow href="/industries">{t("link")}</LinkArrow>
        </RevealOnScroll>
      </div>
    </section>
  );
}
