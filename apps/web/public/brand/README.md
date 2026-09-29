# Brand assets

| File | Colour | Used for |
| --- | --- | --- |
| `techive-logo.svg` | `#E42A20` | The default mark. Shown in the light and dark themes. |
| `techive-logo-green.svg` | `#A2CF5A` | The green theme only. |
| `techive-logo-green-light.svg` | `#729C2E` | Not wired up. Kept for a green mark on a light surface. |
| `techive-logo-animated.svg` | `#E42A20` | The original supplied artwork, with an intro wipe and a looping gloss sweep. Not used in the layout: a logo in a fixed header should not replay an animation on every navigation or loop indefinitely, and the sweep ignores a reduced motion preference. Reasonable for a splash, a title card or a social asset. |

## Which green goes where

`#A2CF5A` is a light green. Measured against the theme backgrounds:

| | on near white `#FAFAFA` | on near black `#0A0A0A` |
| --- | --- | --- |
| `#A2CF5A` | 1.73:1, unreadable | 10.94:1 |
| `#729C2E` | 3.09:1 | 6.14:1 |
| `#E42A20` | 4.33:1 | 4.38:1 |

The green theme is built on the dark palette, so `techive-logo-green.svg` is
always on a dark surface and the light variant is not needed today. If a green
theme on a light background is ever added, switch to
`techive-logo-green-light.svg` there.

## Replacing a mark

Replace the file in place. `BrandLogo` references these by path and chooses
between them with the `green:` Tailwind variant, so nothing else needs editing.

Requirements for a replacement:

- Transparent background, so the mark sits on any theme.
- Trimmed of surrounding whitespace, otherwise it renders small and off centre
  next to the navigation.
- The component sets the height and lets the width follow, so any sensible
  aspect ratio works.

If a file is missing, the site falls back to the typographic wordmark rather
than showing a broken image.
