import { cn } from "@/lib/utils";

interface RccaLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

const STROKE = 11;

export function RccaLogo({ className, style }: RccaLogoProps) {
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
        {/* R — right stem + two left horizontals (reference style, no left stem) */}
        <path d="M 18 18 H 66 M 18 46 H 58 M 66 18 V 78" />

        {/* C — open right */}
        <path d="M 102 18 V 78 M 102 18 H 150 M 102 78 H 150" />

        {/* C */}
        <path d="M 186 18 V 78 M 186 18 H 234 M 186 78 H 234" />

        {/* A — peaked top + crossbar, open bottom */}
        <path d="M 270 78 V 18 M 270 18 H 318 M 318 78 V 18 M 270 50 H 318" />
      </g>
    </svg>
  );
}
