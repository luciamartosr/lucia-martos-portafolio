import { ImageIcon } from "lucide-react";

export function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink/20 bg-ink/5 px-6 py-10 text-center md:min-h-[320px]">
      <ImageIcon className="h-7 w-7 text-ink-soft" strokeWidth={1.5} />
      <p className="font-sans text-sm text-ink-soft">{label}</p>
    </div>
  );
}
