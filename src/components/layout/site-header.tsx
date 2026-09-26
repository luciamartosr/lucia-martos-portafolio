"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NavLink } from "./nav-link";
import { NavResumeLink } from "./nav-resume-link";
import { LanguageSwitcher } from "./language-switcher";

const NAV_KEYS = [
  { href: "/", key: "home" },
  { href: "/#about", key: "about" },
  { href: "/#how-can-i-help", key: "howCanIHelp" },
  { href: "/#projects", key: "projects" },
  { href: "/#contact", key: "contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16 lg:py-8">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo-blanco.svg"
            alt="Lucía Martos"
            width={92}
            height={43}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV_KEYS.map((item) => (
            <NavLink key={item.href} href={item.href} label={t(item.key)} />
          ))}
          <NavResumeLink />
          <LanguageSwitcher />
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-cream lg:hidden"
          aria-label={t("openMenu")}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-6 mt-2 flex flex-col gap-6 rounded-[20px] bg-green-dark px-8 py-8 lg:hidden"
          >
            {NAV_KEYS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={t(item.key)}
                className="text-lg"
                onClick={() => setOpen(false)}
              />
            ))}
            <NavResumeLink className="w-fit" onClick={() => setOpen(false)} />
            <LanguageSwitcher
              className="text-lg"
              onSwitch={() => setOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
