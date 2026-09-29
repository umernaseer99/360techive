"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Home, Users, Globe, Mail } from "lucide-react";
import { agents } from "@/config/agents";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "../ui/ThemeToggle";
import { BrandLogo } from "@/components/ui/BrandLogo";

function LogoMark() {
  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-1.5 pointer-events-none" aria-label="360 Techive">
      <BrandLogo />
    </div>
  );
}

export function BottomDock() {
  const reduced = useReducedMotion();
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  return (
    <>
      {LogoMark()}

      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 pb-[env(safe-area-inset-bottom)]"
        aria-label="Bottom navigation dock"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 max-w-[calc(100%-32px)]">
          <motion.div
            whileHover={reduced ? {} : { transition: { type: "spring", stiffness: 120, damping: 20 } }}
            whileFocus={reduced ? {} : { transition: { type: "spring", stiffness: 120, damping: 20 } }}
            role="button"
            tabIndex={0}
            aria-label="Home"
            onClick={() => window.location.href.replace("/", "/")}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
          >
            <Home className="size-3.5 mr-1" /><span>Home</span>
          </motion.div>

          <motion.div
            whileHover={reduced ? {} : { transition: { type: "spring", stiffness: 120, damping: 20 } }}
            whileFocus={reduced ? {} : { transition: { type: "spring", stiffness: 120, damping: 20 } }}
            role="button"
            tabIndex={0}
            aria-label="AI Employees"
            onClick={() => window.location.href = "/ai-employees"}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
          >
            <Users className="size-3.5 mr-1" /><span>AI Employees</span>
          </motion.div>

          <motion.div
            whileHover={reduced ? {} : { transition: { type: "spring", stiffness: 120, damping: 20 } }}
            whileFocus={reduced ? {} : { transition: { type: "spring", stiffness: 120, damping: 20 } }}
            role="button"
            tabIndex={0}
            aria-label="Services"
            onClick={() => window.location.href = "/services"}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
          >
            <Globe className="size-3.5 mr-1" /><span>Services</span>
          </motion.div>

          <motion.div
            whileHover={reduced ? {} : { transition: { type: "spring", stiffness: 120, damping: 20 } }}
            whileFocus={reduced ? {} : { transition: { type: "spring", stiffness: 120, damping: 20 } }}
            role="button"
            tabIndex={0}
            aria-label="Contact"
            onClick={() => window.location.href.replace("/", "/contact")}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
          >
            <Mail className="size-3.5 mr-1" /><span>Contact</span>
          </motion.div>

          <motion.div
            whileHover={reduced ? {} : { transition: { type: "spring", stiffness: 120, damping: 20 } }}
            whileFocus={reduced ? {} : { transition: { type: "spring", stiffness: 120, damping: 20 } }}
            role="button"
            tabIndex={0}
            aria-label="Get a Demo"
            onClick={() => window.location.href.replace("/", "/contact")}
            className="flex items-center gap-1 rounded-full px-4 py-1.5 bg-primary text-onPrimary font-medium transition-colors"
          >
            <span>Get a Demo</span>
          </motion.div>
        </div>
      </div>
    </>
  );
}