"use client";

import { useState, useEffect } from "react";
import { RccaLogo } from "@/components/ui/RccaLogo";

const PROVINCES = [
  { code: "AB", name: "Alberta",                        minAge: 18 },
  { code: "BC", name: "British Columbia",               minAge: 19 },
  { code: "MB", name: "Manitoba",                       minAge: 18 },
  { code: "NB", name: "New Brunswick",                  minAge: 19 },
  { code: "NL", name: "Newfoundland and Labrador",      minAge: 19 },
  { code: "NS", name: "Nova Scotia",                    minAge: 19 },
  { code: "NT", name: "Northwest Territories",          minAge: 19 },
  { code: "NU", name: "Nunavut",                        minAge: 19 },
  { code: "ON", name: "Ontario",                        minAge: 19 },
  { code: "PE", name: "Prince Edward Island",           minAge: 19 },
  { code: "QC", name: "Quebec",                         minAge: 18 },
  { code: "SK", name: "Saskatchewan",                   minAge: 19 },
  { code: "YT", name: "Yukon",                          minAge: 19 },
];

const FIELD =
  "w-full rounded-[12px] p-[14px] text-[15px] outline-none transition-all appearance-none cursor-pointer";

export function AgeGateModal() {
  const [visible, setVisible] = useState(false);
  const [province, setProvince] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  const selectedProvince = PROVINCES.find((p) => p.code === province);
  const minAge = selectedProvince?.minAge ?? 18;

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
    if (!province) {
      setError("Please select your province or territory.");
      return;
    }
    if (!confirmed) {
      setError(`Please confirm you are ${minAge} or older.`);
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
    /* Backdrop */
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-5"
      style={{
        backdropFilter: "saturate(180%) blur(24px)",
        WebkitBackdropFilter: "saturate(180%) blur(24px)",
        backgroundColor: "rgba(0,0,0,0.55)",
      }}
    >
      {/* Card */}
      <div
        className="relative w-full max-w-[420px] rounded-[24px] overflow-hidden flex flex-col items-center text-center p-8"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 0 0 0.5px var(--border)",
        }}
      >
        {/* Subtle inner glow at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[120px] rounded-full pointer-events-none opacity-25 blur-[60px]"
          style={{ background: "var(--accent)" }}
        />

        <div className="relative w-full flex flex-col items-center text-center">
          {/* Logo */}
          <RccaLogo className="h-[16px] w-auto text-logo mb-8" />

          {/* Headline */}
          <h1
            className="text-[26px] font-semibold tracking-tight leading-[1.2] mb-2"
            style={{ color: "var(--text)" }}
          >
            Age Verification
          </h1>
          <p className="text-[14px] leading-relaxed mb-7 max-w-[320px]" style={{ color: "var(--text-muted)" }}>
            Select your province to confirm you meet the minimum age requirement for your region.
          </p>

          {/* Province selector */}
          <div className="w-full flex flex-col gap-3 mb-2">
            <div className="relative w-full">
              <select
                value={province}
                onChange={(e) => { setProvince(e.target.value); setConfirmed(false); setError(""); }}
                className={FIELD + " w-full pr-10"}
                style={{
                  backgroundColor: "var(--bg-alt, var(--bg))",
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

            {/* Age confirmation checkbox */}
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: province ? "80px" : "0px", opacity: province ? 1 : 0 }}
            >
              <label
                className="flex items-center gap-3 w-full rounded-[12px] p-[14px] cursor-pointer text-left"
                style={{
                  backgroundColor: "var(--bg-alt, var(--bg))",
                  border: `1px solid ${confirmed ? "var(--accent)" : "var(--border)"}`,
                  transition: "border-color 0.2s",
                }}
              >
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => { setConfirmed(e.target.checked); setError(""); }}
                  className="sr-only"
                />
                <div
                  className="flex-shrink-0 w-5 h-5 rounded-[5px] flex items-center justify-center transition-all duration-200"
                  style={{
                    backgroundColor: confirmed ? "var(--accent)" : "transparent",
                    border: `1.5px solid ${confirmed ? "var(--accent)" : "var(--border)"}`,
                  }}
                >
                  {confirmed && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-[14px]" style={{ color: "var(--text-muted)" }}>
                  I am{" "}
                  <span className="font-semibold" style={{ color: "var(--text)" }}>
                    {minAge} or older
                  </span>
                </span>
              </label>
            </div>
          </div>

          {/* Error */}
          <div
            className="text-[13px] mb-4 min-h-[18px] transition-opacity duration-200"
            style={{ color: "#ff453a", opacity: error ? 1 : 0 }}
          >
            {error || " "}
          </div>

          {/* CTAs */}
          <div className="w-full flex flex-col gap-2">
            <button
              onClick={handleEnter}
              className="w-full text-white border-none py-[14px] rounded-full text-[15px] font-medium cursor-pointer transition-transform hover:scale-[1.02] tracking-tight"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Confirm &amp; Enter
            </button>
            <button
              onClick={handleDecline}
              className="w-full border py-[14px] rounded-full text-[15px] font-normal cursor-pointer transition-opacity hover:opacity-70 tracking-tight bg-transparent"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              I do not qualify
            </button>
          </div>

          {/* Fine print */}
          <p
            className="text-[11px] mt-6 leading-[1.7] max-w-[340px]"
            style={{ color: "var(--text-muted)", opacity: 0.6 }}
          >
            By entering, you confirm you meet the minimum age requirement for your province, hold appropriate research credentials, and agree to use all products strictly for in vitro scientific research.
          </p>
        </div>
      </div>
    </div>
  );
}
