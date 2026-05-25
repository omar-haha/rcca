"use client";

import { useState, useRef, useEffect } from "react";
import { getProductFamilies } from "@/lib/products";
import { GlassVial } from "@/components/ui/GlassVial";
import { ProductPickerModal } from "@/components/modals/ProductPickerModal";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductFamily } from "@/lib/products";

const FILTERS = [
  { key: "bestseller", label: "Best Sellers" },
  { key: "instock",    label: "In Stock"     },
  { key: "all",        label: "All"          },
] as const;

type FilterKey = typeof FILTERS[number]["key"];

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
  const base =
    key === "bestseller" ? all.filter((f) => f.bestSeller) :
    key === "instock"    ? all.filter((f) => f.variants.some((v) => v.stock !== "out")) :
    all;
  return base.slice().sort((a, b) => {
    const aOos = a.variants.every((v) => v.stock === "out");
    const bOos = b.variants.every((v) => v.stock === "out");
    if (aOos && !bOos) return 1;
    if (!aOos && bOos) return -1;
    return 0;
  });
}

export function AppleBentoGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("bestseller");
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
    <section id="store" className="py-[80px] md:py-[120px] bg-primary overflow-hidden">
      <ProductPickerModal family={pickerFamily} onClose={() => setPickerFamily(null)} />

      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="apple-headline mb-4">Research Store.</h2>
          <p className="apple-subheadline text-secondary">
            Precision-synthesized compounds for your next breakthrough.
          </p>
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
                      "bg-secondary rounded-[24px] overflow-hidden flex flex-col items-center pt-8 md:pt-12 relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow",
                      allOos && "opacity-60 grayscale-[0.4]"
                    )}
                  >
                    {/* Text Content */}
                    <div className="text-center px-5 md:px-8 z-10 w-full mb-6 md:mb-8">
                      <div className="text-[11px] md:text-[12px] font-semibold tracking-widest uppercase text-tertiary mb-2 md:mb-3">
                        {family.cat}
                      </div>
                      <h3 className="text-[22px] md:text-[28px] font-semibold tracking-[-0.01em] text-primary mb-1 md:mb-2">
                        {family.name}
                      </h3>
                      <div className="text-[14px] md:text-[15px] text-secondary font-normal mb-4 md:mb-5">
                        {multi
                          ? `${family.variants.length} options available`
                          : `${firstVariant.unit} · ${firstVariant.purity} Purity`}
                      </div>

                      <div className="flex flex-col items-center gap-2 md:gap-3">
                        <span className="text-[17px] md:text-[18px] text-primary font-medium">
                          {multi ? `from $${family.minPrice}` : `$${firstVariant.price.toFixed(2)}`}
                        </span>
                        <button
                          type="button"
                          disabled={allOos}
                          onClick={(e) => { e.stopPropagation(); setPickerFamily(family); }}
                          className={cn(
                            "rounded-full px-5 py-2 text-[13px] font-medium text-white cursor-pointer border-none z-20 relative",
                            allOos
                              ? "bg-surface text-tertiary cursor-not-allowed"
                              : "bg-accent hover:bg-[color:var(--accent-hover)] btn-physical btn-physical-accent"
                          )}
                        >
                          <span style={{ pointerEvents: "none" }}>
                            {allOos ? "Out of Stock" : multi ? "Select Options" : "Add to Bag"}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Vial */}
                    <div className="w-full h-[200px] md:h-[300px] mt-auto relative flex justify-center items-end">
                      <div className="absolute -bottom-[30px] md:-bottom-[40px] w-[120px] md:w-[160px] pointer-events-none group-hover:scale-[1.05] group-hover:-translate-y-4 transition-transform duration-700">
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
