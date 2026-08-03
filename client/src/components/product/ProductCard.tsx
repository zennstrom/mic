/**
 * ProductCard — Premium product card with hover reveal
 * Style: Velvet & Vines / Botanical Modernism
 * - Soft shadow elevation, warm background
 * - Image swap on hover, gold badge accents
 */
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { Link } from "wouter";
import { useStore } from "@/contexts/StoreContext";
import { useState } from "react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: "default" | "compact";
}

export default function ProductCard({ product, index = 0, variant = "default" }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: product.colors[0],
    });
  };

  const cardContent = (
    <div className="group">
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl bg-beige-warm/50 aspect-[3/4]">
        <img
          src={product.images[isHovered && product.images.length > 1 ? 1 : 0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-emerald-brand text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
              New
            </span>
          )}
          {product.isSale && (
            <span className="bg-gold-soft text-charcoal text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>

        {/* Actions overlay */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300",
          isHovered ? "opacity-100" : "opacity-0 bg-black/5"
        )}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg",
              inWishlist
                ? "bg-red-50 text-red-500 scale-100"
                : "bg-white text-foreground hover:bg-red-50 hover:text-red-500"
            )}
            aria-label="Add to wishlist"
          >
            <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/product/${product.slug}`;
            }}
            className="w-10 h-10 rounded-full bg-white text-foreground flex items-center justify-center shadow-lg hover:bg-emerald-brand hover:text-white transition-all duration-200"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="absolute bottom-3 left-3 right-3"
        >
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-emerald-brand/95 backdrop-blur-sm text-white text-xs font-medium rounded-lg hover:bg-emerald-brand transition-colors"
          >
            Add to Bag
          </button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="mt-3.5 px-0.5">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-serif text-sm font-medium text-foreground leading-snug group-hover:text-emerald-brand transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-semibold text-foreground">${product.price.toFixed(2)}</span>
          {product.comparePrice && (
            <span className="text-xs text-muted-foreground line-through">${product.comparePrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.23, 1, 0.32, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`} onClick={(e: React.MouseEvent) => e.preventDefault()}>
        {cardContent}
      </Link>
    </motion.div>
  );
}
