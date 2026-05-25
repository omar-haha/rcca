"use client";

import { useEffect, useRef, useState } from "react";
import { SplineScene } from "@/components/ui/SplineScene";
import { FlaskConical, Shield, Atom, Zap } from "lucide-react";

const STATS = [
  { value: "99.4", suffix: "%", label: "Average Purity" },
  { value: "50", suffix: "+", label: "Compounds" },
  { value: "12K", suffix: "+", label: "Vials Shipped" },
  { value: "4.9", suffix: "★", label: "Researcher Rating" },
];

const HIGHLIGHTS = [
  {
    icon: FlaskConical,
    title: "HPLC-MS Verified",
    desc: "Every batch independently analyzed with high-performance liquid chromatography.",
  },
  {
    icon: Shield,
    title: "cGMP Compliant",
    desc: "Synthesized under current Good Manufacturing Practice conditions.",
  },
  {
    icon: Atom,
    title: "Research Grade",
    desc: "99%+ purity guaranteed on every compound we offer.",
  },
  {
    icon: Zap,
    title: "Fast Shipping",
    desc: "Cold-chain verified packaging with next-day dispatch.",
  },
];

/* ---------- Animated counter ---------- */
function AnimatedStat({ value, suffix, label, delay }: { value: string; suffix: string; label: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="text-center"
      style={{
        animation: visible ? `counter-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards` : "none",
        opacity: visible ? undefined : 0,
      }}
    >
      <div className="text-[clamp(32px,5vw,48px)] font-bold tracking-tight text-gradient-static">
        {value}<span className="text-[0.7em]">{suffix}</span>
      </div>
      <div className="text-[13px] font-medium tracking-wide uppercase mt-1" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
    </div>
  );
}

/* ========== 3D SHOWCASE SECTION ========== */
export function Spline3DShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative py-[100px] md:py-[140px] overflow-hidden"
      style={{ background: "var(--bg-alt)" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[400px] h-[400px] rounded-full animate-glow-pulse"
          style={{
            background: "radial-gradient(circle, var(--glow-secondary) 0%, transparent 70%)",
            top: "20%",
            right: "-10%",
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Split layout: 3D + Info */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24">
          {/* 3D Scene */}
          <div
            className="flex-1 w-full max-w-[520px] aspect-square relative"
            style={{
              transform: revealed ? "translateX(0)" : "translateX(-60px)",
              opacity: revealed ? 1 : 0,
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <SplineScene
              sceneUrl="https://prod.spline.design/pvM5KGmNNmBwpEdG/scene.splinecode"
              className="w-full h-full"
            />
            {/* Glow ring under scene */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-[40px] rounded-full"
              style={{
                background: "radial-gradient(ellipse, var(--glow-primary) 0%, transparent 70%)",
                filter: "blur(12px)",
                animation: "pulse-ring 3s ease-in-out infinite",
              }}
            />
          </div>

          {/* Info panel */}
          <div
            className="flex-1 max-w-[520px]"
            style={{
              transform: revealed ? "translateX(0)" : "translateX(60px)",
              opacity: revealed ? 1 : 0,
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <div
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-[12px] font-medium tracking-[0.15em] uppercase"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                color: "var(--accent)",
              }}
            >
              Structural Analysis
            </div>

            <h2
              className="text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.03em] leading-[1.1] mb-5"
            >
              Molecular Precision.{" "}
              <span className="text-gradient-static">Brought to Life.</span>
            </h2>

            <p
              className="text-[16px] md:text-[18px] leading-relaxed mb-8"
              style={{ color: "var(--text-muted)" }}
            >
              Dive into the intricate world of synthetic biology. Analyze the folding patterns and binding domains of our high-purity peptides with unprecedented 3D clarity.
            </p>

            {/* Featured compound tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Retatrutide", "BPC-157", "Tirzepatide", "TB-500", "GHK-Cu", "Ipamorelin", "DSIP", "NAD+"].map((name) => (
                <a
                  key={name}
                  href="/#store"
                  className="px-3 py-1.5 rounded-full text-[12px] font-medium glass-card no-underline transition-all duration-200 hover:scale-[1.04]"
                  style={{ color: "var(--text)" }}
                >
                  {name}
                </a>
              ))}
            </div>

            {/* Highlight cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HIGHLIGHTS.map((h, i) => (
                <div
                  key={h.title}
                  className="glass-card p-5 transition-all duration-300 hover:scale-[1.02] cursor-default group"
                  style={{
                    transitionDelay: `${i * 0.05}s`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-3 transition-colors duration-300"
                    style={{ background: "var(--glass-bg)" }}
                  >
                    <h.icon
                      size={18}
                      strokeWidth={1.5}
                      style={{ color: "var(--accent)" }}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="text-[14px] font-semibold tracking-tight mb-1" style={{ color: "var(--text)" }}>
                    {h.title}
                  </div>
                  <div className="text-[13px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {h.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="glass-card p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <AnimatedStat key={s.label} {...s} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
