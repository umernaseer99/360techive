"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Headphones,
  TrendingUp,
  Wallet,
  Search,
  FileText,
  Crown,
  type LucideIcon,
} from "lucide-react";

/**
 * The one showpiece animation on the site.
 *
 * Instead of an endless decorative orbit, this renders the actual value
 * proposition as a loop: a task leaves the hub, travels to the department
 * that owns it, that node lights up and does the work, and a result
 * returns to the hub. Then the next department takes a turn.
 *
 * Everything is transform + opacity. Reduced motion gets the static diagram.
 */

type Node = {
  /** Message key under mockups.network.nodes. */
  id: string;
  icon: LucideIcon;
  /** SVG-space coordinates in a 280x280 box. */
  x: number;
  y: number;
  /** Percentage position for the HTML chip overlay. */
  left: string;
  top: string;
};

const CENTER = { x: 140, y: 140 };

const NODES: Node[] = [
  { id: "support", icon: Headphones, x: 140, y: 35, left: "50%", top: "12.5%" },
  { id: "sales", icon: TrendingUp, x: 231, y: 87, left: "82.5%", top: "31.25%" },
  { id: "finance", icon: Wallet, x: 231, y: 193, left: "82.5%", top: "68.75%" },
  { id: "research", icon: Search, x: 140, y: 245, left: "50%", top: "87.5%" },
  { id: "document", icon: FileText, x: 49, y: 193, left: "17.5%", top: "68.75%" },
  { id: "assistant", icon: Crown, x: 49, y: 87, left: "17.5%", top: "31.25%" },
];

const CYCLE_MS = 2600;

export function AgentNetworkVisual() {
  const t = useTranslations("mockups.network");
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % NODES.length),
      CYCLE_MS
    );
    return () => window.clearInterval(id);
  }, [reduced]);

  const activeNode = NODES[active];

  return (
    <div
      className="relative aspect-square w-full max-w-[420px]"
      role="img"
      aria-label={t("diagramLabel")}
    >
      <svg
        viewBox="0 0 280 280"
        className="absolute inset-0 size-full overflow-visible"
        aria-hidden="true"
      >
        {/* ambient field */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="88"
          className="fill-primary/[0.06]"
        />

        {/* connections */}
        {NODES.map((n, i) => (
          <line
            key={n.id}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={n.x}
            y2={n.y}
            strokeWidth={i === active ? 1.5 : 1}
            strokeDasharray="3 5"
            className={
              i === active
                ? "stroke-primary/60 transition-all duration-500"
                : "stroke-primary/15 transition-all duration-500"
            }
          />
        ))}

        {/* outbound task packet */}
        {!reduced && (
          <motion.circle
            key={`out-${active}`}
            r="4"
            className="fill-primary"
            initial={{ cx: CENTER.x, cy: CENTER.y, opacity: 0 }}
            animate={{
              cx: [CENTER.x, activeNode.x],
              cy: [CENTER.y, activeNode.y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], times: [0, 0.15, 0.85, 1] }}
          />
        )}

        {/* returning result */}
        {!reduced && (
          <motion.circle
            key={`in-${active}`}
            r="3"
            className="fill-primary/60"
            initial={{ cx: activeNode.x, cy: activeNode.y, opacity: 0 }}
            animate={{
              cx: [activeNode.x, CENTER.x],
              cy: [activeNode.y, CENTER.y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 0.9,
              delay: 1.3,
              ease: [0.4, 0, 0.2, 1],
              times: [0, 0.15, 0.85, 1],
            }}
          />
        )}

      </svg>

      {/* department chips */}
      {NODES.map((n, i) => {
        const Icon = n.icon;
        const isActive = i === active;
        // Derived from the node's own offset from the hub, not a per-node flag:
        // nodes in the lower half put their label ABOVE the icon so it can never
        // run past the bottom edge of the square.
        const labelAbove = n.y > CENTER.y;

        return (
          <div
            key={n.id}
            // the wrapper is exactly the size of the icon box — the label is
            // absolutely positioned and so contributes no height. That makes the
            // icon box centre land precisely on (n.x, n.y).
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: n.left, top: n.top }}
          >
            <div className="relative size-11">
              {/* work-received pulse — sized to and centred on the icon box
                  alone, so it can never read as shifted. Motion only. */}
              {!reduced && isActive && (
                <motion.span
                  key={`pulse-${active}`}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl border border-primary"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 1.9, opacity: [0.8, 0] }}
                  transition={{ duration: 1.1, delay: 0.85, ease: "easeOut" }}
                />
              )}

              <motion.div
                animate={reduced ? undefined : { scale: isActive ? 1.12 : 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className={`flex size-11 items-center justify-center rounded-2xl border bg-background transition-colors duration-500 ${
                  isActive
                    ? "border-primary/70 text-primary"
                    : "border-border/15 text-muted"
                }`}
              >
                <Icon className="size-[18px]" />
              </motion.div>

              <span
                className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-[11px] font-medium transition-colors duration-500 ${
                  labelAbove ? "bottom-full mb-2" : "top-full mt-2"
                } ${isActive ? "text-foreground" : "text-muted/60"}`}
              >
                {t(`nodes.${n.id}.label`)}
              </span>
            </div>
          </div>
        );
      })}

      {/* hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex size-16 items-center justify-center rounded-full border-2 border-primary bg-background"
        >
          <span className="text-[11px] font-semibold tracking-wide text-primary">
            {t("hub")}
          </span>
        </motion.div>
      </div>

      {/* live caption — tells the viewer what they're watching */}
      <div className="absolute inset-x-0 -bottom-2 flex justify-center">
        <motion.span
          key={`cap-${active}`}
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full border border-border/10 bg-surface/70 px-3 py-1 font-mono text-[11px] text-muted backdrop-blur"
        >
          {t(`nodes.${activeNode.id}.task`)} &rarr;{" "}
          {t(`nodes.${activeNode.id}.label`)}
        </motion.span>
      </div>
    </div>
  );
}
