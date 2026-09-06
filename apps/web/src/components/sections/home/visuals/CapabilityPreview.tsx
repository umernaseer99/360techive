"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

/**
 * Six small interface previews, one per capability.
 * All six panels share the same outer frame (border, radius, padding) as each
 * other and as the hero panels.
 */

const chip = "rounded-md border border-border/10 bg-surface/70";

export function CapabilityPreview({ id }: { id: string }) {
  switch (id) {
    case "web-apps":
      return <WebApps />;
    case "mobile":
      return <Mobile />;
    case "agents":
      return <Agents />;
    case "automation":
      return <Automation />;
    default:
      return null;
  }
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="size-full overflow-hidden rounded-xl border border-border/10 bg-background/50 p-3.5 shadow-sm">
      {children}
    </div>
  );
}

/**
 * The client's own service illustrations.
 *
 * They are flat graphics on a light ground, unlike the photography elsewhere
 * on the page, so each one sits on an explicit white sheet with a border and a
 * caption. That reads as a deliberate printed card rather than a bright hole
 * punched in a dark panel, and it keeps the corner radius and proportions of
 * the photo slots these replace.
 */
function AssetCard({
  src,
  alt,
  caption,
  fit = "cover",
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  /** Flat illustrations are contained so nothing is cropped away; the
   *  photographic assets fill their slot like the photos they replace. */
  fit?: "cover" | "contain";
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-lg border border-border/15 bg-white shadow-xs dark:border-white/10 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 40vw, 220px"
        className={`dark:brightness-[0.94] ${
          fit === "contain"
            ? `object-contain p-1.5 ${caption ? "pb-4" : ""}`
            : "object-cover"
        }`}
      />
      {caption && (
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent px-1.5 pb-1 pt-3 text-[6.5px] font-medium text-foreground">
          {caption}
        </span>
      )}
    </div>
  );
}

function WebApps() {
  const t = useTranslations("mockups.capabilities.webApps");

  return (
    <Frame>
      <div className="flex h-full flex-col">
        {/* Browser Chrome Header */}
        <div className="mb-2.5 flex items-center justify-between border-b border-border/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-rose-500/70" />
            <span className="size-2 rounded-full bg-amber-500/70" />
            <span className="size-2 rounded-full bg-emerald-500/70" />
            <div className="ml-2 flex h-4 items-center rounded-sm bg-surface/80 px-2 text-[8px] font-mono text-muted/70">
              app.360techive.io/analytics
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="text-[8px] font-medium text-muted">{t("live")}</span>
          </div>
        </div>

        {/* Web App Body: Sidebar + Main Content Layout */}
        <div className="flex flex-1 gap-2.5 overflow-hidden">
          {/* Sidebar */}
          <div className="flex w-[20%] flex-col gap-1 border-r border-border/10 pr-2">
            {[
              { label: t("nav.dashboard"), active: true },
              { label: t("nav.analytics"), active: false },
              { label: t("nav.customers"), active: false },
              { label: t("nav.settings"), active: false },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[8px] font-medium ${
                  item.active
                    ? "bg-primary/15 text-primary"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <span className={`size-1 rounded-full ${item.active ? "bg-primary" : "bg-border/30"}`} />
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col gap-2">
            {/* 3 mini stat cards */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: t("stats.users"), val: "14.2k", change: "+12%" },
                { label: t("stats.revenue"), val: "$48.5k", change: "+24%" },
                { label: t("stats.conversion"), val: "4.8%", change: "+0.6%" },
              ].map((stat, i) => (
                <div key={i} className={`${chip} p-1.5`}>
                  <span className="text-[7px] text-muted">{stat.label}</span>
                  <div className="mt-0.5 flex items-baseline justify-between">
                    <span className="text-[9px] font-semibold tracking-tight text-foreground tabular-nums">
                      {stat.val}
                    </span>
                    <span className="text-[6px] font-medium text-emerald-500">
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bar Chart */}
            <div className="flex flex-1 items-end gap-1 rounded-lg border border-border/10 bg-surface/30 p-2">
              {[42, 68, 50, 84, 60, 92, 74].map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ height: "6%" }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full rounded-xs ${i === 5 ? "bg-primary" : "bg-border/30"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function Mobile() {
  const t = useTranslations("mockups.capabilities.mobile");
  // One supplied illustration, read three ways: the developer on the left, the
  // phone in the middle, the designer on the right.
  const cards = [
    {
      title: t("cards.alpine.title"),
      category: t("cards.alpine.category"),
      rating: "4.9 ★",
      active: false,
    },
    {
      title: t("cards.studio.title"),
      category: t("cards.studio.category"),
      rating: "5.0 ★",
      active: true, // highlighted in primary red
    },
    {
      title: t("cards.dev.title"),
      category: t("cards.dev.category"),
      rating: "4.8 ★",
      active: false,
    },
  ];

  return (
    <Frame>
      <div className="flex h-full items-center justify-center gap-3">
        <div className="flex h-full w-[52%] max-w-[210px] flex-col overflow-hidden rounded-[1.2rem] border border-border/15 bg-surface/80 p-2 shadow-sm">
          {/* Status Bar */}
          <div className="mb-1 flex items-center justify-between px-1 text-[7px] font-medium text-muted/70">
            <span>9:41</span>
            <div className="h-1.5 w-8 rounded-full bg-border/40" />
            <div className="flex items-center gap-0.5">
              <span className="size-1 rounded-full bg-foreground/40" />
              <span className="h-1 w-2 rounded-xs bg-foreground/40" />
            </div>
          </div>

          {/* App Header */}
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-[9px] font-semibold text-foreground">
              {t("header")}
            </span>
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[7px] font-medium text-primary">
              {t("badge")}
            </span>
          </div>

          {/* 3 Card Rows with Real Photos */}
          <div className="flex flex-1 flex-col justify-between gap-1.5">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
                className={`flex items-center gap-2 rounded-lg border p-1.5 transition-colors ${
                  card.active
                    ? "border-primary/40 bg-primary/10 shadow-xs"
                    : "border-border/10 bg-background/50"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex size-7 shrink-0 items-center justify-center rounded-md text-[9px] font-semibold ${
                    card.active
                      ? "bg-primary/15 text-primary"
                      : "bg-surface text-muted"
                  }`}
                >
                  {card.title.charAt(0)}
                </span>
                <div className="flex min-w-0 flex-1 flex-col leading-none">
                  <span className="truncate text-[8px] font-semibold text-foreground">
                    {card.title}
                  </span>
                  <span className="mt-0.5 truncate text-[6.5px] text-muted">
                    {card.category}
                  </span>
                </div>
                <span className={`text-[7px] font-semibold tabular-nums ${card.active ? "text-primary" : "text-muted"}`}>
                  {card.rating}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom Tab Bar */}
          <div className="mt-2 flex items-center justify-around border-t border-border/10 pt-1.5 text-[8px]">
            <span className="text-primary font-bold">●</span>
            <span className="text-muted/60">◆</span>
            <span className="text-muted/60">▲</span>
            <span className="text-muted/60">■</span>
          </div>
        </div>

        <AssetCard
          src="/images/services/mobile-app-development.jpg"
          alt={t("assetAlt")}
          fit="contain"
          className="aspect-[8/7] h-[86%] w-auto max-w-[42%] self-center"
        />
      </div>
    </Frame>
  );
}



function Agents() {
  const t = useTranslations("mockups.capabilities.agents");
  const userAvatar =
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80";
  const agentAvatar =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80";

  return (
    <Frame>
      <div className="flex h-full gap-3">
        <div className="flex h-full flex-1 flex-col justify-between">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-border/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-semibold text-foreground">
              {t("title")}
            </span>
            <span className="text-[8px] text-muted">{t("online")}</span>
          </div>
          <span className="text-[7px] font-mono text-muted/60">{t("latency")}</span>
        </div>

        {/* Message Bubbles with Real Photos */}
        <div className="flex flex-col gap-2 py-1">
          {/* User message */}
          <div className="flex items-end gap-2 self-end">
            <div className="max-w-[190px] rounded-xl rounded-br-xs border border-border/10 bg-surface/70 px-2.5 py-1.5 text-[8px] text-foreground/85">
              {t("userMessage")}
            </div>
            <div className="relative size-5 shrink-0 overflow-hidden rounded-full ring-1 ring-border/20">
              <Image
                src={userAvatar}
                alt={t("userAlt")}
                width={20}
                height={20}
                className="size-full object-cover dark:brightness-90"
              />
            </div>
          </div>

          {/* Agent response */}
          <div className="flex items-end gap-2 self-start">
            <div className="relative size-5 shrink-0 overflow-hidden rounded-full ring-1 ring-primary/30">
              <Image
                src={agentAvatar}
                alt={t("agentAlt")}
                width={20}
                height={20}
                className="size-full object-cover dark:brightness-90"
              />
            </div>
            <div className="max-w-[210px] rounded-xl rounded-bl-xs border border-primary/25 bg-primary/10 px-2.5 py-1.5 text-[8px] text-foreground/90 shadow-xs">
              {t("agentMessage")}
            </div>
          </div>
        </div>

        {/* Input Bar & Suggested Reply Chips */}
        <div className="flex flex-col gap-1.5 border-t border-border/10 pt-2">
          <div className="flex items-center gap-2 rounded-lg border border-border/10 bg-surface/60 px-2 py-1">
            <span className="text-[8px] text-muted">{t("input")}</span>
            <span className="ml-auto rounded bg-primary px-1.5 py-0.5 text-[7px] font-medium text-white">
              {t("send")}
            </span>
          </div>

          {/* 2 Suggested Reply Chips */}
          <div className="flex items-center gap-1.5">
            <span className="rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[7px] font-medium text-primary hover:bg-primary/15 transition-colors cursor-pointer">
              {t("chips.csv")}
            </span>
            <span className="rounded-full border border-border/15 bg-surface/80 px-2 py-0.5 text-[7px] text-muted hover:text-foreground transition-colors cursor-pointer">
              {t("chips.followUp")}
            </span>
          </div>
        </div>
        </div>

        {/* The client's own assistant graphic, alongside the live conversation */}
        <AssetCard
          src="/images/services/ai-chatbot.jpg"
          alt={t("assetAlt")}
          className="hidden h-full w-[30%] lg:block"
        />
      </div>
    </Frame>
  );
}

function Automation() {
  const t = useTranslations("mockups.capabilities.automation");
  const nodes = [
    {
      step: "01",
      title: t("nodes.trigger.title"),
      sub: t("nodes.trigger.sub"),
      icon: (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-3.5">
          <path d="M9 1L3 9h5l-1 6 7-8h-5l1-6z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      active: false,
    },
    {
      step: "02",
      title: t("nodes.condition.title"),
      sub: t("nodes.condition.sub"),
      icon: (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-3.5">
          <path d="M2 3h12M4 7h8M6 11h4M7 15h2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      active: false,
    },
    {
      step: "03",
      title: t("nodes.action.title"),
      sub: t("nodes.action.sub"),
      icon: (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-3.5">
          <circle cx="8" cy="8" r="3" />
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2" strokeLinecap="round" />
        </svg>
      ),
      active: false,
    },
    {
      step: "04",
      title: t("nodes.output.title"),
      sub: t("nodes.output.sub"),
      icon: (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5 text-white">
          <path d="M3 8.5l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      active: true, // Final node in primary red
    },
  ];

  return (
    <Frame>
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between border-b border-border/10 pb-2">
          <span className="text-[8px] font-medium uppercase tracking-wider text-muted">
            {t("title")}
          </span>
          <span className="text-[7px] font-mono text-emerald-500">{t("health")}</span>
        </div>

        {/* Connected Nodes Diagram */}
        <div className="relative flex items-center justify-between px-1 py-4">
          {/* Connecting line */}
          <div className="absolute left-6 right-6 top-1/2 h-0.5 -translate-y-1/2 bg-border/20" />
          <motion.div
            animate={{ left: ["10%", "88%"], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary shadow-sm"
          />

          {nodes.map((node, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-1.5">
              <div
                className={`flex size-10 items-center justify-center rounded-xl border transition-all ${
                  node.active
                    ? "border-primary bg-primary text-white shadow-md shadow-primary/20 scale-105"
                    : "border-border/15 bg-surface/90 text-foreground/80 shadow-xs"
                }`}
              >
                {node.icon}
              </div>
              <div className="text-center">
                <span className={`block text-[8px] font-semibold ${node.active ? "text-primary" : "text-foreground/90"}`}>
                  {node.title}
                </span>
                <span className="block text-[6.5px] text-muted">
                  {node.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer status bar */}
        <div className="flex items-center justify-between rounded-md border border-border/10 bg-surface/40 px-2 py-1 text-[7px] text-muted">
          <span>{t("executed")}</span>
          <span className="font-mono text-primary">{t("errors")}</span>
        </div>
      </div>
    </Frame>
  );
}
