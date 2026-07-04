import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Menu, X, Mail, Phone, ChevronRight } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  activeSection,
  setActiveSection
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Products", href: "#products", id: "products" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Bento Info", href: "#bento", id: "bento" },
    { name: "Cost Estimator", href: "#estimator", id: "estimator" },
    { name: "Contact", href: "#contact", id: "contact" }
  ];

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="app-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070708]/85 backdrop-blur-md border-b border-neutral-800/60 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("home");
            }}
            id="brand-logo"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-neon via-brand-emerald to-emerald-400 flex items-center justify-center font-display font-extrabold text-black text-lg shadow-[0_0_15px_rgba(163,230,53,0.3)] group-hover:scale-105 transition-transform duration-300">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl leading-none text-white tracking-wide group-hover:text-brand-neon transition-colors duration-200">
                APP
              </span>
              <span className="text-[9px] font-mono font-medium text-neutral-500 uppercase tracking-widest mt-0.5">
                Digital Studio
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-900/50 border border-neutral-800/40 px-2 py-1.5 rounded-full backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.id);
                  }}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-300 ${
                    isActive ? "text-black" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-bg"
                      className="absolute inset-0 bg-brand-neon rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Quick Contact badge */}
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 border-r border-neutral-800 pr-4">
              <a
                href="mailto:aungpaingphyo.digitalstore@gmail.com"
                className="flex items-center gap-1.5 hover:text-brand-neon transition-colors"
                title="Email Us"
              >
                <Mail className="w-3.5 h-3.5 text-brand-neon" />
              </a>
              <a
                href="tel:009337438338"
                className="flex items-center gap-1.5 hover:text-brand-neon transition-colors"
                title="Call Us"
              >
                <Phone className="w-3.5 h-3.5 text-brand-emerald" />
              </a>
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              id="desktop-cart-btn"
              className="relative p-2.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:text-brand-neon hover:border-brand-neon/40 transition-all duration-300 group"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-neon text-black font-mono font-bold text-[10px] flex items-center justify-center shadow-[0_0_10px_rgba(163,230,53,0.4)]"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Custom CTA */}
            <button
              onClick={() => handleLinkClick("estimator")}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 text-white font-medium text-xs hover:border-brand-neon hover:text-brand-neon transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              id="mobile-cart-btn"
              className="relative p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-brand-neon text-black font-mono font-bold text-[9px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#070708] border-b border-neutral-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-left ${
                    activeSection === link.id
                      ? "bg-neutral-900 text-brand-neon border-l-2 border-brand-neon pl-2"
                      : "text-neutral-400 hover:bg-neutral-900/50 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              ))}

              <div className="pt-4 border-t border-neutral-800/80 mt-4 space-y-3">
                <div className="flex flex-col gap-2 px-3 text-xs font-mono text-neutral-500">
                  <a
                    href="mailto:aungpaingphyo.digitalstore@gmail.com"
                    className="flex items-center gap-2 hover:text-brand-neon"
                  >
                    <Mail className="w-3.5 h-3.5 text-brand-neon" />
                    <span>aungpaingphyo.digitalstore@gmail.com</span>
                  </a>
                  <a
                    href="tel:009337438338"
                    className="flex items-center gap-2 hover:text-brand-neon"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-emerald" />
                    <span>009337438338</span>
                  </a>
                </div>

                <button
                  onClick={() => handleLinkClick("estimator")}
                  className="w-full py-2.5 text-center text-xs font-medium rounded-lg bg-brand-neon text-black"
                >
                  Get Project Estimate Cost
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
