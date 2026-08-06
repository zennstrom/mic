/**
 * InstagramGallery — Dynamic Instagram Reels showcase & Immersive reel viewer
 * Features:
 * - Desktop: Plays reel preview on hover
 * - Mobile: Auto-plays muted reel preview when scrolled into view, horizontal snap scrolling
 * - Click: Opens full-screen Immersive Reel Player Modal with sound & navigation
 */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Instagram,
  Play,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useReels, type Reel } from "@/contexts/ReelContext";

/* ── Single Reel Card Component ────────────────── */
function ReelCard({
  reel,
  index,
  onClick,
}: {
  reel: Reel;
  index: number;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingMobile, setIsPlayingMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Desktop Hover Playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isHovered]);

  // Mobile Auto-play on Scroll into view
  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setIsPlayingMobile(true);
            video.play().catch(() => {});
          } else {
            setIsPlayingMobile(false);
            video.pause();
          }
        });
      },
      { threshold: [0.6] }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-secondary shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer shrink-0 w-[200px] sm:w-[220px] lg:w-full snap-center border border-border/40"
    >
      {/* Poster Image */}
      <img
        src={reel.thumbnail || "/images/placeholder.png"}
        alt={reel.caption || "Instagram Reel"}
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
          (isHovered || isPlayingMobile) && reel.videoUrl ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
      />

      {/* Video Preview */}
      {reel.videoUrl && (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered || isPlayingMobile ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Dark overlay & info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-between transition-opacity duration-300">
        {/* Top Instagram badge */}
        <div className="flex items-center justify-between">
          <span className="bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
            <Instagram className="w-3 h-3 text-gold-soft" />
            Reel
          </span>
          <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-emerald-brand transition-colors">
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Bottom Caption & Handle */}
        <div>
          <p className="text-white/80 text-[11px] font-medium mb-1 drop-shadow-sm">
            {reel.author || "@maimunacollection"}
          </p>
          <p className="text-white text-xs font-serif line-clamp-2 leading-snug drop-shadow">
            {reel.caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Immersive Fullscreen Reel Modal ─────────────── */
function ImmersiveReelModal({
  reels,
  activeIndex,
  onClose,
  onNavigate,
}: {
  reels: Reel[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const reel = reels[activeIndex];
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [activeIndex]);

  if (!reel) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev / Next buttons */}
      {activeIndex > 0 && (
        <button
          onClick={() => onNavigate(activeIndex - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white hidden sm:flex items-center justify-center backdrop-blur-md transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {activeIndex < reels.length - 1 && (
        <button
          onClick={() => onNavigate(activeIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white hidden sm:flex items-center justify-center backdrop-blur-md transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Reel Viewport */}
      <motion.div
        key={reel.id}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full sm:max-w-[380px] h-full sm:h-[82vh] max-h-[780px] bg-black sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border border-white/10"
      >
        {/* Media (Video or Fallback Image) */}
        {reel.videoUrl ? (
          <video
            ref={videoRef}
            src={reel.videoUrl}
            muted={isMuted}
            loop
            playsInline
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            src={reel.thumbnail || "/images/placeholder.png"}
            alt={reel.caption}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

        {/* Top Bar inside Reel */}
        <div className="relative z-10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-brand flex items-center justify-center text-white text-xs font-bold">
              M
            </div>
            <div>
              <p className="text-white text-xs font-semibold">{reel.author || "@maimunacollection"}</p>
              <p className="text-white/60 text-[10px]">Original Audio</p>
            </div>
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-8 h-8 rounded-full bg-black/40 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Side Social Actions */}
        <div className="absolute right-3 bottom-24 z-10 flex flex-col gap-4 items-center">
          <button
            onClick={() => setLiked(!liked)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
              liked ? "bg-red-500/20 text-red-500" : "bg-black/40 text-white group-hover:bg-black/60"
            }`}>
              <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
            </div>
            <span className="text-white text-[10px] font-medium">{liked ? "1.2k" : "1.1k"}</span>
          </button>

          <button className="flex flex-col items-center gap-1 group">
            <div className="w-10 h-10 rounded-full bg-black/40 text-white backdrop-blur-md flex items-center justify-center group-hover:bg-black/60 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-white font-medium">84</span>
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: "Maimuna Reel", url: reel.url }).catch(() => {});
              }
            }}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-10 h-10 rounded-full bg-black/40 text-white backdrop-blur-md flex items-center justify-center group-hover:bg-black/60 transition-colors">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-white font-medium">Share</span>
          </button>
        </div>

        {/* Bottom Details & Link */}
        <div className="relative z-10 p-5 space-y-3">
          <p className="text-white text-sm font-serif leading-snug line-clamp-3">
            {reel.caption}
          </p>

          <a
            href={reel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-colors border border-white/20"
          >
            <Instagram className="w-4 h-4 text-gold-soft" />
            Watch on Instagram
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Instagram Gallery Section ───────────── */
export default function InstagramGallery() {
  const { reels } = useReels();
  const { ref, isVisible } = useScrollReveal(0.1);
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-beige-warm/30">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-gold-soft text-xs font-medium uppercase tracking-[0.2em] mb-3 block"
          >
            @MAIMUNACOLLECTION
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-serif text-3xl lg:text-4xl font-medium mb-3"
          >
            Styled by You — Reels
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-sm max-w-md mx-auto"
          >
            Hover or tap to preview our latest community reels and styling guides.
          </motion.p>
          <div className="w-12 h-[2px] bg-gold-soft mx-auto mt-4" />
        </div>

        {/* Reels Container: Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none scroll-smooth">
          {reels.map((reel, i) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              index={i}
              onClick={() => setActiveModalIndex(i)}
            />
          ))}
        </div>

        {reels.length === 0 && (
          <div className="text-center py-12">
            <p className="font-serif text-lg text-muted-foreground">No reels added yet.</p>
          </div>
        )}
      </div>

      {/* Immersive Fullscreen Reel Modal */}
      <AnimatePresence>
        {activeModalIndex !== null && (
          <ImmersiveReelModal
            reels={reels}
            activeIndex={activeModalIndex}
            onClose={() => setActiveModalIndex(null)}
            onNavigate={(index) => setActiveModalIndex(index)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
