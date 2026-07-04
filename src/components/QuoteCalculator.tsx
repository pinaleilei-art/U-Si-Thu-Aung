import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Coins, Check, Calculator, Clock, Star, Send, Phone, Mail, Sparkles } from "lucide-react";
import { BRAND_INFO } from "../data";

interface AddonOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export default function QuoteCalculator() {
  const [selectedService, setSelectedService] = useState<"design" | "web" | "branding" | "seo">("web");
  const [addons, setAddons] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<"standard" | "express">("standard");
  const [totalCost, setTotalCost] = useState(2500);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brief, setBrief] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const basePrices = {
    design: { label: "UI/UX App Design", base: 1200, time: "7-14 Days" },
    web: { label: "Full-Stack Web Development", base: 2500, time: "14-30 Days" },
    branding: { label: "Modern Brand Identity Design", base: 800, time: "5-10 Days" },
    seo: { label: "Performance & SEO Optimization", base: 450, time: "3-5 Days" }
  };

  const addonOptions: AddonOption[] = [
    { id: "motion", name: "Premium Motion & Animations", price: 350, description: "Subtle responsive layout entries and micro-interaction states" },
    { id: "db", name: "Database & Backend CMS Sync", price: 500, description: "Cloud structured persistence, administrative panel dashboard, user authentication" },
    { id: "revisions", name: "Unlimited Design Revisions", price: 200, description: "Extended review loops for pixel perfection" },
    { id: "seo-extra", name: "Pre-configured SEO Meta & Analytics", price: 150, description: "Sitemap generation, Search Console setup, Google Analytics hooks" }
  ];

  useEffect(() => {
    let price = basePrices[selectedService].base;

    // Addons calculations
    addons.forEach(addonId => {
      const addon = addonOptions.find(o => o.id === addonId);
      if (addon) price += addon.price;
    });

    // Timeline multiplier
    if (timeline === "express") {
      price += 400; // Flat express urgency fee
    }

    setTotalCost(price);
  }, [selectedService, addons, timeline]);

  const handleAddonToggle = (addonId: string) => {
    if (addons.includes(addonId)) {
      setAddons(addons.filter(id => id !== addonId));
    } else {
      setAddons([...addons, addonId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    // Simulate sending form details to the brand's email
    setIsSubmitted(true);
  };

  const getMailtoLink = () => {
    const serviceName = basePrices[selectedService].label;
    const selectedAddonsText = addons.map(id => addonOptions.find(a => a.id === id)?.name).join(", ") || "None";
    const timelineSpeed = timeline === "express" ? "Express (Urgent)" : "Standard";
    
    const subject = encodeURIComponent(`Project Quote Proposal - APP Studio`);
    const body = encodeURIComponent(
      `Hello APP Digital Studio,\n\nI calculated an estimated quote on your website and would like to proceed with a project consultation.\n\n` +
      `--- PROJECT DETAILS ---\n` +
      `• Primary Service: ${serviceName}\n` +
      `• Addons Selected: ${selectedAddonsText}\n` +
      `• Speed Timeline: ${timelineSpeed}\n` +
      `• Estimated Budget: $${totalCost}\n\n` +
      `--- CLIENT CONTACT ---\n` +
      `• Name: ${name || "[My Name]"}\n` +
      `• Email: ${email || "[My Email]"}\n` +
      `• Project Brief: ${brief || "[Tell us about your brand vision]"}\n\n` +
      `Looking forward to your professional response!\n\nBest regards,\n${name || ""}`
    );

    return `mailto:${BRAND_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="estimator" className="py-24 bg-brand-dark relative border-b border-neutral-900 overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-neon/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-emerald/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-brand-emerald uppercase tracking-widest block mb-2">Instant Project Estimator</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Calculate Your Cost Instantly.
          </h2>
          <p className="max-w-xl mx-auto text-sm text-neutral-400 font-light mt-4">
            Select your primary service target, configure add-ons, and estimate your project budget dynamically. No hidden costs.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Panel (Left Spans 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Select Service */}
            <div className="p-6 rounded-2xl border border-neutral-800 bg-[#0d0d0f]/50">
              <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-4">Step 01 / Select Primary Service</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(basePrices) as Array<keyof typeof basePrices>).map((key) => {
                  const isSelected = selectedService === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedService(key)}
                      className={`text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                        isSelected
                          ? "bg-neutral-800/40 border-brand-neon"
                          : "bg-neutral-950/40 border-neutral-800 hover:border-neutral-700"
                      }`}
                    >
                      <h4 className="font-display font-bold text-sm text-white">{basePrices[key].label}</h4>
                      <p className="text-[10px] text-neutral-500 font-mono mt-1">Base Price: ${basePrices[key].base} • {basePrices[key].time}</p>
                      
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-brand-neon flex items-center justify-center text-black">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Configure Add-ons */}
            <div className="p-6 rounded-2xl border border-neutral-800 bg-[#0d0d0f]/50">
              <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-4">Step 02 / Select Custom Features & Add-ons</span>
              
              <div className="space-y-3">
                {addonOptions.map((addon) => {
                  const isChecked = addons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => handleAddonToggle(addon.id)}
                      className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                        isChecked
                          ? "bg-neutral-800/40 border-brand-neon"
                          : "bg-neutral-950/40 border-neutral-800/60 hover:border-neutral-700"
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                        isChecked ? "bg-brand-neon border-brand-neon text-black" : "border-neutral-600 bg-transparent"
                      }`}>
                        {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between gap-4">
                          <h4 className="font-display font-bold text-sm text-white">{addon.name}</h4>
                          <span className="font-mono text-xs text-brand-neon font-bold">+${addon.price}</span>
                        </div>
                        <p className="text-xs text-neutral-500 font-light leading-relaxed mt-1">{addon.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Fast Delivery schedule */}
            <div className="p-6 rounded-2xl border border-neutral-800 bg-[#0d0d0f]/50">
              <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-4">Step 03 / Delivery Urgent Speed</span>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTimeline("standard")}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    timeline === "standard"
                      ? "bg-neutral-800/40 border-brand-neon text-white"
                      : "bg-neutral-950/40 border-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  <h4 className="font-semibold text-sm">Standard Delivery</h4>
                  <p className="text-[9px] font-mono text-neutral-500 mt-1">Normal milestone spacing</p>
                </button>
                <button
                  onClick={() => setTimeline("express")}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    timeline === "express"
                      ? "bg-neutral-800/40 border-brand-neon text-white"
                      : "bg-[#181812] border-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  <h4 className="font-semibold text-sm text-white flex items-center justify-center gap-1">
                    Express Urgency
                  </h4>
                  <p className="text-[9px] font-mono text-brand-neon mt-1">+ $400 flat fee • Shaved 40% timeline</p>
                </button>
              </div>
            </div>

          </div>

          {/* Estimates Display & Form (Right Spans 5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            {/* Live Pricing Summary Panel */}
            <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-950 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-6 text-neutral-400">
                <Calculator className="w-4 h-4 text-brand-neon" />
                <span className="text-xs font-mono uppercase tracking-wider">Dynamic Cost Summary</span>
              </div>

              <div className="space-y-4 border-b border-neutral-800/80 pb-6 mb-6">
                <div className="flex justify-between items-center text-xs text-neutral-400">
                  <span>Base Service ({basePrices[selectedService].label}):</span>
                  <span className="font-mono text-white">${basePrices[selectedService].base}</span>
                </div>

                {addons.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase text-neutral-500">Selected Extras:</span>
                    {addons.map(addonId => {
                      const addon = addonOptions.find(o => o.id === addonId);
                      return (
                        <div key={addonId} className="flex justify-between items-center text-[11px] text-neutral-300">
                          <span>+ {addon?.name}:</span>
                          <span className="font-mono">${addon?.price}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex justify-between items-center text-xs text-neutral-400">
                  <span>Delivery Urgency Timeline:</span>
                  <span className="font-mono text-white">
                    {timeline === "express" ? "+$400 (Express)" : "Standard Fee ($0)"}
                  </span>
                </div>
              </div>

              {/* Total Cost Display */}
              <div className="flex items-end justify-between mb-2">
                <span className="text-xs font-mono uppercase text-neutral-500">Estimated Project Budget</span>
                <span className="font-display font-extrabold text-3xl sm:text-4.5xl text-brand-neon shadow-sm">
                  ${totalCost}
                </span>
              </div>
              <p className="text-[10px] font-mono text-neutral-500 leading-normal text-right mb-4">
                Est. Delivery: {timeline === "express" ? "Shaved by 40% speed" : basePrices[selectedService].time}
              </p>
            </div>

            {/* Custom Consultation Form */}
            <div className="p-6 rounded-2xl border border-neutral-800 bg-[#0d0d0f]/50">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="consultation-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="font-display font-bold text-lg text-white flex items-center gap-1.5">
                      Request Consultation
                      <Sparkles className="w-4 h-4 text-brand-neon" />
                    </h3>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed mb-4">
                      Fill out your contact details to submit this pre-calculated cost directly to APP Studio.
                    </p>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-4 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-neon transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-4 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-neon transition-all"
                      />
                    </div>

                    <div>
                      <textarea
                        placeholder="Short description of your project requirements & goals..."
                        rows={3}
                        value={brief}
                        onChange={(e) => setBrief(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-4 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-neon transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-brand-neon hover:bg-[#8ece2c] text-black font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_12px_rgba(163,230,53,0.15)]"
                    >
                      <span>Lock Estimates & Book Consultation</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="consultation-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-lg text-white">Estimate Request Locked!</h4>
                      <p className="text-xs text-neutral-400 mt-2 font-light leading-relaxed">
                        သတ်မှတ်ထားတဲ့ estimate configuration ကို lock လုပ်လိုက်ပါပြီ။ Email မှတဆင့် တိုက်ရိုက်ဆက်သွယ်ဖို့ အောက်ကခလုတ်ကို နှိပ်လိုက်ပါ။
                      </p>
                    </div>

                    <div className="space-y-2 pt-4">
                      <a
                        href={getMailtoLink()}
                        className="block w-full py-2.5 bg-brand-neon hover:bg-[#8ece2c] text-black font-semibold text-xs rounded-xl transition-all"
                      >
                        Send Direct Email Proposal
                      </a>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setName("");
                          setEmail("");
                          setBrief("");
                        }}
                        className="text-xs font-mono text-neutral-500 hover:text-white transition-colors"
                      >
                        Calculate Another Project Cost
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
