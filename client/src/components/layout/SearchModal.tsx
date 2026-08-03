/**
 * SearchModal — Full-screen search overlay
 * Style: Velvet & Vines / Botanical Modernism
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { products } from "@/data/products";
import { Link } from "wouter";

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeSearch]);

  const results = query.length > 1
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-white/98 backdrop-blur-xl"
        >
          <div className="container max-w-2xl mx-auto pt-24 px-4">
            {/* Close */}
            <button
              onClick={closeSearch}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search hijabs, fabrics, collections..."
                className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-emerald-brand/20 focus:border-emerald-brand/30 transition-all placeholder:text-muted-foreground/50"
              />
            </div>

            {/* Results */}
            <div className="mt-6 max-h-[60vh] overflow-y-auto">
              {query.length > 1 && results.length === 0 && (
                <p className="text-center text-muted-foreground py-12">
                  No results found for "{query}"
                </p>
              )}
              <div className="space-y-2">
                {results.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={closeSearch}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors group"
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-secondary shrink-0">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate group-hover:text-emerald-brand transition-colors">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.category} · {product.fabric}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-emerald-brand">${product.price.toFixed(2)}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            {query.length <= 1 && (
              <div className="mt-8">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {["Chiffon", "Silk", "Premium", "Casual", "Formal", "Embroidered"].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-4 py-2 rounded-full text-sm bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
