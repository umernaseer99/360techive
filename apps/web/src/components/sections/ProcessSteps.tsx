import { useTranslations } from "next-intl";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function ProcessSteps() {
  const t = useTranslations("AiAutomation.Process");
  const processSteps = t.raw("steps") as {
    num: string;
    title: string;
    description: string;
  }[];

  return (
    <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-border/10 bg-border/10 md:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step) => (
        <RevealItem key={step.num} className="h-full">
          <div className="flex h-full flex-col gap-3 bg-background p-8">
            <span className="font-serif text-4xl font-normal italic leading-none text-primary">
              {step.num}
            </span>
            <h3 className="text-base font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              {step.description}
            </p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
