/**
 * ProductContext — Dynamic product state management
 * Persists products to localStorage; falls back to hardcoded defaults.
 * Provides CRUD operations for admin panel.
 */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { products as defaultProducts, categories as defaultCategories, type Product } from "@/data/products";
import { nanoid } from "nanoid";

interface ProductContextType {
  products: Product[];
  categories: typeof defaultCategories;
  addProduct: (product: Omit<Product, "id">) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEY = "maimuna-products";

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: Product) => ({ ...p, images: ["/images/placeholder.png"] }));
        }
      }
    } catch {}
    return defaultProducts.map(p => ({ ...p, images: ["/images/placeholder.png"] }));
  });

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = useCallback((product: Omit<Product, "id">): Product => {
    const newProduct: Product = {
      ...product,
      id: nanoid(8),
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const resetToDefaults = useCallback(() => {
    setProducts(defaultProducts.map(p => ({ ...p, images: ["/images/placeholder.png"] })));
  }, []);

  // Dynamically compute categories from current products
  const categories = [
    defaultCategories[0], // "All Collections"
    ...Array.from(new Set(products.map(p => p.category)))
      .map(cat => ({
        id: cat.toLowerCase(),
        name: cat,
        slug: cat.toLowerCase(),
      })),
  ];

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaults,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
}
