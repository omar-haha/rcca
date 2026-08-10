import { ShieldCheck, Microscope, Truck } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";



export function QualitySection() {
  const { t } = useLanguage();
  const QUALITY_FEATURES = [
    { icon: ShieldCheck, label: t("quality_suppliers") },
    { icon: Microscope,  label: t("quality_grade")     },
    { icon: Truck,       label: t("quality_delivery")  },
  ];
  return (
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
          {t("quality_headline")}
        </h2>
        <p className="text-[15px] md:text-[16px] text-secondary leading-relaxed mb-10">
          {t("quality_sub")}
        </p>

        <div className="flex justify-center gap-10 md:gap-16 mb-10">
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

        <div className="flex items-center justify-center gap-6 text-[12px]" style={{ color: "var(--text-muted)" }}>
          <a href="/coa" className="hover:text-primary transition-colors no-underline">{t("quality_coa_link")}</a>
          <span style={{ color: "var(--border)" }}>|</span>
          <a href="/legal" className="hover:text-primary transition-colors no-underline">{t("quality_legal_link")}</a>
        </div>
      </div>
    </section>
  );
}
