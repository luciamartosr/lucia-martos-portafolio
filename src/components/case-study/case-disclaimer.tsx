import { Info } from "lucide-react";

export function CaseDisclaimer({
  heading,
  accentColor,
  children,
}: {
  heading: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex gap-4 rounded-2xl border-l-4 bg-ink/5 px-6 py-5 font-sans text-ink"
      style={{ borderColor: accentColor }}
    >
      <Info
        className="mt-0.5 h-5 w-5 shrink-0"
        style={{ color: accentColor }}
        strokeWidth={1.5}
      />
      <div className="flex flex-col gap-1">
        <p className="font-display font-semibold" style={{ color: accentColor }}>
          {heading}
        </p>
        <p className="leading-relaxed text-ink-soft">{children}</p>
      </div>
    </div>
  );
}
