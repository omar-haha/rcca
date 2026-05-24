"use client";

import { useState } from "react";
import { GlassVial } from "@/components/ui/GlassVial";
import { AppleNav } from "@/components/ui/AppleNav";
import { AppleHero } from "@/components/sections/AppleHero";
import { AppleBentoGrid } from "@/components/sections/AppleBentoGrid";
import { AppleFooter } from "@/components/sections/AppleFooter";
import { QualitySection } from "@/components/sections/QualitySection";
import { CartDrawer } from "@/components/modals/CartDrawer";
import { CheckoutModal } from "@/components/modals/CheckoutModal";
import { AgeGateModal } from "@/components/modals/AgeGateModal";
import { CartToast } from "@/components/ui/CartToast";

export default function Home() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      {/* Modals & Navigation */}
      <AgeGateModal />
      <AppleNav />
      <CartToast />
      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />

      <main className="pt-[44px]">
        {/* Hero: COA Ribbon */}
        <AppleHero
          variant="secondary"
          headline="Third-Party COA."
          subheadline="Uncompromising quality assurance on every batch."
          ctaText="View Methodology"
          ctaLink="#quality"
          ctaSecondaryText="See certifications"
          ctaSecondaryLink="#quality"
        >
          <div className="w-full flex justify-center items-end px-4 -space-x-8 md:-space-x-16">
            <GlassVial 
              productName="TB-500" 
              weight={5} 
              unit="5mg" 
              className="w-[120px] md:w-[160px] mb-[40px] md:mb-[60px] -rotate-6 z-0 opacity-90 drop-shadow-xl" 
            />
            <GlassVial 
              productName="BPC-157" 
              weight={5} 
              unit="5mg" 
              className="w-[160px] md:w-[220px] z-10 drop-shadow-2xl" 
            />
            <GlassVial 
              productName="GHK-Cu" 
              weight={50} 
              unit="50mg" 
              className="w-[120px] md:w-[160px] mb-[40px] md:mb-[60px] rotate-6 z-0 opacity-90 drop-shadow-xl" 
            />
          </div>
        </AppleHero>

        {/* Catalog: Bento Grid */}
        <AppleBentoGrid />

        {/* Quality Assurance & Legal Disclosures */}
        <QualitySection />
      </main>

      <AppleFooter />
    </>
  );
}
