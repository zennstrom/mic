/**
 * About Page — Brand story, mission, values, founder
 * Style: Velvet & Vines / Botanical Modernism
 * Editorial layout with asymmetric compositions
 */
import { motion } from "framer-motion";
import { Heart, Leaf, Award, Globe } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchModal from "@/components/layout/SearchModal";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const values = [
  {
    icon: Heart,
    title: "Modesty with Confidence",
    description: "We believe modest fashion should never compromise on style. Every piece is designed to make you feel beautiful and empowered.",
  },
  {
    icon: Leaf,
    title: "Sustainable Luxury",
    description: "We source premium fabrics responsibly, minimize waste in production, and use eco-friendly packaging throughout.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    description: "From hand-rolled edges to color-fast dyes, every detail is scrutinized. We never ship anything less than perfect.",
  },
  {
    icon: Globe,
    title: "Accessible to All",
    description: "Premium quality at fair prices. We believe every woman deserves to feel luxurious, regardless of budget.",
  },
];

export default function About() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: storyRef, isVisible: storyVisible } = useScrollReveal(0.15);
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal(0.1);

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />
      <SearchModal />
      <ScrollToTop />

      {/* Hero */}
      <section ref={heroRef} className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-beige-warm/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-3xl"
          >
            <p className="text-gold-soft text-xs font-medium uppercase tracking-[0.2em] mb-4">Our Story</p>
            <h1 className="font-serif text-4xl lg:text-6xl font-medium leading-tight mb-6">
              Born from a love of
              <br />
              <span className="text-emerald-brand">modest elegance</span>
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-xl">
              Maimuna was founded with a simple belief: that premium modest fashion should be
              accessible to every woman, everywhere. We set out to create hijabs that feel as
              luxurious as they look, without the luxury price tag.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section ref={storyRef} className="py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={storyVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gold-soft/5 rounded-2xl" />
                <img
                  src="/manus-storage/about-founder_7aef28b3.png"
                  alt="Maimuna Founder"
                  className="relative rounded-xl shadow-lg w-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={storyVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-gold-soft text-xs font-medium uppercase tracking-[0.2em] mb-3">The Beginning</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium mb-6">
                A personal journey to premium modest fashion
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  It started with a frustration — the search for hijabs that combined premium quality
                  with fair pricing seemed endless. The market offered either basic, affordable options
                  or luxury pieces at inaccessible prices. There was nothing in between.
                </p>
                <p>
                  So we created it ourselves. Maimuna was born from countless hours of fabric research,
                  artisan partnerships, and an unwavering commitment to quality. We traveled to fabric
                  markets, studied weaving techniques, and worked directly with manufacturers to bring
                  our vision to life.
                </p>
                <p>
                  Today, Maimuna serves thousands of women across 15+ countries, each piece carrying
                  the same commitment to excellence that started it all. We're not just selling hijabs —
                  we're building a community of women who refuse to compromise.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section ref={valuesRef} className="py-20 lg:py-28 bg-beige-warm/30">
        <div className="container">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={valuesVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-gold-soft text-xs font-medium uppercase tracking-[0.2em] mb-3"
            >
              Our Values
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={valuesVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-serif text-3xl lg:text-4xl font-medium"
            >
              What We Stand For
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                animate={valuesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="p-8 rounded-2xl bg-[var(--background)] border border-border/50 hover:border-gold-soft/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-brand/5 flex items-center justify-center mb-5">
                  <value.icon className="w-5 h-5 text-emerald-brand" />
                </div>
                <h3 className="font-serif text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-emerald-brand">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "15+", label: "Countries Served" },
              { value: "50+", label: "Unique Designs" },
              { value: "4.8", label: "Average Rating" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-serif text-3xl lg:text-4xl text-white font-medium">{stat.value}</p>
                <p className="text-xs text-white/50 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
