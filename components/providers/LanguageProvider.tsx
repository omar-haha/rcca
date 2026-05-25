"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/lib/i18n";
import type { Lang, TranslationKey } from "@/lib/i18n";

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggle: () => {},
  t: (key) => translations.en[key],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rc_lang") as Lang | null;
      if (saved === "en" || saved === "fr") setLang(saved);
    } catch {}
  }, []);

  const toggle = () => {
    setLang((l) => {
      const next: Lang = l === "en" ? "fr" : "en";
      try { localStorage.setItem("rc_lang", next); } catch {}
      return next;
    });
  };

  const t = (key: TranslationKey): string =>
    (translations[lang][key] ?? translations.en[key]) as string;

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
