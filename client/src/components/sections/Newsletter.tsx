/**
 * Newsletter — Email signup with gold accent
 * Style: Velvet & Vines / Botanical Modernism
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useScrollReveal(0.15);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubmitted(true);
      toast.success("Welcome to Maimuna! Check your inbox for 10% off.");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-beige-warm/40">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-gold-soft text-xs font-medium uppercase tracking-[0.2em] mb-3 block"
          >
            Stay Connected
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-serif text-3xl lg:text-4xl font-medium mb-4"
          >
            Join the Maimuna Family
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-sm lg:text-base mb-8 max-w-md mx-auto"
          >
            Be the first to know about new collections, exclusive offers, and styling tips.
            Get 10% off your first order.
          </motion.p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-emerald-brand font-medium"
            >
              Welcome to Maimuna! Check your inbox for your discount code.
            </motion.p>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 bg-[var(--background)] border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-brand/20 focus:border-emerald-brand/30 transition-all placeholder:text-muted-foreground/50"
                required
              />
              <Button
                type="submit"
                className="bg-emerald-brand hover:bg-emerald-brand/90 text-white h-12 px-6 rounded-full text-sm font-medium tracking-wide shrink-0"
              >
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
