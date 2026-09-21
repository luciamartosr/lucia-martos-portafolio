"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ChevronDown } from "lucide-react";
import { TiltText } from "@/components/ui/tilt-text";
import { ButtonLink } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;
const TILT_DELAY_MS = 2000;

const SHORT_PARAGRAPH =
  "Before I ever opened Figma, I was already doing what product designers do — talking to real people, understanding their problems, and iterating fast. I just didn’t know it had a name yet. I’m a Fulbright Scholar with a Master’s in Science of Entrepreneurship from the University of Florida, 14 years as a business consultant, and 4 years designing digital products. I advise early-stage startups, I’ve won design thinking programs sponsored by IDEO, and I build products that work as well on the inside as they look on the outside.";

const EXPANDED_PARAGRAPHS = [
  "Before I ever opened Figma, I was already doing what product designers do — going out to talk to real people, understanding their problems, and coming back to iterate. I just didn’t know it had a name yet.",
  "I studied business administration and went on to become a Fulbright Scholar, completing a Master of Science in Entrepreneurship at the University of Florida. There I participated in Startup Gainesville — a 48-hour startup program where my team pitched and won — and in an IDEO-sponsored design thinking program where my team solved a real challenge for a nonprofit. Both experiences shaped how I think about problems: from the user out, not from the solution in.",
  "For over 14 years I worked as a business consultant across industries — implementing quality systems, optimizing processes, training teams. Since 2023 I’ve been advising early-stage entrepreneurs at Cajamarca Incuba, the business incubator of the Chamber of Commerce of Cajamarca (Peru), helping them validate ideas, strengthen their value propositions, and apply to startup funds. One of the teams I advised won a Startup Perú grant.",
  "Four years ago I discovered UX/UI design — and everything clicked. I finally had the tools to build what I’d been helping others imagine for years.",
  "If you’re building a product that needs to work as well on the inside as it looks on the outside, let’s talk.",
];

export function About() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.7 });
  const [tiltActive, setTiltActive] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
              text="About me"
              activeColor="#02584B"
              restColor="#FF3D9B"
              isActive={tiltActive}
            />
          </motion.h2>

          <ButtonLink
            href="/lucia-martos-resume-082026.pdf"
            variant="primary"
            download
            className="hidden w-fit lg:inline-flex"
          >
            Download my resume
          </ButtonLink>
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
                {EXPANDED_PARAGRAPHS.map((paragraph) => (
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
                {SHORT_PARAGRAPH}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="-mt-2 flex w-fit items-center gap-1.5 font-display text-base font-semibold text-pink transition-colors duration-200 hover:text-pink-dark"
          >
            {expanded ? "Read less" : "Read more"}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </button>

          <ButtonLink
            href="/lucia-martos-resume-082026.pdf"
            variant="primary"
            download
            className="mt-2 w-fit lg:hidden"
          >
            Download my resume
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
