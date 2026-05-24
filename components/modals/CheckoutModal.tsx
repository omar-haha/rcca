"use client";

import { X, CheckCircle2 } from "lucide-react";
import { useCart } from "../providers/CartProvider";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function CheckoutModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const items = Object.values(cartItems);
  
  const [successOpen, setSuccessOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handlePlaceOrder = () => {
    const c1 = (document.getElementById("c1") as HTMLInputElement)?.checked;
    const c2 = (document.getElementById("c2") as HTMLInputElement)?.checked;
    const c3 = (document.getElementById("c3") as HTMLInputElement)?.checked;
    
    if (!c1 || !c2 || !c3) {
      alert("Please complete all compliance attestations to proceed.");
      return;
    }
    
    setOrderId("W" + Math.floor(100000000 + Math.random() * 900000000));
    clearCart();
    setSuccessOpen(true);
  };

  const handleCloseSuccess = () => {
    setSuccessOpen(false);
    onClose();
  };

  if (!isOpen && !successOpen) return null;

  return (
    <>
      {/* Checkout Form Modal */}
      {isOpen && !successOpen && (
        <div className="fixed inset-0 z-[3000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-primary rounded-[24px] w-full max-w-[640px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="px-8 py-6 border-b border-primary flex items-center justify-between bg-primary shrink-0">
              <h2 className="text-[24px] font-semibold tracking-tight text-primary m-0">Checkout</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-secondary text-primary border-none flex items-center justify-center cursor-pointer hover:bg-surface-hover transition-colors"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>
            
            {/* Scrollable Form Body */}
            <div className="p-8 overflow-y-auto">
              <div className="mb-10">
                <h3 className="text-[17px] font-semibold tracking-tight text-primary mb-4">Researcher Information</h3>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="w-full bg-secondary border border-transparent rounded-[12px] p-4 text-[17px] text-primary placeholder:text-secondary outline-none transition-all focus:border-[#0071e3] focus:bg-primary" />
                    <input type="text" placeholder="Last Name" className="w-full bg-secondary border border-transparent rounded-[12px] p-4 text-[17px] text-primary placeholder:text-secondary outline-none transition-all focus:border-[#0071e3] focus:bg-primary" />
                  </div>
                  <input type="email" placeholder="Institutional Email Address" className="w-full bg-secondary border border-transparent rounded-[12px] p-4 text-[17px] text-primary placeholder:text-secondary outline-none transition-all focus:border-[#0071e3] focus:bg-primary" />
                  <input type="text" placeholder="Research Institution / Lab Name" className="w-full bg-secondary border border-transparent rounded-[12px] p-4 text-[17px] text-primary placeholder:text-secondary outline-none transition-all focus:border-[#0071e3] focus:bg-primary" />
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-[17px] font-semibold tracking-tight text-primary mb-4">Shipping Address</h3>
                <div className="flex flex-col gap-4">
                  <input type="text" placeholder="Street Address" className="w-full bg-secondary border border-transparent rounded-[12px] p-4 text-[17px] text-primary placeholder:text-secondary outline-none transition-all focus:border-[#0071e3] focus:bg-primary" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="City" className="w-full bg-secondary border border-transparent rounded-[12px] p-4 text-[17px] text-primary placeholder:text-secondary outline-none transition-all focus:border-[#0071e3] focus:bg-primary" />
                    <input type="text" placeholder="Postal Code" className="w-full bg-secondary border border-transparent rounded-[12px] p-4 text-[17px] text-primary placeholder:text-secondary outline-none transition-all focus:border-[#0071e3] focus:bg-primary" />
                  </div>
                  <select className="w-full bg-secondary border border-transparent rounded-[12px] p-4 text-[17px] text-primary outline-none transition-all focus:border-[#0071e3] focus:bg-primary appearance-none cursor-pointer">
                    <option>Canada</option><option>United States</option><option>United Kingdom</option>
                    <option>Germany</option><option>Australia</option><option>Netherlands</option><option>Sweden</option>
                  </select>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-[17px] font-semibold tracking-tight text-primary mb-4">Compliance Attestations</h3>
                <div className="flex flex-col gap-4">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-6 h-6 shrink-0 mt-0.5">
                      <input type="checkbox" id="c1" className="peer appearance-none w-6 h-6 border-2 border-secondary rounded-[6px] checked:bg-[#0071e3] checked:border-[#0071e3] transition-colors cursor-pointer" />
                      <CheckCircle2 size={16} strokeWidth={3} className="absolute text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[15px] text-primary leading-snug pt-0.5">I confirm all compounds are for <strong className="font-semibold">in vitro research only</strong> and will not be used on or in any human or animal.</span>
                  </label>
                  
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-6 h-6 shrink-0 mt-0.5">
                      <input type="checkbox" id="c2" className="peer appearance-none w-6 h-6 border-2 border-secondary rounded-[6px] checked:bg-[#0071e3] checked:border-[#0071e3] transition-colors cursor-pointer" />
                      <CheckCircle2 size={16} strokeWidth={3} className="absolute text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[15px] text-primary leading-snug pt-0.5">I am a licensed researcher or authorized representative of a registered research institution.</span>
                  </label>

                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-6 h-6 shrink-0 mt-0.5">
                      <input type="checkbox" id="c3" className="peer appearance-none w-6 h-6 border-2 border-secondary rounded-[6px] checked:bg-[#0071e3] checked:border-[#0071e3] transition-colors cursor-pointer" />
                      <CheckCircle2 size={16} strokeWidth={3} className="absolute text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[15px] text-primary leading-snug pt-0.5">I have read and agree to the Legal Disclosures and Research Use Policy.</span>
                  </label>
                </div>
              </div>

              {/* Order Summary & CTA */}
              <div className="pt-6 border-t border-primary">
                <div className="flex justify-between items-end mb-6">
                  <div className="text-[15px] text-secondary">{items.length} item{items.length !== 1 && 's'}</div>
                  <div className="text-[24px] font-semibold tracking-tight text-primary">${cartTotal.toFixed(2)}</div>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#0071e3] text-white border-none py-4 rounded-[12px] text-[17px] font-normal transition-transform hover:scale-[1.01] hover:bg-[#0077ed] cursor-pointer"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successOpen && (
        <div className="fixed inset-0 z-[4000] bg-black/40 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-primary rounded-[24px] p-12 text-center max-w-[440px] w-full shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="w-[72px] h-[72px] rounded-full bg-secondary flex items-center justify-center text-[#30d158] mb-6 mx-auto">
              <CheckCircle2 size={36} strokeWidth={2} />
            </div>
            <h3 className="text-[28px] font-semibold tracking-tight mb-4 text-primary">Order Confirmed.</h3>
            <p className="text-[17px] text-secondary leading-relaxed mb-8">
              Your research order has been successfully placed. A confirmation email and COA documentation will be dispatched to your institutional address shortly.
            </p>
            <div className="bg-secondary rounded-[12px] p-4 mb-8">
              <div className="text-[13px] text-tertiary uppercase tracking-widest font-semibold mb-1">Order Number</div>
              <div className="text-[20px] font-mono text-primary">{orderId}</div>
            </div>
            <button
              onClick={handleCloseSuccess}
              className="w-full bg-surface hover:bg-surface-hover border border-primary text-primary py-4 rounded-full text-[17px] font-normal cursor-pointer transition-colors"
            >
              Return to Store
            </button>
          </div>
        </div>
      )}
    </>
  );
}
