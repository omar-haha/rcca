"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { ChevronRight } from "lucide-react";

import { useTheme } from "../providers/ThemeProvider";

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
  const { theme } = useTheme();
  const isDark = theme === "dark";

  let bgClass = "";
  if (isDark) {
    bgClass = variant === "primary" ? "bg-black text-[#f5f5f7]" :
              variant === "secondary" ? "bg-[#111111] text-[#f5f5f7]" :
              "bg-[#151515] text-[#f5f5f7]";
  } else {
    bgClass = variant === "primary" ? "bg-white text-[#1d1d1f]" :
              variant === "secondary" ? "bg-[#f5f5f7] text-[#1d1d1f]" :
              "bg-[#e8e8ed] text-[#1d1d1f]";
  }

  return (
    <section className={cn("relative w-full flex flex-col items-center pt-[72px] md:pt-[100px] overflow-hidden md:h-[85vh] md:min-h-[600px]", bgClass, className)}>
      <div className="z-10 text-center flex flex-col items-center px-5 max-w-[800px] w-full">
        <h1 className="apple-headline mb-2">{headline}</h1>
        {subheadline && <h2 className="apple-subheadline mb-4 md:mb-5 px-2">{subheadline}</h2>}

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          {ctaText && (
            <a
              href={ctaLink || "#"}
              className={cn(
                "rounded-full px-5 py-2.5 text-[15px] font-normal transition-transform hover:scale-[1.02] no-underline",
                isDark ? "bg-[#f5f5f7] text-black" : "bg-[#0071e3] text-white"
              )}
            >
              {ctaText}
            </a>
          )}
          {ctaSecondaryText && (
            <a
              href={ctaSecondaryLink || "#"}
              className="group flex items-center gap-1 text-[15px] md:text-[17px] font-normal text-[#0071e3] hover:underline no-underline"
            >
              {ctaSecondaryText}
              <ChevronRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </div>
      </div>

      <div className="mt-6 md:mt-10 h-[260px] md:h-auto md:flex-1 w-full flex justify-center items-end pointer-events-none">
        {children}
      </div>
    </section>
  );
}
