"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-32 md:px-10 md:pt-36 lg:grid-cols-2 lg:gap-12 lg:px-16 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col gap-6 pb-16 lg:pb-24"
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
            <Button variant="secondary">See my work</Button>
            <Button variant="primary">Contact me</Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="relative mx-auto h-[420px] w-[300px] sm:h-[500px] sm:w-[360px] lg:ml-auto lg:mr-0 lg:h-[620px] lg:w-[430px]"
        >
          <div className="absolute inset-x-4 bottom-[-100px] top-6 rounded-t-[180px] rounded-b-[48px] bg-pink sm:inset-x-6 lg:bottom-[-120px]" />
          <Image
            src="/images/lucia-hero.png"
            alt="Lucía Martos, UX/UI Designer & Business Consultant"
            fill
            priority
            sizes="(min-width: 1024px) 430px, (min-width: 640px) 360px, 300px"
            className="object-contain object-bottom"
            style={{ filter: "url(#hero-duotone)" }}
          />
        </motion.div>
      </div>

      <svg aria-hidden className="absolute h-0 w-0">
        <filter id="hero-duotone" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0 0 0 1 0"
          />
          <feComponentTransfer colorInterpolationFilters="sRGB">
            <feFuncR type="table" tableValues="0.008 0.984" />
            <feFuncG type="table" tableValues="0.345 0.965" />
            <feFuncB type="table" tableValues="0.294 0.933" />
          </feComponentTransfer>
        </filter>
      </svg>
    </section>
  );
}
