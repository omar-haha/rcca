"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "What are research chemicals?",
    a: "Research chemicals are synthetic compounds used in scientific and laboratory settings for in vitro experimentation. They are not intended for human or veterinary use, and all products sold by RCCA are strictly for laboratory research purposes.",
  },
  {
    q: "Are your products safe for human consumption?",
    a: "No. All products are sold strictly for in vitro laboratory research. They are not evaluated or approved by Health Canada, the FDA, or any regulatory body for human or veterinary use. By purchasing, you confirm you are a qualified researcher and will not administer these compounds to humans or animals.",
  },
  {
    q: "How do I place an order?",
    a: "Browse the store, select your compound and quantity, add it to your bag, and proceed to checkout. At checkout you'll provide your contact and shipping details, then complete payment via Interac e-Transfer or cryptocurrency. Orders are processed within 1–2 business days after payment is confirmed.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Interac e-Transfer (Canadian banks) and cryptocurrency (BTC, ETH, USDT). Payment instructions are shown at checkout and on your order confirmation. All prices are in CAD unless otherwise noted.",
  },
  {
    q: "How long does shipping take?",
    a: "Orders ship within 1–2 business days after payment is confirmed. Standard delivery within Canada is typically 2–5 business days. Expedited options may be available — contact us at support@researchchemicals.ca to inquire.",
  },
  {
    q: "Do you ship internationally?",
    a: "We currently ship within Canada and to select international destinations. You are solely responsible for ensuring compliance with all import and export regulations in your jurisdiction. RCCA reserves the right to refuse shipment to any location.",
  },
  {
    q: "How should products be stored?",
    a: "Most lyophilized peptides should be stored at −20 °C in a dry, dark environment. Once reconstituted, keep refrigerated at 2–8 °C and use within 30 days. Always follow your institution's handling protocols for research compounds.",
  },
  {
    q: "Can I get a Certificate of Analysis for my order?",
    a: "Yes. All compounds are batch-tested and COAs are available on request. Email support@researchchemicals.ca with your order number and the specific product, and we will provide the corresponding COA within 1 business day. Visit our COA page for more information.",
  },
  {
    q: "What is your refund policy?",
    a: "All sales are final due to the nature of research compounds. If you receive a damaged or incorrect order, contact us within 48 hours of delivery with photos and your order number. We will review and, at our discretion, offer a replacement or store credit. See our full Refund Policy for details.",
  },
  {
    q: "Do you offer discounts for bulk or repeat orders?",
    a: "Yes, we can accommodate bulk research orders. Contact us at support@researchchemicals.ca with the compounds and quantities you need and we will provide a custom quote.",
  },
  {
    q: "Is my order discreet?",
    a: "Yes. All shipments are packaged discreetly with no external branding that indicates the nature of the contents. Shipping labels contain only the sender and recipient addresses.",
  },
];

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div
      className="rounded-[16px] overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer border-none bg-transparent"
        style={{ backgroundColor: open ? "var(--surface)" : "var(--bg)" }}
      >
        <span className="text-[15px] font-medium text-primary leading-snug">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
          style={{ color: "var(--text-muted)" }}
        >
          <ChevronDown size={16} strokeWidth={2} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="px-6 pb-5 text-[14px] text-secondary leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <PageShell>
      <div className="max-w-[720px] mx-auto px-4 md:px-6 py-[80px] md:py-[100px]">
        <div className="mb-12">
          <p className="text-[12px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>
            Support
          </p>
          <h1 className="text-[34px] md:text-[44px] font-semibold tracking-tight text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[16px] text-secondary leading-relaxed">
            Can&apos;t find what you&apos;re looking for? Email us at{" "}
            <a href="mailto:support@researchchemicals.ca" className="text-[color:var(--accent)] no-underline hover:underline">
              support@researchchemicals.ca
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {FAQS.map((item, i) => (
            <FaqItem
              key={i}
              q={item.q}
              a={item.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
