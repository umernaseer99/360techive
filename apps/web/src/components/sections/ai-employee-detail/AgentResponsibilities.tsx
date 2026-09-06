import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AgentMeta } from "@/config/agents";

interface AgentResponsibilitiesProps {
  agent: AgentMeta;
}

export function AgentResponsibilities({ agent }: AgentResponsibilitiesProps) {
  const t = useTranslations("agents");
  const tDetail = useTranslations("agentDetail");
  const items: string[] = t.raw(agent.slug + ".responsibilities");

  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <SectionHeading
            title={tDetail("responsibilities.title")}
            accent={tDetail("responsibilities.accent")}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-2xl border border-border/15 bg-surface/60 p-5"
            >
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-serif text-sm font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-muted">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
