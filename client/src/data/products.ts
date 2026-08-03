export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  description: string;
  longDescription: string;
  category: string;
  subcategory: string;
  fabric: string;
  dimensions: string;
  features: string[];
  colors: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isSale?: boolean;
}

// Curated product image URLs — each product gets unique imagery
// Mix of generated category images, uploaded product photos, and Unsplash hijab/fabric shots
const img = {
  hero1: "/manus-storage/hero-1_49258346.png",
  hero2: "/manus-storage/hero-2_0072d134.png",
  premium: "/manus-storage/category-premium_0d5ff047.png",
  casual: "/manus-storage/category-casual_636d20fa.png",
  formal: "/manus-storage/category-formal_867580ed.png",
  lifestyle: "/manus-storage/lifestyle-banner_c351dad1.png",
  insta: "/manus-storage/instagram-gallery_fa20141d.png",
  // Uploaded product/hijab images
  hijab1: "/manus-storage/xTtP5Zo7jxdQ_a4a9586c.jpg", // hijab flatlay green
  hijab2: "/manus-storage/RbIhzN0myAL6_1e2aa5ce.jpg", // silk scarf
  hijab3: "/manus-storage/30Lt63vK6KHm_6790e5b3.jpg", // hijab editorial
  hijab4: "/manus-storage/WNaWxX0wjBHf_8f99c0b3.jpg", // hijab editorial 2
  hijab5: "/manus-storage/tF5CaeDDbAXb_cdb47986.jpg", // hijab style
  hijab6: "/manus-storage/jctDrzWCd8Og_81a5d923.jpg", // hijab style 2
  hijab7: "/manus-storage/jrj72dlLVPRw_fdd6d799.jpg", // hijab product
  hijab8: "/manus-storage/qmymOoGZyRmZ_d69f577e.jpg", // hijab fashion
};

// Curated fabric/scarf/hijab product images
const fabricImgs = [
  "/manus-storage/ckuMXm2jP8Qb_c77e3806.jpg",  // hijab product photography
  "/manus-storage/eJcoQeCfA1Ty_0ba271f7.jpg",  // hijab fabric types
  "/manus-storage/fdKtWTLzqMFq_807f38f0.jpg",  // luxury fabric
  "/manus-storage/Yxv0GxkVcJqd_4ba87c2b.png",  // modest fashion model
  "/manus-storage/XsF2Tyw61SOP_8fcba081.jpg",  // scarf photography
  "/manus-storage/H51Z3X1IzuTM_d281ad37.jpg",  // luxury pashmina
  "/manus-storage/miOxGxIZwZCG_f05ecb2a.jpg",  // modest fashion editorial
  "/manus-storage/BoiSIgaScxMY_1a0c7d42.png",  // silk scarf closeup
];

export const products: Product[] = [
  {
    id: "1",
    name: "Silk Touch Chiffon Hijab",
    slug: "silk-touch-chiffon-hijab",
    price: 24.99,
    comparePrice: 34.99,
    description: "Ultra-soft chiffon with a silk-like drape. Perfect for everyday elegance.",
    longDescription: "Our bestselling Silk Touch Chiffon Hijab combines the breathable comfort of premium chiffon with an impossibly soft, silk-like hand feel. The lightweight fabric drapes beautifully without slipping, making it ideal for all-day wear. Each piece is carefully finished with hand-rolled edges for a refined look.",
    category: "Premium",
    subcategory: "Chiffon",
    fabric: "100% Premium Chiffon",
    dimensions: "180cm x 75cm",
    features: ["Silk-like hand feel", "Non-slip texture", "Hand-rolled edges", "Breathable weave", "Wrinkle resistant"],
    colors: ["Deep Emerald", "Warm Beige", "Soft Gold", "Charcoal", "Navy"],
    images: [
      img.hijab1,
      img.hijab5,
      fabricImgs[0],
      fabricImgs[3],
    ],
    rating: 4.8,
    reviewCount: 142,
    isBestseller: true,
    isSale: true,
  },
  {
    id: "2",
    name: "Premium Jersey Hijab",
    slug: "premium-jersey-hijab",
    price: 19.99,
    description: "Stretchy, comfortable jersey fabric for effortless everyday styling.",
    longDescription: "The Premium Jersey Hijab is crafted from our exclusive four-way stretch jersey blend. It offers a secure fit without pins, drapes beautifully on all face shapes, and maintains its shape wash after wash. The matte finish gives a sophisticated, understated look perfect for daily wear.",
    category: "Casual",
    subcategory: "Jersey",
    fabric: "95% Viscose, 5% Elastane",
    dimensions: "180cm x 70cm",
    features: ["Four-way stretch", "No-pins-needed fit", "Matte finish", "Machine washable", "Fade resistant"],
    colors: ["Black", "Warm Beige", "Dusty Rose", "Sage Green", "Charcoal"],
    images: [
      img.casual,
      img.hijab6,
      fabricImgs[4],
      fabricImgs[0],
    ],
    rating: 4.7,
    reviewCount: 98,
    isBestseller: true,
  },
  {
    id: "3",
    name: "Royal Satin Hijab",
    slug: "royal-satin-hijab",
    price: 29.99,
    description: "Lustrous satin finish for special occasions and evening wear.",
    longDescription: "The Royal Satin Hijab brings a touch of opulence to any occasion. Its luminous satin surface catches light beautifully, creating an elegant sheen that elevates your ensemble. The medium-weight fabric provides excellent drape without being too heavy, making it perfect for formal events and celebrations.",
    category: "Formal",
    subcategory: "Satin",
    fabric: "100% Polyester Satin",
    dimensions: "180cm x 75cm",
    features: ["Lustrous satin finish", "Medium-weight drape", "Elegant sheen", "Fray-resistant edges", "Color-fast dye"],
    colors: ["Emerald", "Black", "Deep Burgundy", "Navy", "Gold"],
    images: [
      img.hijab2,
      img.formal,
      fabricImgs[7],
      fabricImgs[1],
    ],
    rating: 4.9,
    reviewCount: 76,
    isNew: true,
  },
  {
    id: "4",
    name: "Cotton Crinkle Hijab",
    slug: "cotton-crinkle-hijab",
    price: 16.99,
    comparePrice: 22.99,
    description: "Natural cotton with a relaxed crinkle texture for casual comfort.",
    longDescription: "Our Cotton Crinkle Hijab is made from 100% organic cotton with a beautiful textured crinkle weave. It's breathable, lightweight, and naturally cool — perfect for warm weather. The relaxed texture gives it an effortless, lived-in look that's both comfortable and stylish.",
    category: "Casual",
    subcategory: "Cotton",
    fabric: "100% Organic Cotton",
    dimensions: "180cm x 70cm",
    features: ["100% organic cotton", "Crinkle texture", "Breathable weave", "Pre-washed softness", "Eco-friendly"],
    colors: ["Natural Beige", "Olive", "Terracotta", "Sky Blue", "White"],
    images: [
      img.hijab7,
      fabricImgs[5],
      fabricImgs[6],
      img.hijab8,
    ],
    rating: 4.6,
    reviewCount: 54,
    isSale: true,
  },
  {
    id: "5",
    name: "Luxury Silk Blend Hijab",
    slug: "luxury-silk-blend-hijab",
    price: 39.99,
    description: "Silk-cotton blend for ultimate luxury and comfort in one fabric.",
    longDescription: "The Luxury Silk Blend Hijab represents the pinnacle of our collection. Blending the finest natural silk with premium cotton, this hijab offers an extraordinary combination of lustrous beauty and practical comfort. The fabric drapes like liquid, with a subtle sheen that's understated yet unmistakably luxurious.",
    category: "Premium",
    subcategory: "Silk Blend",
    fabric: "70% Silk, 30% Cotton",
    dimensions: "180cm x 75cm",
    features: ["Silk-cotton blend", "Liquid-like drape", "Natural sheen", "Temperature regulating", "Hand-wash recommended"],
    colors: ["Ivory", "Midnight Blue", "Rose Gold", "Charcoal", "Sage"],
    images: [
      img.hero2,
      img.hijab3,
      fabricImgs[2],
      fabricImgs[4],
    ],
    rating: 5.0,
    reviewCount: 31,
    isNew: true,
  },
  {
    id: "6",
    name: "Modal Soft Hijab",
    slug: "modal-soft-hijab",
    price: 21.99,
    description: "Buttery-soft modal fabric that feels like a second skin.",
    longDescription: "The Modal Soft Hijab is crafted from premium modal fabric, known for its incredibly soft, silky texture that improves with every wash. The fabric is highly breathable, moisture-wicking, and naturally anti-bacterial, making it perfect for active lifestyles while maintaining its elegant appearance.",
    category: "Casual",
    subcategory: "Modal",
    fabric: "100% Modal",
    dimensions: "180cm x 70cm",
    features: ["Buttery-soft texture", "Moisture-wicking", "Anti-bacterial", "Softens with washing", "Lightweight drape"],
    colors: ["Mauve", "Stone Grey", "Sage", "Caramel", "Deep Plum"],
    images: [
      img.hijab8,
      fabricImgs[1],
      fabricImgs[7],
      img.hijab4,
    ],
    rating: 4.7,
    reviewCount: 67,
  },
  {
    id: "7",
    name: "Crepe Georgette Hijab",
    slug: "crepe-georgette-hijab",
    price: 22.99,
    description: "Textured crepe georgette with beautiful drape and subtle shimmer.",
    longDescription: "Our Crepe Georgette Hijab features a distinctive textured surface that creates beautiful movement with every step. The fabric has a subtle shimmer that catches light elegantly, while the medium-weight construction ensures it stays in place all day. Perfect for both everyday wear and special occasions.",
    category: "Premium",
    subcategory: "Georgette",
    fabric: "100% Crepe Georgette",
    dimensions: "180cm x 75cm",
    features: ["Textured surface", "Subtle shimmer", "Secure drape", "Medium weight", "Versatile styling"],
    colors: ["Champagne", "Deep Emerald", "Dusty Mauve", "Slate Blue", "Black"],
    images: [
      img.hijab3,
      img.hijab1,
      fabricImgs[3],
      fabricImgs[6],
    ],
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: "8",
    name: "Linen Breeze Hijab",
    slug: "linen-breeze-hijab",
    price: 18.99,
    comparePrice: 24.99,
    description: "Pure linen for hot weather comfort with a beautiful natural texture.",
    longDescription: "The Linen Breeze Hijab is crafted from 100% pure linen, offering unparalleled breathability for warm climates. The natural texture of linen gives each piece a unique character, with a relaxed, effortlessly chic aesthetic. It becomes softer and more beautiful with every wash.",
    category: "Casual",
    subcategory: "Linen",
    fabric: "100% Pure Linen",
    dimensions: "180cm x 70cm",
    features: ["Pure linen", "Maximum breathability", "Natural texture", "Softens over time", "Eco-friendly"],
    colors: ["Natural", "Sage", "Terracotta", "Stone", "Off White"],
    images: [
      img.hijab4,
      fabricImgs[5],
      img.hijab7,
      fabricImgs[2],
    ],
    rating: 4.5,
    reviewCount: 43,
    isSale: true,
  },
  {
    id: "9",
    name: "Chiffon Embroidered Hijab",
    slug: "chiffon-embroidered-hijab",
    price: 34.99,
    description: "Delicate hand-embroidered chiffon for special occasions.",
    longDescription: "Our Chiffon Embroidered Hijab features exquisite hand-embroidered motifs along the border, each piece crafted by skilled artisans. The delicate embroidery is done with matching thread for a sophisticated, tonal effect that's elegant without being ostentatious. Perfect for weddings, Eid celebrations, and special gatherings.",
    category: "Formal",
    subcategory: "Embroidered",
    fabric: "Premium Chiffon with Embroidery",
    dimensions: "180cm x 75cm",
    features: ["Hand-embroidered border", "Artisan crafted", "Tonal embroidery", "Lightweight", "Special occasion"],
    colors: ["Ivory & Gold", "Black & Silver", "Emerald & Gold", "Navy & Silver", "Rose & Rose Gold"],
    images: [
      img.hijab5,
      img.hijab2,
      fabricImgs[7],
      fabricImgs[0],
    ],
    rating: 4.9,
    reviewCount: 28,
    isNew: true,
  },
  {
    id: "10",
    name: "Instant Hijab Set",
    slug: "instant-hijab-set",
    price: 15.99,
    description: "Pre-sewn instant hijab for quick, effortless styling.",
    longDescription: "The Instant Hijab Set is our answer to busy mornings. Pre-sewn into a ready-to-wear shape, it slips on in seconds while maintaining a beautifully tailored look. The stretchy cotton-spandex blend ensures a comfortable, secure fit throughout the day. Available in a coordinated set of three complementary colors.",
    category: "Casual",
    subcategory: "Instant",
    fabric: "Cotton-Spandex Blend",
    dimensions: "One size fits all",
    features: ["Pre-sewn design", "Quick styling", "Stretchy fit", "Set of 3 colors", "Washable"],
    colors: ["Nude Set", "Black Set", "Pastel Set", "Earth Tones Set"],
    images: [
      img.casual,
      fabricImgs[4],
      img.hijab6,
      fabricImgs[1],
    ],
    rating: 4.4,
    reviewCount: 112,
  },
  {
    id: "11",
    name: "Velvet Touch Hijab",
    slug: "velvet-touch-hijab",
    price: 27.99,
    description: "Luxurious velvet-textured fabric for winter elegance.",
    longDescription: "The Velvet Touch Hijab brings warmth and luxury to your winter wardrobe. Its plush velvet-textured surface is soft to the touch and provides gentle warmth without bulk. The fabric has excellent drape properties, creating elegant folds and layers. Perfect for the colder months while maintaining a polished appearance.",
    category: "Premium",
    subcategory: "Velvet",
    fabric: "Polyester Velvet Blend",
    dimensions: "180cm x 75cm",
    features: ["Velvet texture", "Winter warmth", "Plush feel", "Elegant drape", "Non-slip surface"],
    colors: ["Burgundy", "Forest Green", "Navy", "Charcoal", "Dusty Rose"],
    images: [
      img.premium,
      img.hijab5,
      fabricImgs[5],
      fabricImgs[3],
    ],
    rating: 4.6,
    reviewCount: 35,
  },
  {
    id: "12",
    name: "Organza Statement Hijab",
    slug: "organza-statement-hijab",
    price: 32.99,
    description: "Sheer organza with structured drape for bold, modern styling.",
    longDescription: "The Organza Statement Hijab is for the fashion-forward woman who loves to make an impression. The sheer organza fabric creates beautiful volume and structure, allowing for dramatic styling possibilities. Layer it over a complementary under-scarf for a stunning two-tone effect that turns heads at any event.",
    category: "Formal",
    subcategory: "Organza",
    fabric: "100% Organza",
    dimensions: "180cm x 75cm",
    features: ["Structured drape", "Sheer overlay", "Volume building", "Layerable", "Statement piece"],
    colors: ["Midnight Blue", "Deep Burgundy", "Emerald", "Black", "Blush Pink"],
    images: [
      img.formal,
      img.hijab3,
      fabricImgs[7],
      fabricImgs[6],
    ],
    rating: 4.7,
    reviewCount: 22,
    isNew: true,
  },
];

export const categories = [
  { id: "all", name: "All Collections", slug: "all" },
  { id: "premium", name: "Premium", slug: "premium" },
  { id: "casual", name: "Casual", slug: "casual" },
  { id: "formal", name: "Formal", slug: "formal" },
];

export const testimonials = [
  {
    id: "1",
    name: "Amina K.",
    text: "The Silk Touch Chiffon is absolutely divine. I've never felt anything so soft — it drapes beautifully and stays in place all day. Maimuna has ruined other hijabs for me!",
    rating: 5,
    location: "London, UK",
  },
  {
    id: "2",
    name: "Fatima H.",
    text: "I was skeptical about ordering online, but the quality exceeded my expectations. The colors are exactly as shown and the fabric is luxurious. Already ordered three more!",
    rating: 5,
    location: "Dubai, UAE",
  },
  {
    id: "3",
    name: "Khadijah M.",
    text: "Finally, a hijab brand that understands premium quality doesn't have to mean premium prices. The modal soft is my everyday go-to — buttery soft and so comfortable.",
    rating: 5,
    location: "Toronto, Canada",
  },
  {
    id: "4",
    name: "Zara A.",
    text: "The embroidered chiffon I bought for Eid was stunning. The hand-embroidery is exquisite and everyone complimented it. Will definitely be back for more.",
    rating: 5,
    location: "Sydney, Australia",
  },
  {
    id: "5",
    name: "Maryam S.",
    text: "The packaging alone made me feel special. Beautiful box, tissue paper, everything thoughtfully presented. And the hijab itself is pure luxury. Maimuna truly understands their customers.",
    rating: 5,
    location: "Kuala Lumpur, Malaysia",
  },
  {
    id: "6",
    name: "Hana B.",
    text: "I've been wearing Maimuna hijabs for over a year now and the quality is consistently excellent. Wash after wash, they maintain their softness and color. True quality craftsmanship.",
    rating: 5,
    location: "Cairo, Egypt",
  },
];
