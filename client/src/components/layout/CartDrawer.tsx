/**
 * CartDrawer — Slide-in shopping cart
 * Style: Velvet & Vines / Botanical Modernism
 * - Slides from right with backdrop
 * - Warm beige interior, emerald accents
 */
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    couponDiscount,
  } = useStore();

  const discountedTotal = cartTotal * (1 - couponDiscount / 100);
  const shipping = discountedTotal >= 50 ? 0 : 5.99;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[var(--background)] shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-emerald-brand" />
                  <h2 className="font-serif text-xl font-medium">Shopping Bag</h2>
                  <span className="text-sm text-muted-foreground">({cartCount})</span>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mb-4" />
                    <p className="font-serif text-lg text-muted-foreground mb-2">Your bag is empty</p>
                    <p className="text-sm text-muted-foreground/70 mb-6">Discover our premium collection</p>
                    <Link href="/shop">
                      <Button variant="default" className="bg-emerald-brand hover:bg-emerald-brand/90 text-white" onClick={closeCart}>
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex gap-4 py-4 border-b border-border last:border-0"
                      >
                        <div className="w-20 h-24 rounded-lg overflow-hidden bg-secondary shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium truncate">{item.name}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.color}</p>
                          <p className="text-sm font-medium mt-2">${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 self-start text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-border px-6 py-5 bg-beige-warm/30">
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-emerald-brand">Discount ({couponDiscount}%)</span>
                      <span className="text-emerald-brand">-${(cartTotal - discountedTotal).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg mb-4 pt-3 border-t border-border">
                    <span>Total</span>
                    <span>${(discountedTotal + shipping).toFixed(2)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-center text-muted-foreground mb-4">
                      Free shipping on orders over $50
                    </p>
                  )}
                  <Button
                    className="w-full bg-emerald-brand hover:bg-emerald-brand/90 text-white h-12 text-sm font-medium tracking-wide"
                    onClick={() => {
                      closeCart();
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
