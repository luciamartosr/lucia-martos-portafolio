"use client";

import { motion } from "motion/react";

export function CaseHook({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto max-w-3xl text-center font-sans text-2xl italic leading-snug text-ink md:text-3xl"
    >
      {children}
    </motion.p>
  );
}
