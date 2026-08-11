import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

const STROKE = 11;

// Geometric line-art wordmark spelling "VESSEL", same stroke grid/weight as
// the original LOAM mark (60-unit-tall cells, 44-48 wide, 36 gap) so sizing
// at every call site keeps working unchanged — just a wider viewBox for the
// extra two letters.
export function BrandLogo({ className, style }: BrandLogoProps) {
  return (
    <svg
      viewBox="0 0 516 88"
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
        {/* V */}
        <path d="M 18 18 L 40 78 L 62 18" />

        {/* E */}
        <path d="M 142 18 H 98 V 78 H 142 M 98 48 H 130" />

        {/* S — stepped/blocky, matches the rectilinear letterforms elsewhere in the mark */}
        <path d="M 222 18 H 178 V 48 H 222 V 78 H 178" />

        {/* S */}
        <path d="M 302 18 H 258 V 48 H 302 V 78 H 258" />

        {/* E */}
        <path d="M 382 18 H 338 V 78 H 382 M 338 48 H 370" />

        {/* L */}
        <path d="M 418 18 V 78 H 462" />
      </g>
    </svg>
  );
}
