"use client";

import { motion } from "framer-motion";

/**
 * Page transition.
 *
 * A template remounts on every navigation, so this gives each route a short
 * fade and rise instead of a hard swap. It is deliberately quick: anything
 * longer reads as a loading screen, and the content underneath is already
 * rendered on the server.
 *
 * Reduced motion is handled by the global media query in globals.css, which
 * collapses the duration rather than removing the transition.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
