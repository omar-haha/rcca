"use client";

import { useState, useEffect } from "react";
import { RccaLogo } from "@/components/ui/RccaLogo";

const PROVINCES = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "YT", name: "Yukon" },
];

const FIELD =
  "w-full rounded-[14px] p-4 text-[15px] outline-none transition-all appearance-none cursor-pointer";

export function AgeGateModal() {
  const [visible, setVisible] = useState(false);
  const [age, setAge] = useState("");
  const [province, setProvince] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (!localStorage.getItem("rc_age_ok")) {
        setVisible(true);
        document.body.style.overflow = "hidden";
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleEnter = () => {
    const ageNum = parseInt(age, 10);
    if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setError("Please enter a valid age.");
      return;
    }
    if (ageNum < 18) {
      setError("You must be 18 or older to access this site.");
      return;
    }
    if (!province) {
      setError("Please select your province or territory.");
      return;
    }
    setError("");
    setVisible(false);
    document.body.style.overflow = "";
    try { localStorage.setItem("rc_age_ok", "1"); } catch {}
  };

  const handleDecline = () => {
    document.body.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:Inter,sans-serif;color:#6e6e73;font-size:14px">Access denied. Please close this tab.</div>';
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none opacity-20 blur-[120px]"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative w-full max-w-[440px] flex flex-col items-center text-center">
        {/* Logo */}
        <RccaLogo className="h-[18px] w-auto text-logo mb-14" />

        {/* Headline */}
        <h1
          className="text-[34px] font-semibold tracking-tight leading-[1.15] mb-4"
          style={{ color: "var(--text)" }}
        >
          Research Access<br />Verification
        </h1>
        <p className="text-[15px] leading-relaxed mb-10 max-w-[360px]" style={{ color: "var(--text-muted)" }}>
          This site is restricted to licensed researchers and authorized representatives of registered research institutions. Confirm your details to continue.
        </p>

        {/* Inputs */}
        <div className="w-full flex flex-col gap-3 mb-3">
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={120}
            placeholder="Your age"
            value={age}
            onChange={(e) => { setAge(e.target.value); setError(""); }}
            className={FIELD}
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />

          <div className="relative w-full">
            <select
              value={province}
              onChange={(e) => { setProvince(e.target.value); setError(""); }}
              className={FIELD + " w-full pr-10"}
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                color: province ? "var(--text)" : "var(--text-muted)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <option value="" disabled>Province / Territory</option>
              {PROVINCES.map((p) => (
                <option key={p.code} value={p.code}>{p.name}</option>
              ))}
            </select>
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--text-muted)" }}
            >
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Error */}
        <div
          className="text-[13px] mb-5 min-h-[18px] transition-opacity duration-200"
          style={{ color: "#ff453a", opacity: error ? 1 : 0 }}
        >
          {error || " "}
        </div>

        {/* CTAs */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={handleEnter}
            className="w-full text-white border-none py-4 rounded-full text-[15px] font-medium cursor-pointer transition-transform hover:scale-[1.02] tracking-tight"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Confirm &amp; Enter
          </button>
          <button
            onClick={handleDecline}
            className="w-full border py-4 rounded-full text-[15px] font-normal cursor-pointer transition-opacity hover:opacity-70 tracking-tight bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            I do not meet these requirements
          </button>
        </div>

        {/* Fine print */}
        <p
          className="text-[11px] mt-8 leading-[1.7] max-w-[380px]"
          style={{ color: "var(--text-tertiary, var(--text-muted))" }}
        >
          By entering, you confirm you are at least 18 years of age, hold appropriate research credentials, and agree to use all products strictly for in vitro scientific research in compliance with all applicable laws and regulations in your jurisdiction.
        </p>
      </div>
    </div>
  );
}
