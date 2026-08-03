/**
 * Footer — Luxury brand footer
 * Style: Velvet & Vines / Botanical Modernism
 * - Deep emerald background, gold accents
 * - Playfair Display for headings
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const footerLinks = {
  shop: [
    { label: "All Collections", href: "/shop" },
    { label: "Premium", href: "/shop?category=premium" },
    { label: "Casual", href: "/shop?category=casual" },
    { label: "Formal", href: "/shop?category=formal" },
    { label: "New Arrivals", href: "/shop" },
  ],
  company: [
    { label: "Our Story", href: "/about" },
    { label: "Craftsmanship", href: "/about" },
    { label: "Sustainability", href: "/about" },
    { label: "Careers", href: "/contact" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping & Returns", href: "/contact" },
    { label: "Size Guide", href: "/contact" },
    { label: "FAQ", href: "/contact" },
  ],
};

export default function Footer() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <footer ref={ref} className="bg-emerald-brand text-white/90">
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <img src="/manus-storage/brand-logo_0ac8481a.png" alt="Maimuna" className="h-9 w-9 object-contain" />
              <span className="font-serif text-2xl font-medium text-white">Maimuna</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              Premium modest fashion that democratizes luxury. Each hijab is crafted from the finest fabrics,
              designed for effortless elegance.
            </p>
            <div className="flex gap-4">
              {["Instagram", "TikTok", "Pinterest"].map((social, idx) => (
                <a
                  key={`${social}-${idx}`}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-300 hover:scale-105"
                  aria-label={social}
                >
                  <span className="text-xs font-medium">{social[0]}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links], i) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <h4 className="font-serif text-sm font-medium text-gold-soft uppercase tracking-widest mb-5">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link, j) => (
                  <li key={`${link.href}-${j}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-white/40">
            © 2026 Maimuna Islamic Collection. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">Cookie Settings</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
