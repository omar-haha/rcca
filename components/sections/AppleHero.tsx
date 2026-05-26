"use client";

import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface AppleHeroProps {
  variant?: "primary" | "secondary" | "tertiary";
  headline: React.ReactNode;
  subheadline?: React.ReactNode;
  ctaText?: string;
  ctaLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  children?: React.ReactNode; // For the product image / vial
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

export function AppleHero({
  variant = "primary",
  headline,
  subheadline,
  ctaText,
  ctaLink,
  ctaSecondaryText,
  ctaSecondaryLink,
  children,
  className,
}: AppleHeroProps) {
  const { t } = useLanguage();
  const bgClass = variant === "primary" ? "bg-primary text-primary" :
                  variant === "secondary" ? "bg-secondary text-primary" :
                  "bg-[color:var(--surface-hover)] text-primary";

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <section ref={ref} className={cn("relative w-full flex flex-col items-center pt-[72px] md:pt-[100px] overflow-hidden md:h-[85vh] md:min-h-[600px]", bgClass, className)}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="z-10 text-center flex flex-col items-center px-5 max-w-[800px] w-full"
      >
        <motion.h1 variants={itemVariants} className="apple-headline mb-2">{headline}</motion.h1>
        {subheadline && <motion.h2 variants={itemVariants} className="apple-subheadline mb-4 md:mb-5 px-2">{subheadline}</motion.h2>}

        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 mt-2">
          {ctaText && (
            <a
              href={ctaLink || "#"}
              onClick={(e) => {
                const link = ctaLink || "";
                if (link.startsWith("#")) {
                  e.preventDefault();
                  document.getElementById(link.slice(1))?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={cn(
                "rounded-full px-5 py-2.5 text-[15px] font-normal no-underline bg-accent btn-physical btn-physical-accent"
              )}
            >
              {ctaText}
            </a>
          )}
          {ctaSecondaryText && (
            <a
              href={ctaSecondaryLink || "#"}
              className="group flex items-center gap-1 text-[15px] md:text-[17px] font-normal text-[color:var(--accent)] hover:underline no-underline"
            >
              {ctaSecondaryText}
              <ChevronRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </motion.div>

      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="mt-6 md:mt-10 h-[260px] md:h-auto md:flex-1 w-full flex justify-center items-end pointer-events-none"
      >
        {children}
      </motion.div>
    </section>
  );
}
