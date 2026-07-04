import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, ShoppingBag, Plus, Minus, Tag, Check, Download, Landmark, CreditCard, ChevronRight } from "lucide-react";
import { CartItem, DigitalProduct } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Checkout flows
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "receipt">("cart");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "kbzpay" | "wavepay" | "paypal">("kbzpay");
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!isOpen) {
      // Reset checkout states on close
      setCheckoutStep("cart");
      setPromoCode("");
      setDiscountPercent(0);
      setAppliedPromo(null);
      setPromoError(null);
    }
  }, [isOpen]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Number((subtotal * (discountPercent / 100)).toFixed(2));
  const finalTotal = Number((subtotal - discountAmount).toFixed(2));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const code = promoCode.trim().toUpperCase();

    if (code === "WELCOME10") {
      setDiscountPercent(10);
      setAppliedPromo("WELCOME10 (10% OFF)");
      setPromoCode("");
    } else if (code === "APP20") {
      setDiscountPercent(20);
      setAppliedPromo("APP20 (20% OFF)");
      setPromoCode("");
    } else {
      setPromoError("သက်တမ်းရှိသော Promo Code မဟုတ်ပါ။ (Try 'WELCOME10' or 'APP20')");
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !emailAddress) return;
    setCheckoutStep("receipt");
  };

  const simulateDownload = (productId: string, fileName: string) => {
    setDownloadProgress(prev => ({ ...prev, [productId]: 5 }));
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const current = prev[productId] || 0;
        if (current >= 100) {
          clearInterval(interval);
          return { ...prev, [productId]: 100 };
        }
        return { ...prev, [productId]: current + 25 };
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#09090b] border-l border-neutral-800 shadow-2xl z-50 flex flex-col justify-between overflow-hidden"
          >
            {/* Header bar */}
            <div className="p-6 border-b border-neutral-800/80 flex items-center justify-between bg-[#070708]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-neon" />
                <h3 className="font-display font-extrabold text-lg text-white">Your Shopping Cart</h3>
                <span className="text-[10px] font-mono bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full text-neutral-400">
                  {cartItems.length} items
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main drawer content panel */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {checkoutStep === "cart" && (
                <>
                  {cartItems.length > 0 ? (
                    <div className="space-y-4">
                      {/* Products List */}
                      {cartItems.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex gap-4 p-4 rounded-xl border border-neutral-800/60 bg-[#0d0d0f]/40 relative overflow-hidden"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-lg object-cover border border-neutral-800"
                            referrerPolicy="no-referrer"
                          />
                          
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between gap-2">
                                <h4 className="font-display font-bold text-sm text-white line-clamp-1">{item.product.name}</h4>
                                <span className="font-mono text-xs text-brand-neon font-bold">${item.product.price}</span>
                              </div>
                              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mt-0.5">
                                {item.product.category}
                              </span>
                            </div>

                            {/* Quantity operators */}
                            <div className="flex justify-between items-center mt-2 pt-2 border-t border-neutral-800/30">
                              <div className="flex items-center bg-neutral-900 rounded-lg p-0.5 border border-neutral-800/80">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="p-1 rounded-md text-neutral-400 hover:bg-neutral-800 hover:text-white"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-mono text-xs text-white px-2.5 font-bold">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="p-1 rounded-md text-neutral-400 hover:bg-neutral-800 hover:text-white"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveItem(item.product.id)}
                                className="p-1 text-neutral-500 hover:text-red-400"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Promo Code Input Form */}
                      <form onSubmit={handleApplyPromo} className="pt-4 border-t border-neutral-800/60">
                        <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-2">Have a Promo Coupon?</span>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="e.g. WELCOME10 or APP20"
                            className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 uppercase focus:outline-none focus:border-brand-neon font-mono"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-medium text-xs rounded-lg flex items-center gap-1 font-mono"
                          >
                            <Tag className="w-3.5 h-3.5" />
                            <span>Apply</span>
                          </button>
                        </div>

                        {appliedPromo && (
                          <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-brand-emerald">
                            <Check className="w-3.5 h-3.5" />
                            <span>Promo active: {appliedPromo}</span>
                          </div>
                        )}

                        {promoError && (
                          <p className="text-[10px] font-mono text-red-400 mt-2">{promoError}</p>
                        )}
                      </form>
                    </div>
                  ) : (
                    <div className="py-24 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800/80 flex items-center justify-center mx-auto text-neutral-600">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-base text-white">Your cart is empty</h4>
                        <p className="text-xs text-neutral-500 mt-1.5 font-light leading-relaxed">
                          Premium UI kits and digital boilerplate templates are waiting for your brand project.
                        </p>
                      </div>
                      <button
                        onClick={onClose}
                        className="px-4 py-2 border border-neutral-800 hover:border-brand-neon text-xs font-mono rounded-lg text-neutral-400 hover:text-brand-neon transition-colors"
                      >
                        Explore Products
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* STEP 2: Checkout Form details */}
              {checkoutStep === "form" && (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <h4 className="font-display font-bold text-white text-base">Billing Contact Details</h4>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed">
                    သင်ဝယ်ယူထားတဲ့ digital assets တွေကို download ဆွဲဖို့ email လိပ်စာကို အမှန်ကန်ဖြည့်ပေးပါ။
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-neon transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Email Address (Direct Delivery)</label>
                      <input
                        type="email"
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="johndoe@gmail.com"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-neon transition-all"
                      />
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="pt-4 border-t border-neutral-800/80 mt-6">
                    <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-3">Choose Payment Channel</label>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("kbzpay")}
                        className={`p-3 rounded-xl border flex items-center gap-2 text-left ${
                          paymentMethod === "kbzpay"
                            ? "bg-brand-neon/10 border-brand-neon text-white"
                            : "bg-[#0d0d0f] border-neutral-800 text-neutral-400 hover:text-white"
                        }`}
                      >
                        <Landmark className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <div>
                          <span className="text-[11px] font-bold block leading-none">KBZPay</span>
                          <span className="text-[8px] font-mono text-neutral-500">Instant MMK</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("wavepay")}
                        className={`p-3 rounded-xl border flex items-center gap-2 text-left ${
                          paymentMethod === "wavepay"
                            ? "bg-brand-neon/10 border-brand-neon text-white"
                            : "bg-[#0d0d0f] border-neutral-800 text-neutral-400 hover:text-white"
                        }`}
                      >
                        <Landmark className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                        <div>
                          <span className="text-[11px] font-bold block leading-none">WavePay</span>
                          <span className="text-[8px] font-mono text-neutral-500">Instant MMK</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-3 rounded-xl border flex items-center gap-2 text-left ${
                          paymentMethod === "card"
                            ? "bg-brand-neon/10 border-brand-neon text-white"
                            : "bg-[#0d0d0f] border-neutral-800 text-neutral-400 hover:text-white"
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <div>
                          <span className="text-[11px] font-bold block leading-none">Visa/Master</span>
                          <span className="text-[8px] font-mono text-neutral-500">International</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("paypal")}
                        className={`p-3 rounded-xl border flex items-center gap-2 text-left ${
                          paymentMethod === "paypal"
                            ? "bg-brand-neon/10 border-brand-neon text-white"
                            : "bg-[#0d0d0f] border-neutral-800 text-neutral-400 hover:text-white"
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <div>
                          <span className="text-[11px] font-bold block leading-none">PayPal</span>
                          <span className="text-[8px] font-mono text-neutral-500">USD Checkout</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Pricing Overview */}
                  <div className="bg-neutral-900/30 border border-neutral-800/60 p-4 rounded-xl mt-6 space-y-2 text-xs font-mono text-neutral-400">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="text-white">${subtotal}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-brand-emerald">
                        <span>Discount Coupon:</span>
                        <span>-${discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-neutral-800 pt-2 text-white font-bold text-sm">
                      <span>Grand Total:</span>
                      <span className="text-brand-neon">${finalTotal}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep("cart")}
                      className="px-4 py-3 border border-neutral-800 text-neutral-400 text-xs rounded-xl"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-brand-neon text-black font-semibold text-xs rounded-xl hover:bg-[#8ece2c] transition-all"
                    >
                      Confirm Order & Unlock Downloads
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Receipt & Download Area */}
              {checkoutStep === "receipt" && (
                <div className="space-y-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-lg text-white">Order Confirmed!</h4>
                    <p className="text-xs text-neutral-400 mt-2 font-light leading-relaxed">
                      ကျေးဇူးတင်ရှိပါသည်။ သင့်ရဲ့ ငွေပေးချေမှု အောင်မြင်ပြီးစီးပါပြီ။ ဝယ်ယူထားတဲ့ ဖိုင်များကို ချက်ချင်း ဒေါင်းလုဒ်ဆွဲယူနိုင်ပါပြီ။
                    </p>
                  </div>

                  <div className="border border-neutral-800/60 p-4 rounded-xl text-left bg-neutral-900/20 text-xs space-y-1 font-mono text-neutral-400">
                    <div><span className="text-neutral-500">Receipt ID:</span> <span className="text-white">APP-73892-MM</span></div>
                    <div><span className="text-neutral-500">Delivered to:</span> <span className="text-white">{emailAddress}</span></div>
                    <div><span className="text-neutral-500">Method:</span> <span className="text-white uppercase">{paymentMethod}</span></div>
                    <div><span className="text-neutral-500">Amount Paid:</span> <span className="text-brand-neon font-bold">${finalTotal}</span></div>
                  </div>

                  {/* Downloads Links */}
                  <div className="space-y-3 pt-4 border-t border-neutral-800">
                    <span className="text-[10px] font-mono uppercase text-neutral-500 block text-left">Your Download Library:</span>
                    
                    {cartItems.map((item) => {
                      const progress = downloadProgress[item.product.id] || 0;
                      const isDownloaded = progress >= 100;

                      return (
                        <div
                          key={item.product.id}
                          className="p-3.5 rounded-xl border border-neutral-800 bg-[#0d0d0f]/40 flex flex-col gap-2.5 text-left"
                        >
                          <div className="flex justify-between items-center gap-4">
                            <div>
                              <h5 className="font-semibold text-xs text-white line-clamp-1">{item.product.name}</h5>
                              <span className="text-[9px] font-mono text-neutral-500 uppercase">{item.product.fileFormat} • {item.product.fileSize}</span>
                            </div>

                            {isDownloaded ? (
                              <span className="text-[10px] font-mono text-brand-emerald font-bold flex items-center gap-1 bg-brand-emerald/10 border border-brand-emerald/20 px-2.5 py-1 rounded-md">
                                <Check className="w-3 h-3 stroke-[3]" />
                                <span>Ready</span>
                              </span>
                            ) : (
                              <button
                                onClick={() => simulateDownload(item.product.id, item.product.name)}
                                disabled={progress > 0}
                                className={`px-3 py-1.5 rounded-md text-[10px] font-mono flex items-center gap-1 transition-all ${
                                  progress > 0 
                                    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed" 
                                    : "bg-brand-neon text-black font-bold hover:bg-[#8ece2c]"
                                }`}
                              >
                                <Download className="w-3 h-3" />
                                <span>{progress > 0 ? "Downloading" : "Download"}</span>
                              </button>
                            )}
                          </div>

                          {/* Progress bar loader */}
                          {progress > 0 && (
                            <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden relative border border-neutral-800">
                              <div
                                className="h-full bg-brand-neon transition-all duration-300 rounded-full"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 space-y-2">
                    <button
                      onClick={() => {
                        onClearCart();
                        onClose();
                      }}
                      className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-medium text-xs rounded-xl"
                    >
                      Close Store Library
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary (Sticky bottom for active card) */}
            {checkoutStep === "cart" && cartItems.length > 0 && (
              <div className="p-6 border-t border-neutral-800/80 bg-[#070708]/90 backdrop-blur-sm space-y-4">
                <div className="space-y-1.5 font-mono text-xs text-neutral-400">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-white">${subtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-brand-emerald">
                      <span>Discount:</span>
                      <span>-${discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-neutral-800 pt-2 text-white font-bold text-sm">
                    <span>Estimated Total:</span>
                    <span className="text-brand-neon">${finalTotal}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={onClearCart}
                    className="px-4 py-3 border border-neutral-800 hover:border-red-400 text-neutral-400 hover:text-red-400 rounded-xl transition-all"
                    title="Clear Cart"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCheckoutStep("form")}
                    className="flex-1 py-3 bg-brand-neon text-black hover:bg-[#8ece2c] font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-[0_4px_15px_rgba(163,230,53,0.25)]"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
