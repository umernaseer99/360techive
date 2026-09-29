"use client";

import { useState, useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion, useInView } from "framer-motion";

interface NodeData {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  highlighted?: boolean;
}

interface NodeNetworkDiagramProps {
  centerLabel?: string;
  centerIcon?: LucideIcon;
  nodes: NodeData[];
  variant: "scattered" | "orbit";
  animated?: boolean;
  staggeredReveal?: boolean;
  activeNodeCycle?: { intervalMs: number };
  className?: string;
}

const scatterPositions = [
  { x: 18, y: 12 },
  { x: 78, y: 8 },
  { x: 12, y: 58 },
  { x: 52, y: 42 },
  { x: 82, y: 65 },
  { x: 30, y: 82 },
  { x: 65, y: 28 },
  { x: 40, y: 65 },
];

/** The point every node orbits and every label flips around. */
const CENTER = { x: 50, y: 50 };

function getOrbitPosition(index: number, total: number, radius: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER.x + radius * Math.cos(angle),
    y: CENTER.y + radius * Math.sin(angle),
  };
}

function getNodePosition(
  index: number,
  total: number,
  variant: "scattered" | "orbit"
) {
  if (variant === "scattered") {
    return scatterPositions[index % scatterPositions.length];
  }
  return getOrbitPosition(index, total, 32);
}

function NodeDot({
  pos,
  index,
  variant,
  staggeredReveal,
  reduced,
}: {
  pos: { x: number; y: number };
  index: number;
  variant: "scattered" | "orbit";
  staggeredReveal?: boolean;
  reduced: boolean;
}) {
  const drift = variant === "scattered" && !reduced;

  return (
    <motion.circle
      cx={pos.x}
      cy={pos.y}
      r={2.5}
      fill="rgb(var(--color-primary))"
      fillOpacity={0.3}
      initial={staggeredReveal ? { opacity: 0, scale: 0 } : { opacity: 0.3 }}
      whileInView={staggeredReveal ? { opacity: 0.3, scale: 1 } : {}}
      viewport={staggeredReveal ? { once: true } : undefined}
      animate={drift ? { cy: [pos.y - 3, pos.y + 3, pos.y - 3] } : {}}
      transition={
        staggeredReveal
          ? { duration: 0.4, delay: index * 0.15, ease: "easeOut" }
          : drift
            ? {
                duration: 3 + index * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {}
      }
    />
  );
}

function PulseDot({
  from,
  to,
  index,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  index: number;
}) {
  return (
    <motion.circle
      r={1.8}
      fill="rgb(var(--color-primary))"
      initial={false}
      animate={{
        cx: [from.x, to.x, from.x],
        cy: [from.y, to.y, from.y],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        delay: index * 0.4,
        ease: "linear",
      }}
    />
  );
}

/**
 * The highlight ring for the active node.
 *
 * It is an HTML element inside the node's own box rather than an SVG circle at
 * the node coordinate, and that is what makes it exactly centred: the icon box
 * is a fixed 40px while the SVG viewBox scales with the container, so an SVG
 * ring could only ever line up at one particular container width. inset-0 on
 * the size-10 box is centred at every width, and its radius is the icon box's
 * radius — the label is a sibling and contributes nothing to it.
 */
function HighlightRing({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl border border-primary/40"
      />
    );
  }

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-xl border border-primary"
      initial={{ scale: 1, opacity: 0.7 }}
      animate={{ scale: [1, 1.75], opacity: [0.7, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

export function NodeNetworkDiagram({
  centerLabel,
  centerIcon: CenterIcon,
  nodes,
  variant,
  animated,
  staggeredReveal,
  activeNodeCycle,
  className = "",
}: NodeNetworkDiagramProps) {
  const reduced = !!useReducedMotion();
  const total = nodes.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(
    activeNodeCycle ? 0 : null
  );

  const centerRadius = centerLabel ? 10 : 8;

  useEffect(() => {
    if (!activeNodeCycle || reduced) return;
    if (!inView) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % total));
    }, activeNodeCycle.intervalMs);

    return () => clearInterval(id);
  }, [activeNodeCycle, total, inView, reduced]);

  return (
    // The square is the coordinate system and the gutter sits outside it, so
    // node percentages stay exact while labels keep room at every width.
    <div ref={containerRef} className={`w-full max-w-md px-6 ${className}`}>
      <div className="relative aspect-square w-full">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full"
          aria-label={
            centerLabel
              ? `Network diagram centered on ${centerLabel}`
              : "Network diagram"
          }
        >
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor="rgb(var(--color-primary))"
                stopOpacity={0.2}
              />
              <stop
                offset="100%"
                stopColor="rgb(var(--color-primary))"
                stopOpacity={0}
              />
            </radialGradient>
          </defs>

          <circle cx={CENTER.x} cy={CENTER.y} r={38} fill="url(#centerGlow)" />

          {animated &&
            !reduced &&
            nodes.map((nd, i) => {
              const to = getNodePosition(i, total, variant);
              if (to.x === CENTER.x && to.y === CENTER.y) return null;
              return <PulseDot key={nd.id} from={CENTER} to={to} index={i} />;
            })}

          {nodes.map((nd, i) => {
            const pos = getNodePosition(i, total, variant);
            const isActive = activeNodeCycle !== undefined && i === activeIndex;
            return (
              <line
                key={nd.id}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={pos.x}
                y2={pos.y}
                stroke={
                  isActive
                    ? "rgb(var(--color-primary))"
                    : "rgb(var(--color-border))"
                }
                strokeWidth={isActive ? 1.2 : 0.8}
                strokeOpacity={isActive ? 0.8 : 0.15}
              />
            );
          })}

          {nodes.map((nd, i) => (
            <NodeDot
              key={nd.id}
              pos={getNodePosition(i, total, variant)}
              index={i}
              variant={variant}
              staggeredReveal={staggeredReveal}
              reduced={reduced}
            />
          ))}

          {!staggeredReveal && (
            <>
              <motion.circle
                cx={CENTER.x}
                cy={CENTER.y}
                r={centerRadius + 8}
                fill="rgb(var(--color-primary) / 0.08)"
                stroke="rgb(var(--color-border))"
                strokeOpacity={0.15}
                strokeWidth={1}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              {reduced ? (
                <circle
                  cx={CENTER.x}
                  cy={CENTER.y}
                  r={centerRadius}
                  fill="rgb(var(--color-primary))"
                />
              ) : (
                <motion.circle
                  cx={CENTER.x}
                  cy={CENTER.y}
                  r={centerRadius}
                  fill="rgb(var(--color-primary))"
                  animate={{
                    r: [centerRadius, centerRadius + 1.5, centerRadius],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </>
          )}
        </svg>

        {nodes.map((nd, i) => {
          const pos = getNodePosition(i, total, variant);
          const NodeIcon = nd.icon;
          const highlighted =
            nd.highlighted === true ||
            (activeNodeCycle !== undefined && i === activeIndex);
          // Derived from the node's own offset from the centre, never a
          // per-node flag: anything in the lower half puts its label ABOVE the
          // icon box, so no label can run past the bottom edge of the square
          // whatever the node positions happen to be.
          const labelAbove = pos.y > CENTER.y;

          // The positioned box is the icon box and nothing else — the label is
          // absolutely positioned and adds no height — so the icon box centre
          // lands exactly on the node coordinate the ring and the lines use.
          const content = (
            <span className="relative block size-10">
              {highlighted && <HighlightRing reduced={reduced} />}

              <span
                className={`flex size-10 items-center justify-center rounded-xl border bg-surface/80 backdrop-blur-sm transition-colors duration-500 ${
                  highlighted
                    ? "border-primary/30 text-primary"
                    : "border-border/15 text-foreground"
                }`}
              >
                <NodeIcon className="size-4" />
              </span>

              <span
                className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-[10px] font-medium leading-tight transition-colors duration-500 ${
                  labelAbove ? "bottom-full mb-1.5" : "top-full mt-1.5"
                } ${highlighted ? "text-primary" : "text-muted"}`}
              >
                {nd.label}
              </span>
            </span>
          );

          const positionStyle = {
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: "translate(-50%, -50%)",
          };

          if (nd.href) {
            return (
              <a
                key={nd.id}
                href={nd.href}
                className="absolute rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                style={positionStyle}
              >
                {content}
              </a>
            );
          }

          return (
            <div key={nd.id} className="absolute" style={positionStyle}>
              <motion.div
                initial={staggeredReveal ? { opacity: 0, scale: 0.6 } : {}}
                whileInView={staggeredReveal ? { opacity: 1, scale: 1 } : {}}
                viewport={staggeredReveal ? { once: true } : undefined}
                transition={
                  staggeredReveal
                    ? { duration: 0.35, delay: i * 0.15, ease: "easeOut" }
                    : {}
                }
              >
                {content}
              </motion.div>
            </div>
          );
        })}

        {centerLabel && !staggeredReveal && (
          <div
            className="absolute flex flex-col items-center gap-0.5"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {CenterIcon && (
              <div className="flex size-8 items-center justify-center rounded-full bg-primary text-onPrimary">
                <CenterIcon className="size-4" />
              </div>
            )}
            <span className="text-xs font-semibold text-foreground">
              {centerLabel}
            </span>
          </div>
        )}

        {centerLabel && staggeredReveal && (
          <motion.div
            className="absolute flex flex-col items-center gap-0.5"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {CenterIcon && (
              <div className="flex size-8 items-center justify-center rounded-full bg-primary text-onPrimary">
                <CenterIcon className="size-4" />
              </div>
            )}
            <span className="text-xs font-semibold text-foreground">
              {centerLabel}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
