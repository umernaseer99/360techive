"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

interface BrandLogoProps {
  className?: string;
  showDot?: boolean;
  /**
   * Rendered height in pixels; the width follows the artwork's aspect ratio.
   * Set as an inline style rather than a Tailwind class so a caller can pick
   * any size without fighting the class already on the element.
   */
  height?: number;
}

/**
 * Brand Logo component.
 *
 * The mark lives at apps/web/public/brand/techive-logo.svg. That is the only
 * copy: it is referenced by path rather than duplicated, so replacing that one
 * file changes the logo everywhere it appears.
 *
 * If the file is missing or fails to load, this falls back to the text wordmark
 * rather than showing a broken image icon.
 *
 * The mount check below is what makes that work. The logo is a small
 * same-origin file, so it almost always finishes loading before React
 * hydrates, which means `onLoad` never fires for it and the image would stay
 * hidden behind the fallback forever. Asking the element on mount whether it
 * already completed, and whether it has any intrinsic width, settles both the
 * loaded and the failed case. The handlers then cover anything still in
 * flight.
 */
export function BrandLogo({
  className = "",
  showDot = true,
  height = 40,
}: BrandLogoProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img || !img.complete) return;
    if (img.naturalWidth > 0) setImageLoaded(true);
    else setImageFailed(true);
  }, []);

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/*
        Hidden until onLoad confirms the file resolved, so a missing asset never
        flashes a broken image placeholder.
      */}
      {!imageFailed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src="/brand/techive-logo.svg"
          alt={siteConfig.name}
          style={{ height }}
          className={`w-auto object-contain transition-opacity duration-200 ${
            imageLoaded ? "opacity-100" : "hidden opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
        />
      )}

      {/* Fallback text wordmark shown until/unless logo.svg is supplied and loaded */}
      {(!imageLoaded || imageFailed) && (
        <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
          {showDot && (
            <span className="size-1.5 rounded-full bg-primary transition-transform duration-300 group-hover:scale-150 motion-reduce:transform-none" />
          )}
          {siteConfig.name}
        </span>
      )}
    </div>
  );
}
