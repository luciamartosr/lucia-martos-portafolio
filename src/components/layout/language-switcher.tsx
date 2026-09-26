"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher({
  className,
  onSwitch,
}: {
  className?: string;
  onSwitch?: () => void;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");

  const switchTo = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
    onSwitch?.();
  };

  return (
    <div
      role="group"
      aria-label={t("languageLabel")}
      className={`flex items-center gap-1 font-sans text-[15px] font-medium tracking-tight ${className ?? ""}`}
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="text-cream/40">/</span>}
          <button
            type="button"
            onClick={() => switchTo(loc)}
            disabled={loc === locale}
            aria-current={loc === locale ? "true" : undefined}
            className={
              loc === locale
                ? "text-pink"
                : "text-cream/70 transition-colors duration-200 hover:text-cream"
            }
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
