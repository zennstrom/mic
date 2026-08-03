/**
 * InstagramGallery — Social proof gallery
 * Style: Velvet & Vines / Botanical Modernism
 */
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Instagram } from "lucide-react";
import SectionHeader from "./SectionHeader";

const instagramPosts = [
  "/manus-storage/instagram-gallery_fa20141d.png",
  "/manus-storage/hero-1_49258346.png",
  "/manus-storage/category-casual_636d20fa.png",
  "/manus-storage/category-premium_0d5ff047.png",
  "/manus-storage/lifestyle-banner_c351dad1.png",
  "/manus-storage/category-formal_867580ed.png",
];

export default function InstagramGallery() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-beige-warm/30">
      <div className="container">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-gold-soft text-xs font-medium uppercase tracking-[0.2em] mb-3 block"
          >
            @maimunacollection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-serif text-3xl lg:text-4xl font-medium mb-3"
          >
            Styled by You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-sm max-w-md mx-auto"
          >
            Tag us @maimunacollection for a chance to be featured.
          </motion.p>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {instagramPosts.map((src, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
              className="group relative aspect-square rounded-xl overflow-hidden bg-secondary"
            >
              <img
                src={src}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-emerald-brand/0 group-hover:bg-emerald-brand/30 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
