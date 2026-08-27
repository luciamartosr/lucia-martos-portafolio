"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Maximize2, Play, Pause } from "lucide-react";

export function LightboxVideo({
  src,
  caption,
  autoPlayOnView = false,
}: {
  src: string;
  caption?: string;
  autoPlayOnView?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const inlineVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;

    inlineVideoRef.current?.pause();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!autoPlayOnView) return;
    const video = inlineVideoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoPlayOnView]);

  const togglePlay = () => {
    const video = inlineVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <figure className="flex flex-col gap-3">
      <div className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white">
        <video
          ref={inlineVideoRef}
          src={src}
          preload={autoPlayOnView ? "none" : "metadata"}
          loop
          muted
          playsInline
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="h-auto w-full"
        />

        {!autoPlayOnView && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause video" : "Play video"}
            className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ease-out ${
              playing
                ? "bg-ink/0 opacity-0 hover:bg-ink/20 hover:opacity-100"
                : "bg-ink/30 opacity-100"
            }`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-ink shadow-lg transition-transform duration-200 ease-out group-hover:scale-105">
              {playing ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="ml-0.5 h-6 w-6" />
              )}
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          aria-label="View video in full screen"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-cream opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
      {caption && (
        <figcaption className="text-center font-sans text-sm text-ink-soft">
          {caption}
        </figcaption>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-6 md:p-12"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors duration-200 hover:bg-cream/20"
              aria-label="Close full screen video"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-h-full max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={src}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="max-h-[90vh] w-auto rounded-lg object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}
