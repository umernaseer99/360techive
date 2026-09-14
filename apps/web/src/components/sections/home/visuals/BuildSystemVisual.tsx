"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useSafeReducedMotion } from "@/components/ui/useSafeReducedMotion";

/**
 * The hero visual: the five things we build, drawn in one visual language and
 * wired together.
 *
 *   web app  ·  mobile app  ·  AI agent  ·  automation  ·  product
 *
 * Motion has three layers, all compositor only (transform + opacity):
 *
 *   1. pointer parallax  — depth per panel, spring damped, desktop only
 *   2. scroll parallax   — the same depth values, driven by scroll on touch
 *   3. ambient float     — a slow local loop so the system is never frozen
 *
 * Reduced motion drops all three and renders the diagram at rest.
 */

const SPRING = { stiffness: 90, damping: 20, mass: 0.6 } as const;

/** Panel depth. 1 is the front plane, 0.25 is furthest back. */
type Depth = number;

function useParallax(
  pointer: MotionValue<number>,
  scroll: MotionValue<number>,
  depth: Depth,
  axis: "x" | "y"
) {
  // Pointer travel is larger on x, scroll travel only applies to y.
  const pointerRange = axis === "x" ? 26 : 20;
  const scrollRange = axis === "y" ? 34 : 0;

  const fromPointer = useTransform(
    pointer,
    [-1, 1],
    [-pointerRange * depth, pointerRange * depth]
  );
  const fromScroll = useTransform(
    scroll,
    [0, 1],
    [scrollRange * depth, -scrollRange * depth]
  );

  return useTransform([fromPointer, fromScroll], ([a, b]) => (a as number) + (b as number));
}

export function BuildSystemVisual() {
  const reduced = useSafeReducedMotion();
  const t = useTranslations("Home.Visual");
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, SPRING);
  const py = useSpring(rawY, SPRING);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scrollP = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Depth planes. Front panels travel most, the grid barely moves.
  const webX = useParallax(px, scrollP, 0.85, "x");
  const webY = useParallax(py, scrollP, 0.85, "y");
  const mobileX = useParallax(px, scrollP, 1, "x");
  const mobileY = useParallax(py, scrollP, 1, "y");
  const agentX = useParallax(px, scrollP, 0.55, "x");
  const agentY = useParallax(py, scrollP, 0.55, "y");
  const flowX = useParallax(px, scrollP, 0.7, "x");
  const flowY = useParallax(py, scrollP, 0.7, "y");
  const productX = useParallax(px, scrollP, 0.3, "x");
  const productY = useParallax(py, scrollP, 0.3, "y");
  const gridX = useParallax(px, scrollP, 0.15, "x");
  const gridY = useParallax(py, scrollP, 0.15, "y");

  function handlePointer(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function resetPointer() {
    rawX.set(0);
    rawY.set(0);
  }

  const still = reduced ?? false;

  return (
    <div
      ref={ref}
      onPointerMove={handlePointer}
      onPointerLeave={resetPointer}
      className="relative aspect-square w-full max-w-[520px] select-none"
      role="img"
      aria-label={t("ariaLabel")}
    >
      {/* backdrop grid, furthest plane */}
      <motion.div
        aria-hidden="true"
        style={still ? undefined : { x: gridX, y: gridY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-[6%] rounded-[28px] border border-border/10" />
        <div
          className="absolute inset-[6%] rounded-[28px] opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(var(--color-border)/0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--color-border)/0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </motion.div>

      {/* connective tissue */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full overflow-visible"
        fill="none"
      >
        {[
          "M30 30 L52 50",
          "M74 26 L52 50",
          "M26 72 L52 50",
          "M70 76 L52 50",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="rgb(var(--color-border) / 0.16)"
            strokeWidth="0.35"
            initial={still ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.09, ease: "easeOut" }}
          />
        ))}
      </svg>

      <Panel
        still={still}
        x={webX}
        y={webY}
        delay={0.24}
        float={{ amplitude: 7, duration: 9 }}
        className="absolute left-0 top-[6%] w-[54%]"
      >
        <WebAppPanel still={still} />
      </Panel>

      <Panel
        still={still}
        x={mobileX}
        y={mobileY}
        delay={0.34}
        float={{ amplitude: 9, duration: 11, offset: 1.5 }}
        className="absolute right-[2%] top-0 w-[26%]"
      >
        <MobilePanel still={still} />
      </Panel>

      <Panel
        still={still}
        x={agentX}
        y={agentY}
        delay={0.44}
        float={{ amplitude: 6, duration: 10, offset: 0.8 }}
        className="absolute bottom-[16%] left-[1%] w-[46%]"
      >
        <AgentPanel still={still} />
      </Panel>

      <Panel
        still={still}
        x={flowX}
        y={flowY}
        delay={0.54}
        float={{ amplitude: 8, duration: 12, offset: 2.2 }}
        className="absolute bottom-0 right-[4%] w-[44%]"
      >
        <AutomationPanel still={still} />
      </Panel>

      <Panel
        still={still}
        x={productX}
        y={productY}
        delay={0.16}
        scaleIn
        className="absolute left-[35%] top-[35%] w-[30%]"
      >
        <ProductCore still={still} />
      </Panel>

    </div>
  );
}

/**
 * One floating element, in three transform layers.
 *
 * They have to be separate elements. Parallax drives `style.y` from a motion
 * value, the entrance animates `y` as a keyframe and the ambient loop animates
 * `y` forever: put any two of those on one node and they fight over the same
 * property. Nesting lets the browser compose them instead.
 *
 *   outer  — position + pointer/scroll parallax
 *   middle — one shot entrance
 *   inner  — ambient float loop
 *
 * The outer node is the positioned one, so the whole stack keeps the absolute
 * placement given by `className`.
 */
function Panel({
  children,
  still,
  x,
  y,
  delay,
  className,
  float,
  scaleIn = false,
}: {
  children: React.ReactNode;
  still: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
  delay: number;
  className: string;
  float?: { amplitude: number; duration: number; offset?: number };
  scaleIn?: boolean;
}) {
  const entrance = scaleIn
    ? { from: { opacity: 0, scale: 0.92 }, to: { opacity: 1, scale: 1 } }
    : { from: { opacity: 0, y: 14 }, to: { opacity: 1, y: 0 } };

  return (
    <motion.div style={still ? undefined : { x, y }} className={className}>
      <motion.div
        initial={entrance.from}
        animate={entrance.to}
        transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {float && !still ? (
          <motion.div
            animate={{ y: [0, -float.amplitude, 0] }}
            transition={{
              duration: float.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: float.offset ?? 0,
            }}
          >
            {children}
          </motion.div>
        ) : (
          children
        )}
      </motion.div>
    </motion.div>
  );
}

const panelClass =
  "rounded-xl border border-border/10 bg-surface/80 shadow-[0_18px_40px_-28px_rgb(0_0_0/0.5)] backdrop-blur-sm";

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-muted">
      {children}
    </span>
  );
}

function WebAppPanel({ still }: { still: boolean }) {
  const t = useTranslations("Home.Visual");
  return (
    <div className={panelClass}>
      <div className="flex items-center gap-1.5 border-b border-border/10 px-2.5 py-2">
        <span className="size-1.5 rounded-full bg-primary/70" />
        <span className="size-1.5 rounded-full bg-border/20" />
        <span className="size-1.5 rounded-full bg-border/20" />
        <span className="ml-1.5">
          <PanelLabel>{t("webApp")}</PanelLabel>
        </span>
      </div>
      <div className="flex gap-2 p-2.5">
        <div className="flex w-1/4 flex-col gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full ${
                i === 1 ? "bg-primary/50" : "bg-border/20"
              }`}
            />
          ))}
        </div>
        <div className="flex h-11 flex-1 items-end gap-1.5">
          {[38, 62, 46, 78, 54, 88].map((h, i) => (
            <motion.div
              key={i}
              initial={still ? { height: `${h}%` } : { height: "8%" }}
              animate={{ height: `${h}%` }}
              transition={{
                duration: 0.7,
                delay: 0.75 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`w-full rounded-sm ${
                i === 5 ? "bg-primary/60" : "bg-border/25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobilePanel({ still }: { still: boolean }) {
  const t = useTranslations("Home.Visual");
  return (
    <div className={`${panelClass} p-1.5`}>
      <div className="rounded-lg border border-border/10 bg-background/50 p-2">
        <div className="mx-auto mb-2 h-0.5 w-5 rounded-full bg-border/20" />
        <div className="mb-2 h-8 rounded-md bg-primary/20" />
        <div className="flex flex-col gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={still ? { opacity: 1 } : { opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.9 + i * 0.1 }}
              className="flex items-center gap-1.5"
            >
              <span className="size-2 shrink-0 rounded-[3px] bg-border/25" />
              <span className="h-1 flex-1 rounded-full bg-border/20" />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="px-1 pb-0.5 pt-1.5 text-center">
        <PanelLabel>{t("mobile")}</PanelLabel>
      </div>
    </div>
  );
}

function AgentPanel({ still }: { still: boolean }) {
  const t = useTranslations("Home.Visual");
  return (
    <div className={`${panelClass} p-2.5`}>
      <div className="mb-2 flex items-center gap-1.5">
        <span className="relative flex size-1.5">
          {!still && (
            <motion.span
              animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-primary"
            />
          )}
          <span className="relative size-1.5 rounded-full bg-primary" />
        </span>
        <PanelLabel>{t("agent")}</PanelLabel>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="ml-auto h-3 w-3/5 rounded-md rounded-br-sm bg-border/20" />
        <motion.div
          initial={still ? { opacity: 1 } : { opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.05 }}
          className="h-5 w-4/5 rounded-md rounded-bl-sm bg-primary/20"
        />
      </div>
    </div>
  );
}

function AutomationPanel({ still }: { still: boolean }) {
  const t = useTranslations("Home.Visual");
  return (
    <div className={`${panelClass} p-2.5`}>
      <div className="mb-2.5">
        <PanelLabel>{t("automation")}</PanelLabel>
      </div>
      <div className="relative flex items-center justify-between">
        <span className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-border/20" />
        {!still && (
          <motion.span
            animate={{ left: ["8%", "88%"], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.15, 0.85, 1],
            }}
            className="absolute top-1/2 size-1 -translate-y-1/2 rounded-full bg-primary"
          />
        )}
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`relative size-2.5 rounded-[4px] border ${
              i === 3
                ? "border-primary/50 bg-primary/30"
                : "border-border/15 bg-surface"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCore({ still }: { still: boolean }) {
  const t = useTranslations("Home.Visual");
  return (
    <div className="relative">
      {!still && (
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.35, 1], opacity: [0.25, 0, 0.25] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-2xl border border-primary/40"
        />
      )}
      <div className="relative flex aspect-square flex-col items-center justify-center gap-1.5 rounded-2xl border border-primary/30 bg-surface/90 backdrop-blur">
        <span className="font-serif text-lg italic leading-none text-primary">
          360
        </span>
        <PanelLabel>{t("product")}</PanelLabel>
      </div>
    </div>
  );
}
