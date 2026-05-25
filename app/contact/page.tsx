"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Clock, MapPin } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

const INPUT =
  "w-full bg-secondary border border-transparent rounded-[12px] p-4 text-[15px] text-primary placeholder:text-secondary outline-none transition-all focus:border-[color:var(--accent)] focus:bg-primary";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const INFO = [
    { icon: Mail,   label: t("footer_email"),             value: "support@researchchemicals.ca", href: "mailto:support@researchchemicals.ca" },
    { icon: Clock,  label: t("page_contact_response"),    value: t("page_contact_response_val"), href: null },
    { icon: MapPin, label: t("page_contact_location"),    value: t("page_contact_location_val"), href: null },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageShell>
      <div className="max-w-[960px] mx-auto px-4 md:px-6 py-[80px] md:py-[100px]">
        <div className="mb-12">
          <p className="text-[12px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>
            {t("page_contact_eyebrow")}
          </p>
          <h1 className="text-[34px] md:text-[44px] font-semibold tracking-tight text-primary mb-4">
            {t("page_contact_title")}
          </h1>
          <p className="text-[16px] text-secondary leading-relaxed max-w-[480px]">
            {t("page_contact_sub")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="rounded-[24px] p-7 md:p-9" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(34,197,94,0.12)", color: "#16a34a" }}>
                  <CheckCircle2 size={28} strokeWidth={2} />
                </div>
                <h2 className="text-[22px] font-semibold text-primary">{t("page_contact_sent")}</h2>
                <p className="text-[14px] text-secondary">{t("page_contact_sent_sub")}</p>
                <button onClick={() => setSubmitted(false)} className="mt-2 text-[13px] rounded-full px-5 py-2.5 border cursor-pointer transition-colors" style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "transparent" }}>
                  {t("page_contact_another")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder={t("page_contact_first")} required className={INPUT} />
                  <input type="text" placeholder={t("page_contact_last")} required className={INPUT} />
                </div>
                <input type="email" placeholder={t("page_contact_email")} required className={INPUT} />
                <input type="tel" placeholder={t("page_contact_phone")} className={INPUT} />
                <select className={cn(INPUT, "appearance-none cursor-pointer")}>
                  <option value="">{t("page_contact_subject")}</option>
                  <option>{t("page_contact_subj_order")}</option>
                  <option>{t("page_contact_subj_product")}</option>
                  <option>{t("page_contact_subj_bulk")}</option>
                  <option>{t("page_contact_subj_ship")}</option>
                  <option>{t("page_contact_subj_coa")}</option>
                  <option>{t("page_contact_subj_other")}</option>
                </select>
                <textarea placeholder={t("page_contact_msg")} rows={5} required className={INPUT} style={{ resize: "none" }} />
                <button type="submit" className="w-full py-[14px] rounded-full text-[15px] font-medium text-white border-none cursor-pointer btn-physical btn-physical-accent" style={{ backgroundColor: "var(--accent)" }}>
                  <span style={{ pointerEvents: "none" }}>{t("page_contact_send")}</span>
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {INFO.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="rounded-[16px] p-5 flex items-start gap-4" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--bg-alt)" }}>
                  <Icon size={16} strokeWidth={1.5} style={{ color: "var(--text-muted)" }} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--text-muted)" }}>{label}</p>
                  {href ? (
                    <a href={href} className="text-[14px] text-primary no-underline hover:underline">{value}</a>
                  ) : (
                    <p className="text-[14px] text-primary">{value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="rounded-[16px] p-5 text-[13px] text-secondary leading-relaxed" style={{ backgroundColor: "var(--bg-alt)", border: "1px solid var(--border)" }}>
              {t("page_contact_note")}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
