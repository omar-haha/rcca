"use client";

import { AppleNav } from "@/components/ui/AppleNav";
import { SplineHero } from "@/components/sections/SplineHero";
import { Spline3DShowcase } from "@/components/sections/Spline3DShowcase";
import { SplineFeatureGrid } from "@/components/sections/SplineFeatureGrid";
import { SplineCTA } from "@/components/sections/SplineCTA";
import { AppleFooter } from "@/components/sections/AppleFooter";

export default function ThreeDPage() {
  return (
    <>
      <AppleNav />

      <main className="pt-[44px]">
        {/* Full-viewport 3D Hero */}
        <SplineHero />

        {/* 3D Product Showcase — split layout */}
        <Spline3DShowcase />

        {/* Feature Bento Grid with 3D cards */}
        <SplineFeatureGrid />

        {/* Final CTA with 3D background */}
        <SplineCTA />
      </main>

      <AppleFooter />
    </>
  );
}
