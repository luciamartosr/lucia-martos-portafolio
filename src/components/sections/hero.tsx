"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { ButtonLink } from "@/components/ui/button";
import { TiltText } from "@/components/ui/tilt-text";

const EASE = [0.22, 1, 0.36, 1] as const;
const TILT_DELAY_MS = 2000;

export function Hero() {
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
      id="hero"
      className="relative overflow-hidden rounded-b-[36px] bg-green md:rounded-b-[56px]"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-32 md:px-10 md:pt-36 lg:grid-cols-2 lg:gap-12 lg:px-16 lg:pt-40 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col gap-6 pb-16 lg:pb-0"
        >
          <p className="flex items-center gap-2 font-sans text-[13px] font-medium uppercase tracking-[0.2em] text-pink">
            UX UI DESIGNER
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink" />
            BUSINESS CONSULTANT
          </p>

          <h1
            ref={headingRef}
            className="font-display text-[42px] font-semibold leading-[1.05] sm:text-[52px] lg:text-[60px]"
          >
            <TiltText
              text="I'm Lucía Martos"
              activeColor="#FFFFFF"
              restColor="#FF3D9B"
              isActive={tiltActive}
            />
          </h1>

          <p className="max-w-md font-sans text-lg leading-relaxed text-cream/90">
            13 years consulting companies across industries. Now I apply that
            to UX/UI design — so your product works not just for users, but
            for the operation behind it.
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <ButtonLink href="/#projects" variant="secondary">
              See my work
            </ButtonLink>
            <ButtonLink href="/#contact" variant="primary">
              Contact me
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="relative mx-auto aspect-[1371/992] w-full max-w-[368px] sm:max-w-[448px] lg:absolute lg:right-0 lg:top-24 lg:mx-0 lg:w-[46%] lg:max-w-none"
        >
          <Image
            src="/images/lucia-hero-uxui.png?v=5"
            alt="Lucía Martos sitting next to 3D UX/UI letters"
            fill
            priority
            sizes="(min-width: 1024px) 46vw, (min-width: 640px) 448px, 368px"
            className="object-contain object-right-bottom"
          />
        </motion.div>
      </div>
    </section>
  );
}
