"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { products } from "@/lib/products";

const PRODUCT_NAMES = [...new Set(products.map((p) => p.name))].sort();

const SEED_REVIEWS: Review[] = [
  { id: "s1", name: "Marcus T.",   location: "Toronto, ON",   product: "Tirzepatide",   rating: 5, body: "Incredibly smooth ordering process. The compound arrived well-packaged and the purity is exactly as listed. Already seeing the results I was expecting in my research protocol.",              date_label: "May 2025"   },
  { id: "s2", name: "Sophie L.",   location: "Montréal, QC",  product: "BPC-157",       rating: 5, body: "Fastest delivery I've ever had from a Canadian supplier. Arrived in 2 business days, lab-grade quality. Will be reordering for the next phase of our study.",                           date_label: "May 2025"   },
  { id: "s3", name: "Daniel R.",   location: "Vancouver, BC", product: "Retatrutide",   rating: 5, body: "Outstanding quality control. The vials are properly sealed and labeled. Our research team was impressed by the consistency batch to batch. Highly recommend.",                          date_label: "April 2025" },
  { id: "s4", name: "Amir K.",     location: "Calgary, AB",   product: "TB-500",        rating: 4, body: "Very satisfied with the product quality. Purity matches the certificate and the customer support responded quickly to a question I had about storage conditions.",                       date_label: "April 2025" },
  { id: "s5", name: "Isabelle M.", location: "Ottawa, ON",    product: "Semax",         rating: 5, body: "Premium product, period. Been sourcing research compounds for years and RCCA stands out in terms of consistency and professionalism. The Interac payment option is a huge plus.",        date_label: "April 2025" },
  { id: "s6", name: "Ryan B.",     location: "Edmonton, AB",  product: "GHK-Cu",        rating: 5, body: "The GHK-Cu arrived quickly and well within spec. Packaging is discreet and professional. Very pleased with the entire experience from ordering to delivery.",                          date_label: "March 2025" },
  { id: "s7", name: "Chloé D.",    location: "Québec, QC",    product: "Epithalon",     rating: 5, body: "Première commande chez RCCA et je suis vraiment impressionnée. Livraison rapide, produit conforme, et le support client est réactif. Je recommande vivement.",                        date_label: "March 2025" },
  { id: "s8", name: "James W.",    location: "Winnipeg, MB",  product: "NAD+",          rating: 5, body: "Consistent, reliable, and priced fairly. I've tried three other Canadian suppliers and none come close to the quality RCCA delivers. This is my go-to from now on.",                   date_label: "March 2025" },
];

interface Review {
  id: string;
  name: string;
  location: string;
  product: string;
  rating: number;
  body: string;
  date_label: string;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-[14px]" style={{ color: i < rating ? "#f59e0b" : "var(--border)" }}>
          ★
        </span>
      ))}
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const v = i + 1;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            onMouseEnter={() => setHover(v)}
            onMouseLeave={() => setHover(0)}
            className="text-[22px] border-none bg-transparent cursor-pointer p-0 leading-none"
            style={{ color: v <= (hover || value) ? "#f59e0b" : "var(--border)" }}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

export function ReviewsSection() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", location: "", product: PRODUCT_NAMES[0], rating: 0, body: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data: Review[]) => setReviews(data.length > 0 ? data : SEED_REVIEWS))
      .catch(() => setReviews(SEED_REVIEWS))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.body.trim() || form.rating === 0) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      setShowForm(false);
    } catch {
      setSubmitError(t("reviews_write_error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-[80px] md:py-[100px] bg-secondary overflow-hidden">
      <div className="max-w-[1024px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-[28px] md:text-[34px] font-semibold tracking-tight text-primary mb-3">
            {t("reviews_headline")}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-[16px]" style={{ color: "#f59e0b" }}>★</span>
              ))}
            </div>
            <span className="text-[14px] text-secondary">{t("reviews_sub")}</span>
          </div>
        </motion.div>

        {loading ? (
          <p className="text-center text-secondary text-[14px] py-12">{t("reviews_loading")}</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-secondary text-[14px] py-12">{t("reviews_none")}</p>
        ) : (
          <div className="columns-1 md:columns-2 gap-5 space-y-5">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                className="break-inside-avoid rounded-[20px] p-6"
                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[14px] font-semibold text-primary">{review.name}</span>
                      <span
                        className="flex items-center gap-1 text-[11px] font-semibold rounded-full px-2 py-0.5"
                        style={{ backgroundColor: "rgba(34,197,94,0.12)", color: "#16a34a" }}
                      >
                        ✓ {t("reviews_badge")}
                      </span>
                    </div>
                    <p className="text-[12px] text-tertiary">{review.location}</p>
                  </div>
                  <span
                    className="shrink-0 text-[11px] font-medium rounded-full px-2.5 py-1"
                    style={{ backgroundColor: "var(--bg-alt)", color: "var(--text-muted)" }}
                  >
                    {review.product}
                  </span>
                </div>
                <StarRow rating={review.rating} />
                <p className="mt-3 text-[13px] text-secondary leading-relaxed">{review.body}</p>
                <p className="mt-3 text-[11px] text-tertiary">{review.date_label}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Write a review */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          {submitted ? (
            <p className="text-[14px] text-center" style={{ color: "#16a34a" }}>
              {t("reviews_write_success")}
            </p>
          ) : (
            <>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="rounded-full px-6 py-3 text-[14px] font-medium border cursor-pointer transition-all duration-150 hover:opacity-80"
                  style={{ backgroundColor: "transparent", borderColor: "var(--border)", color: "var(--text-muted)" }}
                >
                  {t("reviews_write_btn")}
                </button>
              )}

              {showForm && (
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-[560px] rounded-[20px] p-6 flex flex-col gap-4"
                  style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <h3 className="text-[18px] font-semibold text-primary">{t("reviews_write_title")}</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      required
                      placeholder={t("reviews_write_name")}
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="rounded-[10px] px-4 py-2.5 text-[14px] outline-none col-span-2 md:col-span-1"
                      style={{ backgroundColor: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
                    />
                    <input
                      placeholder={t("reviews_write_location")}
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                      className="rounded-[10px] px-4 py-2.5 text-[14px] outline-none col-span-2 md:col-span-1"
                      style={{ backgroundColor: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
                    />
                  </div>

                  <select
                    value={form.product}
                    onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
                    className="rounded-[10px] px-4 py-2.5 text-[14px] outline-none"
                    style={{ backgroundColor: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
                  >
                    {PRODUCT_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>

                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                      {t("reviews_write_rating")}
                    </p>
                    <StarPicker value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
                  </div>

                  <textarea
                    required
                    rows={4}
                    placeholder={t("reviews_write_body")}
                    value={form.body}
                    onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                    className="rounded-[10px] px-4 py-2.5 text-[14px] outline-none resize-none"
                    style={{ backgroundColor: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
                  />

                  {submitError && (
                    <p className="text-[13px]" style={{ color: "#dc2626" }}>{submitError}</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={submitting || form.rating === 0}
                      className="flex-1 py-3 rounded-full text-[14px] font-medium text-white border-none cursor-pointer disabled:opacity-40"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      {submitting ? "…" : t("reviews_write_submit")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-5 py-3 rounded-full text-[14px] font-medium border cursor-pointer"
                      style={{ backgroundColor: "transparent", borderColor: "var(--border)", color: "var(--text-muted)" }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
