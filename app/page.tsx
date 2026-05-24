"use client";

import { useState } from "react";
import { GlassVial } from "@/components/ui/GlassVial";
import { AppleNav } from "@/components/ui/AppleNav";
import { AppleHero } from "@/components/sections/AppleHero";
import { AppleBentoGrid } from "@/components/sections/AppleBentoGrid";
import { AppleFooter } from "@/components/sections/AppleFooter";
import { CartDrawer } from "@/components/modals/CartDrawer";
import { CheckoutModal } from "@/components/modals/CheckoutModal";
import { AgeGateModal } from "@/components/modals/AgeGateModal";

export default function Home() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      {/* Modals & Navigation */}
      <AgeGateModal />
      <AppleNav />
      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />

      <main className="pt-[44px]">
        {/* Hero 1: Primary Ribbon */}
        <AppleHero
          variant="primary"
          headline={
            <>
              Retatrutide. <br className="hidden md:block" />
              The New Standard.
            </>
          }
          subheadline="Next-generation tri-agonist for advanced metabolic research."
          ctaText="Shop Retatrutide"
          ctaLink="#store"
          ctaSecondaryText="Learn more"
          ctaSecondaryLink="#quality"
        >
          <div className="w-[400px] max-w-full flex justify-center -mb-[100px]">
            <GlassVial productName="Retatrutide" weight={10} unit="10mg" className="w-full max-w-[280px]" />
          </div>
        </AppleHero>

        {/* Hero 2: Secondary Ribbon */}
        <AppleHero
          variant="secondary"
          headline="Third-Party COA."
          subheadline="Uncompromising quality assurance on every batch."
          ctaText="View Methodology"
          ctaLink="#quality"
          ctaSecondaryText="See certifications"
          ctaSecondaryLink="#quality"
        >
          <div className="w-full flex justify-center items-end px-4 gap-4 md:gap-8">
            <GlassVial productName="TB-500" weight={5} unit="5mg" className="w-[120px] md:w-[160px] -mb-[20px]" />
            <GlassVial productName="BPC-157" weight={5} unit="5mg" className="w-[160px] md:w-[200px] z-10" />
            <GlassVial productName="GHK-Cu" weight={50} unit="50mg" className="w-[120px] md:w-[160px] -mb-[20px]" />
          </div>
        </AppleHero>

        {/* Catalog: Bento Grid */}
        <AppleBentoGrid />
      </main>

      <AppleFooter />
    </>
  );
}
