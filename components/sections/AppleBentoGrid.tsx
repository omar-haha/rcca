"use client";

import { useState, useRef, useEffect } from "react";
import { getProductFamilies } from "@/lib/products";
import { GlassVial } from "@/components/ui/GlassVial";
import { ProductPickerModal } from "@/components/modals/ProductPickerModal";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { ProductFamily, BenefitTag } from "@/lib/products";
import type { TranslationKey } from "@/lib/i18n";

const TAG_KEY: Record<BenefitTag, TranslationKey> = {
  'Weight Loss':   'tag_weight',
  'Muscle Growth': 'tag_muscle',
  'Recovery':      'tag_recovery',
  'Anti-Aging':    'tag_anti_age',
  'Cognitive':     'tag_cognitive',
  'Tanning':       'tag_tanning',
  'Libido':        'tag_libido',
  'Ancillary':     'tag_ancillary',
};

const TAG_STYLES: Record<BenefitTag, { bg: string; color: string }> = {
  'Weight Loss':   { bg: 'rgba(59,130,246,0.12)',  color: '#3b82f6' },
  'Muscle Growth': { bg: 'rgba(34,197,94,0.12)',   color: '#16a34a' },
  'Recovery':      { bg: 'rgba(251,146,60,0.12)',  color: '#ea580c' },
  'Anti-Aging':    { bg: 'rgba(168,85,247,0.12)',  color: '#9333ea' },
  'Cognitive':     { bg: 'rgba(6,182,212,0.12)',   color: '#0891b2' },
  'Tanning':       { bg: 'rgba(245,158,11,0.12)',  color: '#d97706' },
  'Libido':        { bg: 'rgba(239,68,68,0.12)',   color: '#dc2626' },
  'Ancillary':     { bg: 'rgba(107,114,128,0.12)', color: '#6b7280' },
};

function seedRating(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  return 4.6 + ((h >>> 0) % 5) * 0.1;
}

function seedReviewCount(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 37 + name.charCodeAt(i)) & 0xffffffff;
  return 18 + ((h >>> 0) % 83);
}

type FilterKey = "all" | BenefitTag;

const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
  exit:   { transition: { staggerChildren: 0.03, staggerDirection: -1 as const } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 20 } },
  exit:   { opacity: 0, y: -12, transition: { duration: 0.15, ease: "easeIn" as const } },
};

function getFiltered(key: FilterKey): ProductFamily[] {
  const all = getProductFamilies();
  const base = key === "all" ? all : all.filter((f) => f.tag === key);
  return base.slice().sort((a, b) => {
    const aOos = a.variants.every((v) => v.stock === "out");
    const bOos = b.variants.every((v) => v.stock === "out");
    if (aOos && !bOos) return 1;
    if (!aOos && bOos) return -1;
    return 0;
  });
}

export function AppleBentoGrid() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all",           label: t("filter_all") },
    { key: "Weight Loss",   label: t("tag_weight") },
    { key: "Muscle Growth", label: t("tag_muscle") },
    { key: "Recovery",      label: t("tag_recovery") },
    { key: "Anti-Aging",    label: t("tag_anti_age") },
    { key: "Cognitive",     label: t("tag_cognitive") },
    { key: "Tanning",       label: t("tag_tanning") },
    { key: "Libido",        label: t("tag_libido") },
    { key: "Ancillary",     label: t("tag_ancillary") },
  ];
  const [pickerFamily, setPickerFamily] = useState<ProductFamily | null>(null);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "-80px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const families = getFiltered(activeFilter);

  return (
    <section id="store" className="pt-[48px] pb-[80px] md:pt-[60px] md:pb-[100px] bg-primary overflow-hidden">
      <ProductPickerModal family={pickerFamily} onClose={() => setPickerFamily(null)} />

      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="apple-headline mb-4">{t("store_headline")}</h2>
          <p className="apple-subheadline text-secondary">{t("store_sub")}</p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-2 flex-wrap mb-12"
        >
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={cn(
                "rounded-full px-5 py-2 text-[14px] font-medium transition-colors duration-300 border-none cursor-pointer",
                activeFilter === key
                  ? "bg-primary text-secondary border border-primary shadow-[0_0_0_1px_var(--text)]"
                  : "bg-surface text-secondary hover:text-primary hover:bg-surface-hover"
              )}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <div ref={sectionRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={containerVariants}
              initial="hidden"
              animate={revealed ? "show" : "hidden"}
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {families.map((family) => {
                const allOos = family.variants.every((v) => v.stock === "out");
                const multi = family.variants.length > 1;
                const firstVariant = family.variants[0];

                return (
                  <motion.div
                    variants={itemVariants}
                    key={family.name}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setPickerFamily(family)}
                    className={cn(
                      "bg-secondary rounded-[24px] overflow-hidden flex flex-row relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow min-h-[164px]",
                      allOos && "opacity-60 grayscale-[0.4]"
                    )}
                  >
                    {/* Left — Text */}
                    <div className="flex-1 flex flex-col px-5 py-5 md:px-6 md:py-6 z-10">
                      <span
                        className="self-start rounded-full px-3 py-0.5 text-[11px] font-semibold tracking-wide mb-2.5"
                        style={{ backgroundColor: TAG_STYLES[family.tag].bg, color: TAG_STYLES[family.tag].color }}
                      >
                        {t(TAG_KEY[family.tag])}
                      </span>

                      <h3 className="text-[18px] md:text-[20px] font-semibold tracking-[-0.01em] text-primary mb-1 leading-snug">
                        {family.name}
                      </h3>

                      <div className="flex items-center gap-1 mb-1.5">
                        <span className="text-[12px]" style={{ color: "#f59e0b" }}>★</span>
                        <span className="text-[12px] font-medium text-primary">{seedRating(family.name).toFixed(1)}</span>
                        <span className="text-[11px] text-tertiary">({seedReviewCount(family.name)})</span>
                      </div>

                      <p className="text-[13px] text-secondary mb-0">
                        {multi ? `${family.variants.length} ${t("card_options")}` : firstVariant.unit}
                      </p>

                      <div className="mt-auto pt-3 flex items-center gap-3 flex-wrap">
                        <span className="text-[15px] md:text-[16px] text-primary font-medium">
                          {multi ? `${t("card_from")} $${family.minPrice}` : `$${firstVariant.price.toFixed(2)}`}
                        </span>
                        <button
                          type="button"
                          disabled={allOos}
                          onClick={(e) => { e.stopPropagation(); setPickerFamily(family); }}
                          className={cn(
                            "rounded-full px-4 py-1.5 text-[12px] font-medium cursor-pointer border-none z-20 relative",
                            allOos
                              ? "bg-surface text-tertiary cursor-not-allowed"
                              : "bg-accent text-white hover:bg-[color:var(--accent-hover)] btn-physical btn-physical-accent"
                          )}
                        >
                          <span style={{ pointerEvents: "none" }}>
                            {allOos ? t("card_oos") : multi ? t("card_select") : t("card_add")}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Right — Vial */}
                    <div className="relative w-[96px] md:w-[112px] flex-shrink-0">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[76px] md:w-[90px] pointer-events-none group-hover:scale-[1.05] group-hover:-translate-y-2 transition-transform duration-700">
                        <GlassVial productName={family.name} weight={20} unit={firstVariant.unit} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
