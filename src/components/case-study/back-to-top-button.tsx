"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { FadeUp } from "./fade-up";

export function BackToTopButton({
  accentColor,
  className,
}: {
  accentColor: string;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      className={`px-6 py-16 md:px-10 md:py-20 lg:px-16 ${className ?? ""}`}
    >
      <FadeUp className="mx-auto flex max-w-7xl justify-end">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="inline-flex items-center gap-2 rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] rounded-br-none border-2 px-7 py-3.5 font-display text-[15px] font-semibold tracking-tight transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0"
          style={{
            borderColor: accentColor,
            backgroundColor: hovered ? accentColor : "transparent",
            color: hovered ? "#FBF6EE" : accentColor,
          }}
        >
          <motion.span
            className="inline-flex"
            animate={{ y: hovered ? -3 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ArrowUp className="h-4 w-4" />
          </motion.span>
          Back to top
        </button>
      </FadeUp>
    </section>
  );
}
