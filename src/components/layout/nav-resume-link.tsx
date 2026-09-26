"use client";

import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function NavResumeLink({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const t = useTranslations("nav");

  return (
    <a
      href="/lucia-martos-resume-082026.pdf"
      download
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] rounded-br-none border border-cream px-4 py-1.5 font-display text-sm font-semibold tracking-tight text-cream transition-colors duration-300 ease-out hover:bg-cream hover:text-green",
        className,
      )}
    >
      {t("resume")}
      <Download className="h-4 w-4" />
    </a>
  );
}
