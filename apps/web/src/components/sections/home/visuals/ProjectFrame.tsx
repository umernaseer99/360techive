"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

/**
 * Large project preview: a browser plane carrying a real interface mockup.
 * The supporting photography sits inside the interface where a real product
 * would put it — a crew avatar on a job row, the assistant's avatar in a chat
 * header, a thumbnail on an audit line — rather than on a floating card.
 *
 * Three compositions, cycled by index, so a new project always has a frame.
 * All data shown is invented sample content for the case study.
 */

/** Status pill colours, picked so they read in both themes. */
const status = {
  green:
    "border-emerald-500/25 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
  amber:
    "border-amber-500/30 bg-amber-500/12 text-amber-700 dark:text-amber-300",
  blue: "border-sky-500/30 bg-sky-500/12 text-sky-700 dark:text-sky-300",
  red: "border-rose-500/30 bg-rose-500/12 text-rose-700 dark:text-rose-300",
} as const;

type Composition = {
  url: string;
  body: React.ReactNode;
};

/** The `useTranslations("mockups")` function, passed down to each composition. */
type T = ReturnType<typeof useTranslations<"mockups">>;

/**
 * Supporting photography, sized for the place it sits inside a mockup:
 * a crew avatar on a job row, the assistant's avatar in a chat header,
 * a thumbnail on an audit line.
 */
function InlinePhoto({
  src,
  alt,
  shape = "circle",
  className = "",
}: {
  src: string;
  alt: string;
  shape?: "circle" | "square";
  className?: string;
}) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden ring-1 ring-border/20 ${
        shape === "circle" ? "rounded-full" : "rounded"
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="48px"
        className="object-cover dark:brightness-90"
      />
    </span>
  );
}

export function ProjectFrame({ variant }: { variant: number }) {
  const t = useTranslations("mockups");
  const v = variant % 3;
  const composition = [opsComposition, supportComposition, approvalComposition][
    v
  ](t);

  return (
    <div className="group/frame relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/10 bg-surface/50 transition-colors duration-500 group-hover:border-primary/25">
      {/* faint grid ground */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--color-border)/0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--color-border)/0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* main window */}
      <motion.div
        variants={{ rest: { y: 0 }, hover: { y: -8 } }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-4 flex flex-col overflow-hidden rounded-xl border border-border/10 bg-background/90 shadow-[0_28px_60px_-40px_rgb(0_0_0/0.7)] backdrop-blur-sm sm:inset-5 md:inset-8"
      >
        <div className="flex items-center gap-1.5 border-b border-border/10 px-2.5 py-1.5 md:px-3 md:py-2">
          <span className="size-1.5 rounded-full bg-primary/60" />
          <span className="size-1.5 rounded-full bg-border/25" />
          <span className="size-1.5 rounded-full bg-border/25" />
          <span className="ml-2 truncate font-mono text-[6.5px] text-muted/70 sm:text-[7.5px] md:text-[9px]">
            {composition.url}
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-2 sm:p-2.5 md:p-4">
          {composition.body}
        </div>
      </motion.div>

    </div>
  );
}

/* ── shared building blocks ─────────────────────────────────────────────── */

function StatRow({
  stats,
}: {
  stats: { label: string; value: string; sub?: string }[];
}) {
  return (
    <div className="grid grid-cols-3 gap-1.5 md:gap-2">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-md border border-border/10 bg-surface/60 p-1.5 md:p-2"
        >
          <span className="block truncate text-[6px] uppercase tracking-wide text-muted sm:text-[7px] md:text-[8.5px]">
            {s.label}
          </span>
          <span className="block text-[9px] font-semibold tabular-nums text-foreground sm:text-[10px] md:text-[13px]">
            {s.value}
          </span>
          {s.sub && (
            <span className="hidden truncate text-[6.5px] text-muted md:block md:text-[8px]">
              {s.sub}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function Pill({
  tone,
  children,
}: {
  tone: keyof typeof status;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`shrink-0 rounded-full border px-1.5 py-px text-[6px] font-medium sm:text-[7px] md:text-[8.5px] ${status[tone]}`}
    >
      {children}
    </span>
  );
}

/* ── 01. Operations platform for a service business ─────────────────────── */

function opsComposition(t: T): Composition {
  // Client and crew names are proper nouns; the dates follow the locale's own
  // convention, and the status words are translated.
  const jobs = [
    {
      job: "Riverside HVAC — Unit inspection",
      crew: "M. Doyle",
      date: t("ops.dates.first"),
      label: t("ops.status.invoiced"),
      tone: "green" as const,
    },
    {
      job: "Bellview Apartments — Boiler service",
      crew: "K. Owusu",
      date: t("ops.dates.second"),
      label: t("ops.status.inProgress"),
      tone: "blue" as const,
      photo: {
        src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=200&q=80",
        alt: t("ops.photoAlt"),
      },
    },
    {
      job: "Northgate Retail — Quarterly maintenance",
      crew: "S. Patel",
      date: t("ops.dates.third"),
      label: t("ops.status.scheduled"),
      tone: "amber" as const,
    },
    {
      job: "Harbour Café — Extractor repair",
      crew: "M. Doyle",
      date: t("ops.dates.fourth"),
      label: t("ops.status.awaitingParts"),
      tone: "red" as const,
    },
  ];

  return {
    url: "fieldbase.app/jobs",
    body: (
      <div className="flex min-h-0 flex-1 flex-col gap-2 md:gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[8px] font-semibold text-foreground sm:text-[9px] md:text-[12px]">
            {t("ops.title")}
          </span>
          <Pill tone="green">{t("ops.synced")}</Pill>
        </div>

        <StatRow
          stats={[
            {
              label: t("ops.stats.jobs.label"),
              value: "34",
              sub: t("ops.stats.jobs.sub"),
            },
            {
              label: t("ops.stats.invoice.label"),
              value: t("ops.stats.invoice.value"),
              sub: t("ops.stats.invoice.sub"),
            },
            {
              label: t("ops.stats.utilisation.label"),
              value: "87%",
              sub: t("ops.stats.utilisation.sub"),
            },
          ]}
        />

        <div className="flex min-h-0 flex-1 flex-col rounded-md border border-border/10 bg-surface/40">
          <div className="flex items-center justify-between border-b border-border/10 px-2 py-1 text-[6px] font-medium uppercase tracking-wide text-muted/80 sm:text-[6.5px] md:text-[8px]">
            <span>{t("ops.columns.job")}</span>
            <span className="flex gap-3 md:gap-6">
              <span className="hidden sm:inline">{t("ops.columns.crew")}</span>
              <span>{t("ops.columns.due")}</span>
              <span>{t("ops.columns.status")}</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-around px-2 py-0.5">
            {jobs.map((row, i) => (
              <div
                key={row.job}
                className={`flex items-center gap-2 py-0.5 md:py-1 ${
                  i === 3 ? "hidden sm:flex" : "flex"
                }`}
              >
                {row.photo ? (
                  <InlinePhoto
                    src={row.photo.src}
                    alt={row.photo.alt}
                    className="size-4 md:size-6"
                  />
                ) : (
                  <span className="flex size-4 shrink-0 items-center justify-center md:size-6">
                    <span className="size-1 rounded-full bg-border/40" />
                  </span>
                )}
                <span className="truncate text-[7px] font-medium text-foreground sm:text-[8px] md:text-[10px]">
                  {row.job}
                </span>
                <span className="ml-auto hidden shrink-0 text-[7px] text-muted sm:inline md:text-[9px]">
                  {row.crew}
                </span>
                <span className="shrink-0 text-[6.5px] tabular-nums text-muted sm:ml-0 md:text-[9px]">
                  {row.date}
                </span>
                <Pill tone={row.tone}>{row.label}</Pill>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  };
}

/* ── 02. Customer support assistant ─────────────────────────────────────── */

function supportComposition(t: T): Composition {
  return {
    url: "northline.supply/inbox",
    body: (
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 md:gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1.5 md:gap-2">
            <InlinePhoto
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=200&q=80"
              alt={t("support.photoAlt")}
              className="size-4 md:size-6"
            />
            <span className="truncate text-[8px] font-semibold text-foreground sm:text-[9px] md:text-[12px]">
              {t("support.title")}
            </span>
          </span>
          <span className="hidden text-[8px] text-muted md:inline">
            {t("support.resolved")}
          </span>
          <Pill tone="green">{t("support.online")}</Pill>
        </div>

        {/* order context card */}
        <div className="flex items-center gap-2 rounded-md border border-border/10 bg-surface/60 px-2 py-1 md:px-2.5 md:py-1.5">
          <span className="flex size-4 shrink-0 items-center justify-center rounded bg-primary/15 text-[6px] font-semibold text-primary md:size-6 md:text-[8px]">
            📦
          </span>
          <div className="min-w-0">
            <span className="block truncate text-[7px] font-semibold text-foreground sm:text-[8px] md:text-[10px]">
              {t("support.order.title")}
            </span>
            <span className="block truncate text-[6px] text-muted sm:text-[7px] md:text-[9px]">
              {t("support.order.detail")}
            </span>
          </div>
          <Pill tone="blue">{t("support.order.status")}</Pill>
        </div>

        {/* conversation */}
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-1.5 md:justify-between md:gap-2">
          <div className="ml-auto hidden max-w-[72%] rounded-lg rounded-br-xs border border-border/10 bg-surface/70 px-2 py-1 text-[7px] leading-snug text-foreground/85 sm:block sm:text-[8px] md:px-2.5 md:py-1.5 md:text-[10px]">
            {t("support.thread.questionOne")}
          </div>
          <div className="hidden max-w-[82%] rounded-lg rounded-bl-xs border border-primary/25 bg-primary/10 px-2 py-1 text-[7px] leading-snug text-foreground sm:block sm:text-[8px] md:px-2.5 md:py-1.5 md:text-[10px]">
            {t("support.thread.answerOne")}
          </div>
          <div className="ml-auto max-w-[72%] rounded-lg rounded-br-xs border border-border/10 bg-surface/70 px-2 py-1 text-[7px] leading-snug text-foreground/85 sm:text-[8px] md:px-2.5 md:py-1.5 md:text-[10px]">
            {t("support.thread.questionTwo")}
          </div>
          <div className="max-w-[82%] rounded-lg rounded-bl-xs border border-primary/25 bg-primary/10 px-2 py-1 text-[7px] leading-snug text-foreground sm:text-[8px] md:px-2.5 md:py-1.5 md:text-[10px]">
            {t("support.thread.answerTwo")}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full border border-primary/30 bg-primary/5 px-1.5 py-px text-[6px] font-medium text-primary sm:text-[7px] md:px-2 md:text-[8.5px]">
              {t("support.actions.track")}
            </span>
            <span className="rounded-full border border-border/15 bg-surface/70 px-1.5 py-px text-[6px] text-muted sm:text-[7px] md:px-2 md:text-[8.5px]">
              {t("support.actions.address")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-border/10 bg-surface/40 px-2 py-1 text-[6px] text-muted sm:text-[7px] md:text-[8.5px]">
            <span className="size-1 shrink-0 rounded-full bg-amber-500" />
            <span className="truncate">{t("support.handoff")}</span>
          </div>
        </div>
      </div>
    ),
  };
}

/* ── 03. Internal approval workflow ─────────────────────────────────────── */

const names: Record<string, string> = {
  AK: "A. Karim",
  MR: "M. Reyes",
  JD: "J. Dahl",
  LT: "L. Tan",
};

function approvalComposition(t: T): Composition {
  const requests = [
    {
      name: t("approvals.requests.contract"),
      approver: "AK",
      label: t("approvals.status.approved"),
      tone: "green" as const,
    },
    {
      name: t("approvals.requests.laptops"),
      approver: "MR",
      label: t("approvals.status.pending"),
      tone: "amber" as const,
    },
    {
      name: t("approvals.requests.travel"),
      approver: "JD",
      label: t("approvals.status.rejected"),
      tone: "red" as const,
    },
    {
      name: t("approvals.requests.marketing"),
      approver: "LT",
      label: t("approvals.status.pending"),
      tone: "amber" as const,
    },
  ];

  return {
    url: "approvals.internal/requests",
    body: (
      <div className="flex min-h-0 flex-1 flex-col gap-2 md:gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[8px] font-semibold text-foreground sm:text-[9px] md:text-[12px]">
            {t("approvals.title")}
          </span>
          <Pill tone="amber">{t("approvals.waiting")}</Pill>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-around gap-1.5">
          {requests.map((r, i) => (
            <div
              key={r.name}
              className={`items-center gap-2 rounded-md border border-border/10 bg-surface/50 px-1.5 py-1 md:px-2.5 md:py-1.5 ${
                i === 3 ? "hidden sm:flex" : "flex"
              }`}
            >
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-[5.5px] font-semibold text-primary sm:text-[6px] md:size-6 md:text-[8.5px]">
                {r.approver}
              </span>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-[7px] font-medium text-foreground sm:text-[8px] md:text-[10px]">
                  {r.name}
                </span>
                <span className="hidden truncate text-[8px] text-muted md:block">
                  {t("approvals.currentApprover", { name: names[r.approver] })}
                </span>
              </div>
              <Pill tone={r.tone}>{r.label}</Pill>
            </div>
          ))}
        </div>

        {/* audit trail strip */}
        <div className="flex items-center gap-2 rounded-md border border-border/10 bg-surface/40 px-2 py-1 md:gap-2.5 md:px-2.5 md:py-1.5">
          <InlinePhoto
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=200&q=80"
            alt={t("approvals.photoAlt")}
            shape="square"
            className="size-6 md:size-9"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[6px] sm:text-[7px] md:text-[9px]">
              <span className="text-muted">{t("approvals.trail.submitted")}</span>
              <span className="text-border/60">→</span>
              <span className="text-muted">{t("approvals.trail.reviewed")}</span>
              <span className="text-border/60">→</span>
              <span className="font-medium text-emerald-700 dark:text-emerald-300">
                {t("approvals.trail.approved")}
              </span>
            </div>
            <span className="mt-0.5 block truncate text-[6px] text-muted sm:text-[6.5px] md:text-[8px]">
              {t("approvals.trail.logged")}
            </span>
          </div>
        </div>
      </div>
    ),
  };
}
