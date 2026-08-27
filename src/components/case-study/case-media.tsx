export function CaseMedia({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-auto w-full" loading="lazy" />
      </div>
      {caption && (
        <figcaption className="text-center font-sans text-sm text-ink-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
