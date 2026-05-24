import { Shield, FlaskConical, FileCheck, Thermometer, Award, AlertTriangle } from "lucide-react";

const PROCESS_CARDS = [
  {
    icon: FlaskConical,
    title: "HPLC-MS Analysis",
    desc: "High-performance liquid chromatography with mass spectrometry confirms molecular identity and purity ≥98% on every batch.",
  },
  {
    icon: FileCheck,
    title: "Third-Party COA",
    desc: "Each production lot is independently tested by an ISO 17025-accredited analytical laboratory. Certificates of Analysis are published per batch.",
  },
  {
    icon: Thermometer,
    title: "Endotoxin & Sterility",
    desc: "LAL endotoxin assay and microbiological sterility testing ensure every vial meets USP <85> and USP <71> thresholds.",
  },
];

const BATCH_STEPS = [
  { step: "01", title: "GMP Synthesis", desc: "Compounds synthesized under cGMP-compliant conditions with full chain-of-custody documentation." },
  { step: "02", title: "In-House QC", desc: "Internal quality control screens for identity, appearance, solubility, and mass confirmation." },
  { step: "03", title: "Third-Party Lab", desc: "Samples shipped to an independent accredited lab for HPLC purity, endotoxin, sterility, and heavy metals analysis." },
  { step: "04", title: "COA Published", desc: "Results compiled into a Certificate of Analysis tied to the lot number. Released only upon ≥98% purity confirmation." },
];

const CERTS = [
  { icon: Award, label: "ISO 17025 Accredited Lab" },
  { icon: Shield, label: "cGMP Synthesis" },
  { icon: FileCheck, label: "Batch-Specific COA" },
  { icon: Thermometer, label: "Cold-Chain Verified" },
];

const LEGAL_SECTIONS = [
  {
    title: "Research Use Only",
    body: "All products sold by RCCA Inc. are intended exclusively for in vitro laboratory research purposes. They are not drugs, food additives, medical devices, cosmetics, or dietary supplements. They are not intended for human or veterinary use, for diagnostic purposes, or for any therapeutic application. Products must not be ingested, injected, inhaled, or applied to the skin under any circumstances.",
  },
  {
    title: "No FDA / Health Canada Evaluation",
    body: "These products have not been evaluated, approved, or authorized by the U.S. Food and Drug Administration (FDA), Health Canada, the European Medicines Agency (EMA), or any equivalent national or international regulatory body for safety, efficacy, or quality. No claims are made regarding their suitability for any use other than qualified scientific research.",
  },
  {
    title: "Purchaser Eligibility & Responsibility",
    body: "By placing an order, the purchaser represents and warrants that they are: (a) at least 18 years of age; (b) a qualified researcher, licensed professional, or authorized representative of a registered research institution, laboratory, or academic organization; (c) knowledgeable in the safe handling, storage, and disposal of research chemicals. Purchasers assume full responsibility for compliance with all applicable local, state, provincial, and federal laws and regulations.",
  },
  {
    title: "Misuse & Legal Liability",
    body: "Any misuse of these products, including but not limited to human or animal administration, resale for non-research purposes, or use in the manufacture of controlled substances, may constitute a violation of applicable federal, state, provincial, or municipal law and may result in criminal prosecution, civil liability, and/or regulatory action. RCCA Inc. expressly disclaims any liability arising from the misuse of its products.",
  },
  {
    title: "Certificates of Analysis",
    body: 'All Certificates of Analysis (COAs) provided by RCCA Inc. reflect the results of independent third-party analytical testing at the time of production. COAs are lot-specific and may not be extrapolated to other production batches. While RCCA makes every effort to ensure accuracy, COAs are provided "as-is" and without warranty of any kind.',
  },
  {
    title: "Shipping, Handling & Storage",
    body: "Lyophilized compounds are shipped in temperature-controlled packaging where required. Upon receipt, products must be stored according to the specifications indicated on the product label (typically −20°C for long-term storage). RCCA is not responsible for product degradation resulting from improper storage, handling, or shipping damage after delivery confirmation.",
  },
  {
    title: "Export & Import Controls",
    body: "Purchasers are solely responsible for ensuring compliance with all applicable import and export regulations in their jurisdiction. Certain compounds may be subject to restrictions under the Controlled Drugs and Substances Act (Canada), the Controlled Substances Act (USA), the Misuse of Drugs Act (UK), or equivalent legislation. RCCA reserves the right to refuse or cancel any order at its sole discretion.",
  },
  {
    title: "Limitation of Liability & Indemnification",
    body: "In no event shall RCCA Inc., its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to the purchase or use of any product. The purchaser agrees to indemnify and hold harmless RCCA Inc. from any claims, damages, or expenses arising from the purchaser’s use or misuse of products.",
  },
];

export function QualitySection() {
  return (
    <>
      {/* Quality Assurance Section */}
      <section id="quality" className="py-[80px] md:py-[120px] bg-secondary">
        <div className="max-w-[1024px] mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="apple-headline mb-4">Purity. Always Tested.</h2>
            <p className="apple-subheadline text-secondary max-w-[640px] mx-auto">
              Every monthly production batch undergoes rigorous analytical testing by an independent, accredited third-party laboratory before release.
            </p>
          </div>

          {/* Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {PROCESS_CARDS.map((item) => (
              <div key={item.title} className="bg-surface rounded-[20px] p-8 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-[12px] flex items-center justify-center bg-surface-hover">
                  <item.icon size={22} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="text-[20px] font-semibold tracking-tight text-primary">{item.title}</h3>
                <p className="text-[15px] text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Batch Testing Timeline */}
          <div className="bg-surface rounded-[20px] p-10 md:p-14">
            <div className="flex items-center gap-3 mb-8">
              <Shield size={24} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
              <h3 className="text-[24px] font-semibold tracking-tight text-primary">Monthly Batch Protocol</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {BATCH_STEPS.map((s) => (
                <div key={s.step} className="flex flex-col">
                  <div className="text-[36px] font-bold tracking-tighter mb-2" style={{ color: "var(--accent)" }}>{s.step}</div>
                  <div className="text-[17px] font-semibold text-primary mb-2">{s.title}</div>
                  <div className="text-[14px] text-secondary leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Strip */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 text-center">
            {CERTS.map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-2 w-[140px]">
                <c.icon size={28} strokeWidth={1.2} className="text-secondary" />
                <span className="text-[12px] text-secondary font-medium tracking-wide uppercase">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Disclosures Section */}
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
              RCCA Inc. makes no representations or warranties, expressed or implied, regarding the fitness of any product for a particular purpose. All products are sold subject to RCCA&apos;s Terms and Conditions of Sale, which are incorporated herein by reference. These terms are subject to change without notice. This page does not constitute legal advice. Purchasers should consult qualified legal counsel to ensure compliance with all applicable laws and regulations in their jurisdiction. By completing a purchase, you acknowledge that you have read, understood, and agreed to all terms, conditions, and disclosures stated herein and on the RCCA website.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
