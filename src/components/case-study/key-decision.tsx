export function KeyDecision({
  children,
  accentColor,
}: {
  children: React.ReactNode;
  accentColor: string;
}) {
  return (
    <div
      className="rounded-2xl border-l-4 bg-ink/5 px-6 py-5 font-sans leading-relaxed text-ink"
      style={{ borderColor: accentColor }}
    >
      <p>
        <span className="font-display font-semibold" style={{ color: accentColor }}>
          Key product decision:
        </span>{" "}
        {children}
      </p>
    </div>
  );
}
