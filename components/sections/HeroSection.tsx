"use client";

import { GlassVial } from "../ui/GlassVial";

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center pt-[120px] px-6 overflow-hidden">
      {/* Background Depth-of-Field Vials */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-40">
        <div className="absolute -translate-x-[400px] translate-y-10 scale-90">
          <GlassVial productName="" weight={100} unit="" blur className="w-[300px]" />
        </div>
        <div className="absolute translate-x-[400px] translate-y-20 scale-75">
          <GlassVial productName="" weight={100} unit="" blur className="w-[300px]" />
        </div>
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto flex flex-col items-center">
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-tertiary mb-7">
          Research Grade · HPLC Verified · ISO Compliant
        </p>
        
        <h1 className="text-[clamp(48px,7vw,88px)] font-light tracking-[-0.04em] leading-[1.04] mb-6 text-primary">
          The standard for<br />
          <strong className="font-semibold">peptide research.</strong>
        </h1>
        
        <p className="text-[clamp(17px,2vw,21px)] text-secondary max-w-[560px] leading-[1.55] mb-12 font-light tracking-[-0.01em]">
          Every compound we supply undergoes rigorous third-party verification. Precision-synthesized.
          Independently certified. Delivered to research facilities worldwide.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => scrollTo("catalog")}
            className="bg-blue-500 text-white border-none py-[15px] px-7 rounded-full text-[15px] font-medium cursor-pointer transition-transform hover:scale-[1.01] hover:bg-blue-600 tracking-tight shadow-lg shadow-blue-500/20"
          >
            Browse Catalog
          </button>
          <button
            onClick={() => scrollTo("purity")}
            className="bg-transparent text-blue-500 border border-blue-500/30 py-[15px] px-7 rounded-full text-[15px] font-medium cursor-pointer transition-all hover:bg-blue-500/10 hover:border-blue-500 tracking-tight"
          >
            Verification Process →
          </button>
        </div>

        <div className="flex gap-6 mt-[72px] flex-wrap justify-center">
          {[
            "≥98% Average Purity",
            "Third-Party COA",
            "Lyophilized & Sealed",
            "Cold-Chain Shipping",
          ].map((label) => (
            <div className="flex items-center gap-2 text-xs text-tertiary tracking-[0.01em]" key={label}>
              <div className="w-[5px] h-[5px] rounded-full bg-green-500" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Macro Hero Shot: Scaled up GlassVial cropping out the bottom */}
      <div className="relative z-0 mt-20 w-[1000px] flex justify-center -mb-[400px] pointer-events-none">
        <GlassVial 
          productName="BPC-157" 
          weight={10} 
          unit="5mg" 
          className="w-full"
        />
        {/* Fade gradient at the bottom to blend into the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-primary to-transparent z-30" />
      </div>
    </section>
  );
}
