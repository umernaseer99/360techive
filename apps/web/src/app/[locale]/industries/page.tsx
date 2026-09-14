import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ShoppingCart, HeartPulse, Landmark, Building, Truck, Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";
import { toLocale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string }>;
}

interface UseCase {
  /** Agent slug the link points to. */
  agent: string;
  before: string;
  link: string;
  after: string;
}

/** Icons in industry order; copy comes from `IndustriesPage.items`. */
const industryIcons = [ShoppingCart, HeartPulse, Landmark, Building, Truck, Briefcase];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "IndustriesPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export default function IndustriesPage({ params }: Props) {
  const locale = toLocale(use(params).locale);
  setRequestLocale(locale);
  const t = useTranslations("IndustriesPage");
  const industries = (
    t.raw("items") as { title: string; description: string; useCases: UseCase[] }[]
  ).map((ind, i) => ({ ...ind, icon: industryIcons[i] }));

  return (
    <div className="pt-24">
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <SectionHeading
              title={t("title")}
              accent={t("accent")}
            />
            <p className="mt-4 text-muted">
              {t("body")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Card
                key={ind.title}
                icon={<IconBox><ind.icon className="size-5" /></IconBox>}
                title={ind.title}
              >
                <p className="mb-4 text-sm leading-relaxed text-muted">
                  {ind.description}
                </p>
                <ul className="space-y-1.5">
                  {ind.useCases.map((uc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>
                        {uc.before}
                        <Link
                          href={`/ai-employees/${uc.agent}`}
                          className="text-primary underline underline-offset-2 hover:no-underline"
                        >
                          {uc.link}
                        </Link>
                        {uc.after}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
