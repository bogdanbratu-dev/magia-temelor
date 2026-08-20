export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const alignClasses = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClasses} max-w-2xl`}>
      {eyebrow ? (
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{eyebrow}</span>
      ) : null}
      <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-tight text-navy-950">
        {title}
      </h2>
      {description ? (
        <p className="text-base sm:text-lg text-navy-900/70 leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
