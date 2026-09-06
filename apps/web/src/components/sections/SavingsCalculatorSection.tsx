"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Years projected. Matches the 10-year framing used in the copy. */
const YEARS = 10;
/** Assumed annual salary inflation applied to the human-cost side. */
const SALARY_GROWTH = 0.03;
/** Fully-loaded cost multiplier on top of base salary (taxes, benefits, overhead). */
const LOADING = 1.3;

/** Formatted in the reader's locale: 62.000 $ in German, $62,000 in English. */
function makeCurrency(locale: string) {
  const format = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  return (n: number) => format.format(Math.round(n));
}

interface FieldProps {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
  onChange: (n: number) => void;
}

function Field({
  label,
  hint,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="font-mono text-sm tabular-nums text-primary">
          {format(value)}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border/15 accent-[rgb(var(--color-primary))]"
      />

      <p className="text-xs text-muted/70">{hint}</p>
    </div>
  );
}

export function SavingsCalculatorSection() {
  const t = useTranslations("aiAutomation.calculator");
  const locale = useLocale();
  const currency = useMemo(() => makeCurrency(locale), [locale]);
  const [headcount, setHeadcount] = useState(6);
  const [salary, setSalary] = useState(62000);
  const [automatable, setAutomatable] = useState(55);
  const [agentCost, setAgentCost] = useState(30000);

  const result = useMemo(() => {
    const loadedCostYear1 = headcount * salary * LOADING;
    const share = automatable / 100;

    let humanTotal = 0;
    for (let y = 0; y < YEARS; y++) {
      humanTotal += loadedCostYear1 * share * Math.pow(1 + SALARY_GROWTH, y);
    }

    const agentTotal = agentCost * YEARS;

    return {
      loadedCostYear1,
      annualAutomatable: loadedCostYear1 * share,
      annualSaving: loadedCostYear1 * share - agentCost,
      humanTotal,
      agentTotal,
      netSaving: humanTotal - agentTotal,
    };
  }, [headcount, salary, automatable, agentCost]);

  const positive = result.netSaving > 0;

  return (
    <Section tone="tinted" id="savings">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              accent={t("accent")}
              lead={t("lead")}
            />

            <div className="flex flex-col gap-7 rounded-2xl border border-border/10 bg-background p-7">
              <Field
                label={t("fields.headcount.label")}
                hint={t("fields.headcount.hint")}
                value={headcount}
                min={1}
                max={50}
                step={1}
                format={(n) => `${n}`}
                onChange={setHeadcount}
              />
              <Field
                label={t("fields.salary.label")}
                hint={t("fields.salary.hint", {
                  loading: Math.round((LOADING - 1) * 100),
                })}
                value={salary}
                min={30000}
                max={180000}
                step={1000}
                format={currency}
                onChange={setSalary}
              />
              <Field
                label={t("fields.automatable.label")}
                hint={t("fields.automatable.hint")}
                value={automatable}
                min={10}
                max={90}
                step={5}
                format={(n) => `${n}%`}
                onChange={setAutomatable}
              />
              <Field
                label={t("fields.agentCost.label")}
                hint={t("fields.agentCost.hint")}
                value={agentCost}
                min={10000}
                max={200000}
                step={5000}
                format={currency}
                onChange={setAgentCost}
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex h-full flex-col justify-center gap-8 rounded-2xl border border-primary/25 bg-primary/[0.03] p-8 md:p-10">
            <div className="flex flex-col gap-2">
              <Eyebrow tone="primary">{t("projected", { years: YEARS })}</Eyebrow>
              <span
                className={`font-serif text-5xl font-normal italic leading-none tabular-nums md:text-6xl ${
                  positive ? "text-primary" : "text-muted"
                }`}
              >
                {currency(Math.abs(result.netSaving))}
              </span>
              <span className="text-sm text-muted">
                {positive ? t("result.saving") : t("result.moreExpensive")}
              </span>
            </div>

            <dl className="flex flex-col divide-y divide-border/10 border-y border-border/10">
              {[
                {
                  k: t("rows.loadedCost"),
                  v: currency(result.loadedCostYear1),
                },
                {
                  k: t("rows.repeatable"),
                  v: currency(result.annualAutomatable),
                },
                {
                  k: t("rows.annualSaving"),
                  v: currency(result.annualSaving),
                },
                {
                  k: t("rows.humanTotal", { years: YEARS }),
                  v: currency(result.humanTotal),
                },
                {
                  k: t("rows.agentTotal", { years: YEARS }),
                  v: currency(result.agentTotal),
                },
              ].map((row) => (
                <div
                  key={row.k}
                  className="flex items-center justify-between gap-4 py-3.5"
                >
                  <dt className="text-sm text-muted">{row.k}</dt>
                  <dd className="font-mono text-sm tabular-nums text-foreground">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-4">
              <Button size="lg" variant="primary" className="self-start">
                {t("cta")}
              </Button>
              <p className="text-xs leading-relaxed text-muted/60">
                {t("disclaimer")}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
