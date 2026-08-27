import { MessagesSquare } from "lucide-react";

export function LearnMoreNote({
  accentColor,
  children,
}: {
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex gap-3 rounded-2xl border-l-4 bg-ink/5 px-6 py-5 font-sans leading-relaxed text-ink"
      style={{ borderColor: accentColor }}
    >
      <MessagesSquare
        className="mt-0.5 h-5 w-5 shrink-0"
        style={{ color: accentColor }}
        strokeWidth={1.5}
      />
      <p>{children}</p>
    </div>
  );
}
