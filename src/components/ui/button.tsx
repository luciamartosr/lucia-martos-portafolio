import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary";

const baseStyles =
  "inline-flex items-center justify-center rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] rounded-br-none px-7 py-3.5 font-display text-[15px] font-semibold tracking-tight transition-transform duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-pink text-cream hover:bg-pink-dark",
  secondary: "bg-cream text-pink hover:bg-white",
};

/**
 * For hrefs that must never go through the locale-aware `Link` above —
 * same-origin static assets like the resume PDF, which next-intl would
 * otherwise treat as an internal route and prefix with `/es`, 404ing.
 * Use with a plain `<a>` tag.
 */
export function buttonClassName(variant: ButtonVariant, className?: string) {
  return cn(baseStyles, variantStyles[variant], className);
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
};

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  );
}
