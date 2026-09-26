"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { TiltText } from "@/components/ui/tilt-text";

const EASE = [0.22, 1, 0.36, 1] as const;
const HOVER_EASE = "easeOut";
const TILT_DELAY_MS = 2000;
const MotionLink = motion.create(Link);
const CARD_FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const CARD_ENTRANCE = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
} as const;

const OVERLAY_CLASSNAME =
  "absolute inset-0 bg-gradient-to-t from-green-dark via-green/60 to-green/20";

function TagRow({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 font-sans ${className ?? ""}`}>
      {tags.map((tag, i) => (
        <span key={tag} className="flex items-center gap-2">
          {i > 0 && <span className="text-pink">/</span>}
          {tag}
        </span>
      ))}
    </div>
  );
}

function CaseStudyLink({
  label,
  hovered,
  className,
}: {
  label: string;
  hovered: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1 font-sans font-semibold text-pink ${className ?? ""}`}
    >
      {label}
      <motion.span
        className="inline-flex"
        animate={{ x: hovered ? 5 : 0 }}
        transition={{ duration: 0.3, ease: HOVER_EASE }}
      >
        <ArrowUpRight className="h-4 w-4" />
      </motion.span>
    </span>
  );
}

function FeaturedProjectCard({ t }: { t: ReturnType<typeof useTranslations> }) {
  const [hovered, setHovered] = useState(false);
  const tags = t.raw("featured.tags") as string[];

  return (
    <MotionLink
      href="/projects/shortcat"
      {...CARD_ENTRANCE}
      transition={{ duration: 0.55, ease: HOVER_EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[36px] bg-green-dark p-8 md:min-h-[620px] md:p-10 ${CARD_FOCUS_RING}`}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.6, ease: HOVER_EASE }}
      >
        <Image
          src="/images/project-shortcat.png"
          alt={t("featured.imageAlt")}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 66vw, 100vw"
        />
      </motion.div>
      <motion.div
        className={OVERLAY_CLASSNAME}
        animate={{ opacity: hovered ? 0.15 : 0.85 }}
        transition={{ duration: 0.4, ease: HOVER_EASE }}
      />

      <motion.div
        className="relative z-10 flex items-center gap-2 font-sans text-sm font-medium tracking-wide text-cream"
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.3, ease: HOVER_EASE }}
      >
        <span className="font-semibold text-pink">01/</span>
        {t("featuredEyebrow")}
      </motion.div>

      <div className="relative z-10 flex flex-col gap-4">
        <div className="grid">
          <motion.div
            style={{ gridArea: "1 / 1" }}
            className="flex flex-col gap-4"
            animate={{ opacity: hovered ? 0 : 1, y: hovered ? 8 : 0 }}
            transition={{ duration: 0.35, ease: HOVER_EASE }}
          >
            <h3 className="font-display text-4xl font-bold leading-[1.05] text-cream md:text-5xl">
              {t("featured.title")}
            </h3>
            <span className="h-1 w-10 rounded-full bg-pink" />
            <p className="font-display text-xl font-semibold text-cream">
              {t("featured.name")}
            </p>
            <TagRow tags={tags} className="text-cream" />
          </motion.div>

          <motion.p
            style={{ gridArea: "1 / 1" }}
            className="self-end font-sans text-lg leading-snug text-cream"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -8 }}
            transition={{ duration: 0.35, ease: HOVER_EASE }}
          >
            {t("featured.hoverDescription")}
          </motion.p>
        </div>

        <CaseStudyLink label={t("readCaseStudy")} hovered={hovered} />
      </div>
    </MotionLink>
  );
}

function SecondaryProjectCard({ t }: { t: ReturnType<typeof useTranslations> }) {
  const [hovered, setHovered] = useState(false);
  const tags = t.raw("secondary.tags") as string[];

  return (
    <MotionLink
      href="/projects/jobmatch"
      {...CARD_ENTRANCE}
      transition={{ duration: 0.55, ease: HOVER_EASE, delay: 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`flex flex-col overflow-hidden rounded-[36px] bg-white ${CARD_FOCUS_RING}`}
    >
      <div className="relative h-[260px] overflow-hidden md:h-[320px]">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.6, ease: HOVER_EASE }}
        >
          <Image
            src="/images/project-jobmatch.png"
            alt={t("secondary.imageAlt")}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </motion.div>
        <motion.div
          className={OVERLAY_CLASSNAME}
          animate={{ opacity: hovered ? 0.15 : 0.85 }}
          transition={{ duration: 0.4, ease: HOVER_EASE }}
        />
        <motion.span
          className="absolute left-6 top-6 font-sans text-sm font-semibold text-pink"
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.3, ease: HOVER_EASE }}
        >
          02/
        </motion.span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-8">
        <div className="grid">
          <motion.div
            style={{ gridArea: "1 / 1" }}
            className="flex flex-col gap-4"
            animate={{ opacity: hovered ? 0 : 1, y: hovered ? 8 : 0 }}
            transition={{ duration: 0.35, ease: HOVER_EASE }}
          >
            <h3 className="font-display text-2xl font-bold leading-[1.05] text-green md:text-3xl">
              {t("secondary.title")}
            </h3>
            <span className="h-1 w-10 rounded-full bg-pink" />
            <p className="font-display text-xl font-semibold text-green">
              {t("secondary.name")}
            </p>
            <TagRow tags={tags} className="text-green" />
          </motion.div>

          <motion.p
            style={{ gridArea: "1 / 1" }}
            className="self-end font-sans leading-snug text-green"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -8 }}
            transition={{ duration: 0.35, ease: HOVER_EASE }}
          >
            {t("secondary.hoverDescription")}
          </motion.p>
        </div>

        <CaseStudyLink label={t("readCaseStudy")} hovered={hovered} className="mt-auto" />
      </div>
    </MotionLink>
  );
}

export function Projects() {
  const t = useTranslations("projects");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.7 });
  const [tiltActive, setTiltActive] = useState(false);

  useEffect(() => {
    if (!isHeadingInView) return;
    const timer = setTimeout(() => setTiltActive(true), TILT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isHeadingInView]);

  return (
    <section id="projects" className="bg-cream px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col gap-6"
        >
          <h2
            ref={headingRef}
            className="font-display text-4xl font-bold text-pink lg:text-5xl"
          >
            <TiltText
              text={t("heading")}
              activeColor="#02584B"
              restColor="#FF3D9B"
              isActive={tiltActive}
            />
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <FeaturedProjectCard t={t} />
          <SecondaryProjectCard t={t} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-12 flex flex-col items-center gap-3 text-center"
        >
          <p className="font-sans text-lg text-green">{t("moreProjectsText")}</p>
          <a
            href="https://www.behance.net/luciamartos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-sans font-semibold text-pink"
          >
            {t("viewMoreOnBehance")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
