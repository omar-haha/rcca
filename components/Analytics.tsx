"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { AGE_GATE_CLEARED } from "@/components/modals/AgeGateModal";

// GA4 is opt-in, not opt-out.
//
// Québec's Law 25 (and PIPEDA's consent requirements) expect consent to be
// obtained *before* non-essential tracking begins — notice alone is not enough.
// GA4 sets _ga / _ga_* cookies and transfers usage data to Google LLC outside
// Canada, so the scripts below must not load until the visitor accepts. The
// Privacy Policy in lib/legalContent.ts describes exactly this behaviour; if you
// change the gating here, change that clause too or the policy becomes false.
//
// Declining is a real choice: nothing on the site depends on analytics.

const CONSENT_KEY = "rc_analytics_consent";
type Consent = "granted" | "denied";

export function Analytics() {
  const { t } = useLanguage();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // undefined = not yet read from storage, null = no choice made yet
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);
  // The age gate is a full-screen z-[9999] overlay; this banner is z-[2500], so
  // showing both at once just hides the banner behind it. Wait the gate out.
  const [ageGateCleared, setAgeGateCleared] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      setConsent(saved === "granted" || saved === "denied" ? saved : null);
    } catch {
      // Storage blocked — treat as no consent and don't nag on every page view.
      setConsent("denied");
    }

    try {
      if (localStorage.getItem("rc_age_ok")) setAgeGateCleared(true);
    } catch {
      // Storage blocked: the gate can never record a pass, so don't wait on it.
      setAgeGateCleared(true);
    }

    const onCleared = () => setAgeGateCleared(true);
    window.addEventListener(AGE_GATE_CLEARED, onCleared);
    return () => window.removeEventListener(AGE_GATE_CLEARED, onCleared);
  }, []);

  const choose = (value: Consent) => {
    try { localStorage.setItem(CONSENT_KEY, value); } catch {}
    setConsent(value);
  };

  // Nothing to gate if analytics aren't configured at all — don't show a banner
  // asking for permission we have no use for.
  if (!gaId) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {consent === null && ageGateCleared && (
        <div
          role="dialog"
          aria-label={t("cookie_aria")}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-[380px] z-[2500] rounded-[18px] p-5 shadow-2xl"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            backdropFilter: "blur(20px) saturate(160%)",
          }}
        >
          <p className="text-[13px] leading-relaxed mb-4" style={{ color: "var(--text)" }}>
            {t("cookie_body")}{" "}
            <a
              href="/legal#privacy"
              className="underline"
              style={{ color: "var(--accent)" }}
            >
              {t("cookie_link")}
            </a>
            .
          </p>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => choose("granted")}
              className="flex-1 py-2.5 rounded-full text-[13px] font-medium text-white border-none cursor-pointer btn-physical btn-physical-accent"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {t("cookie_accept")}
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="flex-1 py-2.5 rounded-full text-[13px] font-medium cursor-pointer border"
              style={{ backgroundColor: "transparent", borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              {t("cookie_decline")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
