"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { TiltText } from "@/components/ui/tilt-text";

const EASE = [0.22, 1, 0.36, 1] as const;
const TILT_DELAY_MS = 2000;

type Service = { number: string; title: string; description: string };

export function HowCanIHelp() {
  const t = useTranslations("howCanIHelp");
  const services = t.raw("services") as Service[];
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-display text-4xl font-bold leading-[1.05] text-pink lg:text-5xl"
        >
          <TiltText
            text={t("heading")}
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
          {services.map((service) => (
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
