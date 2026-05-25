"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export type LegalPage = "privacy" | "terms" | "refund" | null;

const CONTENT: Record<NonNullable<LegalPage>, { title: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        heading: "Information We Collect",
        body: "We collect information you provide directly when placing an order: name, email address, shipping address, phone number, and industry. We do not store payment credentials — all payment is completed externally via Interac e-Transfer or cryptocurrency.",
      },
      {
        heading: "How We Use Your Information",
        body: "Your information is used solely to process and fulfill your order, communicate order status, and comply with applicable legal obligations. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
      },
      {
        heading: "Data Retention",
        body: "Order records are retained for a minimum of seven years as required by Canadian tax and business regulations. You may request deletion of your personal data at any time, subject to legal retention requirements.",
      },
      {
        heading: "Cookies",
        body: "We use only essential cookies required for site functionality (session state, age verification). No tracking or advertising cookies are used.",
      },
      {
        heading: "Security",
        body: "We implement reasonable technical and organizational measures to protect your personal information. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
      },
      {
        heading: "Your Rights",
        body: "Under PIPEDA (Canada) you have the right to access, correct, or request deletion of your personal information held by RCCA Inc. Contact us at support@researchchemicals.ca to exercise these rights.",
      },
      {
        heading: "Contact",
        body: "Questions regarding this policy may be directed to support@researchchemicals.ca. This policy was last updated May 2026 and is subject to change without notice.",
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    sections: [
      {
        heading: "Acceptance",
        body: "By accessing this website or placing an order, you agree to be bound by these Terms of Use and all applicable laws. If you do not agree, do not use this site.",
      },
      {
        heading: "Research Use Only",
        body: "All products offered by RCCA Inc. are strictly for in vitro laboratory research. They are not for human or veterinary consumption, diagnostic use, or any therapeutic application. You represent that you are a qualified researcher or authorized representative of a registered research institution.",
      },
      {
        heading: "Eligibility",
        body: "You must be of legal age in your province or territory and legally permitted to purchase research chemicals. RCCA reserves the right to refuse service to any person or entity at its sole discretion.",
      },
      {
        heading: "Orders & Payment",
        body: "All prices are in Canadian dollars unless stated otherwise. Orders are accepted subject to product availability. Payment must be received before shipment. RCCA reserves the right to cancel any order prior to fulfillment.",
      },
      {
        heading: "Regulatory Compliance",
        body: "You are solely responsible for ensuring that the purchase, import, possession, and use of any product complies with all applicable laws in your jurisdiction. RCCA makes no representation that any product is legal in your jurisdiction.",
      },
      {
        heading: "Intellectual Property",
        body: "All content on this site — including text, graphics, logos, and design — is the property of RCCA Inc. and may not be reproduced or used without prior written permission.",
      },
      {
        heading: "Limitation of Liability",
        body: "RCCA Inc. shall not be liable for any indirect, incidental, special, or consequential damages arising from use of this site or any product purchased. Your sole remedy for dissatisfaction is to stop using the site and products.",
      },
      {
        heading: "Governing Law",
        body: "These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law principles.",
      },
    ],
  },
  refund: {
    title: "Refund Policy",
    sections: [
      {
        heading: "All Sales Final",
        body: "Due to the nature of research chemicals and strict handling requirements, all sales are final. We do not accept returns or exchanges once an order has shipped.",
      },
      {
        heading: "Damaged or Incorrect Orders",
        body: "If you receive a product that is damaged in transit or materially different from what was ordered, contact us at support@researchchemicals.ca within 48 hours of delivery with photos and your order number. We will assess and, at our discretion, offer a replacement or store credit.",
      },
      {
        heading: "Lost Shipments",
        body: "If tracking confirms a shipment is lost in transit, contact us and we will investigate with the carrier. Replacement or credit is issued at RCCA's sole discretion after investigation is complete.",
      },
      {
        heading: "Order Cancellation",
        body: "Orders may be cancelled within 2 hours of placement if they have not yet been processed. Contact us immediately at support@researchchemicals.ca. Once an order is in fulfillment it cannot be cancelled.",
      },
    ],
  },
};

export function LegalModal({ page, onClose }: { page: LegalPage; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = page ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [page]);

  const content = page ? CONTENT[page] : null;

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
