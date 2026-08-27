export function CaseSection({
  title,
  accentColor,
  children,
}: {
  title: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 py-14 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[380px_1fr] md:gap-16">
        <h2
          className="font-display text-4xl font-bold lg:text-5xl"
          style={{ color: accentColor }}
        >
          {title}
        </h2>
        <div className="flex flex-col gap-5 font-sans text-lg leading-relaxed text-ink">
          {children}
        </div>
      </div>
    </section>
  );
}
