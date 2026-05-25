"use client";

import { FlaskConical, FileCheck, Mail, Shield } from "lucide-react";
import { PageShell } from "@/components/PageShell";

const STEPS = [
  {
    icon: FlaskConical,
    title: "Batch Synthesis",
    body: "Each batch is synthesized under controlled conditions by our verified supplier network. Synthesis records and raw material certifications are maintained for every production run.",
  },
  {
    icon: Shield,
    title: "Third-Party Testing",
    body: "Compounds are sent to independent accredited laboratories for HPLC purity analysis, mass spectrometry identity confirmation, and residual solvent testing before any batch is released.",
  },
  {
    icon: FileCheck,
    title: "COA Issued",
    body: "Upon passing all quality checks, a Certificate of Analysis is generated including: compound identity, CAS number, batch number, purity percentage, test methodology, and testing date.",
  },
  {
    icon: Mail,
    title: "Available on Request",
    body: "COAs are available for every product we sell. Email support@researchchemicals.ca with your order number and the compound you need documentation for — we'll respond within 1 business day.",
  },
];

const METHODS = [
  { method: "HPLC", full: "High-Performance Liquid Chromatography", use: "Purity quantification" },
  { method: "LC-MS", full: "Liquid Chromatography–Mass Spectrometry", use: "Identity confirmation & molecular weight" },
  { method: "NMR", full: "Nuclear Magnetic Resonance", use: "Structural confirmation (select compounds)" },
  { method: "Karl Fischer", full: "Karl Fischer Titration", use: "Moisture / water content" },
];

export default function CoaPage() {
  return (
    <PageShell>
      <div className="max-w-[860px] mx-auto px-4 md:px-6 py-[80px] md:py-[100px]">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[12px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>
            Quality Assurance
          </p>
          <h1 className="text-[34px] md:text-[44px] font-semibold tracking-tight text-primary mb-4">
            Certificate of Analysis
          </h1>
          <p className="text-[16px] text-secondary leading-relaxed max-w-[560px]">
            Every compound we sell is independently tested and documented. Our COAs provide transparent, verifiable evidence of purity and identity for your research records.
          </p>
        </div>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className="rounded-[20px] p-7"
              style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--bg-alt)" }}
                >
                  <Icon size={18} strokeWidth={1.5} style={{ color: "var(--text-muted)" }} />
                </div>
                <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                  Step {i + 1}
                </span>
              </div>
              <h2 className="text-[16px] font-semibold text-primary mb-2">{title}</h2>
              <p className="text-[13px] text-secondary leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Testing methods table */}
        <div className="mb-14">
          <h2 className="text-[20px] font-semibold text-primary mb-6">Testing Methodologies</h2>
          <div
            className="rounded-[20px] overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            {METHODS.map((m, i) => (
              <div
                key={m.method}
                className="grid grid-cols-[80px_1fr_1fr] px-6 py-4 text-[13px]"
                style={{
                  borderTop: i > 0 ? "1px solid var(--border)" : "none",
                  backgroundColor: i % 2 === 0 ? "var(--surface)" : "transparent",
                }}
              >
                <span className="font-semibold text-primary">{m.method}</span>
                <span className="text-secondary">{m.full}</span>
                <span className="text-tertiary">{m.use}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-[20px] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div>
            <h3 className="text-[18px] font-semibold text-primary mb-1">Request a COA</h3>
            <p className="text-[13px] text-secondary leading-relaxed">
              Include your order number and the compound name. We respond within 1 business day.
            </p>
          </div>
          <a
            href="mailto:support@researchchemicals.ca?subject=COA Request"
            className="shrink-0 rounded-full px-6 py-3 text-[14px] font-medium text-white no-underline btn-physical btn-physical-accent"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Email Support
          </a>
        </div>
      </div>
    </PageShell>
  );
}
