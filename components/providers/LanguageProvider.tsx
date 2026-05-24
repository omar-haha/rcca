"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Lang = "fr" | "en";

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType>({
  lang: "fr",
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rc_lang");
      if (stored === "fr" || stored === "en") setLang(stored);
    } catch {}
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === "fr" ? "en" : "fr";
      try { localStorage.setItem("rc_lang", next); } catch {}
      return next;
    });
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
