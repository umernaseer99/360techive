import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AgentMeta } from "@/config/agents";

interface AgentUseCasesProps {
  agent: AgentMeta;
}

export function AgentUseCases({ agent }: AgentUseCasesProps) {
  const t = useTranslations("agents");
  const tDetail = useTranslations("agentDetail");
  const scenarios: string[] = t.raw(agent.slug + ".useCases");

  return (
    <section className="border-y border-border/10 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <SectionHeading
            title={tDetail("useCases.title")}
            accent={tDetail("useCases.accent")}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {scenarios.map((scenario, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/15 bg-surface/60 p-6"
            >
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {tDetail("useCases.scenario", { number: i + 1 })}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted">{scenario}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
