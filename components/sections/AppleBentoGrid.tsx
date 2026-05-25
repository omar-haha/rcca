"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/lib/products";
import { useCart } from "@/components/providers/CartProvider";
import { GlassVial } from "@/components/ui/GlassVial";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const FILTERS = [
  { key: "bestseller", label: "Best Sellers" },
  { key: "instock",    label: "In Stock"     },
  { key: "all",        label: "All"          },
] as const;

type FilterKey = typeof FILTERS[number]["key"];

const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
  exit:   { transition: { staggerChildren: 0.03, staggerDirection: -1 as const } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 20 } },
  exit:   { opacity: 0, y: -12, transition: { duration: 0.15, ease: "easeIn" as const } },
};

function getFiltered(key: FilterKey) {
  const base =
    key === "bestseller" ? products.filter((p) => p.bestSeller) :
    key === "instock"    ? products.filter((p) => p.stock !== "out") :
    products;
  return base.slice().sort((a, b) => {
    if (a.stock === "out" && b.stock !== "out") return 1;
    if (a.stock !== "out" && b.stock === "out") return -1;
    return 0;
  });
}

export function AppleBentoGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("bestseller");
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const router = useRouter();

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

  const handleAdd = (p: typeof products[number]) => {
    addToCart(p, 1);
    setClickedId(p.id);
    setTimeout(() => setClickedId(null), 420);
  };

  const filteredProducts = getFiltered(activeFilter);

  return (
    <section id="store" className="py-[80px] md:py-[120px] bg-primary overflow-hidden">
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
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredProducts.map((p) => {
                const oos = p.stock === "out";
                return (
                  <motion.div
                    variants={itemVariants}
                    key={p.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => router.push(`/products/${p.id}`)}
                    className={cn(
                      "bg-secondary rounded-[24px] overflow-hidden flex flex-col items-center pt-8 md:pt-12 relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow",
                      oos && "opacity-60 grayscale-[0.4]"
                    )}
                  >
                    {/* Text Content */}
                    <div className="text-center px-5 md:px-8 z-10 w-full mb-6 md:mb-8">
                      <div className="text-[11px] md:text-[12px] font-semibold tracking-widest uppercase text-tertiary mb-2 md:mb-3">
                        {p.cat}
                      </div>
                      <h3 className="text-[22px] md:text-[28px] font-semibold tracking-[-0.01em] text-primary mb-1 md:mb-2">
                        {p.name}
                      </h3>
                      <div className="text-[14px] md:text-[15px] text-secondary font-normal mb-4 md:mb-5">
                        {p.unit} · {p.purity} Purity
                      </div>

                      <div className="flex flex-col items-center gap-2 md:gap-3">
                        <span className="text-[17px] md:text-[18px] text-primary font-medium">
                          ${p.price.toFixed(2)}
                        </span>
                        <button
                          type="button"
                          disabled={oos}
                          onClick={(e) => { e.stopPropagation(); if (!oos) handleAdd(p); }}
                          className={cn(
                            "rounded-full px-5 py-2 text-[13px] font-medium text-white cursor-pointer border-none z-20 relative",
                            oos
                              ? "bg-surface text-tertiary cursor-not-allowed"
                              : clickedId === p.id
                              ? "bg-accent animate-btn-pop"
                              : "bg-accent hover:bg-[color:var(--accent-hover)] btn-physical btn-physical-accent"
                          )}
                        >
                          <span
                            className={clickedId === p.id ? "animate-text-warp" : undefined}
                            style={{ pointerEvents: "none" }}
                          >
                            Add to Bag
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Vial */}
                    <div className="w-full h-[200px] md:h-[300px] mt-auto relative flex justify-center items-end">
                      <div
                        className="absolute -bottom-[30px] md:-bottom-[40px] w-[120px] md:w-[160px] pointer-events-none group-hover:scale-[1.05] group-hover:-translate-y-4 transition-transform duration-700"
                      >
                        <GlassVial productName={p.name} weight={20} unit={p.unit} />
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
