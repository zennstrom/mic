/**
 * Navbar — Premium luxury navigation
 * Style: Velvet & Vines / Botanical Modernism
 * - Transparent on hero, solid on scroll
 * - Deep emerald brand color, warm beige secondary
 * - Playfair Display for brand, Inter for nav items
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { isScrolled } = useScrollPosition();
  const { cartCount, openCart, openSearch, isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useStore();
  const [location] = useLocation();
  const isHome = location === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled || !isHome
            ? "bg-[var(--background)]/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)]"
            : "bg-transparent"
        )}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <img
                src="/images/logo_rbg.png"
                alt="Maimuna"
                className="h-9 w-9 object-contain"
              />
              <span
                className={cn(
                  "font-serif text-xl lg:text-2xl font-medium tracking-tight transition-colors duration-300",
                  isScrolled || !isHome ? "text-emerald-brand" : "text-white"
                )}
              >
                Maimuna Islamic Collection
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium tracking-wide transition-colors duration-300 py-2 group",
                    isScrolled || !isHome
                      ? "text-foreground hover:text-emerald-brand"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-[1.5px] w-0 transition-all duration-300 group-hover:w-full",
                      isScrolled || !isHome ? "bg-emerald-brand" : "bg-white"
                    )}
                  />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              <button
                onClick={openSearch}
                className={cn(
                  "p-2 rounded-full transition-all duration-300 hover:scale-105",
                  isScrolled || !isHome ? "text-foreground hover:bg-beige-warm/50" : "text-white/90 hover:text-white hover:bg-white/10"
                )}
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                className={cn(
                  "p-2 rounded-full transition-all duration-300 hover:scale-105 hidden sm:block",
                  isScrolled || !isHome ? "text-foreground hover:bg-beige-warm/50" : "text-white/90 hover:text-white hover:bg-white/10"
                )}
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>



              <button
                onClick={openMobileMenu}
                className={cn(
                  "p-2 rounded-full lg:hidden transition-all duration-300",
                  isScrolled || !isHome ? "text-foreground" : "text-white/90"
                )}
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2.5">
                  <img src="/manus-storage/brand-logo_0ac8481a.png" alt="Maimuna" className="h-8 w-8 object-contain" />
                  <span className="font-serif text-xl text-emerald-brand">Maimuna</span>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-full hover:bg-secondary"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="font-serif text-3xl text-foreground hover:text-emerald-brand transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 border-t border-border flex justify-center gap-6">
                <a href="#" className="text-muted-foreground hover:text-emerald-brand transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-muted-foreground hover:text-emerald-brand transition-colors">
                  TikTok
                </a>
                <a href="#" className="text-muted-foreground hover:text-emerald-brand transition-colors">
                  Pinterest
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
