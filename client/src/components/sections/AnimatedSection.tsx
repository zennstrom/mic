/**
 * AnimatedSection — Reusable scroll-reveal wrapper
 * Style: Velvet & Vines / Botanical Modernism
 */
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

export default function AnimatedSection({ children, className = "", delay = 0, stagger = false }: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.23, 1, 0.32, 1],
        ...(stagger && { staggerChildren: 0.06 }),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
