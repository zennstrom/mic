import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
}

export interface RecentlyViewed {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

interface StoreContextType {
  cartItems: CartItem[];
  wishlistItems: string[];
  recentlyViewed: RecentlyViewed[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  cartCount: number;
  cartTotal: number;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addRecentlyViewed: (item: RecentlyViewed) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  applyCoupon: (code: string) => { valid: boolean; discount: number; message: string };
  couponDiscount: number;
  appliedCoupon: string | null;
}

const StoreContext = createContext<StoreContextType | null>(null);

const VALID_COUPONS: Record<string, { discount: number; message: string }> = {
  "WELCOME10": { discount: 10, message: "10% off applied! Welcome to Maimuna." },
  "MAIMUNA15": { discount: 15, message: "15% off applied! Thank you for shopping with us." },
  "FREESHIP": { discount: 5, message: "Free shipping discount applied!" },
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewed[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("maimuna-cart");
      if (saved) setCartItems(JSON.parse(saved));
      const savedWishlist = localStorage.getItem("maimuna-wishlist");
      if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist));
      const savedRecent = localStorage.getItem("maimuna-recent");
      if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
      const savedCoupon = localStorage.getItem("maimuna-coupon");
      if (savedCoupon) {
        const data = JSON.parse(savedCoupon);
        setAppliedCoupon(data.code);
        setCouponDiscount(data.discount);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("maimuna-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("maimuna-wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem("maimuna-recent", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem("maimuna-coupon", JSON.stringify({ code: appliedCoupon, discount: couponDiscount }));
  }, [couponDiscount, appliedCoupon]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.color === item.color);
      if (existing) {
        toast.success(`Updated ${item.name} quantity`);
        return prev.map(i =>
          i.id === item.id && i.color === item.color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      toast.success(`${item.name} added to bag`);
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
    toast.success("Item removed from bag");
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity } : i))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCouponDiscount(0);
    setAppliedCoupon(null);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlistItems(prev => {
      if (prev.includes(productId)) {
        toast.success("Removed from wishlist");
        return prev.filter(id => id !== productId);
      }
      toast.success("Added to wishlist");
      return [...prev, productId];
    });
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return wishlistItems.includes(productId);
  }, [wishlistItems]);

  const addRecentlyViewed = useCallback((item: RecentlyViewed) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(i => i.id !== item.id);
      return [item, ...filtered].slice(0, 8);
    });
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const upperCode = code.toUpperCase().trim();
    const coupon = VALID_COUPONS[upperCode];
    if (coupon) {
      setCouponDiscount(coupon.discount);
      setAppliedCoupon(upperCode);
      toast.success(coupon.message);
      return { valid: true, discount: coupon.discount, message: coupon.message };
    }
    toast.error("Invalid coupon code");
    return { valid: false, discount: 0, message: "Invalid coupon code" };
  }, []);

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        wishlistItems,
        recentlyViewed,
        isCartOpen,
        isSearchOpen,
        isMobileMenuOpen,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addRecentlyViewed,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen(prev => !prev),
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        openMobileMenu: () => setIsMobileMenuOpen(true),
        closeMobileMenu: () => setIsMobileMenuOpen(false),
        applyCoupon,
        couponDiscount,
        appliedCoupon,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
