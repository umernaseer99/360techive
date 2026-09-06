import { useTranslations } from "next-intl";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/** Order only; the wording lives in messages under `process.steps`. */
export const processSteps = [
  "discovery",
  "architecture",
  "build",
  "operate",
] as const;

export function ProcessSteps() {
  const t = useTranslations("process");

  return (
    <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-border/10 bg-border/10 md:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step, i) => (
        <RevealItem key={step} className="h-full">
          <div className="flex h-full flex-col gap-3 bg-background p-8">
            <span className="font-serif text-4xl font-normal italic leading-none text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-base font-semibold text-foreground">
              {t(`steps.${step}.title`)}
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              {t(`steps.${step}.description`)}
            </p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
