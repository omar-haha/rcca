"use client";

import { useState, useEffect } from "react";
import { ShieldAlert } from "lucide-react";

export function AgeGateModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("rc_age_ok")) {
        setIsVisible(true);
        // Disable scroll
        document.body.style.overflow = "hidden";
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
    document.body.style.overflow = "";
    try {
      localStorage.setItem("rc_age_ok", "1");
    } catch {
      // ignore
    }
  };

  const handleDecline = () => {
    document.body.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:Inter,sans-serif;color:#6e6e73;font-size:14px">Access denied. Please close this tab.</div>';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-primary flex items-center justify-center p-6">
      <div className="max-w-[460px] w-full text-center">
        <div className="text-[13px] font-semibold tracking-[0.18em] uppercase text-secondary mb-14">
          RCCA
        </div>
        <div className="flex justify-center mb-6">
          <ShieldAlert className="w-12 h-12 text-secondary" strokeWidth={1.5} />
        </div>
        <h2 className="text-[32px] font-light tracking-tight mb-4 leading-[1.2] text-primary">
          Confirm Your Age &<br />Professional Status
        </h2>
        <p className="text-[15px] text-secondary leading-relaxed mb-10">
          This site provides access to research-grade chemical compounds intended exclusively for licensed scientific researchers. You must be 18 years or older and a qualified research professional to enter.
        </p>
        <div className="flex flex-col gap-3 max-w-[320px] mx-auto">
          <button
            onClick={handleAccept}
            className="bg-blue-600 text-white border-none py-4 px-8 rounded-full text-[15px] font-medium cursor-pointer transition-transform hover:scale-[1.02] tracking-tight hover:bg-blue-700"
          >
            I am 18+ and a Licensed Researcher
          </button>
          <button
            onClick={handleDecline}
            className="bg-transparent text-secondary border border-secondary py-[15px] px-8 rounded-full text-[15px] font-normal cursor-pointer transition-colors hover:border-primary hover:text-primary tracking-tight"
          >
            I do not meet these requirements
          </button>
        </div>
        <p className="text-[11px] text-tertiary mt-8 leading-[1.6] max-w-[380px] mx-auto">
          By entering, you confirm you are at least 18 years of age, hold appropriate research credentials, and agree to use all products strictly for in vitro scientific research in compliance with all applicable laws and regulations in your jurisdiction. Misrepresentation of age or professional status may constitute fraud.
        </p>
      </div>
    </div>
  );
}
