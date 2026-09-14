import type { ReactNode } from "react";

/**
 * The italic serif accent used inside headlines.
 *
 * Translated headlines mark the accented words with <em>…</em>, because word
 * order differs between languages. Pass this as the `em` handler:
 *
 *   t.rich("title", { em: accent })
 */
export function accent(chunks: ReactNode) {
  return (
    <span className="font-serif font-normal italic text-primary">{chunks}</span>
  );
}
