"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;
const ZOOM_STEP = 0.5;
const DOUBLE_TAP_MS = 300;

export function LightboxImage({
  src,
  alt,
  caption,
  width = 1600,
  height = 1200,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(MIN_SCALE);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const pinchRef = useRef<{ startDist: number; startScale: number } | null>(
    null,
  );
  const lastTapRef = useRef(0);

  // Kept in sync with state on every render so the native (non-passive)
  // touch listener below can always read the latest value — its own
  // closure is only recreated when `open` changes, so reading `scale`/
  // `translate` directly there would see stale values mid-gesture.
  const scaleRef = useRef(scale);
  scaleRef.current = scale;
  const translateRef = useRef(translate);
  translateRef.current = translate;

  const clampScale = (value: number) =>
    Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

  const resetZoom = () => {
    setScale(MIN_SCALE);
    setTranslate({ x: 0, y: 0 });
  };

  const applyScale = (next: number) => {
    const clamped = clampScale(next);
    setScale(clamped);
    if (clamped === MIN_SCALE) setTranslate({ x: 0, y: 0 });
  };

  const toggleZoom = () => {
    if (scaleRef.current > MIN_SCALE) {
      resetZoom();
    } else {
      applyScale(DOUBLE_TAP_SCALE);
    }
  };

  useEffect(() => {
    if (!open) {
      resetZoom();
      return;
    }

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

  // Pointer capture keeps the drag locked to this element even once the
  // visually zoomed image extends past its own (untransformed) hit-test
  // box — without it, a drag that ends over the backdrop closes the
  // lightbox instead of panning.
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || scale <= MIN_SCALE) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: translate.x,
      originY: translate.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !dragRef.current) return;
    setTranslate({
      x: dragRef.current.originX + (e.clientX - dragRef.current.startX),
      y: dragRef.current.originY + (e.clientY - dragRef.current.startY),
    });
  };

  const stopDrag = () => {
    dragRef.current = null;
  };

  const touchDistance = (touches: TouchList | React.TouchList) =>
    Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY,
    );

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) pinchRef.current = null;
    if (e.touches.length < 1) dragRef.current = null;
  };

  // React attaches wheel/touchstart/touchmove listeners as passive by
  // default, so preventDefault() inside a synthetic handler is silently
  // ignored (and logs a warning). Attach these natively with
  // passive: false so zoom/pan can actually stop the page from
  // scrolling or pinch-zooming — and, for touchstart, so the browser's
  // own double-tap-to-zoom / delayed-click gesture never gets a chance
  // to fire alongside (and cancel out) our custom double-tap handling.
  useEffect(() => {
    const stage = stageRef.current;
    if (!open || !stage) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((prev) => {
        const next = clampScale(prev + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
        if (next === MIN_SCALE) setTranslate({ x: 0, y: 0 });
        return next;
      });
    };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        pinchRef.current = {
          startDist: touchDistance(e.touches),
          startScale: scaleRef.current,
        };
      } else if (e.touches.length === 1) {
        if (scaleRef.current > MIN_SCALE) {
          dragRef.current = {
            startX: e.touches[0].clientX,
            startY: e.touches[0].clientY,
            originX: translateRef.current.x,
            originY: translateRef.current.y,
          };
        } else {
          const now = Date.now();
          if (now - lastTapRef.current < DOUBLE_TAP_MS) {
            toggleZoom();
          }
          lastTapRef.current = now;
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchRef.current) {
        e.preventDefault();
        const ratio = touchDistance(e.touches) / pinchRef.current.startDist;
        applyScale(pinchRef.current.startScale * ratio);
      } else if (e.touches.length === 1 && dragRef.current) {
        e.preventDefault();
        setTranslate({
          x: dragRef.current.originX + (e.touches[0].clientX - dragRef.current.startX),
          y: dragRef.current.originY + (e.touches[0].clientY - dragRef.current.startY),
        });
      }
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: false });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
    };
  }, [open]);

  return (
    <figure className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white"
        aria-label={`View ${alt} in full screen`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          sizes="(min-width: 1024px) 813px, 100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 ease-out group-hover:bg-ink/40 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-sans text-sm font-medium text-ink">
            <ZoomIn className="h-4 w-4" />
            View full screen
          </span>
        </div>
      </button>
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
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink/90 p-6 md:p-12"
            onClick={() => setOpen(false)}
          >
            <div className="absolute right-6 top-6 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  applyScale(scale - ZOOM_STEP);
                }}
                disabled={scale <= MIN_SCALE}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors duration-200 hover:bg-cream/20 disabled:opacity-30"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  applyScale(scale + ZOOM_STEP);
                }}
                disabled={scale >= MAX_SCALE}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors duration-200 hover:bg-cream/20 disabled:opacity-30"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              {scale > MIN_SCALE && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetZoom();
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors duration-200 hover:bg-cream/20"
                  aria-label="Reset zoom"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors duration-200 hover:bg-cream/20"
                aria-label="Close full screen image"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <motion.div
              ref={stageRef}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative flex h-full w-full touch-none select-none items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={stopDrag}
              onPointerCancel={stopDrag}
              onDoubleClick={toggleZoom}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="max-h-full max-w-full w-auto rounded-lg object-contain"
                style={{
                  transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                  transition: dragRef.current ? "none" : "transform 0.2s ease-out",
                  cursor: scale > MIN_SCALE ? "grab" : "zoom-in",
                }}
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}
