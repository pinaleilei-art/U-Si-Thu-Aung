import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import StoreSection from "./components/StoreSection";
import QuoteCalculator from "./components/QuoteCalculator";
import CartDrawer from "./components/CartDrawer";
import ContactSection from "./components/ContactSection";
import { CartItem, DigitalProduct } from "./types";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState("home");
  const [cartOpen, setCartOpen] = useState(false);

  // Save/Load cart items to/from localStorage for persistence
  useEffect(() => {
    const savedCart = localStorage.getItem("app_digital_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error("Error loading cart items:", err);
      }
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("app_digital_cart", JSON.stringify(items));
  };

  // Add to cart action
  const handleAddToCart = (product: DigitalProduct) => {
    const existingIndex = cartItems.findIndex((item) => item.product.id === product.id);
    let updatedCart: CartItem[] = [];

    if (existingIndex >= 0) {
      // Increment quantity
      updatedCart = [...cartItems];
      updatedCart[existingIndex].quantity += 1;
    } else {
      // Add new item
      updatedCart = [...cartItems, { product, quantity: 1 }];
    }

    saveCart(updatedCart);
    setCartOpen(true); // Open the drawer for instant confirmation
  };

  // Update item quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    const updatedCart = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCart(updatedCart);
  };

  // Remove item
  const handleRemoveItem = (productId: string) => {
    const updatedCart = cartItems.filter((item) => item.product.id !== productId);
    saveCart(updatedCart);
  };

  // Clear cart
  const handleClearCart = () => {
    saveCart([]);
  };

  // Scroll section spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "products", "bento", "estimator", "contact"];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-dark text-neutral-200 selection:bg-brand-neon selection:text-black">
      {/* Glow highlight headers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent z-40 pointer-events-none" />

      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Page Layout */}
      <main>
        {/* Hero Banner */}
        <Hero
          onShopNowClick={() => scrollToSection("products")}
          onServicesClick={() => scrollToSection("products")}
        />

        {/* Bento Stats & Highlights */}
        <BentoGrid />

        {/* Catalog Store section */}
        <StoreSection
          onAddToCart={handleAddToCart}
          onEstimateClick={() => scrollToSection("estimator")}
        />

        {/* Quote Cost calculator */}
        <QuoteCalculator />

        {/* Support & Contact Footer Area */}
        <ContactSection />
      </main>

      {/* Slide-out Shopping Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
