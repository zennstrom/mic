/**
 * Admin Panel — Product management dashboard
 * Style: Velvet & Vines / Botanical Modernism (matches Homepage aesthetic)
 * Palette: Cream background, Emerald Brand accents, Soft Gold highlights, Serif headings
 */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Save,
  ArrowLeft,
  Package,
  Image as ImageIcon,
  RotateCcw,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  Sparkles,
  Check,
  Instagram,
  Video,
  Link2,
} from "lucide-react";
import { Link } from "wouter";
import { useProducts } from "@/contexts/ProductContext";
import { useReels } from "@/contexts/ReelContext";
import type { Product } from "@/data/products";
import { toast } from "sonner";

/* ─── credentials ────────────────────────────── */
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";
const AUTH_KEY = "maimuna-admin-auth";

/* ─── slug helper ───────────────────────────── */
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ─── blank product form state ───────────────── */
function blankForm(): Omit<Product, "id"> {
  return {
    name: "",
    slug: "",
    price: 0,
    comparePrice: undefined,
    description: "",
    longDescription: "",
    category: "Casual",
    subcategory: "",
    fabric: "",
    dimensions: "",
    features: [],
    colors: [],
    images: [],
    rating: 4.5,
    reviewCount: 0,
    isNew: false,
    isBestseller: false,
    isSale: false,
  };
}

/* ─── login screen (Homepage Aesthetic) ──────── */
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, "authenticated");
        toast.success("Welcome back, Admin");
        onLogin();
      } else {
        setError("Invalid username or password");
        toast.error("Invalid credentials");
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-between items-center py-12 px-4 relative overflow-hidden">
      {/* Decorative botanical gradient blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold-soft/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand logo top header */}
      <div className="flex items-center gap-3 z-10 mb-6">
        <img
          src="/images/logo_rbg.png"
          alt="Maimuna"
          className="h-10 w-10 object-contain"
        />
        <span className="font-serif text-2xl font-medium tracking-tight text-emerald-brand">
          Maimuna Islamic Collection
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-md z-10"
      >
        {/* Card */}
        <div className="rounded-2xl bg-white border border-border/80 shadow-xl p-8 sm:p-10 relative">
          <div className="text-center mb-8">
            <span className="text-gold-soft text-xs font-medium uppercase tracking-[0.2em] block mb-2">
              Admin Portal
            </span>
            <h1 className="font-serif text-3xl font-medium text-foreground">
              Sign In to Dashboard
            </h1>
            <div className="w-10 h-[2px] bg-gold-soft mx-auto mt-3" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium text-center">
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(""); }}
                placeholder="Enter username"
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-beige-warm/30 border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-beige-warm/30 border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full py-3.5 rounded-full bg-emerald-brand hover:bg-emerald-brand/90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Authenticate
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border/60 text-center">
            <Link href="/" className="text-xs font-medium text-muted-foreground hover:text-emerald-brand transition-colors">
              ← Return to Online Store
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Footer credits */}
      <div className="z-10 text-center text-xs text-muted-foreground/60">
        &copy; {new Date().getFullYear()} Maimuna Islamic Collection. All rights reserved.
      </div>
    </div>
  );
}

/* ─── main component ─────────────────────────── */
export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === "authenticated";
  });

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    toast.success("Logged out");
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

/* ─── dashboard ───────────────────────────────── */
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { products, addProduct, updateProduct, deleteProduct, resetToDefaults } = useProducts();
  const { reels, addReel, deleteReel, resetReels } = useReels();

  const [activeTab, setActiveTab] = useState<"products" | "reels">("products");

  // Product Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(blankForm());
  const [featuresText, setFeaturesText] = useState("");
  const [colorsText, setColorsText] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reel Form state
  const [showReelForm, setShowReelForm] = useState(false);
  const [reelUrl, setReelUrl] = useState("");
  const [reelCaption, setReelCaption] = useState("");
  const [reelVideoUrl, setReelVideoUrl] = useState("");
  const [reelDeleteConfirm, setReelDeleteConfirm] = useState<string | null>(null);

  /* ── helpers ────────────────────────────── */
  const openAdd = () => {
    setEditingId(null);
    setForm(blankForm());
    setFeaturesText("");
    setColorsText("");
    setImagePreview(null);
    setShowForm(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    const { id, ...rest } = product;
    setForm(rest);
    setFeaturesText(product.features.join(", "));
    setColorsText(product.colors.join(", "));
    setImagePreview(product.images[0] || null);
    setShowForm(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImagePreview(dataUrl);
      setForm(prev => ({ ...prev, images: [dataUrl, ...prev.images.slice(1)] }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (form.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }
    if (form.images.length === 0) {
      toast.error("At least one image is required");
      return;
    }

    const slug = form.slug || slugify(form.name);
    const features = featuresText
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
    const colors = colorsText
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const productData = {
      ...form,
      slug,
      features,
      colors,
    };

    if (editingId) {
      updateProduct(editingId, productData);
      toast.success("Product updated successfully");
    } else {
      addProduct(productData);
      toast.success("Product added successfully");
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirm(null);
    toast.success("Product deleted");
  };

  const handleReset = () => {
    if (activeTab === "products") {
      if (window.confirm("Reset all products to defaults? This will remove any custom products.")) {
        resetToDefaults();
        toast.success("Products reset to defaults");
      }
    } else {
      if (window.confirm("Reset all reels to default videos?")) {
        resetReels();
        toast.success("Reels reset to defaults");
      }
    }
  };

  const handleSaveReel = () => {
    if (!reelUrl.trim()) {
      toast.error("Instagram Reel link is required");
      return;
    }

    addReel({
      url: reelUrl.trim(),
      caption: reelCaption.trim() || undefined,
      videoUrl: reelVideoUrl.trim() || undefined,
    });

    toast.success("Reel added successfully");
    setReelUrl("");
    setReelCaption("");
    setReelVideoUrl("");
    setShowReelForm(false);
  };

  const handleDeleteReel = (id: string) => {
    deleteReel(id);
    setReelDeleteConfirm(null);
    toast.success("Reel deleted");
  };

  useEffect(() => {
    if (!editingId && form.name) {
      setForm(prev => ({ ...prev, slug: slugify(prev.name) }));
    }
  }, [form.name, editingId]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navbar Style Top Bar */}
      <header className="sticky top-0 z-40 bg-[var(--background)]/95 backdrop-blur-xl border-b border-border shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <img
                src="/images/logo_rbg.png"
                alt="Maimuna"
                className="h-9 w-9 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-medium tracking-tight text-emerald-brand">
                  Maimuna
                </span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-gold-soft">
                  Admin Dashboard
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-foreground hover:bg-beige-warm/60 border border-border/60 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              View Store
            </Link>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-beige-warm/60 border border-border/60 transition-all"
              title="Reset products to default catalog"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-red-600 hover:bg-red-50 border border-red-200/60 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>

            <button
              onClick={() => {
                if (activeTab === "products") openAdd();
                else setShowReelForm(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-brand hover:bg-emerald-brand/90 text-white text-xs font-medium tracking-wide shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              {activeTab === "products" ? "Add Product" : "Add Reel"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 mb-8 border-b border-border/80 pb-4">
          <button
            onClick={() => setActiveTab("products")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
              activeTab === "products"
                ? "bg-emerald-brand text-white shadow-sm"
                : "bg-white text-muted-foreground hover:bg-beige-warm/60 border border-border"
            }`}
          >
            <Package className="w-4 h-4" />
            Products Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("reels")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
              activeTab === "reels"
                ? "bg-emerald-brand text-white shadow-sm"
                : "bg-white text-muted-foreground hover:bg-beige-warm/60 border border-border"
            }`}
          >
            <Instagram className="w-4 h-4" />
            Instagram Reels ({reels.length})
          </button>
        </div>

        {/* Header Title */}
        <div className="mb-10">
          <span className="text-gold-soft text-xs font-medium uppercase tracking-[0.2em] block mb-2">
            {activeTab === "products" ? "Catalog Overview" : "Social Media Integration"}
          </span>
          <h1 className="font-serif text-3xl lg:text-4xl font-medium text-foreground mb-2">
            {activeTab === "products" ? "Manage Products" : "Manage Instagram Reels"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {activeTab === "products"
              ? "Add new hijabs, edit pricing, or manage catalog inventory displayed in 'Our Collection'."
              : "Add Instagram reel links or video previews displayed in 'Styled by You — Reels' section."}
          </p>
          <div className="w-12 h-[2px] bg-gold-soft mt-4" />
        </div>

        {/* ── PRODUCTS TAB VIEW ──────────── */}
        {activeTab === "products" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10">
              {[
                { label: "Total Inventory", value: products.length, badge: "Catalog" },
                { label: "Premium Collection", value: products.filter(p => p.category === "Premium").length, badge: "Premium" },
                { label: "Casual Essentials", value: products.filter(p => p.category === "Casual").length, badge: "Casual" },
                { label: "Formal Couture", value: products.filter(p => p.category === "Formal").length, badge: "Formal" },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-gold-soft text-[10px] font-semibold uppercase tracking-widest block mb-1">
                    {stat.badge}
                  </span>
                  <p className="text-muted-foreground text-xs font-medium mb-1">{stat.label}</p>
                  <p className="font-serif text-3xl font-semibold text-emerald-brand">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Products Table Card */}
            <div className="rounded-2xl bg-white border border-border shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-border bg-beige-warm/20 flex items-center justify-between">
                <h2 className="font-serif text-xl font-medium text-foreground">All Products</h2>
                <span className="text-xs font-medium text-muted-foreground bg-white px-3 py-1 rounded-full border border-border">
                  {products.length} {products.length === 1 ? "Item" : "Items"}
                </span>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-20 px-4">
                  <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-medium mb-1">No products found</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Your store currently has no products. Add a new product to publish it to the site.
                  </p>
                  <button
                    onClick={openAdd}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-brand text-white text-xs font-medium tracking-wide shadow-md hover:bg-emerald-brand/90 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add First Product
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-border/60">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="px-6 py-4 flex items-center gap-4 sm:gap-6 hover:bg-beige-warm/20 transition-colors group"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-beige-warm/50 border border-border overflow-hidden shrink-0 aspect-square">
                        {product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-soft">
                            {product.category}
                          </span>
                          {product.subcategory && (
                            <span className="text-[10px] text-muted-foreground/60">
                              • {product.subcategory}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-base font-medium text-foreground truncate group-hover:text-emerald-brand transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="text-sm font-semibold text-emerald-brand">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.comparePrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              ${product.comparePrice.toFixed(2)}
                            </span>
                          )}
                          
                          {/* Badges */}
                          <div className="flex items-center gap-1.5 ml-2">
                            {product.isNew && (
                              <span className="bg-emerald-brand text-white text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                New
                              </span>
                            )}
                            {product.isBestseller && (
                              <span className="bg-amber-100 text-amber-800 border border-amber-200 text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                Bestseller
                              </span>
                            )}
                            {product.isSale && (
                              <span className="bg-gold-soft text-charcoal text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                Sale
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-2.5 rounded-full text-muted-foreground hover:text-emerald-brand hover:bg-beige-warm/60 border border-transparent hover:border-border transition-all"
                          title="Edit product"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        {deleteConfirm === product.id ? (
                          <div className="flex items-center gap-1.5 bg-red-50 p-1 rounded-full border border-red-200">
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 rounded-full text-muted-foreground text-xs hover:text-foreground"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(product.id)}
                            className="p-2.5 rounded-full text-muted-foreground hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ── REELS TAB VIEW ─────────────── */}
        {activeTab === "reels" && (
          <>
            {/* Reels Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
              {[
                { label: "Active Reels", value: reels.length, badge: "Social Feed" },
                { label: "Instagram Links", value: reels.filter(r => r.url.includes("instagram")).length, badge: "Instagram" },
                { label: "Auto-play Previews", value: reels.filter(r => !!r.videoUrl).length, badge: "HTML5 Video" },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-gold-soft text-[10px] font-semibold uppercase tracking-widest block mb-1">
                    {stat.badge}
                  </span>
                  <p className="text-muted-foreground text-xs font-medium mb-1">{stat.label}</p>
                  <p className="font-serif text-3xl font-semibold text-emerald-brand">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Reels List Card */}
            <div className="rounded-2xl bg-white border border-border shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-border bg-beige-warm/20 flex items-center justify-between">
                <h2 className="font-serif text-xl font-medium text-foreground">Instagram Reels</h2>
                <button
                  onClick={() => setShowReelForm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-brand text-white text-xs font-medium shadow-sm hover:bg-emerald-brand/90 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Reel
                </button>
              </div>

              {reels.length === 0 ? (
                <div className="text-center py-20 px-4">
                  <Instagram className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-medium mb-1">No reels added</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Add Instagram reel URLs to feature them on the website.
                  </p>
                  <button
                    onClick={() => setShowReelForm(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-brand text-white text-xs font-medium shadow-md hover:bg-emerald-brand/90 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add First Reel
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-border/60">
                  {reels.map((reel) => (
                    <div
                      key={reel.id}
                      className="px-6 py-4 flex items-center gap-4 sm:gap-6 hover:bg-beige-warm/20 transition-colors group"
                    >
                      {/* Reel Thumbnail */}
                      <div className="w-14 h-20 rounded-xl bg-beige-warm/50 border border-border overflow-hidden shrink-0 aspect-[9/16] relative">
                        {reel.videoUrl ? (
                          <video
                            src={reel.videoUrl}
                            muted
                            loop
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={reel.thumbnail || "/images/placeholder.png"}
                            alt={reel.caption || "Reel"}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Instagram className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-soft">
                            {reel.author || "@maimunacollection"}
                          </span>
                        </div>
                        <h3 className="font-serif text-sm font-medium text-foreground line-clamp-2 mb-1">
                          {reel.caption || "No caption provided"}
                        </h3>
                        <a
                          href={reel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-emerald-brand hover:underline truncate inline-flex items-center gap-1"
                        >
                          <Link2 className="w-3 h-3" />
                          {reel.url}
                        </a>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {reelDeleteConfirm === reel.id ? (
                          <div className="flex items-center gap-1.5 bg-red-50 p-1 rounded-full border border-red-200">
                            <button
                              onClick={() => handleDeleteReel(reel.id)}
                              className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setReelDeleteConfirm(null)}
                              className="px-2 py-1 rounded-full text-muted-foreground text-xs hover:text-foreground"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setReelDeleteConfirm(reel.id)}
                            className="p-2.5 rounded-full text-muted-foreground hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all"
                            title="Delete reel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* ── Add Reel Modal ──────────────────────────────── */}
      <AnimatePresence>
        {showReelForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={(e) => { if (e.target === e.currentTarget) setShowReelForm(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-lg rounded-2xl bg-white border border-border shadow-2xl overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-beige-warm/20">
                <div>
                  <span className="text-gold-soft text-[10px] font-semibold uppercase tracking-widest block">
                    Social Integration
                  </span>
                  <h2 className="font-serif text-2xl font-medium text-foreground">
                    Add Instagram Reel
                  </h2>
                </div>
                <button
                  onClick={() => setShowReelForm(false)}
                  className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-beige-warm/60 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-6 space-y-5">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                    Reel Link / URL *
                  </label>
                  <input
                    type="url"
                    value={reelUrl}
                    onChange={e => setReelUrl(e.target.value)}
                    placeholder="e.g. https://www.instagram.com/reel/C..."
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl bg-beige-warm/20 border border-border text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Paste an Instagram Reel link or post URL. The cover thumbnail will be automatically detected.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                    Caption / Title <span className="normal-case text-muted-foreground/60">(Optional)</span>
                  </label>
                  <textarea
                    value={reelCaption}
                    onChange={e => setReelCaption(e.target.value)}
                    placeholder="Short description or styling tips..."
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl bg-beige-warm/20 border border-border text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                    Preview Video MP4 URL <span className="normal-case text-muted-foreground/60">(Optional for auto-play)</span>
                  </label>
                  <input
                    type="url"
                    value={reelVideoUrl}
                    onChange={e => setReelVideoUrl(e.target.value)}
                    placeholder="https://...video.mp4 (Optional for HTML5 hover/autoplay)"
                    className="w-full px-4 py-2.5 rounded-xl bg-beige-warm/20 border border-border text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-beige-warm/20">
                <button
                  type="button"
                  onClick={() => setShowReelForm(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-beige-warm/60 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveReel}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-brand hover:bg-emerald-brand/90 text-white text-xs font-medium tracking-wide shadow-md transition-all active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  Save Reel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Add / Edit Modal (Homepage Aesthetic) ──────────── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-2xl rounded-2xl bg-white border border-border shadow-2xl overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-beige-warm/20">
                <div>
                  <span className="text-gold-soft text-[10px] font-semibold uppercase tracking-widest block">
                    Product Form
                  </span>
                  <h2 className="font-serif text-2xl font-medium text-foreground">
                    {editingId ? "Edit Product Details" : "Add New Product"}
                  </h2>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-beige-warm/60 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-6 space-y-6 max-h-[72vh] overflow-y-auto">
                {/* Image Upload Area */}
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                    Product Image *
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-2 border-dashed border-border hover:border-emerald-brand bg-beige-warm/20 rounded-2xl h-48 flex items-center justify-center cursor-pointer transition-all group overflow-hidden"
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-xs font-medium bg-emerald-brand px-4 py-2 rounded-full shadow-md">
                            Change Image
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center mx-auto mb-2 shadow-sm">
                          <Upload className="w-5 h-5 text-emerald-brand" />
                        </div>
                        <p className="text-foreground font-serif text-sm font-medium">Click to upload photo</p>
                        <p className="text-muted-foreground text-xs mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* Name + Slug */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Royal Silk Chiffon"
                      className="w-full px-4 py-2.5 rounded-xl bg-beige-warm/20 border border-border text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="auto-generated"
                      className="w-full px-4 py-2.5 rounded-xl bg-beige-warm/20 border border-border text-muted-foreground text-sm focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all"
                    />
                  </div>
                </div>

                {/* Price + Compare Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.price || ""}
                      onChange={e => setForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                      placeholder="24.99"
                      className="w-full px-4 py-2.5 rounded-xl bg-beige-warm/20 border border-border text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                      Original Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.comparePrice || ""}
                      onChange={e => setForm(prev => ({
                        ...prev,
                        comparePrice: e.target.value ? parseFloat(e.target.value) : undefined,
                      }))}
                      placeholder="34.99 (Optional)"
                      className="w-full px-4 py-2.5 rounded-xl bg-beige-warm/20 border border-border text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                    Short Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Summary visible on cards and previews"
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl bg-beige-warm/20 border border-border text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                    Full Description
                  </label>
                  <textarea
                    value={form.longDescription}
                    onChange={e => setForm(prev => ({ ...prev, longDescription: e.target.value }))}
                    placeholder="Comprehensive details displayed on the product page"
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-beige-warm/20 border border-border text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all resize-none"
                  />
                </div>

                {/* Category + Subcategory */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-beige-warm/20 border border-border text-foreground text-sm focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all"
                    >
                      <option value="Premium">Premium</option>
                      <option value="Casual">Casual</option>
                      <option value="Formal">Formal</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                      Subcategory
                    </label>
                    <input
                      type="text"
                      value={form.subcategory}
                      onChange={e => setForm(prev => ({ ...prev, subcategory: e.target.value }))}
                      placeholder="e.g. Chiffon, Jersey, Silk"
                      className="w-full px-4 py-2.5 rounded-xl bg-beige-warm/20 border border-border text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all"
                    />
                  </div>
                </div>

                {/* Fabric + Dimensions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                      Fabric Material
                    </label>
                    <input
                      type="text"
                      value={form.fabric}
                      onChange={e => setForm(prev => ({ ...prev, fabric: e.target.value }))}
                      placeholder="e.g. 100% Premium Chiffon"
                      className="w-full px-4 py-2.5 rounded-xl bg-beige-warm/20 border border-border text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      value={form.dimensions}
                      onChange={e => setForm(prev => ({ ...prev, dimensions: e.target.value }))}
                      placeholder="e.g. 180cm x 75cm"
                      className="w-full px-4 py-2.5 rounded-xl bg-beige-warm/20 border border-border text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all"
                    />
                  </div>
                </div>

                {/* Features & Colors */}
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                    Features <span className="normal-case text-muted-foreground/60">(Comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    value={featuresText}
                    onChange={e => setFeaturesText(e.target.value)}
                    placeholder="Silk-like feel, Non-slip texture, Hand-rolled edges"
                    className="w-full px-4 py-2.5 rounded-xl bg-beige-warm/20 border border-border text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                    Available Colors <span className="normal-case text-muted-foreground/60">(Comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    value={colorsText}
                    onChange={e => setColorsText(e.target.value)}
                    placeholder="Deep Emerald, Warm Beige, Soft Gold"
                    className="w-full px-4 py-2.5 rounded-xl bg-beige-warm/20 border border-border text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all"
                  />
                </div>

                {/* Badges Toggles */}
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3 block">
                    Product Badges
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { key: "isNew", label: "New Arrival" },
                      { key: "isBestseller", label: "Bestseller" },
                      { key: "isSale", label: "On Sale" },
                    ].map(badge => {
                      const active = form[badge.key as keyof typeof form];
                      return (
                        <button
                          key={badge.key}
                          type="button"
                          onClick={() =>
                            setForm(prev => ({ ...prev, [badge.key]: !prev[badge.key as keyof typeof prev] }))
                          }
                          className={`px-4 py-2 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
                            active
                              ? "bg-emerald-brand text-white border-emerald-brand shadow-sm"
                              : "bg-white text-muted-foreground border-border hover:border-emerald-brand/40"
                          }`}
                        >
                          {active && <Check className="w-3.5 h-3.5" />}
                          {badge.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-beige-warm/20">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-beige-warm/60 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-brand hover:bg-emerald-brand/90 text-white text-xs font-medium tracking-wide shadow-md transition-all active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  {editingId ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
