"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { TiltText } from "@/components/ui/tilt-text";

type NavLinkProps = {
  href: string;
  label: string;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
  activeColor?: string;
  restColor?: string;
};

export function NavLink({
  href,
  label,
  isActive = false,
  className,
  onClick,
  activeColor = "#FF3D9B",
  restColor = "#FBF6EE",
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "font-sans text-[15px] font-medium tracking-tight outline-none",
        className,
      )}
    >
      <TiltText
        text={label}
        isActive={isActive}
        activeColor={activeColor}
        restColor={restColor}
      />
    </Link>
  );
}
