"use client";

import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "disclaimers", label: "Disclaimers" },
  { id: "privacy",     label: "Privacy Policy" },
  { id: "terms",       label: "Terms of Use" },
  { id: "refund",      label: "Refund Policy" },
] as const;

type TabId = typeof TABS[number]["id"];

const DISCLAIMERS = [
  {
    title: "Research Use Only",
    body: "All products are intended exclusively for in vitro laboratory research. Not for human or veterinary use, diagnostic purposes, or any therapeutic application. Must not be ingested, injected, inhaled, or applied to skin.",
  },
  {
    title: "Not Regulatory Approved",
    body: "These products have not been evaluated or authorized by the FDA, Health Canada, EMA, or any equivalent regulatory body for safety, efficacy, or quality.",
  },
  {
    title: "Purchaser Eligibility",
    body: "By ordering, purchasers confirm they are of legal age, qualified to handle research chemicals, and solely responsible for compliance with all applicable local, provincial, and federal laws.",
  },
  {
    title: "Export & Import Controls",
    body: "Purchasers are responsible for compliance with all import and export regulations in their jurisdiction. RCCA reserves the right to refuse or cancel any order at its sole discretion.",
  },
  {
    title: "Limitation of Liability",
    body: "RCCA Inc. is not liable for any damages arising from the purchase or use of any product. Purchasers agree to indemnify RCCA Inc. from any claims resulting from misuse of products.",
  },
  {
    title: "Universal Disclaimer",
    body: "RCCA Inc. makes no representations or warranties, expressed or implied, regarding the fitness of any product for a particular purpose. Purity and quality data are sourced from our suppliers and have not been independently verified by RCCA. All products are sold subject to RCCA's Terms and Conditions of Sale. These terms are subject to change without notice. By completing a purchase, you acknowledge that you have read, understood, and agreed to all terms, conditions, and disclosures stated herein and on the RCCA website.",
  },
];

const PRIVACY = [
  { heading: "Information We Collect", body: "We collect information you provide directly when placing an order: name, email address, shipping address, phone number, and industry. We do not store payment credentials — all payment is completed externally via Interac e-Transfer or cryptocurrency." },
  { heading: "How We Use Your Information", body: "Your information is used solely to process and fulfill your order, communicate order status, and comply with applicable legal obligations. We do not sell, rent, or share your personal information with third parties for marketing purposes." },
  { heading: "Data Retention", body: "Order records are retained for a minimum of seven years as required by Canadian tax and business regulations. You may request deletion of your personal data at any time, subject to legal retention requirements." },
  { heading: "Cookies", body: "We use only essential cookies required for site functionality (session state, age verification). No tracking or advertising cookies are used." },
  { heading: "Security", body: "We implement reasonable technical and organizational measures to protect your personal information. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security." },
  { heading: "Your Rights (PIPEDA)", body: "Under PIPEDA (Canada) you have the right to access, correct, or request deletion of your personal information held by RCCA Inc. Contact us at support@researchchemicals.ca to exercise these rights." },
  { heading: "Contact", body: "Questions regarding this policy may be directed to support@researchchemicals.ca. This policy was last updated May 2026 and is subject to change without notice." },
];

const TERMS = [
  { heading: "Acceptance", body: "By accessing this website or placing an order, you agree to be bound by these Terms of Use and all applicable laws. If you do not agree, do not use this site." },
  { heading: "Research Use Only", body: "All products offered by RCCA Inc. are strictly for in vitro laboratory research. They are not for human or veterinary consumption, diagnostic use, or any therapeutic application. You represent that you are a qualified researcher or authorized representative of a registered research institution." },
  { heading: "Eligibility", body: "You must be of legal age in your province or territory and legally permitted to purchase research chemicals. RCCA reserves the right to refuse service to any person or entity at its sole discretion." },
  { heading: "Orders & Payment", body: "All prices are in Canadian dollars unless stated otherwise. Orders are accepted subject to product availability. Payment must be received before shipment. RCCA reserves the right to cancel any order prior to fulfillment." },
  { heading: "Regulatory Compliance", body: "You are solely responsible for ensuring that the purchase, import, possession, and use of any product complies with all applicable laws in your jurisdiction. RCCA makes no representation that any product is legal in your jurisdiction." },
  { heading: "Intellectual Property", body: "All content on this site — including text, graphics, logos, and design — is the property of RCCA Inc. and may not be reproduced or used without prior written permission." },
  { heading: "Limitation of Liability", body: "RCCA Inc. shall not be liable for any indirect, incidental, special, or consequential damages arising from use of this site or any product purchased. Your sole remedy for dissatisfaction is to stop using the site and products." },
  { heading: "Governing Law", body: "These terms are governed by the laws of the Province of Québec and the federal laws of Canada applicable therein, without regard to conflict of law principles." },
];

const REFUND = [
  { heading: "All Sales Final", body: "Due to the nature of research chemicals and strict handling requirements, all sales are final. We do not accept returns or exchanges once an order has shipped." },
  { heading: "Damaged or Incorrect Orders", body: "If you receive a product that is damaged in transit or materially different from what was ordered, contact us at support@researchchemicals.ca within 48 hours of delivery with photos and your order number. We will assess and, at our discretion, offer a replacement or store credit." },
  { heading: "Lost Shipments", body: "If tracking confirms a shipment is lost in transit, contact us and we will investigate with the carrier. Replacement or credit is issued at RCCA's sole discretion after investigation is complete." },
  { heading: "Order Cancellation", body: "Orders may be cancelled within 2 hours of placement if they have not yet been processed. Contact us immediately at support@researchchemicals.ca. Once an order is in fulfillment it cannot be cancelled." },
];

const CONTENT: Record<TabId, { heading: string; body: string }[]> = {
  disclaimers: DISCLAIMERS.map((s) => ({ heading: s.title, body: s.body })),
  privacy: PRIVACY,
  terms: TERMS,
  refund: REFUND,
};

export default function LegalPage() {
  const [tab, setTab] = useState<TabId>("disclaimers");

  return (
    <PageShell>
      <div className="max-w-[800px] mx-auto px-4 md:px-6 py-[80px] md:py-[100px]">
        <div className="mb-10">
          <p className="text-[12px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>
            Legal
          </p>
          <h1 className="text-[34px] md:text-[44px] font-semibold tracking-tight text-primary">
            Legal Information
          </h1>
        </div>

        {/* Tab bar */}
        <div
          className="flex flex-wrap gap-1.5 p-1.5 rounded-[14px] mb-10 w-fit"
          style={{ backgroundColor: "var(--surface)" }}
        >
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "rounded-[10px] px-4 py-2 text-[13px] font-medium cursor-pointer border-none transition-all duration-200",
                tab === id
                  ? "text-primary shadow-sm"
                  : "text-secondary hover:text-primary"
              )}
              style={tab === id ? { backgroundColor: "var(--bg)" } : { backgroundColor: "transparent" }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8">
          {CONTENT[tab].map((s) => (
            <div key={s.heading} id={s.heading.toLowerCase().replace(/\s+/g, "-")}>
              <h2 className="text-[16px] font-semibold text-primary mb-2">{s.heading}</h2>
              <p className="text-[14px] text-secondary leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-14 rounded-[16px] p-6 text-[12px] text-secondary leading-relaxed"
          style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
        >
          Last updated: May 2026. These policies are subject to change without notice. Questions? Contact{" "}
          <a href="mailto:support@researchchemicals.ca" className="text-[color:var(--accent)] no-underline hover:underline">
            support@researchchemicals.ca
          </a>
        </div>
      </div>
    </PageShell>
  );
}
