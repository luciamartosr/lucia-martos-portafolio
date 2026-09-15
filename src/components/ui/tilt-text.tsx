"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const REPLAY_RESET_MS = 450;

type TiltTextProps = {
  text: string;
  activeColor: string;
  restColor: string;
  isActive?: boolean;
  rotate?: number;
  className?: string;
};

export function TiltText({
  text,
  activeColor,
  restColor,
  isActive = false,
  rotate = -10,
  className,
}: TiltTextProps) {
  const [hovered, setHovered] = useState(false);
  const [replaying, setReplaying] = useState(false);
  const engaged = (isActive || hovered) && !replaying;
  const firstLetter = text.charAt(0);
  const rest = text.slice(1);

  const handleEngage = () => {
    setHovered(true);
    if (!isActive) return;
    // Already auto-engaged: briefly snap back to rest so the tilt
    // visibly replays instead of staying static on repeat hovers.
    setReplaying(true);
    setTimeout(() => setReplaying(false), REPLAY_RESET_MS);
  };

  return (
    <span
      className={cn("inline-flex", className)}
      onMouseEnter={handleEngage}
      onMouseLeave={() => setHovered(false)}
      onFocus={handleEngage}
      onBlur={() => setHovered(false)}
      onTouchStart={() => setHovered((prev) => !prev)}
    >
      <motion.span
        animate={{
          color: engaged ? activeColor : restColor,
          rotate: engaged ? rotate : 0,
          x: engaged ? "0.08em" : "0em",
        }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ display: "inline-block", transformOrigin: "50% 50%" }}
      >
        {firstLetter}
      </motion.span>
      <span style={{ color: restColor }}>{rest}</span>
    </span>
  );
}
