/**
 * ProductPage — Full product detail with gallery, reviews, sticky purchase
 * Style: Velvet & Vines / Botanical Modernism
 */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, ChevronLeft, ChevronRight, ShoppingCart, Check, Truck, RotateCcw, Shield } from "lucide-react";
import { useParams, Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchModal from "@/components/layout/SearchModal";
import ScrollToTop from "@/components/layout/ScrollToTop";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { useStore } from "@/contexts/StoreContext";
import { toast } from "sonner";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(() => products.find(p => p.slug === slug), [slug]);

  // Track recently viewed
  if (product) {
    addRecentlyViewed({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
    });
  }

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.id !== product.id && (p.category === product.category || p.fabric.includes(product.fabric.split(" ").pop() || "")))
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container pt-32 text-center">
          <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
          <Link href="/shop" className="text-emerald-brand hover:underline">
            Return to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[selectedImage],
      color: product.colors[selectedColor],
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />
      <SearchModal />
      <ScrollToTop />

      {/* Breadcrumbs */}
      <div className="container pt-24 pb-4">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-emerald-brand transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-emerald-brand transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-emerald-brand transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Main Content */}
      <section className="container pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="sticky top-24">
              {/* Main Image */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-beige-warm/50 mb-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage]}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Navigation arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(i => (i - 1 + product.images.length) % product.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(i => (i + 1) % product.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
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
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-200 ${
                        i === selectedImage ? "border-emerald-brand" : "border-transparent hover:border-border"
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-xs text-gold-soft font-medium uppercase tracking-[0.2em] mb-2">
              {product.category} Collection
            </p>
            <h1 className="font-serif text-3xl lg:text-4xl font-medium mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-gold-soft fill-current" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
              {product.comparePrice && (
                <span className="text-lg text-muted-foreground line-through">${product.comparePrice.toFixed(2)}</span>
              )}
              {product.isSale && product.comparePrice && (
                <span className="text-sm text-emerald-brand font-medium">
                  Save ${(product.comparePrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">
                Color: <span className="text-muted-foreground">{product.colors[selectedColor]}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(i)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                      i === selectedColor
                        ? "border-emerald-brand bg-emerald-brand/5 text-emerald-brand"
                        : "border-border text-muted-foreground hover:border-muted-foreground/50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Quantity</p>
              <div className="inline-flex items-center border border-border rounded-full">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary rounded-l-full transition-colors"
                >
                  <span className="text-lg">−</span>
                </button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary rounded-r-full transition-colors"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-emerald-brand hover:bg-emerald-brand/90 text-white rounded-full text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Bag
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all ${
                  inWishlist ? "bg-red-50 border-red-200 text-red-500" : "hover:bg-secondary"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-beige-warm/40 rounded-xl mb-8">
              <div className="text-center">
                <Truck className="w-5 h-5 text-emerald-brand mx-auto mb-1.5" />
                <p className="text-[10px] text-muted-foreground">Free Shipping<br />over $50</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-5 h-5 text-emerald-brand mx-auto mb-1.5" />
                <p className="text-[10px] text-muted-foreground">30-Day<br />Returns</p>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 text-emerald-brand mx-auto mb-1.5" />
                <p className="text-[10px] text-muted-foreground">Quality<br />Guaranteed</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-border pt-6">
              <h3 className="font-serif text-lg font-medium mb-4">Product Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fabric</span>
                  <span className="font-medium">{product.fabric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span className="font-medium">{product.dimensions}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mt-5">
                <h4 className="text-sm font-medium mb-2">Features</h4>
                <ul className="space-y-1.5">
                  {product.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Summary */}
      <section className="bg-beige-warm/30 py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl lg:text-3xl font-medium mb-4">Customer Reviews</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-gold-soft fill-current" : "text-border"}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Based on {product.reviewCount} reviews
            </p>
            <p className="text-xs text-muted-foreground/60">Write a review feature coming soon</p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 container">
          <h2 className="font-serif text-2xl lg:text-3xl font-medium mb-8">You May Also Love</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {relatedProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
