/**
 * LifestyleBanner — Full-width lifestyle image with CTA
 * Style: Velvet & Vines / Botanical Modernism
 */
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function LifestyleBanner() {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/manus-storage/lifestyle-banner_c351dad1.png"
          alt="Maimuna lifestyle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      <div className="relative container z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-lg"
        >
          <p className="text-gold-soft text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Designed for Effortless Elegance
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-white font-medium leading-tight mb-5">
            Premium Fabrics.
            <br />
            <span className="text-gold-soft">Timeless Style.</span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-8">
            Each hijab is crafted from 100% premium materials — soft as silk,
            lasting as devotion. Discover why thousands trust Maimuna.
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              className="bg-gold-soft text-charcoal hover:bg-gold-soft/90 h-12 px-8 text-sm font-medium tracking-wide rounded-full"
            >
              Shop the Collection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
