"use client";

import { useEffect, useRef, useState } from "react";
import { SplineScene } from "@/components/ui/SplineScene";
import { ArrowRight } from "lucide-react";

export function SplineCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-[120px] md:py-[160px] overflow-hidden"
      style={{ background: "var(--bg-alt)" }}
    >
      {/* Background Spline scene */}
      <div className="absolute inset-0 opacity-30">
        <SplineScene
          sceneUrl="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
          className="w-full h-full"
          interactive={false}
        />
      </div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, var(--bg-alt) 0%, transparent 30%, transparent 70%, var(--bg-alt) 100%)`,
        }}
      />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[300px] h-[300px] rounded-full animate-float-slow"
          style={{
            background: "radial-gradient(circle, var(--glow-primary) 0%, transparent 70%)",
            top: "10%",
            left: "5%",
            filter: "blur(40px)",
            opacity: 0.5,
          }}
        />
        <div
          className="absolute w-[250px] h-[250px] rounded-full animate-float-slow"
          style={{
            background: "radial-gradient(circle, var(--glow-secondary) 0%, transparent 70%)",
            bottom: "15%",
            right: "8%",
            filter: "blur(40px)",
            opacity: 0.4,
            animationDelay: "-4s",
          }}
        />
        <div
          className="absolute w-[200px] h-[200px] rounded-full animate-float"
          style={{
            background: "radial-gradient(circle, var(--glow-accent) 0%, transparent 70%)",
            top: "50%",
            left: "60%",
            filter: "blur(35px)",
            opacity: 0.3,
            animationDelay: "-2s",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 max-w-[800px] mx-auto px-6 text-center"
        style={{
          transform: revealed ? "translateY(0)" : "translateY(40px)",
          opacity: revealed ? 1 : 0,
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Decorative ring */}
        <div className="relative inline-block mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full animate-morph"
              style={{
                background: "linear-gradient(135deg, #2997ff, #a78bfa, #00ffc8)",
              }}
            />
          </div>
          {/* Pulse ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid var(--glass-border)",
              animation: "pulse-ring 2s ease-in-out infinite",
            }}
          />
        </div>

        <h2 className="text-[clamp(32px,5vw,56px)] font-bold tracking-[-0.04em] leading-[1.05] mb-5">
          Precision Compounds.{" "}
          <span className="text-gradient">Ready to Ship.</span>
        </h2>

        <p
          className="text-[16px] md:text-[19px] leading-relaxed mb-10 max-w-[560px] mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          All peptides synthesized to ≥98% purity, HPLC-MS verified, and dispatched
          in cold-chain packaging within 24 hours of order confirmation.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/#store"
            className="group rounded-full px-8 py-3.5 text-[15px] font-medium no-underline transition-all duration-300 hover:scale-[1.03] flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #2997ff, #a78bfa)",
              color: "#fff",
              boxShadow: "0 4px 30px rgba(41,151,255,0.35)",
            }}
          >
            Shop Peptides
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#"
            className="rounded-full px-8 py-3.5 text-[15px] font-medium no-underline transition-all duration-300 hover:scale-[1.03] glass-card"
            style={{ color: "var(--text)" }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to Top
          </a>
        </div>

        {/* Product name badges */}
        <div
          className="mt-14 flex flex-wrap justify-center gap-3"
          style={{
            transform: revealed ? "translateY(0)" : "translateY(20px)",
            opacity: revealed ? 1 : 0,
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          {["Retatrutide", "BPC-157", "Tirzepatide", "TB-500", "GHK-Cu", "Ipamorelin", "DSIP", "NAD+"].map((name) => (
            <a
              key={name}
              href="/#store"
              className="px-4 py-1.5 rounded-full text-[11px] font-medium tracking-[0.1em] uppercase no-underline transition-all duration-200 hover:scale-[1.04]"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                color: "var(--text-muted)",
              }}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
