"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { NavLink } from "@/components/layout/nav-link";

const EASE = [0.22, 1, 0.36, 1] as const;
const EMAIL = "lua.martosr@gmail.com";

const FOOTER_LINKS = [
  { href: "#about", label: "About me" },
  { href: "#how-can-i-help", label: "How can I help" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      id="contact"
      className="rounded-t-[36px] bg-green px-6 py-16 md:rounded-t-[56px] md:px-10 md:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16"
        >
          <div className="flex flex-col gap-6">
            <Image
              src="/images/logo-blanco.svg"
              alt="Lucía Martos"
              width={92}
              height={43}
            />
            <div className="flex flex-col gap-1 font-sans text-cream/60">
              <p className="flex items-center gap-2">
                UX/UI Designer
                <span className="inline-block h-1 w-1 rounded-full bg-cream/60" />
                Business consultant
              </p>
              <p>Based in Colombia, working globally.</p>
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:items-start">
            <h2 className="font-display text-3xl leading-[1.1] text-cream md:text-4xl">
              Let&apos;s talk about
              <br />
              <span className="text-pink">your product</span>
            </h2>

            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <ButtonLink
                  href={`mailto:${EMAIL}`}
                  variant="primary"
                  className="gap-2"
                  onClick={handleEmailClick}
                >
                  E-mail me
                  <Mail className="h-4 w-4" />
                </ButtonLink>
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute -top-9 left-0 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 font-sans text-xs font-medium text-cream"
                    >
                      Email copied to clipboard
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <ButtonLink
                href="https://wa.me/"
                variant="secondary"
                className="gap-2"
              >
                Whatsapp me
                <WhatsappIcon className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col gap-6 border-t border-cream/20 pt-8 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                restColor="rgba(251, 246, 238, 0.6)"
              />
            ))}
          </nav>
          <p className="font-sans text-cream/60">
            © {year} Lucía Martos. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
