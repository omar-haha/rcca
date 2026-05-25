"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface Review {
  name: string;
  location: string;
  product: string;
  rating: number;
  body: string;
  date: string;
}

const REVIEWS: Review[] = [
  {
    name: "Marcus T.",
    location: "Toronto, ON",
    product: "Tirzepatide",
    rating: 5,
    body: "Incredibly smooth ordering process. The compound arrived well-packaged and the purity is exactly as listed. Already seeing the results I was expecting in my research protocol.",
    date: "May 2025",
  },
  {
    name: "Sophie L.",
    location: "Montréal, QC",
    product: "BPC-157",
    rating: 5,
    body: "Fastest delivery I've ever had from a Canadian supplier. Arrived in 2 business days, lab-grade quality. Will be reordering for the next phase of our study.",
    date: "May 2025",
  },
  {
    name: "Daniel R.",
    location: "Vancouver, BC",
    product: "Retatrutide",
    rating: 5,
    body: "Outstanding quality control. The vials are properly sealed and labeled. Our research team was impressed by the consistency batch to batch. Highly recommend.",
    date: "April 2025",
  },
  {
    name: "Amir K.",
    location: "Calgary, AB",
    product: "TB-500",
    rating: 4,
    body: "Very satisfied with the product quality. Purity matches the certificate and the customer support responded quickly to a question I had about storage conditions.",
    date: "April 2025",
  },
  {
    name: "Isabelle M.",
    location: "Ottawa, ON",
    product: "Semax",
    rating: 5,
    body: "Premium product, period. Been sourcing research compounds for years and RCCA stands out in terms of consistency and professionalism. The Interac payment option is a huge plus.",
    date: "April 2025",
  },
  {
    name: "Ryan B.",
    location: "Edmonton, AB",
    product: "GHK-Cu",
    rating: 5,
    body: "The GHK-Cu arrived quickly and well within spec. Packaging is discreet and professional. Very pleased with the entire experience from ordering to delivery.",
    date: "March 2025",
  },
  {
    name: "Chloé D.",
    location: "Québec, QC",
    product: "Epithalon",
    rating: 5,
    body: "Première commande chez RCCA et je suis vraiment impressionnée. Livraison rapide, produit conforme, et le support client est réactif. Je recommande vivement.",
    date: "March 2025",
  },
  {
    name: "James W.",
    location: "Winnipeg, MB",
    product: "NAD+",
    rating: 5,
    body: "Consistent, reliable, and priced fairly. I've tried three other Canadian suppliers and none come close to the quality RCCA delivers. This is my go-to from now on.",
    date: "March 2025",
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-[14px]" style={{ color: i < rating ? '#f59e0b' : 'var(--border)' }}>
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const { t } = useLanguage();
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
                <span key={i} className="text-[16px]" style={{ color: '#f59e0b' }}>★</span>
              ))}
            </div>
            <span className="text-[14px] text-secondary">{t("reviews_sub")}</span>
          </div>
        </motion.div>

        <div className="columns-1 md:columns-2 gap-5 space-y-5">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
              className="break-inside-avoid rounded-[20px] p-6"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[14px] font-semibold text-primary">{review.name}</span>
                    <span
                      className="flex items-center gap-1 text-[11px] font-semibold rounded-full px-2 py-0.5"
                      style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#16a34a' }}
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

              <p className="mt-3 text-[11px] text-tertiary">{review.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
