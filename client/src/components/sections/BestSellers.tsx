/**
 * BestSellers — Featured product grid
 * Style: Velvet & Vines / Botanical Modernism
 */
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import SectionHeader from "./SectionHeader";

export default function BestSellers() {
  const bestSellers = products.filter(p => p.isBestseller).slice(0, 4);
  const display = bestSellers.length >= 4 ? bestSellers : products.slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-[var(--background)]">
      <div className="container">
        <SectionHeader
          subtitle="Most Loved"
          title="Best Sellers"
          description="The hijabs our customers can't stop raving about."
          viewAllLink="/shop"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {display.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
