import {
  Tags,
  Network,
  ArrowRightLeft,
  Bell,
  MessageSquare,
  Shield,
  BarChart3,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";
import type { AgentMeta } from "@/config/agents";

const featureIcons: LucideIcon[] = [
  Tags, Network, ArrowRightLeft, Bell,
  MessageSquare, Shield, BarChart3, Clock,
];

interface AgentFeaturesProps {
  agent: AgentMeta;
}

export function AgentFeatures({ agent }: AgentFeaturesProps) {
  const t = useTranslations("agents");
  const tDetail = useTranslations("agentDetail");
  const features: string[] = t.raw(agent.slug + ".features");

  return (
    <section className="border-y border-border/10 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <SectionHeading
            title={tDetail("features.title")}
            accent={tDetail("features.accent")}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = featureIcons[i % featureIcons.length];
            return (
              <Card
                key={i}
                icon={
                  <IconBox color="primary">
                    <Icon className="size-5" />
                  </IconBox>
                }
                className="h-full"
              >
                <p className="text-sm font-medium text-foreground">{feature}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
