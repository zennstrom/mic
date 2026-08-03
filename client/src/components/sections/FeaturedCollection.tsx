/**
 * FeaturedCollection — Category cards section
 * Style: Velvet & Vines / Botanical Modernism
 */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import SectionHeader from "./SectionHeader";

const collections = [
  {
    title: "Premium",
    description: "Luxurious fabrics for the discerning woman",
    image: "/manus-storage/category-premium_0d5ff047.png",
    href: "/shop?category=premium",
    color: "from-emerald-brand/90 to-emerald-brand/60",
  },
  {
    title: "Casual",
    description: "Everyday elegance, effortless comfort",
    image: "/manus-storage/category-casual_636d20fa.png",
    href: "/shop?category=casual",
    color: "from-charcoal/80 to-charcoal/40",
  },
  {
    title: "Formal",
    description: "Statement pieces for special occasions",
    image: "/manus-storage/category-formal_867580ed.png",
    href: "/shop?category=formal",
    color: "from-emerald-brand/90 to-charcoal/60",
  },
];

export default function FeaturedCollection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--background)]">
      <div className="container">
        <SectionHeader
          subtitle="Curated for You"
          title="Explore Our Collections"
          description="From everyday essentials to statement pieces, find the perfect hijab for every occasion."
          viewAllLink="/shop"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((collection, i) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
            >
              <Link href={collection.href} className="group block">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${collection.color}`} />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                    <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-2">
                      {collection.description}
                    </p>
                    <h3 className="font-serif text-2xl lg:text-3xl text-white font-medium mb-3">
                      {collection.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
