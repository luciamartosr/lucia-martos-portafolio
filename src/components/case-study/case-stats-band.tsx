import type { LucideIcon } from "lucide-react";
import { FadeUp } from "./fade-up";

export type CaseStat = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export function CaseStatsBand({
  stats,
  iconColor,
}: {
  stats: CaseStat[];
  iconColor: string;
}) {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-ink/10 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <FadeUp
            key={stat.label}
            delay={i * 0.1}
            className="flex flex-col items-center gap-2 px-6 py-6 text-center sm:py-2"
          >
            <Icon className="h-5 w-5" style={{ color: iconColor }} strokeWidth={1.5} />
            <p className="font-display text-xl font-bold text-ink md:text-2xl">
              {stat.value}
            </p>
            <p className="font-sans text-xs uppercase tracking-wide text-ink-soft/70">
              {stat.label}
            </p>
          </FadeUp>
        );
      })}
    </div>
  );
}
