import { AlertTriangle, ShieldCheck, Microscope, Truck } from "lucide-react";

const QUALITY_FEATURES = [
  { icon: ShieldCheck, label: "Verified Suppliers" },
  { icon: Microscope,  label: "Research Grade"     },
  { icon: Truck,       label: "Fast Delivery"      },
];

const LEGAL_SECTIONS = [
  {
    title: "Research Use Only",
    body: "All products are intended exclusively for in vitro laboratory research. Not for human or veterinary use, diagnostic purposes, or any therapeutic application. Must not be ingested, injected, inhaled, or applied to skin.",
  },
  {
    title: "Not Regulatory Approved",
    body: "These products have not been evaluated or authorized by the FDA, Health Canada, EMA, or any equivalent regulatory body for safety, efficacy, or quality.",
  },
  {
    title: "Purchaser Eligibility",
    body: "By ordering, purchasers confirm they are of legal age, qualified to handle research chemicals, and solely responsible for compliance with all applicable local, provincial, and federal laws.",
  },
  {
    title: "Export & Import Controls",
    body: "Purchasers are responsible for compliance with all import and export regulations in their jurisdiction. RCCA reserves the right to refuse or cancel any order at its sole discretion.",
  },
  {
    title: "Limitation of Liability",
    body: "RCCA Inc. is not liable for any damages arising from the purchase or use of any product. Purchasers agree to indemnify RCCA Inc. from any claims resulting from misuse of products.",
  },
];

export function QualitySection() {
  return (
    <>
      {/* Quality note */}
      <section id="quality" className="relative py-[60px] md:py-[80px] bg-secondary overflow-hidden">

        {/* Animated gradient blobs */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div style={{
            position: "absolute", top: "10%", left: "15%",
            width: 420, height: 420, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,113,227,0.10) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "blob-drift-1 14s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", top: "30%", right: "10%",
            width: 340, height: 340, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,200,180,0.07) 0%, transparent 70%)",
            filter: "blur(48px)",
            animation: "blob-drift-2 18s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", bottom: "5%", left: "40%",
            width: 280, height: 280, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(120,80,255,0.07) 0%, transparent 70%)",
            filter: "blur(36px)",
            animation: "blob-drift-3 22s ease-in-out infinite",
          }} />
        </div>

        <div className="relative max-w-[620px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-[28px] md:text-[34px] font-semibold tracking-tight text-primary mb-4">
            High Purity. Every Order.
          </h2>
          <p className="text-[15px] md:text-[16px] text-secondary leading-relaxed mb-10">
            All compounds are high purity and suitable for research applications.
          </p>

          <div className="flex justify-center gap-10 md:gap-16">
            {QUALITY_FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                  style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <Icon size={20} strokeWidth={1.5} style={{ color: "var(--text-muted)" }} />
                </div>
                <span className="text-[12px] font-medium" style={{ color: "var(--text-muted)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Disclosures */}
      <section id="legal" className="py-[70px] md:py-[100px] bg-primary">
        <div className="max-w-[1024px] mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 mb-10">
            <AlertTriangle size={24} strokeWidth={1.5} className="text-secondary" />
            <h2 className="text-[28px] font-semibold tracking-tight text-primary">Legal Disclosures</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-[14px] text-secondary leading-relaxed">
            {LEGAL_SECTIONS.map((s) => (
              <div key={s.title}>
                <h3 className="text-[15px] font-semibold text-primary mb-2">{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>

          {/* Universal Disclaimer */}
          <div className="mt-12 p-8 rounded-[16px] border border-primary bg-secondary text-[13px] text-secondary leading-relaxed">
            <p className="font-semibold text-primary mb-2 text-[14px]">UNIVERSAL DISCLAIMER</p>
            <p>
              RCCA Inc. makes no representations or warranties, expressed or implied, regarding the fitness of any product for a particular purpose. Purity and quality data are sourced from our suppliers and have not been independently verified by RCCA. All products are sold subject to RCCA&apos;s Terms and Conditions of Sale, which are incorporated herein by reference. These terms are subject to change without notice. This page does not constitute legal advice. Purchasers should consult qualified legal counsel to ensure compliance with all applicable laws and regulations in their jurisdiction. By completing a purchase, you acknowledge that you have read, understood, and agreed to all terms, conditions, and disclosures stated herein and on the RCCA website.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
