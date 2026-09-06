"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function ServicesTeaserSection() {
  const t = useTranslations("teasers.services");

  return (
    <section className="border-y border-border/10 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="max-w-2xl">
            <SectionHeading title={t("title")} accent={t("accent")} />
            <p className="mt-4 leading-relaxed text-muted">{t("body")}</p>
            <div className="mt-8">
              <LinkArrow href="/services">{t("link")}</LinkArrow>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
