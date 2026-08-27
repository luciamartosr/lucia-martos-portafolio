"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TiltText } from "@/components/ui/tilt-text";

const EASE = [0.22, 1, 0.36, 1] as const;
const TILT_DELAY_MS = 2000;

const SERVICES = [
  {
    number: "01",
    title: "User experience design",
    description:
      "I map your users, your processes, and the friction points between them — then design flows that make sense for both sides.",
  },
  {
    number: "02",
    title: "Information architecture",
    description:
      "I structure complex products so users always know where they are and what to do next. Especially useful for platforms with multiple roles and workflows",
  },
  {
    number: "03",
    title: "Interactive prototyping",
    description:
      "From low fidelity to high fidelity — prototypes built to test assumptions early and communicate decisions clearly to your team.",
  },
  {
    number: "04",
    title: "Usability testing",
    description:
      "I design and run tests with real users to validate what works and surface what doesn't before development starts.",
  },
  {
    number: "05",
    title: "UX Audit",
    description:
      "A thorough review of your existing product to identify usability issues, flow gaps, and opportunities to improve the experience.",
  },
  {
    number: "06",
    title: "Product & design documentation",
    description:
      "Clear annotations, flow documentation, and design rules so your development team always knows the intention behind your screens.",
  },
];

export function HowCanIHelp() {
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
      id="how-can-i-help"
      className="rounded-[36px] bg-green px-6 py-14 md:rounded-[56px] md:px-10 md:py-16 lg:px-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-[380px_1fr] md:gap-16">
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-display text-5xl font-bold leading-[1.05] text-pink lg:text-6xl"
        >
          <TiltText
            text="How can I help?"
            activeColor="#FFFFFF"
            restColor="#FF3D9B"
            isActive={tiltActive}
          />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="flex flex-col"
        >
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="border-b border-cream/20 py-6 first:pt-0"
            >
              <p className="font-sans text-sm font-medium text-cream/40">
                {service.number}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-cream md:text-2xl">
                {service.title}
              </h3>
              <p className="mt-2 font-sans text-base leading-relaxed text-cream/85 md:text-lg">
                {service.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
