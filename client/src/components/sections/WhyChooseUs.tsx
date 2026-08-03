/**
 * WhyChooseUs — Brand values section with icons
 * Style: Velvet & Vines / Botanical Modernism
 */
import { motion } from "framer-motion";
import { Leaf, Shield, Heart, Sparkles, Truck, RotateCcw } from "lucide-react";
import SectionHeader from "./SectionHeader";

const features = [
  {
    icon: Leaf,
    title: "Premium Fabrics",
    description: "Only the finest materials — silk, chiffon, modal, and organic cotton.",
  },
  {
    icon: Shield,
    title: "Quality Crafted",
    description: "Hand-finished edges and meticulous attention to every detail.",
  },
  {
    icon: Heart,
    title: "Designed for You",
    description: "Ergonomic draping that flatters every face shape and style.",
  },
  {
    icon: Sparkles,
    title: "Affordable Luxury",
    description: "Premium quality at prices that make luxury accessible to all.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary worldwide shipping on orders over $50.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns for your complete peace of mind.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-beige-warm/40">
      <div className="container">
        <SectionHeader
          subtitle="Why Maimuna"
          title="Crafted with Care"
          description="Every detail matters. From fabric selection to final stitch, we ensure excellence."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="group p-6 lg:p-8 rounded-2xl bg-[var(--background)] border border-border/50 hover:border-gold-soft/30 hover:shadow-[0_8px_30px_rgba(201,169,110,0.08)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-brand/5 flex items-center justify-center mb-5 group-hover:bg-emerald-brand/10 transition-colors">
                <feature.icon className="w-5 h-5 text-emerald-brand" />
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
