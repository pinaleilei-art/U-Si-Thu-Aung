import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DIGITAL_PRODUCTS, DIGITAL_SERVICES } from "../data";
import { DigitalProduct, DigitalService } from "../types";
import { Search, Filter, ShoppingCart, Check, Star, ArrowRight, Download, Eye, Clock, Shield } from "lucide-react";

interface StoreSectionProps {
  onAddToCart: (product: DigitalProduct) => void;
  onEstimateClick: () => void;
}

export default function StoreSection({ onAddToCart, onEstimateClick }: StoreSectionProps) {
  const [activeTab, setActiveTab] = useState<"products" | "services">("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<DigitalProduct | null>(null);
  const [selectedService, setSelectedService] = useState<DigitalService | null>(null);

  // Derive unique categories based on tab
  const categories = ["All", ...(activeTab === "products" 
    ? Array.from(new Set(DIGITAL_PRODUCTS.map(p => p.category)))
    : Array.from(new Set(DIGITAL_SERVICES.map(s => s.category))))];

  // Filtering products
  const filteredProducts = DIGITAL_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Filtering services
  const filteredServices = DIGITAL_SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTabChange = (tab: "products" | "services") => {
    setActiveTab(tab);
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <section id="products" className="py-24 bg-brand-dark/95 relative border-y border-neutral-900">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-neon/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-brand-neon uppercase tracking-widest block mb-2">Creative Assets & Capabilities</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Premium Digital Solutions
          </h2>
          <p className="max-w-xl mx-auto text-sm text-neutral-400 font-light mt-4">
            Browse our catalog of premium downloadable assets or book a bespoke creative service tailored precisely to your brand targets.
          </p>
        </div>

        {/* Tab Selector & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12 pb-6 border-b border-neutral-800/60">
          
          {/* Main Toggles */}
          <div className="flex gap-2 p-1 bg-neutral-900/90 border border-neutral-800 rounded-2xl w-full max-w-sm">
            <button
              onClick={() => handleTabChange("products")}
              className={`flex-1 py-3 text-xs font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "products"
                  ? "bg-brand-neon text-black font-bold shadow-[0_4px_15px_rgba(163,230,53,0.25)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>Digital Products Store</span>
              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-mono bg-neutral-800 text-neutral-300 font-bold">
                {DIGITAL_PRODUCTS.length}
              </span>
            </button>
            <button
              onClick={() => handleTabChange("services")}
              className={`flex-1 py-3 text-xs font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "services"
                  ? "bg-brand-neon text-black font-bold shadow-[0_4px_15px_rgba(163,230,53,0.25)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>Our Services</span>
              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-mono bg-neutral-800 text-neutral-300 font-bold">
                {DIGITAL_SERVICES.length}
              </span>
            </button>
          </div>

          {/* Search and Category filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === "products" ? "Search digital assets..." : "Search services..."}
                className="w-full bg-[#0d0d0f] border border-neutral-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </div>

            {/* Category Pills list */}
            <div className="flex gap-1.5 overflow-x-auto py-1 max-w-full no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-[11px] font-medium font-mono whitespace-nowrap transition-colors duration-200 ${
                    selectedCategory === cat
                      ? "bg-neutral-800 text-white border border-neutral-700"
                      : "bg-[#0d0d0f] text-neutral-400 hover:text-white border border-neutral-800/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + selectedCategory + searchQuery}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {activeTab === "products" ? (
              // Products List
              filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group rounded-2xl border border-neutral-800/80 bg-[#0d0d0f]/50 overflow-hidden hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative h-48 overflow-hidden bg-neutral-900/40">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {/* Price Badge */}
                      <span className="absolute top-4 right-4 bg-black/85 border border-neutral-800 text-brand-neon font-display font-extrabold text-sm px-3 py-1 rounded-lg">
                        ${product.price}
                      </span>
                      {/* View Button Overlay */}
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-medium text-xs rounded-t-2xl"
                      >
                        <Eye className="w-4 h-4 text-brand-neon" />
                        <span>Inspect Product Assets</span>
                      </button>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-mono tracking-wider uppercase text-brand-emerald">
                            {product.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-brand-neon fill-brand-neon" />
                            <span className="text-[10px] font-mono text-neutral-300">{product.rating}</span>
                          </div>
                        </div>

                        <h3 
                          onClick={() => setSelectedProduct(product)}
                          className="font-display font-bold text-lg text-white mb-2 cursor-pointer hover:text-brand-neon transition-colors"
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs text-neutral-400 font-light leading-relaxed mb-4 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-neutral-800/50 flex items-center justify-between">
                        <div className="text-[10px] font-mono text-neutral-500">
                          <span>{product.fileFormat} • {product.fileSize}</span>
                        </div>
                        <button
                          onClick={() => onAddToCart(product)}
                          className="p-2.5 rounded-xl bg-brand-neon text-black hover:bg-brand-neon/85 transition-all shadow-[0_4px_10px_rgba(163,230,53,0.15)] hover:scale-105 active:scale-95"
                          title="Add to Cart"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-neutral-500 font-mono text-xs">
                  No digital products found matching filters.
                </div>
              )
            ) : (
              // Services List
              filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="group rounded-2xl border border-neutral-800/80 bg-[#0d0d0f]/50 p-6 hover:border-brand-emerald/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-emerald/5 blur-2xl pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-md bg-neutral-900 text-brand-emerald border border-neutral-800">
                          {service.category}
                        </span>
                        <span className="text-neutral-500 text-xs font-mono">
                          {service.deliveryTime}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-brand-emerald transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-[11px] text-neutral-300 font-light">
                            <Check className="w-3.5 h-3.5 text-brand-neon flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-neutral-800/50 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 block">Est. Cost</span>
                        <span className="font-display font-bold text-white">Starting at ${service.basePrice}</span>
                      </div>
                      <button
                        onClick={onEstimateClick}
                        className="p-2.5 rounded-xl border border-neutral-800 hover:border-brand-neon text-neutral-400 hover:text-brand-neon transition-all flex items-center gap-1.5 text-xs font-mono"
                      >
                        <span>Estimate</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-neutral-500 font-mono text-xs">
                  No services found matching filters.
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>

        {/* Product Details Modal (Inspect Asset dialog) */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-[#0c0c0e] border border-neutral-800 max-w-2xl w-full rounded-2xl overflow-hidden relative"
              >
                {/* Image Section */}
                <div className="relative h-56 md:h-64">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] to-transparent" />
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-black/80 text-neutral-400 hover:text-white border border-neutral-800"
                  >
                    Close Dialog
                  </button>
                  <span className="absolute bottom-4 left-6 bg-brand-neon text-black font-display font-extrabold px-3 py-1.5 rounded-lg text-lg">
                    ${selectedProduct.price}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-brand-emerald uppercase font-bold">
                      {selectedProduct.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-neutral-300">
                      <Star className="w-3.5 h-3.5 text-brand-neon fill-brand-neon" />
                      <span>{selectedProduct.rating} Rating ({selectedProduct.salesCount} Sales)</span>
                    </div>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl text-white mb-3">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 bg-neutral-900/30 border border-neutral-800/60 p-4 rounded-xl mb-6 text-xs font-mono text-neutral-400">
                    <div>
                      <span className="block text-neutral-500 text-[10px] uppercase">File format</span>
                      <span className="text-white font-semibold">{selectedProduct.fileFormat}</span>
                    </div>
                    <div>
                      <span className="block text-neutral-500 text-[10px] uppercase">File size</span>
                      <span className="text-white font-semibold">{selectedProduct.fileSize}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xs font-mono uppercase text-neutral-300 mb-3 tracking-widest font-semibold">Features Included:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-neutral-300 font-light">
                          <Check className="w-4 h-4 text-brand-neon flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3 border-t border-neutral-800/80 pt-6">
                    <button
                      onClick={() => {
                        onAddToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 py-3 bg-brand-neon hover:bg-[#8ece2c] text-black font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_5px_15px_rgba(163,230,53,0.2)]"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart - ${selectedProduct.price}</span>
                    </button>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="px-6 py-3 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-sm font-semibold rounded-xl"
                    >
                      Back to Store
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
