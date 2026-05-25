"use client";

import { useEffect, useRef, useState } from "react";
import { SplineScene } from "@/components/ui/SplineScene";
import { Dna, FlaskConical, Microscope, TestTubes, Sparkles, Atom } from "lucide-react";

const FEATURES = [
  {
    icon: Dna,
    title: "Retatrutide",
    badge: "≥99% Purity · 10mg",
    desc: "Triple GLP-1/GIP/Glucagon receptor agonist — the leading multi-receptor metabolic research candidate.",
    splineUrl: "https://prod.spline.design/Y1WTwkb-cHMGtpfi/scene.splinecode",
    accent: "#2997ff",
    colSpan: "lg:col-span-2",
    rowSpan: "",
    price: "$149.99",
  },
  {
    icon: FlaskConical,
    title: "BPC-157",
    badge: "≥98% Purity · 5mg",
    desc: "Pentadecapeptide with regenerative and cytoprotective properties. One of the most-studied healing peptides.",
    splineUrl: "https://prod.spline.design/nFnBkMOwegXxSQgr/scene.splinecode",
    accent: "#a78bfa",
    colSpan: "",
    rowSpan: "lg:row-span-2",
    price: "$74.99",
  },
  {
    icon: Microscope,
    title: "Tirzepatide",
    badge: "≥99% Purity · 10mg",
    desc: "Dual GLP-1/GIP agonist derived from the GIP peptide backbone. Cutting-edge metabolic signaling research.",
    splineUrl: "",
    accent: "#00ffc8",
    colSpan: "",
    rowSpan: "",
    price: "$129.99",
  },
  {
    icon: TestTubes,
    title: "TB-500",
    badge: "≥98% Purity · 5mg",
    desc: "Synthetic Thymosin Beta-4 fragment studied for tissue repair, recovery, and angiogenesis pathways.",
    splineUrl: "",
    accent: "#ff6b6b",
    colSpan: "",
    rowSpan: "",
    price: "$89.99",
  },
  {
    icon: Sparkles,
    title: "GHK-Cu",
    badge: "≥99% Purity · 50mg",
    desc: "Copper-binding tripeptide with antioxidant activity and extracellular matrix remodeling properties.",
    splineUrl: "",
    accent: "#ffd700",
    colSpan: "lg:col-span-2",
    rowSpan: "",
    price: "$59.99",
  },
  {
    icon: Atom,
    title: "Ipamorelin",
    badge: "≥99% Purity · 5mg",
    desc: "Selective pentapeptide growth hormone secretagogue with a minimal off-target receptor activity profile.",
    splineUrl: "",
    accent: "#2997ff",
    colSpan: "",
    rowSpan: "",
    price: "$54.99",
  },
];

/* ---------- Feature Card ---------- */
function FeatureCard({
  feature,
  index,
  revealed,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
  revealed: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = feature.icon;
  const badge = "badge" in feature ? (feature as { badge: string }).badge : null;
  const price = "price" in feature ? (feature as { price: string }).price : null;

  return (
    <div
      className={`relative group glass-card overflow-hidden transition-all duration-500 cursor-default ${feature.colSpan} ${feature.rowSpan}`}
      style={{
        transform: revealed ? "translateY(0)" : "translateY(50px)",
        opacity: revealed ? 1 : 0,
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
        minHeight: feature.rowSpan ? "380px" : "220px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow border effect */}
      <div
        className="absolute inset-0 rounded-[24px] transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${feature.accent}33, transparent 50%, ${feature.accent}22)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${feature.accent}30 0%, transparent 70%)`,
          filter: "blur(30px)",
          transform: hovered ? "scale(1.5)" : "scale(1)",
          opacity: hovered ? 1 : 0.3,
        }}
      />

      {/* Spline scene or decorative background */}
      {feature.splineUrl ? (
        <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500">
          <SplineScene
            sceneUrl={feature.splineUrl}
            className="w-full h-full"
            interactive={false}
          />
        </div>
      ) : (
        /* CSS fallback: animated orb */
        <div className="absolute top-1/2 right-4 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
          <div
            className="w-full h-full rounded-full animate-morph"
            style={{
              background: `linear-gradient(135deg, ${feature.accent}, transparent)`,
              filter: "blur(4px)",
              animationDelay: `${-index * 1.5}s`,
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-7 md:p-8 flex flex-col h-full">
        <div
          className="w-10 h-10 rounded-[12px] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${feature.accent}15`,
            border: `1px solid ${feature.accent}30`,
          }}
        >
          <Icon size={20} strokeWidth={1.5} style={{ color: feature.accent }} />
        </div>

        <div>
          <h3
            className="text-[18px] md:text-[20px] font-semibold tracking-tight mb-1"
            style={{ color: "var(--text)" }}
          >
            {feature.title}
          </h3>
          {badge && (
            <div className="text-[11px] font-medium tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>
              {badge}
            </div>
          )}
        </div>

        <p
          className="text-[14px] leading-relaxed flex-1"
          style={{ color: "var(--text-muted)" }}
        >
          {feature.desc}
        </p>

        {/* Price + Shop link */}
        <div className="mt-4 flex items-center justify-between">
          {price && (
            <span className="text-[15px] font-semibold" style={{ color: "var(--text)" }}>
              {price}
            </span>
          )}
          <a
            href="/#store"
            className="flex items-center gap-1.5 text-[13px] font-medium no-underline transition-all duration-300"
            style={{
              color: feature.accent,
              opacity: hovered ? 1 : 0.6,
              transform: hovered ? "translateX(0)" : "translateX(-4px)",
            }}
          >
            <span>Shop</span>
            <span className="text-[16px]">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ========== FEATURE GRID ========== */
export function SplineFeatureGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-[100px] md:py-[140px] overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] rounded-full animate-glow-pulse"
          style={{
            background: "radial-gradient(circle, var(--glow-primary) 0%, transparent 70%)",
            bottom: "-15%",
            left: "-5%",
            animationDelay: "-3s",
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <div
          className="text-center mb-16"
          style={{
            transform: revealed ? "translateY(0)" : "translateY(30px)",
            opacity: revealed ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
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
            Molecular Catalog
          </div>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
            Fascinating{" "}
            <span className="text-gradient">Structures</span>
          </h2>
          <p
            className="text-[16px] md:text-[18px] leading-relaxed max-w-[560px] mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            Explore our curated selection of research-grade molecular compounds — synthesized to ≥98% purity, HPLC-MS verified, and ready to advance your lab's capabilities.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} revealed={revealed} />
          ))}
        </div>
      </div>
    </section>
  );
}
