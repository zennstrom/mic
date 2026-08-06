/**
 * OurCollection — Unified product showcase section
 * Style: Velvet & Vines / Botanical Modernism
 * Replaces separate FeaturedCollection + BestSellers
 */
import ProductCard from "@/components/product/ProductCard";
import SectionHeader from "./SectionHeader";
import { useProducts } from "@/contexts/ProductContext";

export default function OurCollection() {
  const { products } = useProducts();
  // Show up to 8 products on the home page
  const display = products.slice(0, 8);

  return (
    <section className="py-20 lg:py-28 bg-[var(--background)]">
      <div className="container">
        <SectionHeader
          subtitle="Curated for You"
          title="Our Collection"
          description="From everyday essentials to statement pieces, discover premium hijabs crafted for effortless elegance."
          viewAllLink="/shop"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {display.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="font-serif text-xl text-muted-foreground mb-2">No products yet</p>
            <p className="text-sm text-muted-foreground/70">Products added via the admin panel will appear here.</p>
          </div>
        )}
      </div>
    </section>
  );
}
