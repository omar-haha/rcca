"use client";

import { useState } from "react";
import { Mail, ChevronDown, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INPUT =
  "w-full bg-[var(--surface)] border border-[var(--border)] rounded-[12px] px-4 py-3.5 text-[15px] text-primary placeholder:text-[var(--text-muted)] outline-none transition-all focus:border-[color:var(--accent)]";

export function ContactSection() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-[60px] bg-secondary">
      <div className="max-w-[1024px] mx-auto px-4 md:px-8">

        {/* Collapsed trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center gap-4 rounded-[20px] px-5 py-4 border cursor-pointer transition-colors text-left"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: "var(--bg-alt)" }}
          >
            <Mail size={18} strokeWidth={1.5} style={{ color: "var(--text-muted)" }} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-primary leading-snug">Contact Us</p>
            <p className="text-[12px] text-secondary leading-snug truncate">
              Questions? Include your order number if you have one.
            </p>
          </div>

          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0"
            style={{ color: "var(--text-muted)" }}
          >
            <ChevronDown size={16} strokeWidth={2} />
          </motion.div>
        </button>

        {/* Expandable form */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-3">
                {submitted ? (
                  <div
                    className="rounded-[20px] p-10 flex flex-col items-center text-center gap-3"
                    style={{ backgroundColor: "var(--surface)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--success)1a", color: "var(--success)" }}
                    >
                      <CheckCircle2 size={24} strokeWidth={2} />
                    </div>
                    <p className="text-[16px] font-semibold text-primary">Message received.</p>
                    <p className="text-[13px] text-secondary">We&apos;ll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="First Name" required className={INPUT} />
                      <input type="text" placeholder="Last Name" required className={INPUT} />
                    </div>
                    <input type="email" placeholder="Email" required className={INPUT} />
                    <input type="tel" placeholder="Phone" className={INPUT} />
                    <textarea
                      placeholder="Message..."
                      rows={4}
                      required
                      className={INPUT}
                      style={{ resize: "none" }}
                    />
                    <button
                      type="submit"
                      className="w-full py-[13px] rounded-full text-[15px] font-medium text-white border-none cursor-pointer btn-physical btn-physical-accent"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      <span style={{ pointerEvents: "none" }}>Submit</span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
