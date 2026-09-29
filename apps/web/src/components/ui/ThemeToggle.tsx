"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Leaf } from "lucide-react";

/**
 * Cycles light, dark, green.
 *
 * A cycle rather than a menu: three options is few enough that pressing twice
 * is quicker than opening something, and it keeps the header to one control.
 * The icon shows the theme you are about to get, not the one you are in, so
 * the button reads as an action. The label says both, since an icon alone
 * cannot tell a screen reader what pressing it will do.
 *
 * Nothing renders until mount. The server has no idea which theme is stored,
 * so drawing an icon before then guarantees a hydration mismatch, and the
 * placeholder keeps the header from shifting when the real button appears.
 */

const ORDER = ["light", "dark", "green"] as const;
type ThemeName = (typeof ORDER)[number];

const ICONS: Record<ThemeName, typeof Sun> = {
  light: Sun,
  dark: Moon,
  green: Leaf,
};

const LABELS: Record<ThemeName, string> = {
  light: "light",
  dark: "dark",
  green: "green",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="inline-flex size-10 items-center justify-center" />;
  }

  const current = (ORDER as readonly string[]).includes(theme ?? "")
    ? (theme as ThemeName)
    : "light";
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
  const NextIcon = ICONS[next];

  return (
    <button
      onClick={() => setTheme(next)}
      className="flex size-10 items-center justify-center rounded-lg text-muted transition-colors hover:text-primary"
      aria-label={`Theme: ${LABELS[current]}. Switch to ${LABELS[next]}.`}
      title={`Switch to ${LABELS[next]} theme`}
    >
      <NextIcon className="size-5" />
    </button>
  );
}
