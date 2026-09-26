"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { TiltText } from "@/components/ui/tilt-text";
import { buttonClassName } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;
const TILT_DELAY_MS = 2000;

export function About() {
  const t = useTranslations("about");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.7 });
  const [tiltActive, setTiltActive] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const expandedParagraphs = t.raw("expandedParagraphs") as string[];

  useEffect(() => {
    if (!isHeadingInView) return;
    const timer = setTimeout(() => setTiltActive(true), TILT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isHeadingInView]);

  return (
    <section
      id="about"
      className="bg-cream px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <motion.h2
            ref={headingRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-4xl font-bold lg:text-5xl"
          >
            <TiltText
              text={t("heading")}
              activeColor="#02584B"
              restColor="#FF3D9B"
              isActive={tiltActive}
            />
          </motion.h2>

          {/* Resume PDF is a static asset, not an app route — use a plain
              anchor so it's never run through the locale-aware Link. */}
          <a
            href="/lucia-martos-resume-082026.pdf"
            download
            className={buttonClassName("primary", "hidden w-fit lg:inline-flex")}
          >
            {t("downloadResume")}
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="flex max-w-2xl flex-col gap-6 font-sans text-lg leading-relaxed text-green lg:text-xl"
        >
          <AnimatePresence mode="wait" initial={false}>
            {expanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                {expandedParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </motion.div>
            ) : (
              <motion.p
                key="short"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {t("shortParagraph")}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="-mt-2 flex w-fit items-center gap-1.5 font-display text-base font-semibold text-pink transition-colors duration-200 hover:text-pink-dark"
          >
            {expanded ? t("readLess") : t("readMore")}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </button>

          <a
            href="/lucia-martos-resume-082026.pdf"
            download
            className={buttonClassName("primary", "mt-2 w-fit lg:hidden")}
          >
            {t("downloadResume")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
