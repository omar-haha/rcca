"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface Review {
  id: string;
  name: string;
  location: string;
  product: string;
  rating: number;
  body: string;
  date_label: string;
}

const FALLBACK: Review[] = [
  { id: "h1", name: "Marcus T.",   location: "Toronto, ON",   product: "Tirzepatide", rating: 5, body: "Incredibly smooth ordering process. The compound arrived well-packaged and the purity is exactly as listed. Already seeing the results I was expecting in my research protocol.", date_label: "May 2025" },
  { id: "h2", name: "Sophie L.",   location: "Montréal, QC",  product: "BPC-157",     rating: 5, body: "Fastest delivery I've ever had from a Canadian supplier. Arrived in 2 business days, lab-grade quality. Will be reordering for the next phase of our study.",                  date_label: "May 2025" },
  { id: "h3", name: "Daniel R.",   location: "Vancouver, BC", product: "Retatrutide", rating: 5, body: "Outstanding quality control. The vials are properly sealed and labeled. Our research team was impressed by the consistency batch to batch. Highly recommend.",                 date_label: "April 2025" },
];

export function HomepageReviews() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>(FALLBACK);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data: Review[]) => { if (data.length > 0) setReviews(data.slice(0, 3)); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-[72px] md:py-[96px]" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="flex items-end justify-between mb-8 gap-4"
        >
          <div>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-[15px]" style={{ color: "#f59e0b" }}>★</span>
              ))}
            </div>
            <h2 className="text-[24px] md:text-[30px] font-semibold tracking-tight text-primary leading-tight">
              {t("reviews_headline")}
            </h2>
            <p className="text-[14px] text-secondary mt-1">{t("reviews_sub")}</p>
          </div>
          <Link
            href="/reviews"
            className="shrink-0 text-[13px] font-medium no-underline transition-opacity opacity-60 hover:opacity-100 whitespace-nowrap"
            style={{ color: "var(--text)" }}
          >
            {t("reviews_see_all")} →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="rounded-[18px] p-5"
              style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[13px] font-semibold text-primary">{review.name}</span>
                    <span
                      className="text-[10px] font-semibold rounded-full px-1.5 py-0.5"
                      style={{ backgroundColor: "rgba(34,197,94,0.12)", color: "#16a34a" }}
                    >
                      ✓ {t("reviews_badge")}
                    </span>
                  </div>
                  <p className="text-[11px] text-tertiary">{review.location}</p>
                </div>
                <span
                  className="shrink-0 text-[10px] font-medium rounded-full px-2 py-0.5"
                  style={{ backgroundColor: "var(--bg-alt)", color: "var(--text-muted)" }}
                >
                  {review.product}
                </span>
              </div>
              <div className="flex gap-0.5 mb-2.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-[12px]" style={{ color: i < review.rating ? "#f59e0b" : "var(--border)" }}>★</span>
                ))}
              </div>
              <p className="text-[12px] text-secondary leading-relaxed line-clamp-4">{review.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
