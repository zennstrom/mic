/**
 * SectionHeader — Consistent section headings with decorative gold line
 * Style: Velvet & Vines / Botanical Modernism
 */
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  viewAllLink?: string;
  className?: string;
}

export default function SectionHeader({ title, subtitle, description, viewAllLink, className = "" }: SectionHeaderProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div ref={ref} className={`mb-12 lg:mb-16 ${className}`}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0, ease: [0.23, 1, 0.32, 1] }}
          className="text-gold-soft text-xs font-medium uppercase tracking-[0.2em] mb-3 block"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
        className="font-serif text-3xl lg:text-4xl font-medium text-foreground mb-3"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="text-muted-foreground text-sm lg:text-base max-w-lg"
        >
          {description}
        </motion.p>
      )}
      {/* Gold accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        className="w-12 h-[2px] bg-gold-soft mt-4 origin-left"
      />
      {viewAllLink && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6"
        >
          <Link
            href={viewAllLink}
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-brand hover:text-emerald-brand/80 transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
