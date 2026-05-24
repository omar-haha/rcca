"use client";

import { useEffect, useRef, useState } from "react";
import { FlaskConical, Microscope, ClipboardCheck, Snowflake } from "lucide-react";
import { cn } from "@/lib/utils";

const PURITY_STAGES = [
  {
    icon: FlaskConical, label: "Stage 01 — Synthesis", title: "GMP-Compliant Synthesis",
    desc: "All peptides are synthesized using solid-phase Fmoc chemistry under ISO-controlled conditions, minimizing impurities at source.",
    barLabel: "Synthesis purity", barRange: "97–99%", barValue: 98, barColor: "bg-green-500",
  },
  {
    icon: Microscope, label: "Stage 02 — Analysis", title: "HPLC-MS Verification",
    desc: "High-performance liquid chromatography coupled with mass spectrometry confirms identity and purity to ≥98% threshold on every batch.",
    barLabel: "HPLC purity threshold", barRange: "≥98%", barValue: 99, barColor: "bg-green-500",
  },
  {
    icon: ClipboardCheck, label: "Stage 03 — Certification", title: "Independent COA Issuance",
    desc: "Certificates of Analysis are issued by accredited third-party laboratories — not internal teams — ensuring objectivity and legal compliance.",
    barLabel: "Third-party verified batches", barRange: "100%", barValue: 100, barColor: "bg-blue-500",
  },
  {
    icon: Snowflake, label: "Stage 04 — Storage & Dispatch", title: "Cold-Chain Integrity",
    desc: "All peptide vials are lyophilized and stored at −20°C. Shipments are dispatched with validated cold-chain packaging rated for 72-hour transit.",
    barLabel: "Cold-chain compliance", barRange: "100%", barValue: 100, barColor: "bg-sky-400",
  },
];

export function PuritySection() {
  const [barsAnimated, setBarsAnimated] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barsAnimated) return;
    const grid = gridRef.current;
    if (!grid) return;
    
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarsAnimated(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(grid);
    return () => obs.disconnect();
  }, [barsAnimated]);

  return (
    <section id="purity" className="relative py-[120px] bg-primary overflow-hidden">
      <div className="relative z-10 max-w-[1080px] mx-auto px-6">
        <p className="text-[12px] font-medium tracking-[0.18em] uppercase text-blue-500 mb-5">
          Verification & Purity
        </p>
        <h2 className="text-[clamp(36px,5vw,52px)] font-light tracking-[-0.03em] leading-[1.1] mb-4 text-primary">
          Uncompromising<br />quality assurance.
        </h2>
        <p className="text-[17px] text-secondary max-w-[540px] leading-[1.58] font-light mb-16">
          Every batch is independently verified before it reaches your lab. Our multi-stage
          quality protocol ensures research-grade precision every time.
        </p>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-[2px] border border-secondary rounded-[20px] overflow-hidden bg-secondary"
        >
          {PURITY_STAGES.map((s) => (
            <div className="bg-primary p-12 px-10 transition-colors hover:bg-secondary" key={s.label}>
              <div className="w-10 h-10 rounded-[10px] border border-primary flex items-center justify-center mb-6 text-secondary">
                <s.icon size={20} strokeWidth={1.5} />
              </div>
              <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-tertiary mb-5">
                {s.label}
              </div>
              <h3 className="text-2xl font-normal tracking-[-0.02em] mb-3 text-primary">
                {s.title}
              </h3>
              <p className="text-[15px] text-secondary leading-[1.6]">
                {s.desc}
              </p>
              
              <div className="mt-7">
                <div className="flex justify-between text-[12px] text-tertiary mb-2">
                  <span>{s.barLabel}</span>
                  <span>{s.barRange}</span>
                </div>
                <div className="h-[3px] bg-secondary border border-primary rounded-sm overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-sm transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      s.barColor
                    )}
                    style={{ width: barsAnimated ? `${s.barValue}%` : "0%" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
