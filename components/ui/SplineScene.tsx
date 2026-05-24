"use client";

import React, {
  Suspense,
  lazy,
  useState,
  useCallback,
  useEffect,
  Component,
} from "react";
import { cn } from "@/lib/utils";

const SplineLazy = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  sceneUrl: string;
  className?: string;
  fallbackClassName?: string;
  interactive?: boolean;
  onLoad?: () => void;
}

/* ---------- Shimmer skeleton shown while Spline loads ---------- */
function SplineLoader({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[24px]", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--glass-bg)] to-transparent" />
      <div className="absolute inset-0 animate-shimmer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-32 h-32">
          <div
            className="absolute inset-0 rounded-full animate-morph"
            style={{
              background:
                "linear-gradient(135deg, var(--glow-primary), var(--glow-secondary))",
              filter: "blur(20px)",
            }}
          />
          <div
            className="absolute inset-4 rounded-full animate-morph"
            style={{
              background:
                "linear-gradient(225deg, var(--glow-accent), var(--glow-primary))",
              filter: "blur(12px)",
              animationDelay: "-2s",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- CSS-only 3D fallback when Spline fails ---------- */
function SplineFallback({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative"
          style={{ width: "min(70%, 320px)", aspectRatio: "1/1" }}
        >
          <div
            className="absolute inset-0 rounded-full animate-morph"
            style={{
              background: "linear-gradient(135deg, #2997ff, #a78bfa, #00ffc8)",
              filter: "blur(1px)",
              opacity: 0.9,
            }}
          />
          <div
            className="absolute inset-[15%] rounded-full animate-morph"
            style={{
              background: "linear-gradient(225deg, #64c8ff, #c084fc)",
              filter: "blur(2px)",
              animationDelay: "-3s",
              opacity: 0.7,
            }}
          />
          <div
            className="absolute inset-[30%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
              animation: "float 4s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
            style={{
              background: "#2997ff",
              boxShadow: "0 0 12px 4px rgba(41,151,255,0.5)",
              animation: "orbit 6s linear infinite",
              ["--orbit-radius" as string]: "calc(min(35%, 140px))",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
            style={{
              background: "#a78bfa",
              boxShadow: "0 0 10px 3px rgba(167,139,250,0.5)",
              animation: "orbit 9s linear infinite reverse",
              ["--orbit-radius" as string]: "calc(min(45%, 180px))",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
            style={{
              background: "#00ffc8",
              boxShadow: "0 0 8px 2px rgba(0,255,200,0.4)",
              animation: "orbit 12s linear infinite",
              ["--orbit-radius" as string]: "calc(min(55%, 220px))",
            }}
          />
        </div>
      </div>
      <div
        className="absolute inset-0 animate-glow-pulse pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--glow-primary) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

/* ---------- Error Boundary (safety net) ---------- */
interface EBProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}
class SplineErrorBoundary extends Component<EBProps, { hasError: boolean }> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn("[SplineScene] Error boundary caught:", error.message);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/* ---------- Inner component that renders <Spline> ---------- */
function SplineInner({
  sceneUrl,
  interactive,
  onReady,
  onFail,
}: {
  sceneUrl: string;
  interactive: boolean;
  onReady: () => void;
  onFail: () => void;
}) {
  return (
    <Suspense fallback={<SplineLoader className="w-full h-full" />}>
      <SplineLazy
        scene={sceneUrl}
        onLoad={onReady}
        onError={onFail}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: interactive ? "auto" : "none",
        }}
      />
    </Suspense>
  );
}

/* ====================================================================
   Main SplineScene Component
   - Pre-validates the scene URL with a HEAD fetch before mounting
     the Spline runtime, so invalid URLs never reach the parser.
   ==================================================================== */
export function SplineScene({
  sceneUrl,
  className,
  fallbackClassName,
  interactive = true,
  onLoad,
}: SplineSceneProps) {
  // "checking" | "valid" | "invalid"
  const [urlStatus, setUrlStatus] = useState<
    "checking" | "valid" | "invalid"
  >("checking");
  const [loaded, setLoaded] = useState(false);

  /* Pre-flight: verify the scene URL is reachable before we hand it to
     the Spline runtime. A failed fetch → immediate CSS fallback, no
     runtime error. */
  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(sceneUrl, {
          method: "HEAD",
          mode: "cors",
          signal: controller.signal,
        });
        if (!cancelled) {
          setUrlStatus(res.ok ? "valid" : "invalid");
        }
      } catch {
        if (!cancelled) setUrlStatus("invalid");
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [sceneUrl]);

  const handleReady = useCallback(() => {
    setLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleFail = useCallback(() => {
    setUrlStatus("invalid");
  }, []);

  /* Invalid URL → CSS fallback immediately */
  if (urlStatus === "invalid") {
    return <SplineFallback className={cn(className, fallbackClassName)} />;
  }

  /* Still checking → show loader */
  if (urlStatus === "checking") {
    return <SplineLoader className={cn(className, "w-full h-full")} />;
  }

  /* URL looks good → render Spline inside an error boundary (final safety net) */
  const fallbackEl = (
    <SplineFallback className={cn(className, fallbackClassName)} />
  );

  return (
    <SplineErrorBoundary fallback={fallbackEl}>
      <div className={cn("relative", className)}>
        {!loaded && (
          <div className="absolute inset-0 z-10">
            <SplineLoader className="w-full h-full" />
          </div>
        )}
        <SplineInner
          sceneUrl={sceneUrl}
          interactive={interactive}
          onReady={handleReady}
          onFail={handleFail}
        />
      </div>
    </SplineErrorBoundary>
  );
}

export { SplineFallback, SplineLoader };
