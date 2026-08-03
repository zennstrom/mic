/**
 * Testimonials — Customer reviews carousel
 * Style: Velvet & Vines / Botanical Modernism
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "@/data/products";
import SectionHeader from "./SectionHeader";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex(i => (i + 1) % testimonials.length);
  const prev = () => setActiveIndex(i => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-emerald-brand/5" />

      <div className="relative container">
        <SectionHeader
          subtitle="Love Letters"
          title="What Our Customers Say"
          description="Real stories from women who chose Maimuna."
        />

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="text-center"
              >
                <Quote className="w-8 h-8 text-gold-soft/40 mx-auto mb-6" />
                <p className="font-serif text-xl lg:text-2xl text-foreground leading-relaxed mb-8 italic">
                  "{testimonials[activeIndex].text}"
                </p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-soft fill-current" />
                  ))}
                </div>
                <p className="font-medium text-foreground">{testimonials[activeIndex].name}</p>
                <p className="text-sm text-muted-foreground">{testimonials[activeIndex].location}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary hover:border-emerald-brand/30 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "bg-emerald-brand w-6" : "bg-border hover:bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary hover:border-emerald-brand/30 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
