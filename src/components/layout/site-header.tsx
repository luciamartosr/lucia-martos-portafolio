"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { NavLink } from "./nav-link";
import { NavResumeLink } from "./nav-resume-link";

const NAV_ITEMS = [
  { href: "/#about", label: "About me" },
  { href: "/#how-can-i-help", label: "How can I help" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-10 lg:px-16">
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
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
          <NavResumeLink />
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-cream lg:hidden"
          aria-label="Abrir menú"
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
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                className="text-lg"
                onClick={() => setOpen(false)}
              />
            ))}
            <NavResumeLink
              className="w-fit"
              onClick={() => setOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
