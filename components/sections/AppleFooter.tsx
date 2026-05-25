"use client";

import { useState } from "react";
import { Mail, ChevronUp, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

const INPUT =
  "w-full bg-[var(--bg-alt)] border border-[var(--border)] rounded-[10px] px-3.5 py-2.5 text-[13px] text-primary placeholder:text-[var(--text-muted)] outline-none transition-all focus:border-[color:var(--accent)]";

export function AppleFooter() {
  const { t } = useLanguage();
  const [contactOpen, setContactOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>

      {/* Click-outside backdrop */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-[40]"
          onClick={() => setContactOpen(false)}
        />
      )}

      <footer className="bg-secondary pt-6 pb-12 px-4 border-t border-primary text-[12px] text-tertiary font-normal">
        <div className="max-w-[1024px] mx-auto px-4 md:px-8">

          {/* 3-column directory */}
          <div className="flex items-start justify-between gap-8 pt-2 pb-2">

            {/* Left — Explore */}
            <div className="text-left">
              <h3 className="text-primary font-semibold mb-2 text-[12px]">{t("footer_explore")}</h3>
              <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
                <li><a href="/#store"   className="text-tertiary hover:text-primary transition-colors no-underline">{t("footer_shop")}</a></li>
                <li><a href="/#quality" className="text-tertiary hover:text-primary transition-colors no-underline">{t("footer_quality")}</a></li>
                <li><a href="/reviews"  className="text-tertiary hover:text-primary transition-colors no-underline">{t("footer_reviews")}</a></li>
                <li><a href="/faq"      className="text-tertiary hover:text-primary transition-colors no-underline">{t("footer_faq")}</a></li>
                <li><a href="/coa"      className="text-tertiary hover:text-primary transition-colors no-underline">{t("footer_coa")}</a></li>
                <li><a href="/contact"  className="text-tertiary hover:text-primary transition-colors no-underline">{t("footer_contact")}</a></li>
              </ul>
            </div>

            {/* Middle — Contact popup anchor */}
            <div className="flex-1 flex justify-center">
              <div className="relative z-[50] w-full">

                {/* Popup — opens upward */}
                <AnimatePresence>
                  {contactOpen && (
                    <motion.div
                      key="contact-popup"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ type: "spring" as const, stiffness: 380, damping: 30 }}
                      className="absolute bottom-[calc(100%+8px)] left-0 right-0 rounded-[16px] px-4 py-4"
                      style={{
                        backgroundColor: "var(--surface)",
                        border: "1px solid var(--border)",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {submitted ? (
                        <div className="flex flex-col items-center gap-2.5 py-2 text-center">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "var(--success)1a", color: "var(--success)" }}
                          >
                            <CheckCircle2 size={18} strokeWidth={2} />
                          </div>
                          <p className="text-[13px] font-semibold text-primary">{t("footer_msg_sent")}</p>
                          <p className="text-[12px] text-secondary">{t("footer_msg_sub")}</p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                          <div className="grid grid-cols-2 gap-2">
                            <input type="text" placeholder={t("footer_first")} required className={INPUT} />
                            <input type="text" placeholder={t("footer_last")} required className={INPUT} />
                          </div>
                          <input type="email" placeholder={t("footer_email")} required className={INPUT} />
                          <input type="tel" placeholder={t("footer_phone")} className={INPUT} />
                          <textarea
                            placeholder={t("footer_message")}
                            rows={3}
                            required
                            className={INPUT}
                            style={{ resize: "none" }}
                          />
                          <button
                            type="submit"
                            className="w-full py-[9px] rounded-full text-[13px] font-medium text-white border-none cursor-pointer btn-physical btn-physical-accent"
                            style={{ backgroundColor: "var(--accent)" }}
                          >
                            <span style={{ pointerEvents: "none" }}>{t("footer_submit")}</span>
                          </button>
                        </form>
                      )}

                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Trigger bubble */}
                <button
                  type="button"
                  onClick={() => setContactOpen((v) => !v)}
                  className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 border cursor-pointer transition-colors text-left w-full"
                  style={{
                    backgroundColor: contactOpen ? "var(--surface-hover)" : "var(--surface)",
                    borderColor: contactOpen ? "var(--accent)" : "var(--border)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--bg-alt)" }}
                  >
                    <Mail size={15} strokeWidth={1.5} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-primary leading-snug">{t("footer_contact_label")}</p>
                    <p className="text-[11px] leading-snug truncate" style={{ color: "var(--text-muted)" }}>
                      {t("footer_contact_sub")}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: contactOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <ChevronUp size={14} strokeWidth={2} />
                  </motion.div>
                </button>
              </div>
            </div>

            {/* Right — Legal */}
            <div className="text-right">
              <h3 className="text-primary font-semibold mb-2 text-[12px]">
                <a href="/legal" className="text-primary no-underline hover:underline">{t("footer_legal")}</a>
              </h3>
              <ul className="list-none p-0 m-0 flex flex-col gap-1.5 items-end">
                <li><a href="/legal#disclaimers" className="text-tertiary hover:text-primary transition-colors no-underline">{t("footer_disclaimers")}</a></li>
                <li><a href="/legal#privacy"      className="text-tertiary hover:text-primary transition-colors no-underline">{t("footer_privacy")}</a></li>
                <li><a href="/legal#terms"        className="text-tertiary hover:text-primary transition-colors no-underline">{t("footer_terms")}</a></li>
                <li><a href="/legal#refund"       className="text-tertiary hover:text-primary transition-colors no-underline">{t("footer_refund")}</a></li>
              </ul>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
