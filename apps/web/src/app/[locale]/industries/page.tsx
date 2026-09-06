import type { Metadata } from "next";
import {
  ShoppingCart,
  HeartPulse,
  Landmark,
  Building,
  Truck,
  Briefcase,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { localeMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.industries" });
  return localeMetadata({
    locale,
    path: "/industries",
    title: t("title"),
    description: t("description"),
  });
}

/**
 * Each industry lists three use cases, and each use case names one agent. The
 * sentence is translated; the agent it links to is structure, so it stays
 * here and is injected into the message as an <agent> tag.
 */
const industries = [
  {
    key: "ecommerce",
    icon: ShoppingCart,
    agents: ["support", "sales", "documents"],
  },
  {
    key: "healthcare",
    icon: HeartPulse,
    agents: ["support", "executive-assistant", "documents"],
  },
  {
    key: "finance",
    icon: Landmark,
    agents: ["finance", "support", "research"],
  },
  {
    key: "realEstate",
    icon: Building,
    agents: ["sales", "executive-assistant", "documents"],
  },
  {
    key: "logistics",
    icon: Truck,
    agents: ["support", "finance", "research"],
  },
  {
    key: "professional",
    icon: Briefcase,
    agents: ["executive-assistant", "documents", "research"],
  },
];

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <IndustriesPageContent />;
}

function IndustriesPageContent() {
  const t = useTranslations("industries");

  return (
    <div className="pt-24">
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <SectionHeading title={t("hero.title")} accent={t("hero.accent")} />
            <p className="mt-4 text-muted">{t("hero.body")}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Card
                key={ind.key}
                icon={
                  <IconBox>
                    <ind.icon className="size-5" />
                  </IconBox>
                }
                title={t(`items.${ind.key}.title`)}
              >
                <p className="mb-4 text-sm leading-relaxed text-muted">
                  {t(`items.${ind.key}.description`)}
                </p>
                <ul className="space-y-1.5">
                  {ind.agents.map((agent, i) => (
                    <li
                      key={agent + i}
                      className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>
                        {t.rich(`items.${ind.key}.useCases.${i}`, {
                          agent: (chunks) => (
                            <Link
                              href={`/ai-employees/${agent}`}
                              className="text-primary underline underline-offset-2 hover:no-underline"
                            >
                              {chunks}
                            </Link>
                          ),
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ContactCTASection />
    </div>
  );
}
