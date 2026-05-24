"use client";

import { useEffect, useRef, useState } from "react";
import { SplineScene } from "@/components/ui/SplineScene";
import { ChevronDown } from "lucide-react";

/* ---------- Floating ambient particles ---------- */
function AmbientParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: `rgba(${Math.random() > 0.5 ? "41,151,255" : "167,139,250"}, ${0.2 + Math.random() * 0.4})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-slow ${6 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: `${-Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Staggered text reveal ---------- */
function RevealText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            animation: `text-reveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            animationDelay: `${delay + i * 0.08}s`,
            opacity: 0,
          }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}

/* ---------- Scroll indicator ---------- */
function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <span
        className="text-[12px] tracking-[0.2em] uppercase font-medium"
        style={{ color: "var(--text-muted)" }}
      >
        Scroll to explore
      </span>
      <ChevronDown
        size={18}
        strokeWidth={1.5}
        className="animate-float"
        style={{ color: "var(--text-muted)", animationDuration: "2s" }}
      />
    </div>
  );
}

/* ========== SPLINE HERO ========== */
export function SplineHero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full animate-glow-pulse"
          style={{
            background: "radial-gradient(circle, var(--glow-primary) 0%, transparent 70%)",
            top: "10%",
            left: "15%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full animate-glow-pulse"
          style={{
            background: "radial-gradient(circle, var(--glow-secondary) 0%, transparent 70%)",
            bottom: "10%",
            right: "10%",
            animationDelay: "-2s",
          }}
        />
      </div>

      <AmbientParticles />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full max-w-[1200px] mx-auto px-6 gap-4 lg:gap-12">
        {/* Left: Text content */}
        <div className="flex-1 text-center lg:text-left max-w-[600px]">
          <div
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-[12px] font-medium tracking-[0.15em] uppercase"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              color: "var(--accent)",
              animation: "scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              opacity: 0,
            }}
          >
            Research Peptide Platform
          </div>

          <h1
            className="text-[clamp(36px,7vw,80px)] font-bold tracking-[-0.04em] leading-[1.02] mb-6"
            style={{ perspective: "600px" }}
          >
            <RevealText text="Precision" className="text-gradient block" delay={0.2} />
            <RevealText text="Peptides." className="block" delay={0.5} />
            <RevealText text="In 3D." className="block" delay={0.8} />
          </h1>

          <p
            className="text-[clamp(16px,2vw,20px)] leading-relaxed mb-8 max-w-[480px] mx-auto lg:mx-0"
            style={{
              color: "var(--text-muted)",
              animation: "text-reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards",
              opacity: 0,
            }}
          >
            Explore Retatrutide, BPC-157, Tirzepatide and the full RCCA catalog through
            an immersive 3D interface. Research-grade compounds, visualized.
          </p>

          <div
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
            style={{
              animation: "text-reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.5s forwards",
              opacity: 0,
            }}
          >
            <a
              href="/#store"
              className="rounded-full px-7 py-3 text-[15px] font-medium no-underline transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #2997ff, #a78bfa)",
                color: "#fff",
                boxShadow: "0 4px 24px rgba(41,151,255,0.3)",
              }}
            >
              Shop Peptides
            </a>
            <a
              href="#showcase"
              className="rounded-full px-7 py-3 text-[15px] font-medium no-underline transition-all duration-300 hover:scale-[1.03] glass-card"
              style={{ color: "var(--text)" }}
            >
              Explore Showcase
            </a>
          </div>
        </div>

        {/* Right: 3D Spline Scene */}
        <div
          className="flex-1 w-full max-w-[560px] aspect-square relative"
          style={{
            animation: "scale-in 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards",
            opacity: 0,
          }}
        >
          <SplineScene
            sceneUrl="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
