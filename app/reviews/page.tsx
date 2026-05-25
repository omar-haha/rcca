"use client";

import { PageShell } from "@/components/PageShell";
import { ReviewsSection } from "@/components/sections/ReviewsSection";

export default function ReviewsPage() {
  return (
    <PageShell>
      <div className="pt-[60px]">
        <div className="max-w-[1024px] mx-auto px-4 md:px-6 pt-10 pb-2">
          <p className="text-[12px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>
            Customer Reviews
          </p>
          <h1 className="text-[34px] md:text-[44px] font-semibold tracking-tight text-primary mb-2">
            What researchers say.
          </h1>
        </div>
        <ReviewsSection />
      </div>
    </PageShell>
  );
}
