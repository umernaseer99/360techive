import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Headphones,
  TrendingUp,
  Wallet,
  Search,
  FileText,
  Crown,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { IconBox } from "@/components/ui/IconBox";
import { Button } from "@/components/ui/Button";
import type { AgentMeta } from "@/config/agents";

const iconMap: Record<string, LucideIcon> = {
  Headphones,
  TrendingUp,
  Wallet,
  Search,
  FileText,
  Crown,
};

interface AgentDetailHeroProps {
  agent: AgentMeta;
}

export function AgentDetailHero({ agent }: AgentDetailHeroProps) {
  const t = useTranslations("agents");
  const tDetail = useTranslations("agentDetail");
  const Icon = iconMap[agent.icon] ?? Headphones;

  return (
    <section className="px-4 pt-32 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/ai-employees"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          &larr; {tDetail("back")}
        </Link>

        <div className="flex flex-col gap-6 md:max-w-3xl">
          <Badge icon={<span className="size-3 rounded-full bg-primary" />}>
            {tDetail("departments." + agent.department)}
          </Badge>

          <div className="flex items-center gap-4">
            <IconBox color="primary">
              <Icon className="size-6" />
            </IconBox>
            <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
              {t(agent.slug + ".name")}
            </h1>
          </div>

          <p className="text-xl leading-relaxed text-foreground md:text-2xl">
            <span className="font-serif italic text-primary">
              {t(agent.slug + ".tagline")}
            </span>
          </p>

          <p className="max-w-2xl leading-relaxed text-muted">
            {t(agent.slug + ".description")}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button size="lg" variant="primary">
                {tDetail("tryDemo")}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                {tDetail("bookCall")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
