"use client";

import { useState } from "react";
import { AppleNav } from "@/components/ui/AppleNav";
import { AppleFooter } from "@/components/sections/AppleFooter";
import { CartDrawer } from "@/components/modals/CartDrawer";
import { CartToast } from "@/components/ui/CartToast";
import { CheckoutModal } from "@/components/modals/CheckoutModal";
import { AgeGateModal } from "@/components/modals/AgeGateModal";

export function PageShell({ children }: { children: React.ReactNode }) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  return (
    <>
      <AgeGateModal />
      <AppleNav />
      <CartToast />
      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <main className="pt-[44px]">{children}</main>
      <AppleFooter />
    </>
  );
}
