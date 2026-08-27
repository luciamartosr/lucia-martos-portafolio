import Image from "next/image";
import { BackToProjectsLink } from "./back-to-projects-link";

export function CaseHero({
  eyebrow,
  title,
  tagline,
  tags,
  image,
  imageAlt,
  accentColor,
  darkColor = "#171717",
}: {
  eyebrow: string;
  title: string;
  tagline: string;
  tags: string[];
  image: string;
  imageAlt: string;
  accentColor: string;
  darkColor?: string;
}) {
  return (
    <section
      className="relative flex min-h-[480px] flex-col justify-end overflow-hidden rounded-b-[36px] px-6 pb-16 pt-32 md:min-h-[560px] md:rounded-b-[56px] md:px-10 md:pt-36 lg:px-16"
      style={{ backgroundColor: darkColor }}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

      <p
        className="relative z-10 mx-auto w-full max-w-5xl font-sans text-sm font-semibold uppercase tracking-[0.2em]"
        style={{ color: accentColor }}
      >
        {eyebrow}
      </p>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-4">
        <h1 className="font-display text-5xl font-bold leading-[1.05] text-cream md:text-7xl">
          {title}
        </h1>

        <p className="max-w-2xl font-sans text-lg text-cream/80 md:text-xl">
          {tagline}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2 font-sans text-sm text-cream">
          {tags.map((tag, i) => (
            <span key={tag} className="flex items-center gap-2">
              {i > 0 && <span style={{ color: accentColor }}>/</span>}
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <BackToProjectsLink color="#FFFFFF" />
        </div>
      </div>
    </section>
  );
}
