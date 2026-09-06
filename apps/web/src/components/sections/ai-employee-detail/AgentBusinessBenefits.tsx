import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AgentMeta } from "@/config/agents";

interface AgentBusinessBenefitsProps {
  agent: AgentMeta;
}

export function AgentBusinessBenefits({ agent }: AgentBusinessBenefitsProps) {
  const t = useTranslations("agents");
  const tDetail = useTranslations("agentDetail");
  const benefits: string[] = t.raw(agent.slug + ".businessBenefits");

  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl">
          <SectionHeading
            align="center"
            title={tDetail("benefits.title")}
            accent={tDetail("benefits.accent")}
          />
        </div>

        <div className="mx-auto max-w-3xl space-y-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Check className="size-4 text-primary" />
              </span>
              <p className="pt-1 text-base leading-relaxed text-muted">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
