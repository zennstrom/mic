/**
 * Contact Page — Contact form, FAQ, social links
 * Style: Velvet & Vines / Botanical Modernism
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Send, ChevronDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchModal from "@/components/layout/SearchModal";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 5-7 business days domestically and 10-15 business days internationally. Express shipping is available for 2-3 business day delivery.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day hassle-free return policy. Items must be unused and in original packaging. Simply contact us and we'll provide a return label.",
  },
  {
    question: "How do I care for my hijab?",
    answer: "Most of our hijabs can be hand-washed in cold water with mild detergent. Avoid bleach and tumble drying. Hang dry in shade for best results. Silk and velvet pieces should be dry cleaned.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes! We ship to over 50 countries worldwide. Shipping costs are calculated at checkout based on your location. Free shipping on orders over $50.",
  },
  {
    question: "Can I get a custom color?",
    answer: "We're currently working on a custom color service. For bulk orders (10+ pieces), please contact us directly and we can discuss custom color options.",
  },
  {
    question: "How do I apply a discount code?",
    answer: "During checkout, you'll see a field to enter your promo code. Valid codes include WELCOME10 for 10% off your first order and MAIMUNA15 for 15% off.",
  },
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const { ref: formRef, isVisible: formVisible } = useScrollReveal(0.1);
  const { ref: faqRef, isVisible: faqVisible } = useScrollReveal(0.1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />
      <SearchModal />
      <ScrollToTop />

      {/* Header */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-beige-warm/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-2xl"
          >
            <p className="text-gold-soft text-xs font-medium uppercase tracking-[0.2em] mb-4">Get in Touch</p>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium mb-4">We'd Love to Hear from You</h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Whether you have a question about our products, need styling advice, or just want to say hello —
              we're here for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Mail, title: "Email Us", detail: "hello@maimuna.co", sub: "We respond within 24 hours" },
              { icon: MessageCircle, title: "WhatsApp", detail: "+44 123 456 789", sub: "Mon-Fri, 9am-6pm GMT" },
              { icon: MapPin, title: "Visit Us", detail: "London, UK", sub: "By appointment only" },
            ].map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-xl bg-beige-warm/40 border border-border/30 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-brand/5 flex items-center justify-center mx-auto mb-3">
                  <info.icon className="w-5 h-5 text-emerald-brand" />
                </div>
                <h3 className="font-serif text-lg font-medium mb-1">{info.title}</h3>
                <p className="text-sm text-foreground font-medium">{info.detail}</p>
                <p className="text-xs text-muted-foreground mt-1">{info.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={formRef} className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={formVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="font-serif text-2xl lg:text-3xl font-medium mb-6">Send Us a Message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-brand/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-emerald-brand" />
                  </div>
                  <h3 className="font-serif text-xl font-medium mb-2">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-brand/20 focus:border-emerald-brand/30 transition-all"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-brand/20 focus:border-emerald-brand/30 transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-brand/20 focus:border-emerald-brand/30 transition-all resize-none"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-emerald-brand hover:bg-emerald-brand/90 text-white rounded-full text-sm font-medium tracking-wide"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>

            {/* FAQ */}
            <motion.div
              ref={faqRef}
              initial={{ opacity: 0, x: 20 }}
              animate={faqVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="font-serif text-2xl lg:text-3xl font-medium mb-6">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={faqVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="border border-border/50 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-beige-warm/30 transition-colors"
                    >
                      <span className="text-sm font-medium pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                          openFaq === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaq === i ? "auto" : 0,
                        opacity: openFaq === i ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 bg-beige-warm/30">
        <div className="container text-center">
          <h2 className="font-serif text-2xl font-medium mb-6">Follow Us</h2>
          <div className="flex justify-center gap-4">
            {["Instagram", "TikTok", "Pinterest", "YouTube"].map(social => (
              <a
                key={social}
                href="#"
                className="px-6 py-3 rounded-full bg-white border border-border/50 text-sm font-medium text-foreground hover:border-emerald-brand/30 hover:text-emerald-brand transition-all"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
