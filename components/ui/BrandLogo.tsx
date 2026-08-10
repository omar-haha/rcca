import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

const STROKE = 11;

// Geometric line-art wordmark spelling "LOAM", same stroke grid/weight as the
// original mark so every call site's sizing keeps working unchanged.
export function BrandLogo({ className, style }: BrandLogoProps) {
  return (
    <svg
      viewBox="0 0 372 88"
      className={cn("fill-none shrink-0", className)}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMid meet"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* L */}
        <path d="M 18 18 V 78 H 62" />

        {/* O */}
        <path d="M 102 18 H 150 V 78 H 102 Z" />

        {/* A — peaked top + crossbar, open bottom */}
        <path d="M 186 78 V 18 H 234 V 78 M 186 50 H 234" />

        {/* M */}
        <path d="M 270 78 V 18 L 294 55 L 318 18 V 78" />
      </g>
    </svg>
  );
}
