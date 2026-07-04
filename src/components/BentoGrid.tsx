import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BRAND_INFO, WORK_PROJECTS } from "../data";
import { ShieldCheck, Layers, Users2, Trophy, Clock, Zap, ArrowRight, Star } from "lucide-react";

export default function BentoGrid() {
  const [activeTab, setActiveTab] = useState<"vision" | "values" | "guarantee">("vision");

  const tabsContent = {
    vision: {
      title: "Our Studio Vision",
      subtitle: "ဒီဂျစ်တယ်ခေတ်ရဲ့ စံပြစတူဒီယို",
      desc: "We focus heavily on dark-theme pixel precision and modern coding ecosystems (NextJS, TypeScript, Framer/Motion). We aim to provide premium designs that don't just look luxury but also convert visitors into lifelong brand buyers.",
      tags: ["Modern Aesthetic", "Ultra Performance", "SEO Ready"]
    },
    values: {
      title: "Our Creative Values",
      subtitle: "ဖန်တီးမှုနှင့် စိတ်ကျေနပ်မှု",
      desc: "Our work stands on complete structural honesty, clean reusable code variables, absolute transparency with clients, and zero-compromise speed. We never reuse boilerplate templates on premium custom projects.",
      tags: ["High Integrity", "Bespoke Code", "Customer First"]
    },
    guarantee: {
      title: "Studio Guarantee",
      subtitle: "၁၀၀% စိတ်အချရဆုံး ဝန်ဆောင်မှု",
      desc: "All digital purchases come with immediate delivery and lifetime layout/code upgrades. Custom client services come with strict milestone updates, direct access to communication lines, and post-launch maintenance.",
      tags: ["Lifetime Updates", "Instant Delivery", "Dedicated Help"]
    }
  };

  return (
    <section id="bento" className="py-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-brand-neon uppercase tracking-widest block mb-2">Metrics & Core Values</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              An Elite Digital Boutique, <br />
              <span className="text-neutral-500">By the Numbers.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 font-light leading-relaxed">
            We operate at the intersection of modern minimalist graphics and robust web engineering. Here is our setup.
          </p>
        </div>

        {/* Bento Box Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Box 1: Core Stats (Span 2 Columns on desktop) */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4 p-8 rounded-2xl border border-neutral-800/80 bg-[#0d0d0f]/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-neon/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {BRAND_INFO.stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="flex flex-col justify-center border-b border-r last:border-b-0 border-neutral-800/40 p-4 last:border-r-0 md:[&:nth-child(2)]:border-r-0 md:[&:nth-child(3)]:border-b-0"
              >
                <span className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight group-hover:text-brand-neon transition-colors duration-300">
                  {stat.value}
                </span>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mt-2 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Box 2: Quality Badges / Highlights */}
          <div className="p-8 rounded-2xl border border-neutral-800/80 bg-neutral-900/20 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald/10 blur-3xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center text-brand-emerald">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Trust & Quality Secure</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Trusted by thousands of design teams and engineering leads globally. Fully vetted, standard codebases with no third-party tracking or bloated extensions.
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&w=80&q=80`}
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full border border-neutral-900 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono text-neutral-500">4.9/5 star ratings globally</span>
            </div>
          </div>

          {/* Box 3: Interactive Value Selector (Spans 2 columns on desktop) */}
          <div className="md:col-span-2 p-8 rounded-2xl border border-neutral-800/80 bg-neutral-900/30 flex flex-col justify-between relative overflow-hidden">
            <div>
              {/* Toggles */}
              <div className="flex gap-2 p-1 bg-[#09090a] border border-neutral-800/60 rounded-xl max-w-sm mb-6">
                {(["vision", "values", "guarantee"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg capitalize transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-neutral-800 text-white shadow-sm"
                        : "text-neutral-500 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Display Content with simple fade transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <span className="text-[10px] font-mono text-brand-neon uppercase tracking-widest block font-bold">
                    {tabsContent[activeTab].subtitle}
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    {tabsContent[activeTab].title}
                  </h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    {tabsContent[activeTab].desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tabsContent[activeTab].tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 text-[10px] font-mono font-medium rounded-full bg-neutral-900 text-brand-emerald border border-neutral-800/60"
                      >
                        # {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Box 4: Fast Delivery / Dynamic Badge */}
          <div className="p-8 rounded-2xl border border-brand-neon/20 bg-gradient-to-br from-brand-neon/5 to-transparent flex flex-col justify-between relative overflow-hidden group hover:border-brand-neon/40 transition-colors duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-neon/10 blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center text-brand-neon">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Lightning Speed</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We design and ship high-end codes within weeks, not months. Our stream-lined communication lines bypass traditional agency delays entirely.
              </p>
            </div>

            <div className="pt-6">
              <div className="text-[11px] font-mono text-neutral-400 flex items-center justify-between border-t border-neutral-800/60 pt-4">
                <span>Services Delivery:</span>
                <span className="text-brand-neon font-bold">Starting from 5 Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Work Portfolio Highlight */}
        <div className="mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono text-brand-emerald uppercase tracking-widest block mb-2">Featured Highlights</span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">Recent Case Studies</h3>
            </div>
            <p className="text-xs text-neutral-400 mt-2 md:mt-0 font-mono">
              Designed & Engineered with absolute care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WORK_PROJECTS.map((project) => (
              <div 
                key={project.id}
                className="group rounded-2xl border border-neutral-800/80 bg-[#0d0d0f]/30 overflow-hidden hover:border-neutral-700 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-[10px] font-mono bg-neutral-900/90 text-neutral-300 px-2 py-1 rounded-md border border-neutral-800">
                      {project.category}
                    </span>
                    <span className="text-[10px] font-mono text-brand-neon">
                      {project.year}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-display font-bold text-lg text-white mb-2 group-hover:text-brand-neon transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-light h-12 overflow-hidden">
                    {project.description}
                  </p>
                  
                  <div className="flex justify-between items-center border-t border-neutral-800/60 pt-4 text-xs font-mono">
                    <span className="text-neutral-500">{project.stats.label}</span>
                    <span className="text-brand-emerald font-bold">{project.stats.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
