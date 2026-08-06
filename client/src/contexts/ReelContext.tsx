/**
 * ReelContext — Dynamic Instagram Reels management & storage
 * Persists to localStorage; falls back to curated default reels.
 */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { nanoid } from "nanoid";

export interface Reel {
  id: string;
  url: string;         // Instagram reel link or video URL
  thumbnail: string;   // Thumbnail poster image URL
  videoUrl?: string;   // Video file URL for smooth HTML5 hover/autoplay
  caption?: string;    // Reel caption or title
  author?: string;     // Handle, default @maimunacollection
}

const STORAGE_KEY = "maimuna-reels";

// Curated default reels for fallback & demo
const DEFAULT_REELS: Reel[] = [
  {
    id: "reel-1",
    url: "https://www.instagram.com/reel/C123456789/",
    thumbnail: "/images/placeholder.png",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-hijab-looking-at-the-camera-41555-large.mp4",
    caption: "Silk Touch Chiffon in Emerald — timeless elegance for every occasion. ✨",
    author: "@maimunacollection",
  },
  {
    id: "reel-2",
    url: "https://www.instagram.com/reel/C234567890/",
    thumbnail: "/images/placeholder.png",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-wearing-a-hijab-and-smiling-41553-large.mp4",
    caption: "How to style the Premium Jersey Hijab without pins in 30 seconds! 🌿",
    author: "@maimunacollection",
  },
  {
    id: "reel-3",
    url: "https://www.instagram.com/reel/C345678901/",
    thumbnail: "/images/placeholder.png",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-hijab-walking-in-a-park-41557-large.mp4",
    caption: "Royal Satin draping perfection for evening events. 💫",
    author: "@maimunacollection",
  },
  {
    id: "reel-4",
    url: "https://www.instagram.com/reel/C456789012/",
    thumbnail: "/images/placeholder.png",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-woman-wearing-a-hijab-41554-large.mp4",
    caption: "New Cotton Crinkle arrivals are live now on site! Link in bio. 🌸",
    author: "@maimunacollection",
  },
  {
    id: "reel-5",
    url: "https://www.instagram.com/reel/C567890123/",
    thumbnail: "/images/placeholder.png",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-pink-hijab-smiling-41558-large.mp4",
    caption: "Soft Modal Everyday Essentials — buttery soft texture you'll fall in love with.",
    author: "@maimunacollection",
  },
];

interface ReelContextType {
  reels: Reel[];
  addReel: (reel: { url: string; thumbnail?: string; videoUrl?: string; caption?: string; author?: string }) => Reel;
  deleteReel: (id: string) => void;
  resetReels: () => void;
}

const ReelContext = createContext<ReelContextType | null>(null);

export function parseInstagramUrl(url: string): { code?: string; mediaThumbnail?: string } {
  try {
    const match = url.match(/(?:reel|p)\/([A-Za-z0-9_-]+)/);
    if (match && match[1]) {
      const code = match[1];
      return {
        code,
        mediaThumbnail: `https://www.instagram.com/p/${code}/media/?size=l`,
      };
    }
  } catch {}
  return {};
}

export function ReelProvider({ children }: { children: ReactNode }) {
  const [reels, setReels] = useState<Reel[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_REELS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reels));
  }, [reels]);

  const addReel = useCallback((data: { url: string; thumbnail?: string; videoUrl?: string; caption?: string; author?: string }): Reel => {
    const parsed = parseInstagramUrl(data.url);
    const thumbnail = data.thumbnail || parsed.mediaThumbnail || "/images/placeholder.png";
    
    // Check if the URL itself is a video file or if custom video URL provided
    const isVideoExt = /\.(mp4|webm|mov)(\?.*)?$/i.test(data.url);
    const videoUrl = data.videoUrl || (isVideoExt ? data.url : undefined);

    const newReel: Reel = {
      id: nanoid(8),
      url: data.url,
      thumbnail,
      videoUrl,
      caption: data.caption || "Maimuna Islamic Collection Reel",
      author: data.author || "@maimunacollection",
    };

    setReels(prev => [newReel, ...prev]);
    return newReel;
  }, []);

  const deleteReel = useCallback((id: string) => {
    setReels(prev => prev.filter(r => r.id !== id));
  }, []);

  const resetReels = useCallback(() => {
    setReels(DEFAULT_REELS);
  }, []);

  return (
    <ReelContext.Provider value={{ reels, addReel, deleteReel, resetReels }}>
      {children}
    </ReelContext.Provider>
  );
}

export function useReels() {
  const context = useContext(ReelContext);
  if (!context) throw new Error("useReels must be used within ReelProvider");
  return context;
}
