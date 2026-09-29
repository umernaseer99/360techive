"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useSafeReducedMotion } from "@/components/ui/useSafeReducedMotion";
import { type Project } from "@/config/company";

/**
 * One project.
 *
 * The screenshot floats on a tinted stage rather than sitting flush in the
 * card, which is what makes it read as a product shot instead of a thumbnail.
 * On a pointer device the card tilts towards the cursor and a soft highlight
 * follows it, so the surface behaves like something physical.
 *
 * The tilt is two nested transforms: the outer node holds the perspective and
 * the inner one rotates, because perspective on the rotating element itself
 * measures from that element rather than from the viewer, and every card in a
 * row would vanish to its own centre.
 *
 * All of it is skipped under reduced motion, and none of it is attached on
 * touch, where there is no hover to reward and the handlers just cost work.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations("home.portfolio");
  const reduced = useSafeReducedMotion();

  const host = project.url
    ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : null;

  // pointer position, normalised to -0.5..0.5 across the card
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 20, mass: 0.4 } as const;
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), spring);

  // the highlight tracks the pointer across the stage
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgb(var(--color-primary) / 0.28), transparent 55%)`;

  function handlePointer(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function resetPointer() {
    px.set(0);
    py.set(0);
  }

  const body = (
    <motion.div
      layout
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: reduced ? 0.2 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="h-full min-w-0"
      // Perspective belongs on this node, not on the one that rotates. Set it
      // there and each card vanishes to its own centre rather than to the
      // viewer, so a row of them looks broken.
      style={{ perspective: 1200 }}
      onPointerMove={handlePointer}
      onPointerLeave={resetPointer}
    >
      <motion.article
        initial="rest"
        animate="rest"
        whileHover={reduced ? undefined : "hover"}
        whileFocus={reduced ? undefined : "hover"}
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border/10 bg-surface/60 backdrop-blur-sm transition-colors duration-500 hover:border-primary/30"
      >
        {/* edge that lights up, drawn as a ring so it never affects layout */}
        <motion.span
          aria-hidden="true"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0 z-20 rounded-3xl ring-1 ring-inset ring-primary/25"
        />

        {/* the stage the screenshot floats on */}
        <div className="relative overflow-hidden px-5 pb-0 pt-6">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% -10%, rgb(var(--color-primary) / 0.16), transparent 60%)",
            }}
          />

          {!reduced && (
            <motion.span
              aria-hidden="true"
              style={{ background: glare }}
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              transition={{ duration: 0.35 }}
              className="pointer-events-none absolute inset-0"
            />
          )}

          <motion.div
            variants={{ rest: { y: 0 }, hover: { y: -10 } }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={reduced ? undefined : { transform: "translateZ(40px)" }}
          >
            <div className="overflow-hidden rounded-xl border border-border/15 bg-background shadow-[0_30px_60px_-30px_rgb(0_0_0/0.55)]">
              <div className="flex items-center gap-2 border-b border-border/10 bg-surface/80 px-3 py-2">
                <span className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-border/20" />
                  <span className="size-2 rounded-full bg-border/20" />
                  <span className="size-2 rounded-full bg-border/20" />
                </span>
                {host && (
                  <span className="ml-1 truncate rounded-md bg-border/[0.06] px-2 py-0.5 font-mono text-[10px] text-muted">
                    {host}
                  </span>
                )}
              </div>

              <div className="relative aspect-[16/10] overflow-hidden">
                <motion.div
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.image}
                    alt={`${project.name} website`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                    priority={index < 3}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* content */}
        <div className="relative flex min-w-0 flex-1 flex-col gap-3 p-6 pt-7">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.15em] text-muted">
              {t(`items.${project.key}.category`)}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-border/10" />
            <span className="text-[11px] font-medium tabular-nums text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
              {project.name}
            </h3>

            {project.url && (
              // the visit affordance: a circle that fills with the accent
              <motion.span
                aria-hidden="true"
                variants={{
                  rest: { scale: 1, backgroundColor: "rgb(var(--color-primary) / 0)" },
                  hover: { scale: 1.08, backgroundColor: "rgb(var(--color-primary) / 1)" },
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary group-hover:text-onPrimary"
              >
                <ArrowUpRight className="size-4" strokeWidth={2.2} />
              </motion.span>
            )}
          </div>

          <p className="text-pretty text-[15px] leading-relaxed text-muted">
            {t(`items.${project.key}.description`)}
          </p>

          <ul className="mt-1 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border/15 bg-background/40 px-2.5 py-0.5 text-[11px] tracking-wide text-muted transition-colors duration-300 group-hover:border-primary/20"
              >
                {item}
              </li>
            ))}
          </ul>

          {project.url && (
            <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-primary">
              {t("visit")}
              <span
                aria-hidden="true"
                className="h-px w-5 bg-primary transition-all duration-300 group-hover:w-9"
              />
            </span>
          )}
        </div>
      </motion.article>
    </motion.div>
  );

  if (!project.url) return body;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full min-w-0 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {body}
    </a>
  );
}
