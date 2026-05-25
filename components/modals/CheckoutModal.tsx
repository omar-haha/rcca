"use client";

import { X, CheckCircle2 } from "lucide-react";
import { useCart } from "../providers/CartProvider";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/Spinner";

const INPUT_CLASS =
  "w-full bg-secondary border border-transparent rounded-[12px] p-4 text-[17px] text-primary placeholder:text-secondary outline-none transition-all focus:border-[color:var(--accent)] focus:bg-primary";

const PAYMENT_OPTIONS = [
  { value: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, Amex", badges: [{ bg: "#1A1F71", text: "VISA" }, { bg: "#EB001B", text: "MC" }] },
  { value: "paypal", label: "PayPal", sub: "Pay with your PayPal account", badges: [{ bg: "#003087", text: "Pay" }, { bg: "#009CDE", text: "Pal" }] },
  { value: "etransfer", label: "Interac e-Transfer", sub: "Canadian bank transfer", badges: [] },
  { value: "crypto", label: "Cryptocurrency", sub: "BTC, ETH, USDT", badges: [] },
];

export function CheckoutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const items = Object.values(cartItems);

  const [successOpen, setSuccessOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen || successOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, successOpen]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    const formatted = val.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formatted.slice(0, 19));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length >= 2) {
      val = val.slice(0, 2) + " / " + val.slice(2, 4);
    }
    setExpiry(val);
  };

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setOrderId("W" + Math.floor(100000000 + Math.random() * 900000000));
      clearCart();
      setIsSubmitting(false);
      setSuccessOpen(true);
    }, 2000);
  };

  const handleCloseSuccess = () => {
    setSuccessOpen(false);
    setCardNumber("");
    setExpiry("");
    onClose();
  };

  if (!isOpen && !successOpen) return null;

  return (
    <>
      {/* Checkout Form Modal */}
      {isOpen && !successOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[3000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <div
            className="bg-primary rounded-[24px] w-full max-w-[640px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
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
            <div className={cn("p-8 overflow-y-auto transition-opacity duration-300", isSubmitting && "opacity-50 pointer-events-none")}>
              {/* Contact Information */}
              <div className="mb-10">
                <h3 className="text-[17px] font-semibold tracking-tight text-primary mb-4">Contact Information</h3>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className={INPUT_CLASS} />
                    <input type="text" placeholder="Last Name" className={INPUT_CLASS} />
                  </div>
                  <input type="email" placeholder="Email Address" className={INPUT_CLASS} />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-10">
                <h3 className="text-[17px] font-semibold tracking-tight text-primary mb-4">Shipping Address</h3>
                <div className="flex flex-col gap-4">
                  <input type="text" placeholder="Street Address" className={INPUT_CLASS} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="City" className={INPUT_CLASS} />
                    <input type="text" placeholder="Postal Code" className={INPUT_CLASS} />
                  </div>
                  <select className={INPUT_CLASS + " appearance-none cursor-pointer"}>
                    <option>Canada</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>Australia</option>
                    <option>Netherlands</option>
                    <option>Sweden</option>
                  </select>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-10">
                <h3 className="text-[17px] font-semibold tracking-tight text-primary mb-4">Payment Method</h3>
                <div className="flex flex-col gap-3">
                  {PAYMENT_OPTIONS.map((opt, i) => (
                    <label
                      key={opt.value}
                      className="relative flex items-center gap-4 p-4 bg-secondary rounded-[12px] cursor-pointer border border-transparent has-[:checked]:border-[color:var(--accent)] transition-all hover:scale-[1.01] active:scale-[0.99] has-[:checked]:bg-[var(--surface)]"
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.value}
                        defaultChecked={i === 0}
                        className="w-5 h-5 accent-[color:var(--accent)]"
                      />
                      <div className="flex-1">
                        <div className="text-[15px] font-medium text-primary">{opt.label}</div>
                        <div className="text-[13px] text-secondary mt-0.5">{opt.sub}</div>
                      </div>
                      {opt.badges.length > 0 && (
                        <div className="flex gap-1.5 items-center">
                          {opt.badges.map((b) => (
                            <div
                              key={b.text}
                              className="w-8 h-5 rounded-[3px] flex items-center justify-center text-white text-[7px] font-bold"
                              style={{ backgroundColor: b.bg }}
                            >
                              {b.text}
                            </div>
                          ))}
                        </div>
                      )}
                    </label>
                  ))}
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  <input type="text" placeholder="Card Number" value={cardNumber} onChange={handleCardNumberChange} maxLength={19} className={INPUT_CLASS} />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM / YY" value={expiry} onChange={handleExpiryChange} maxLength={7} className={INPUT_CLASS} />
                    <input type="text" placeholder="CVC" maxLength={4} className={INPUT_CLASS} />
                  </div>
                </div>
              </div>

              {/* Order Summary & CTA */}
              <div className="pt-6 border-t border-primary">
                <div className="flex justify-between items-end mb-6">
                  <div className="text-[15px] text-secondary">{items.length} item{items.length !== 1 && "s"}</div>
                  <div className="text-[24px] font-semibold tracking-tight text-primary">${cartTotal.toFixed(2)}</div>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="w-full text-white border-none py-4 rounded-[12px] text-[17px] font-normal transition-all hover:scale-[1.01] hover:opacity-90 cursor-pointer disabled:opacity-100 flex items-center justify-center min-h-[56px]"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {isSubmitting ? <Spinner size={24} /> : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successOpen && (
        <div data-lenis-prevent="true" className="fixed inset-0 z-[4000] bg-black/40 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-primary rounded-[24px] p-12 text-center max-w-[440px] w-full shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="w-[72px] h-[72px] rounded-full bg-secondary flex items-center justify-center text-success mb-6 mx-auto">
              <CheckCircle2 size={36} strokeWidth={2} />
            </div>
            <h3 className="text-[28px] font-semibold tracking-tight mb-4 text-primary">Order Confirmed.</h3>
            <p className="text-[17px] text-secondary leading-relaxed mb-8">
              Your order has been successfully placed. A confirmation email will be sent to you shortly.
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
