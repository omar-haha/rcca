"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Clock, MapPin } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { cn } from "@/lib/utils";

const INPUT =
  "w-full bg-secondary border border-transparent rounded-[12px] p-4 text-[15px] text-primary placeholder:text-secondary outline-none transition-all focus:border-[color:var(--accent)] focus:bg-primary";

const INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "support@researchchemicals.ca",
    href: "mailto:support@researchchemicals.ca",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 1 business day",
    href: null,
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Québec, Canada",
    href: null,
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageShell>
      <div className="max-w-[960px] mx-auto px-4 md:px-6 py-[80px] md:py-[100px]">
        <div className="mb-12">
          <p className="text-[12px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>
            Get in Touch
          </p>
          <h1 className="text-[34px] md:text-[44px] font-semibold tracking-tight text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-[16px] text-secondary leading-relaxed max-w-[480px]">
            Questions about an order, product details, bulk pricing, or anything else — we&apos;re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Form */}
          <div
            className="rounded-[24px] p-7 md:p-9"
            style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(34,197,94,0.12)", color: "#16a34a" }}
                >
                  <CheckCircle2 size={28} strokeWidth={2} />
                </div>
                <h2 className="text-[22px] font-semibold text-primary">Message received.</h2>
                <p className="text-[14px] text-secondary">We&apos;ll get back to you within 1 business day.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-[13px] rounded-full px-5 py-2.5 border cursor-pointer transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "transparent" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" required className={INPUT} />
                  <input type="text" placeholder="Last Name" required className={INPUT} />
                </div>
                <input type="email" placeholder="Email Address" required className={INPUT} />
                <input type="tel" placeholder="Phone (optional)" className={INPUT} />
                <select className={cn(INPUT, "appearance-none cursor-pointer")}>
                  <option value="">Subject</option>
                  <option>Order Inquiry</option>
                  <option>Product Question</option>
                  <option>Bulk / Wholesale Pricing</option>
                  <option>Shipping & Delivery</option>
                  <option>COA Request</option>
                  <option>Other</option>
                </select>
                <textarea
                  placeholder="Your message..."
                  rows={5}
                  required
                  className={INPUT}
                  style={{ resize: "none" }}
                />
                <button
                  type="submit"
                  className="w-full py-[14px] rounded-full text-[15px] font-medium text-white border-none cursor-pointer btn-physical btn-physical-accent"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  <span style={{ pointerEvents: "none" }}>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="flex flex-col gap-4">
            {INFO.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="rounded-[16px] p-5 flex items-start gap-4"
                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--bg-alt)" }}
                >
                  <Icon size={16} strokeWidth={1.5} style={{ color: "var(--text-muted)" }} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--text-muted)" }}>
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="text-[14px] text-primary no-underline hover:underline">
                      {value}
                    </a>
                  ) : (
                    <p className="text-[14px] text-primary">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div
              className="rounded-[16px] p-5 text-[13px] text-secondary leading-relaxed"
              style={{ backgroundColor: "var(--bg-alt)", border: "1px solid var(--border)" }}
            >
              For order-related inquiries please include your order number in the message to help us assist you faster.
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
