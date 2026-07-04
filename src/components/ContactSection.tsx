import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, Check, ChevronDown, ChevronUp, Github, Linkedin, MessageSquare, Twitter } from "lucide-react";
import { BRAND_INFO, FAQS } from "../data";

export default function ContactSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate form submission
    setIsSent(true);
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Inquiry - APP Creative Digital Studio`);
    const body = encodeURIComponent(
      `Hello APP Digital Studio,\n\nI visited your website and would like to reach out regarding your digital products/services.\n\n` +
      `• Name: ${name}\n` +
      `• Email: ${email}\n` +
      `• Message:\n${message}\n\n` +
      `Best regards,\n${name}`
    );
    return `mailto:${BRAND_INFO.email}?subject=${subject}&body=${body}`;
  };

  const toggleFaq = (idx: number) => {
    if (openFaq === idx) {
      setOpenFaq(null);
    } else {
      setOpenFaq(idx);
    }
  };

  return (
    <footer id="contact" className="bg-[#070708] pt-24 pb-12 border-t border-neutral-900 relative overflow-hidden">
      {/* Background visual graphics */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-brand-emerald/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-neon/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Accordion FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          
          {/* FAQ Column (Left spans 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono text-brand-neon uppercase tracking-widest block mb-2">FAQ Support</span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                Frequently Asked <br />
                Questions
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mt-3">
                ကျွန်တော်တို့ရဲ့ digital products တွေနဲ့ ဝန်ဆောင်မှုတွေအကြောင်း သိလိုသမျှကို စုစည်းဖော်ပြပေးထားပါတယ်။
              </p>
            </div>

            <div className="space-y-3 pt-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-neutral-800/80 bg-neutral-900/10 overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 flex items-center justify-between text-left gap-4 hover:bg-neutral-900/20"
                    >
                      <span className="font-display font-semibold text-xs sm:text-sm text-neutral-200 hover:text-white transition-colors">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-brand-neon flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="p-4 pt-0 border-t border-neutral-900 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed bg-[#0a0a0c]/20">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Details & Direct Form (Right spans 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Direct Details (Spans 5 cols on md) */}
            <div className="md:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono text-brand-emerald uppercase tracking-widest block mb-2">Connect Directly</span>
                <h3 className="font-display font-extrabold text-2xl text-white">Get in Touch</h3>
              </div>

              <div className="space-y-4 text-xs font-mono">
                {/* Email Address */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-brand-neon group-hover:border-brand-neon/40 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-neutral-500 text-[9px] uppercase">Email Address</span>
                    <a
                      href={`mailto:${BRAND_INFO.email}`}
                      className="text-neutral-200 hover:text-brand-neon transition-colors break-all"
                    >
                      {BRAND_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Phone Contact */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-brand-emerald group-hover:border-brand-emerald/40 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-neutral-500 text-[9px] uppercase">Direct Phone</span>
                    <a
                      href={`tel:${BRAND_INFO.phone}`}
                      className="text-neutral-200 hover:text-brand-neon transition-colors"
                    >
                      {BRAND_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-neutral-500 text-[9px] uppercase">Studio Location</span>
                    <span className="text-neutral-300">
                      {BRAND_INFO.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-6 border-t border-neutral-900">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-3">Our Social Networks</span>
                <div className="flex gap-2">
                  {[
                    { icon: <Twitter className="w-4 h-4" />, href: "#" },
                    { icon: <Github className="w-4 h-4" />, href: "https://github.com" },
                    { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com" },
                    { icon: <MessageSquare className="w-4 h-4" />, href: "#" }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg bg-neutral-900/50 border border-neutral-800/80 text-neutral-400 hover:text-brand-neon hover:border-brand-neon flex items-center justify-center transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Form Panel (Spans 7 cols on md) */}
            <div className="md:col-span-7 p-6 rounded-2xl border border-neutral-800 bg-[#0c0c0e]">
              <AnimatePresence mode="wait">
                {!isSent ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="font-display font-bold text-white text-base">Write Us a Message</h4>
                    <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                      Have a custom idea? Send us an inquiry. We respond within 12 hours.
                    </p>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-neon transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-neon transition-all"
                      />
                    </div>

                    <div>
                      <textarea
                        required
                        placeholder="Your project vision description..."
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-neon transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-brand-neon hover:bg-[#8ece2c] text-black font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-[0_4px_12px_rgba(163,230,53,0.15)]"
                    >
                      <span>Send Inquiry Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald flex items-center justify-center mx-auto">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-base text-white">Message Logged!</h4>
                      <p className="text-xs text-neutral-400 mt-2 font-light leading-relaxed">
                        Inquiry message ကို မှတ်တမ်းတင်ထားပြီးဖြစ်ပါတယ်။ Email မှတဆင့် တိုက်ရိုက်ဆွေးနွေးရန် အောက်ပါခလုတ်ကို အသုံးပြုပါ။
                      </p>
                    </div>

                    <div className="space-y-2 pt-4">
                      <a
                        href={getMailtoLink()}
                        className="block w-full py-2 bg-brand-neon hover:bg-[#8ece2c] text-black font-semibold text-xs rounded-lg transition-all"
                      >
                        Send via Email App
                      </a>
                      <button
                        onClick={() => {
                          setIsSent(false);
                          setName("");
                          setEmail("");
                          setMessage("");
                        }}
                        className="text-[10px] font-mono text-neutral-500 hover:text-white transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* Footer Bottom copyright area */}
        <div className="pt-12 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-brand-neon flex items-center justify-center font-display font-black text-black text-xs">
              A
            </div>
            <span className="font-display font-bold text-sm text-white tracking-wide">
              APP Studio • {BRAND_INFO.tagline}
            </span>
          </div>

          <p className="text-[10px] font-mono text-neutral-500">
            © {new Date().getFullYear()} APP. Developed for digital assets & premium services. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
