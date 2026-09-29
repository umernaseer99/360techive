import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Both dark themes drive the `dark:` variant. Without this the green
  // theme would render light mode mock styling on a near black background.
  darkMode: [
    "variant",
    ["&:where(.dark, .dark *)", "&:where(.green, .green *)"],
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          hover: "rgb(var(--color-primary-hover) / <alpha-value>)",
        },
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        onPrimary: "rgb(var(--color-on-primary) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [
    // A `green:` variant, so a component can style for the green theme without
    // reading the theme in JavaScript. Doing it in CSS means the correct thing
    // renders on the server, with no flash of the wrong one before hydration.
    plugin(({ addVariant }) => {
      addVariant("green", ["&:where(.green, .green *)"]);
    }),
  ],
};

export default config;
