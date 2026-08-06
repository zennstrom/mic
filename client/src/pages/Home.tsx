/**
 * Home Page — Maimuna Islamic Collection
 * Style: Velvet & Vines / Botanical Modernism
 * Assembles: Hero, FeaturedCollection, BestSellers, WhyChooseUs,
 *            LifestyleBanner, Testimonials, InstagramGallery, Newsletter
 */
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchModal from "@/components/layout/SearchModal";
import ScrollToTop from "@/components/layout/ScrollToTop";
import HeroSection from "@/components/sections/HeroSection";
import OurCollection from "@/components/sections/OurCollection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import LifestyleBanner from "@/components/sections/LifestyleBanner";
import Testimonials from "@/components/sections/Testimonials";
import InstagramGallery from "@/components/sections/InstagramGallery";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />
      <SearchModal />
      <ScrollToTop />

      <main>
        <HeroSection />
        <OurCollection />
        <WhyChooseUs />
        <LifestyleBanner />
        <Testimonials />
        <InstagramGallery />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
