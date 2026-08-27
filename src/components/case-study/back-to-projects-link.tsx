"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function BackToProjectsLink({
  color = "#02584B",
  className,
}: {
  color?: string;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/#projects"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`inline-flex items-center gap-2 font-sans text-sm font-medium ${className ?? ""}`}
      style={{ color }}
    >
      <motion.span
        className="inline-flex"
        animate={{ x: hovered ? -4 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <ArrowLeft className="h-4 w-4" />
      </motion.span>
      <span
        style={{
          textDecorationLine: "underline",
          textDecorationColor: hovered ? "currentColor" : "transparent",
          textUnderlineOffset: "4px",
          transitionProperty: "text-decoration-color",
          transitionDuration: "250ms",
          transitionTimingFunction: "ease-out",
        }}
      >
        Back to projects
      </span>
    </Link>
  );
}
