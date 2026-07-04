import { motion } from "motion/react";
import { ArrowUpRight, ShoppingBag, Terminal, ExternalLink, Sparkles } from "lucide-react";
import { BRAND_INFO } from "../data";

interface HeroProps {
  onShopNowClick: () => void;
  onServicesClick: () => void;
}

export default function Hero({ onShopNowClick, onServicesClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-brand-dark"
    >
      {/* Visual background lights (glowing vector spheres) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-neon/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] rounded-full bg-brand-emerald/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-neutral-900/40 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-neutral-900/20 rounded-full pointer-events-none" />
      
      {/* Grid lines texture */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.15] pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 flex flex-col items-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800/80 mb-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-neon opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-neon"></span>
          </span>
          <span className="text-[10px] font-mono tracking-wider text-neutral-300 uppercase flex items-center gap-1">
            Available for Custom Digital Projects
            <Sparkles className="w-3 h-3 text-brand-neon inline" />
          </span>
        </motion.div>

        {/* Brand Name / Intro */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs font-mono tracking-[0.25em] text-brand-neon uppercase font-bold mb-4"
        >
          {BRAND_INFO.name} • Creative Studio
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl text-4xl sm:text-6xl lg:text-7.5xl font-display font-extrabold tracking-tight text-white leading-[1.05] mb-6"
        >
          {BRAND_INFO.headline.split(" ").map((word, i) => {
            const isSpecial = word.includes("Digital") || word.includes("Immersive") || word.includes("Solutions.");
            return (
              <span
                key={i}
                className={
                  isSpecial
                    ? "bg-gradient-to-r from-brand-neon via-emerald-400 to-emerald-500 bg-clip-text text-transparent mr-2 inline-block"
                    : "mr-2 inline-block"
                }
              >
                {word}
              </span>
            );
          })}
        </motion.h1>

        {/* Sub-Headline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl text-sm sm:text-base text-neutral-400 font-sans font-light leading-relaxed mb-10"
        >
          {BRAND_INFO.subHeadline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-16 justify-center w-full max-w-md"
        >
          <button
            onClick={onShopNowClick}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-neon text-black font-semibold text-sm hover:bg-[#8ece2c] transition-all duration-300 shadow-[0_10px_30px_rgba(163,230,53,0.25)] hover:shadow-[0_15px_35px_rgba(163,230,53,0.35)] hover:-translate-y-0.5 group"
          >
            <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Explore Digital Store</span>
          </button>
          <button
            onClick={onServicesClick}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-neutral-900 border border-neutral-800 text-white font-semibold text-sm hover:text-brand-neon hover:border-brand-neon/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Our Custom Services</span>
            <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-brand-neon" />
          </button>
        </motion.div>

        {/* Visual Mockup Device (Interactive Code Sandbox Mockup or Vector Showcase) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-4xl relative"
        >
          {/* Neon backlighting */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-neon/20 to-brand-emerald/10 opacity-30 blur-lg" />
          
          <div className="relative rounded-2xl border border-neutral-800 bg-[#0d0d0f] overflow-hidden shadow-2xl">
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#09090a] border-b border-neutral-800/80">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                <Terminal className="w-3 h-3 text-brand-neon" />
                <span>app-digital-studio.json — Editor</span>
              </div>
              <div className="w-12" /> {/* empty space for centering */}
            </div>

            {/* Simulated Live Studio Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 text-left">
              {/* Box 1 */}
              <div className="p-6 border-b md:border-b-0 md:border-r border-neutral-800/60 flex flex-col justify-between h-48 bg-[#0d0d0f]/50 hover:bg-[#121214]/50 transition-colors duration-300">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-xs font-mono font-bold uppercase tracking-wider">
                    Veloce UI Kit
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-600" />
                </div>
                <div className="mt-4">
                  <p className="text-xs font-mono text-neutral-500 mb-1">Core Product</p>
                  <h3 className="font-display font-bold text-lg text-white">Interactive Figma Design Assets</h3>
                </div>
              </div>

              {/* Box 2 */}
              <div className="p-6 border-b md:border-b-0 md:border-r border-neutral-800/60 flex flex-col justify-between h-48 bg-[#0d0d0f]/50 hover:bg-[#121214]/50 transition-colors duration-300">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald text-xs font-mono font-bold uppercase tracking-wider">
                    Creative Codes
                  </div>
                  <Terminal className="w-4 h-4 text-neutral-600" />
                </div>
                <div className="mt-4">
                  <p className="text-xs font-mono text-neutral-500 mb-1">Boilerplate</p>
                  <h3 className="font-display font-bold text-lg text-white">Next.js & Vite Boilerplate Systems</h3>
                </div>
              </div>

              {/* Box 3 */}
              <div className="p-6 flex flex-col justify-between h-48 bg-[#0d0d0f]/50 hover:bg-[#121214]/50 transition-colors duration-300">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-neutral-800/80 border border-neutral-700 text-neutral-300 text-xs font-mono font-bold uppercase tracking-wider">
                    Full Services
                  </div>
                  <Sparkles className="w-4 h-4 text-neutral-600" />
                </div>
                <div className="mt-4">
                  <p className="text-xs font-mono text-neutral-500 mb-1">Development</p>
                  <h3 className="font-display font-bold text-lg text-white">Bespoke Custom Web Systems</h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
