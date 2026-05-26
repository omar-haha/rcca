"use client";

import { Mail } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const INPUT =
  "w-full bg-[var(--bg-alt)] border border-[var(--border)] rounded-[10px] px-3.5 py-2.5 text-[13px] text-primary placeholder:text-[var(--text-muted)] outline-none transition-all focus:border-[color:var(--accent)]";

export function AppleFooter() {
  const { t } = useLanguage();

  return (
    <>

      <footer className="bg-secondary pt-6 pb-12 px-4 border-t border-primary text-[12px] text-tertiary font-normal">
        <div className="max-w-[1024px] mx-auto px-4 md:px-8">

          {/* 3-column directory */}
          <div className="flex items-start justify-between gap-8 pt-2 pb-2">

            {/* Left — Explore */}
            <div className="text-left">
              <h3 className="text-primary font-semibold mb-2 text-[12px]">{t("footer_explore")}</h3>
              <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
                <li><a href="/#store"   className="text-tertiary hover:text-primary transition-colors no-underline">{t("footer_shop")}</a></li>
                <li><a href="/reviews"  className="text-tertiary hover:text-primary transition-colors no-underline">{t("footer_reviews")}</a></li>
                <li><a href="/faq"      className="text-tertiary hover:text-primary transition-colors no-underline">{t("footer_faq")}</a></li>
                <li><a href="/coa"      className="text-tertiary hover:text-primary transition-colors no-underline">{t("footer_coa")}</a></li>
                <li><a href="/contact"  className="text-tertiary hover:text-primary transition-colors no-underline">{t("footer_contact")}</a></li>
              </ul>
            </div>

            {/* Middle — Contact link */}
            <div className="flex-1 flex justify-center">
              <a
                href="/contact"
                className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 border no-underline transition-colors text-left w-full hover:border-[color:var(--accent)]"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--bg-alt)" }}>
                  <Mail size={15} strokeWidth={1.5} style={{ color: "var(--text-muted)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-primary leading-snug">{t("footer_contact_label")}</p>
                  <p className="text-[11px] leading-snug truncate" style={{ color: "var(--text-muted)" }}>{t("footer_contact_sub")}</p>
                </div>
              </a>
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
