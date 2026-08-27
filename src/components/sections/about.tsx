"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TiltText } from "@/components/ui/tilt-text";

const EASE = [0.22, 1, 0.36, 1] as const;
const TILT_DELAY_MS = 2000;

const PARAGRAPHS = [
  "Hi, I’m Lucía — a UX/UI Designer based in Colombia, originally from Peru.",
  "Before I ever opened Figma, I spent 13 years inside businesses. I worked as a consultant across industries — implementing quality management systems, optimizing processes, training teams, and running operations as an administrator at the same time. I know what it looks like when a company works well, and when it doesn’t.",
  "Four years ago I discovered UX/UI design — and everything clicked. I finally had the tools to solve the operational problems I’d been diagnosing for over a decade. Not just recommending changes on a report, but actually building the product that makes the change happen.",
  "That’s what makes my work different: I don’t arrive at your business as an outsider trying to understand it. I arrive knowing how to read it — the processes, the people, the friction points that never make it into a brief. If you’re building a product that needs to work as well on the inside as it looks on the outside, let’s talk.",
];

export function About() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.7 });
  const [tiltActive, setTiltActive] = useState(false);

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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[380px_1fr] md:gap-16">
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-display text-5xl font-bold lg:text-6xl"
        >
          <TiltText
            text="About me"
            activeColor="#02584B"
            restColor="#FF3D9B"
            isActive={tiltActive}
          />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="flex max-w-2xl flex-col gap-6 font-sans text-lg leading-relaxed text-green lg:text-xl"
        >
          {PARAGRAPHS.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
