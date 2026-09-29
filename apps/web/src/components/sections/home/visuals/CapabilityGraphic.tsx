"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/components/ui/useSafeReducedMotion";

/**
 * One infographic per capability, drawn rather than photographed.
 *
 * SVG for three reasons: it stays crisp at any size, it weighs a fraction of a
 * screenshot, and it reads the theme. Neutrals resolve through the same custom
 * properties as the rest of the site, so the scenes follow light, dark and
 * green without a second asset.
 *
 * Each scene carries one supporting hue alongside the brand accent. Those are
 * fixed rather than themed on purpose: they have to stay distinguishable from
 * the accent, and the accent itself changes colour between themes. They are
 * mid saturation so they hold up on both a near white and a near black ground.
 *
 * Every scene fills the 400x300 canvas and sits on a shared backdrop of a
 * faint grid and two soft washes, which is what stops the compositions reading
 * as small objects marooned in empty space.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Sample values shown inside the drawn interfaces. They are there to make the
 * mockups read as real screens rather than empty wireframes, in the same way a
 * product shot carries placeholder content. They describe nothing about this
 * company and should not be read as claims.
 */
const numeral = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;

const ink = {
  line: "rgb(var(--color-border) / 0.22)",
  faint: "rgb(var(--color-border) / 0.10)",
  fill: "rgb(var(--color-surface))",
  panel: "rgb(var(--color-background))",
  text: "rgb(var(--color-border) / 0.30)",
  accent: "rgb(var(--color-primary))",
  accentSoft: "rgb(var(--color-primary) / 0.16)",
  accentLine: "rgb(var(--color-primary) / 0.45)",
  figure: "rgb(var(--color-border) / 0.62)",
  caption: "rgb(var(--color-border) / 0.38)",
};

/** Supporting hue per scene. */
const hues: Record<string, string> = {
  "web-apps": "#6366F1", // indigo
  mobile: "#14B8A6", // teal
  agents: "#8B5CF6", // violet
  automation: "#F59E0B", // amber
};

export function CapabilityGraphic({ id }: { id: string }) {
  const reduced = useSafeReducedMotion();
  const hue = hues[id] ?? "#6366F1";

  const scene =
    id === "web-apps" ? (
      <WebScene reduced={reduced} hue={hue} />
    ) : id === "mobile" ? (
      <MobileScene reduced={reduced} hue={hue} />
    ) : id === "agents" ? (
      <AgentScene reduced={reduced} hue={hue} />
    ) : id === "automation" ? (
      <AutomationScene reduced={reduced} hue={hue} />
    ) : null;

  if (!scene) return null;

  return (
    <div className="size-full overflow-hidden rounded-xl border border-border/10 bg-background/40">
      <svg
        viewBox="0 0 400 300"
        className="size-full"
        role="img"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`fade-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--color-primary) / 0.35)" />
            <stop offset="100%" stopColor="rgb(var(--color-primary) / 0)" />
          </linearGradient>
          <radialGradient id={`washA-${id}`}>
            <stop offset="0%" stopColor="rgb(var(--color-primary) / 0.34)" />
            <stop offset="100%" stopColor="rgb(var(--color-primary) / 0)" />
          </radialGradient>
          <radialGradient id={`washB-${id}`}>
            <stop offset="0%" stopColor={hue} stopOpacity="0.30" />
            <stop offset="100%" stopColor={hue} stopOpacity="0" />
          </radialGradient>
          <pattern id={`grid-${id}`} width="25" height="25" patternUnits="userSpaceOnUse">
            <path
              d="M25 0 H0 V25"
              fill="none"
              stroke="rgb(var(--color-border) / 0.16)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* backdrop: grid plus two washes, so the scene sits in a lit space */}
        <rect width="400" height="300" fill={`url(#grid-${id})`} />
        <circle cx="60" cy="36" r="170" fill={`url(#washA-${id})`} />
        <circle cx="350" cy="276" r="170" fill={`url(#washB-${id})`} />
        <circle cx="368" cy="30" r="110" fill={`url(#washB-${id})`} opacity="0.6" />
        <circle cx="40" cy="274" r="120" fill={`url(#washA-${id})`} opacity="0.6" />

        {scene}
      </svg>
    </div>
  );
}

function Panel({
  x,
  y,
  w,
  h,
  r = 8,
  fill = ink.fill,
  stroke = ink.line,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  fill?: string;
  stroke?: string;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth="1" />;
}

function Line({
  x,
  y,
  w,
  h = 4,
  fill = ink.text,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  fill?: string;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />;
}

/* ---------------------------------------------------------------- web apps */

function WebScene({ reduced, hue }: { reduced: boolean; hue: string }) {
  const bars = [22, 34, 26, 44, 36, 54];
  return (
    <g>
      <Panel x={18} y={20} w={312} h={230} r={14} />

      <path d="M18 46 H330" stroke={ink.line} />
      <circle cx={34} cy={33} r={3.5} fill={ink.accent} />
      <circle cx={46} cy={33} r={3.5} fill={hue} opacity={0.7} />
      <circle cx={58} cy={33} r={3.5} fill={ink.line} />
      <rect x={74} y={28} width={104} height={11} rx={5.5} fill={ink.faint} />

      {/* sidebar */}
      <Line x={32} y={64} w={52} />
      <rect x={30} y={78} width={56} height={13} rx={6.5} fill={ink.accentSoft} />
      <Line x={32} y={104} w={52} />
      <Line x={32} y={122} w={40} />
      <Line x={32} y={140} w={52} />
      <rect x={30} y={158} width={56} height={13} rx={6.5} fill={hue} opacity={0.14} />
      <Line x={32} y={186} w={44} />
      <path d="M100 46 V250" stroke={ink.faint} />

      {/* stat tiles with sample values */}
      {[
        { label: "USERS", value: "2,480", c: ink.accent },
        { label: "MRR", value: "\u00a338.2k", c: hue },
        { label: "UPTIME", value: "99.9%", c: ink.figure },
      ].map((tile, i) => (
        <g key={i}>
          <Panel x={114 + i * 72} y={60} w={62} h={40} r={8} fill={ink.panel} />
          <text x={124 + i * 72} y={74} fontSize="7" fill={ink.caption} {...numeral}>
            {tile.label}
          </text>
          <text x={124 + i * 72} y={90} fontSize="12" fontWeight="600" fill={tile.c} {...numeral}>
            {tile.value}
          </text>
        </g>
      ))}

      {/* chart */}
      <Panel x={114} y={112} w={206} h={124} r={10} fill={ink.panel} />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M126 ${142 + i * 26} H308`} stroke={ink.faint} />
      ))}
      {/* value axis */}
      {["60k", "40k", "20k", "0"].map((v, i) => (
        <text key={v} x={122} y={145 + i * 26} fontSize="6.5" textAnchor="end" fill={ink.caption} {...numeral}>
          {v}
        </text>
      ))}
      {/* month axis */}
      {["JAN", "MAR", "MAY", "JUL", "SEP", "NOV"].map((m, i) => (
        <text key={m} x={126 + i * 36} y={230} fontSize="6.5" fill={ink.caption} {...numeral}>
          {m}
        </text>
      ))}
      {/* legend and the headline figure */}
      <circle cx={132} cy={124} r={3} fill={ink.accent} />
      <text x={139} y={127} fontSize="7" fill={ink.caption} {...numeral}>
        THIS YEAR
      </text>
      <circle cx={186} cy={124} r={3} fill={hue} />
      <text x={193} y={127} fontSize="7" fill={ink.caption} {...numeral}>
        LAST YEAR
      </text>
      <text x={308} y={120} fontSize="9" textAnchor="end" fill={ink.accent} {...numeral}>
        +18.4%
      </text>

      <motion.path
        d="M126 210 L162 186 L198 194 L234 156 L270 168 L308 128 V236 H126 Z"
        fill={`url(#fade-web-apps)`}
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: reduced ? 0 : 0.7 }}
      />
      {/* the comparison series, in the supporting hue */}
      <motion.path
        d="M126 224 L162 214 L198 218 L234 198 L270 204 L308 186"
        fill="none"
        stroke={hue}
        strokeWidth="2"
        strokeDasharray="5 5"
        strokeLinecap="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 1, ease: "easeOut", delay: 0.2 }}
      />
      <motion.path
        d="M126 210 L162 186 L198 194 L234 156 L270 168 L308 128"
        fill="none"
        stroke={ink.accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 1.1, ease: "easeOut" }}
      />
      <motion.circle
        cx={308}
        cy={128}
        r={4.5}
        fill={ink.accent}
        initial={reduced ? { scale: 1 } : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: reduced ? 0 : 1 }}
        style={{ originX: "308px", originY: "128px" }}
      />

      {/* floating panel, overlapping the window so the frame has depth */}
      <motion.g
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: reduced ? 0 : 0.35, ease: EASE }}
      >
        <Panel x={262} y={182} w={124} h={92} r={12} />
        <text x={276} y={200} fontSize="7" fill={ink.caption} {...numeral}>
          SESSIONS / WEEK
        </text>
        <text x={376} y={200} fontSize="9" textAnchor="end" fill={ink.figure} {...numeral}>
          14.6k
        </text>
        {bars.map((b, i) => (
          <motion.rect
            key={i}
            x={276 + i * 17}
            width={10}
            rx={3}
            fill={i === bars.length - 1 ? ink.accent : i === 3 ? hue : ink.line}
            initial={reduced ? { height: b, y: 264 - b } : { height: 0, y: 264 }}
            whileInView={{ height: b, y: 264 - b }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: reduced ? 0 : 0.5 + i * 0.07, ease: EASE }}
          />
        ))}
      </motion.g>
    </g>
  );
}

/* ----------------------------------------------------------------- mobile */

function MobileScene({ reduced, hue }: { reduced: boolean; hue: string }) {
  return (
    <g>
      {/* back device */}
      <g opacity={0.45}>
        <rect x={60} y={40} width={110} height={220} rx={20} fill={ink.fill} stroke={ink.line} />
        <Line x={80} y={86} w={46} />
        <rect x={80} y={102} width={72} height={36} rx={8} fill={hue} opacity={0.16} />
        <Line x={80} y={152} w={64} />
        <Line x={80} y={168} w={48} />
        <Line x={80} y={184} w={58} />
      </g>

      {/* front device */}
      <rect x={146} y={18} width={128} height={266} rx={26} fill={ink.panel} stroke={ink.line} strokeWidth="1.5" />
      <rect x={192} y={30} width={36} height={5} rx={2.5} fill={ink.line} />

      <text x={164} y={62} fontSize="8" fill={ink.caption} {...numeral}>
        TODAY
      </text>
      <rect x={164} y={74} width={92} height={50} rx={10} fill={ink.accentSoft} stroke={ink.accentLine} />
      <text x={176} y={96} fontSize="15" fontWeight="600" fill={ink.accent} {...numeral}>
        12,480
      </text>
      <text x={176} y={112} fontSize="7.5" fill={ink.figure} {...numeral}>
        steps · +8% wk
      </text>

      {[0, 1, 2, 3].map((i) => (
        <motion.g
          key={i}
          initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: reduced ? 0 : 0.2 + i * 0.1, ease: EASE }}
        >
          <rect x={164} y={138 + i * 32} width={92} height={24} rx={7} fill={ink.fill} stroke={ink.faint} />
          <circle cx={178} cy={150 + i * 32} r={5.5} fill={i === 0 ? ink.accent : i === 1 ? hue : ink.line} />
          <Line x={192} y={148 + i * 32} w={32} h={4} />
          <text
            x={248}
            y={153 + i * 32}
            fontSize="7.5"
            textAnchor="end"
            fill={ink.figure}
            {...numeral}
          >
            {["09:30", "11:15", "14:00", "17:45"][i]}
          </text>
        </motion.g>
      ))}

      <path d="M146 272 H274" stroke={ink.faint} />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={172 + i * 26} cy={276} r={4} fill={i === 0 ? ink.accent : ink.line} />
      ))}

      {/* notification */}
      <motion.g
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: reduced ? 0 : 0.7, ease: EASE }}
      >
        <Panel x={264} y={44} w={122} h={46} r={12} />
        <circle cx={286} cy={67} r={11} fill={ink.accentSoft} />
        <text x={286} y={71} fontSize="9" textAnchor="middle" fill={ink.accent} {...numeral}>
          3
        </text>
        <Line x={306} y={58} w={64} h={4} fill={ink.accent} />
        <text x={306} y={79} fontSize="7.5" fill={ink.figure} {...numeral}>
          2 min ago
        </text>
      </motion.g>

      {/* second card, supporting hue, fills the right side */}
      <motion.g
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: reduced ? 0 : 0.85, ease: EASE }}
      >
        <Panel x={278} y={168} w={108} h={78} r={12} />
        <circle cx={300} cy={192} r={9} fill={hue} opacity={0.18} />
        <circle cx={300} cy={192} r={3.5} fill={hue} />
        <text x={316} y={188} fontSize="12" fontWeight="600" fill={ink.figure} {...numeral}>
          4.8
        </text>
        <text x={316} y={200} fontSize="7" fill={ink.caption} {...numeral}>
          APP STORE
        </text>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={294 + i * 26} y={214} width={16} height={18} rx={4} fill={i === 1 ? hue : ink.line} opacity={i === 1 ? 0.8 : 1} />
        ))}
      </motion.g>

      {/* sync mark */}
      <motion.g
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: reduced ? 0 : 0.95 }}
      >
        <circle cx={58} cy={228} r={26} fill={ink.fill} stroke={ink.line} />
        <motion.g
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ originX: "58px", originY: "228px" }}
        >
          <path d="M72 221 A15 15 0 0 0 44 218" fill="none" stroke={ink.accent} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M44 210 L44 219 L53 219" fill="none" stroke={ink.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 235 A15 15 0 0 0 72 238" fill="none" stroke={ink.accent} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M72 246 L72 237 L63 237" fill="none" stroke={ink.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      </motion.g>
    </g>
  );
}

/* ----------------------------------------------------------------- agents */

function AgentScene({ reduced, hue }: { reduced: boolean; hue: string }) {
  return (
    <g>
      {/* the knowledge it reads */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${20 + i * 8} ${74 + i * 10})`} opacity={1 - i * 0.22}>
          <rect width={68} height={88} rx={9} fill={ink.fill} stroke={i === 0 ? ink.line : ink.faint} />
          <Line x={12} y={16} w={38} h={3.5} />
          <Line x={12} y={28} w={44} h={3.5} />
          <Line x={12} y={40} w={30} h={3.5} fill={hue} />
          <Line x={12} y={52} w={40} h={3.5} />
          <Line x={12} y={64} w={26} h={3.5} />
        </g>
      ))}
      <text x={22} y={206} fill={ink.figure} fontSize="12" fontWeight="600" {...numeral}>
        1,284
      </text>
      <text x={22} y={220} fill={ink.caption} fontSize="8" {...numeral}>
        DOCUMENTS INDEXED
      </text>

      {/* the agent */}
      <circle cx={196} cy={148} r={46} fill={ink.fill} stroke={ink.accentLine} strokeWidth="1.5" />
      <motion.circle
        cx={196}
        cy={148}
        r={46}
        fill="none"
        stroke={ink.accent}
        strokeWidth="1.5"
        initial={{ opacity: 0.45, scale: 1 }}
        animate={reduced ? undefined : { opacity: [0.45, 0, 0.45], scale: [1, 1.32, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
        style={{ originX: "196px", originY: "148px" }}
      />
      <path
        d="M180 132 L196 148 L212 132 M180 164 L196 148 L212 164 M196 120 V148 M196 148 V176"
        stroke={ink.accentLine}
        strokeWidth="1"
        fill="none"
      />
      {[
        [180, 132, ink.accentLine],
        [212, 132, hue],
        [180, 164, hue],
        [212, 164, ink.accentLine],
        [196, 120, ink.accentLine],
        [196, 176, ink.accentLine],
      ].map(([cx, cy, c], i) => (
        <circle key={i} cx={cx as number} cy={cy as number} r={4} fill={c as string} />
      ))}
      <circle cx={196} cy={148} r={7} fill={ink.accent} />

      {/* retrieval */}
      <path d="M96 142 C130 142 146 148 152 148" stroke={ink.line} strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
      {!reduced && (
        <motion.circle
          r={4}
          fill={hue}
          animate={{ cx: [96, 152], cy: [142, 148], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.8, 1] }}
        />
      )}
      <path d="M242 148 H262" stroke={ink.line} strokeWidth="1.5" strokeDasharray="4 4" />

      {/* the conversation */}
      <Panel x={264} y={44} w={120} h={40} r={12} />
      <Line x={278} y={57} w={70} h={4} />
      <Line x={278} y={69} w={50} h={4} />

      <motion.g
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: reduced ? 0 : 0.5, ease: EASE }}
      >
        <rect x={252} y={98} width={132} height={62} rx={12} fill={ink.accentSoft} stroke={ink.accentLine} />
        <Line x={266} y={112} w={100} h={4} fill={ink.accent} />
        <Line x={266} y={124} w={84} h={4} fill={ink.accent} />
        <Line x={266} y={136} w={52} h={4} fill={ink.accent} />
        <text x={266} y={154} fontSize="7.5" fill={ink.accent} opacity={0.75} {...numeral}>
          1.4s · 96% confidence
        </text>
      </motion.g>

      {/* the sources it cites, in the supporting hue */}
      <motion.g
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: reduced ? 0 : 0.75, ease: EASE }}
      >
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={252 + i * 46} y={176} width={40} height={18} rx={9} fill={hue} opacity={0.14} />
            <circle cx={264 + i * 46} cy={185} r={3} fill={hue} />
            <Line x={272 + i * 46} y={183} w={14} h={3} fill={hue} />
          </g>
        ))}
        <text x={252} y={216} fill={ink.caption} fontSize="8" {...numeral}>
          3 SOURCES CITED
        </text>
      </motion.g>

      {/* typing */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={266 + i * 13}
          cy={246}
          r={4.5}
          fill={ink.accentLine}
          animate={reduced ? undefined : { opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------- automation */

function AutomationScene({ reduced, hue }: { reduced: boolean; hue: string }) {
  return (
    <g>
      {/* routes */}
      <path d="M86 150 H120" stroke={ink.line} strokeWidth="1.5" />
      <path d="M186 150 C214 150 214 76 236 76" stroke={ink.line} strokeWidth="1.5" fill="none" />
      <path d="M186 150 C214 150 214 150 236 150" stroke={ink.line} strokeWidth="1.5" fill="none" />
      <path d="M186 150 C214 150 214 226 236 226" stroke={ink.line} strokeWidth="1.5" fill="none" />

      {/* trigger */}
      <circle cx={48} cy={150} r={30} fill={ink.fill} stroke={ink.line} />
      <path d="M41 140 L57 150 L41 160 Z" fill={ink.accent} />
      <text x={48} y={196} fill={ink.figure} fontSize="11" fontWeight="600" textAnchor="middle" {...numeral}>
        1,284
      </text>
      <text x={48} y={208} fill={ink.caption} fontSize="7.5" textAnchor="middle" {...numeral}>
        RUNS / MONTH
      </text>

      {/* rules */}
      <path d="M153 114 L189 150 L153 186 L117 150 Z" fill={ink.fill} stroke={ink.accentLine} strokeWidth="1.5" />
      <path d="M143 150 L151 159 L166 140" stroke={ink.accent} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x={153} y={206} fill={ink.caption} fontSize="7.5" textAnchor="middle" {...numeral}>
        12 RULES
      </text>

      {/* three destinations, filling the right side */}
      {[
        { y: 76, c: ink.accent, soft: ink.accentSoft },
        { y: 150, c: hue, soft: undefined },
        { y: 226, c: ink.accent, soft: ink.accentSoft },
      ].map((row, i) => (
        <motion.g
          key={i}
          initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: reduced ? 0 : 0.25 + i * 0.12, ease: EASE }}
        >
          <Panel x={236} y={row.y - 30} w={146} h={60} r={12} />
          <circle cx={260} cy={row.y} r={11} fill={row.soft ?? hue} opacity={row.soft ? 1 : 0.18} />
          <circle cx={260} cy={row.y} r={4} fill={row.c} />
          <Line x={280} y={row.y - 12} w={62} h={4.5} />
          <text x={280} y={row.y + 8} fontSize="7.5" fill={ink.figure} {...numeral}>
            {["842 · 66%", "301 · 23%", "141 · 11%"][i]}
          </text>
        </motion.g>
      ))}

      {/* packets running each branch */}
      {!reduced &&
        [76, 150, 226].map((endY, i) => (
          <motion.circle
            key={endY}
            r={4.5}
            fill={i === 1 ? hue : ink.accent}
            animate={{ cx: [86, 153, 236], cy: [150, 150, endY], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              repeatDelay: 0.5,
              delay: i * 0.9,
              ease: "easeInOut",
              times: [0, 0.45, 1],
            }}
          />
        ))}
    </g>
  );
}
