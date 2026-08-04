/**
 * HeroSection — Luxury hero with animated entrance
 * Style: Velvet & Vines / Botanical Modernism
 * - Full viewport height, emerald overlay gradient
 * - Playfair Display large typography
 * - Floating image effect
 */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/bg1.png"
          alt="Maimuna Islamic Collection"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-brand/85 via-emerald-brand/60 to-emerald-brand/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="inline-block text-gold-soft text-xs font-medium uppercase tracking-[0.25em] mb-6"
          >
            New Collection 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium text-white leading-[1.1] mb-6"
          >
            Where Modesty
            <br />
            Meets <em className="font-display italic text-gold-soft font-light">Magnificence</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="text-white/75 text-base lg:text-lg leading-relaxed max-w-md mb-8"
          >
            Premium fabrics. Timeless modest fashion. Luxury quality without the luxury price.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-gold-soft text-charcoal hover:bg-gold-soft/90 h-12 px-8 text-sm font-medium tracking-wide rounded-full"
              >
                Discover Collection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 h-12 px-8 text-sm font-medium tracking-wide rounded-full bg-transparent"
              >
                Our Story
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex gap-8 mt-12 pt-8 border-t border-white/15"
          >
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "50+", label: "Unique Designs" },
              { value: "15+", label: "Countries" },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-serif text-2xl lg:text-3xl text-white font-medium">{stat.value}</p>
                <p className="text-xs text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating image on right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block w-80 xl:w-96"
      >
        <div className="relative">
          <div className="absolute -inset-4 bg-gold-soft/10 rounded-2xl" />
          <img
            src="images\bg2.png"
            alt="Premium hijab collection"
            className="relative w-full rounded-xl shadow-2xl"
          />
        </div>
      </motion.div>
    </section>
  );
}
