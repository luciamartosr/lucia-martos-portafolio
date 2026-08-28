"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TiltText } from "@/components/ui/tilt-text";
import { ButtonLink } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;
const TILT_DELAY_MS = 2000;

const PARAGRAPHS = [
  "Hi, I’m Lucía — a UX/UI Designer with a background in business consulting and operations.",
  "Before becoming a designer, I spent 13 years helping businesses work better. As a consultant, I worked across industries improving processes, implementing management systems, training teams, and managing operations. I learned what makes a business work — and where things tend to break.",
  "Then I discovered UX/UI design, and everything clicked. I finally had the tools to turn the operational problems I’d been solving for years into digital products. Not just recommending changes in a report, but actually designing the product that makes the change happen.",
  "That’s what I bring to product design: the ability to understand a business beyond the brief. I know how to read its processes, its people, and the friction points that aren’t always obvious at first — and translate that complexity into simple, intuitive experiences.",
  "If you’re looking for a designer who can connect business needs, user needs, and product decisions, let’s talk.",
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

          <ButtonLink
            href="/lucia-martos-resume-082026.pdf"
            variant="primary"
            download
            className="mt-2 w-fit"
          >
            Download my resume
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
