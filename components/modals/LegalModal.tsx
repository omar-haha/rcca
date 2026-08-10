"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
// Shared with /legal — this modal used to carry its own copy of the legal text,
// which had drifted (it declared Ontario governing law where the page declared
// Québec, and lacked the Research Use Declaration clause entirely).
import { LEGAL_EN, LEGAL_FR } from "@/lib/legalContent";

export type LegalPage = "privacy" | "terms" | "refund" | null;

export function LegalModal({ page, onClose }: { page: LegalPage; onClose: () => void }) {
  const { t, lang } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = page ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [page]);

  const TITLE_KEY = {
    privacy: "page_legal_tab_priv",
    terms:   "page_legal_tab_terms",
    refund:  "page_legal_tab_ref",
  } as const;

  const sections = page ? (lang === "fr" ? LEGAL_FR : LEGAL_EN)[page] : null;
  const content = page && sections ? { title: t(TITLE_KEY[page]), sections } : null;

  if (!page || !content) return null;

  return (
    <div
      className="fixed inset-0 z-[4000] flex items-center justify-center p-4 sm:p-6"
      style={{ backdropFilter: "blur(20px) saturate(160%)", backgroundColor: "rgba(0,0,0,0.58)" }}
      onClick={onClose}
    >
      <div
        className="bg-primary rounded-[24px] w-full max-w-[580px] flex flex-col shadow-2xl overflow-hidden"
        style={{ maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-7 py-5 border-b border-primary flex items-center justify-between shrink-0">
          <h2 className="text-[20px] font-semibold tracking-tight text-primary m-0">{content.title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-none flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: "var(--surface-hover)", color: "var(--text-muted)" }}
          >
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>

        {/* Scrollable body — only this scrolls */}
        <div data-lenis-prevent="true" className="overflow-y-auto px-7 py-7 flex flex-col gap-6">
          {content.sections.map((s) => (
            <div key={s.heading}>
              <h3 className="text-[13px] font-semibold text-primary mb-1.5">{s.heading}</h3>
              <p className="text-[13px] leading-relaxed text-secondary">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
