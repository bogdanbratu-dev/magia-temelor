export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  variant = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  variant?: "light" | "dark";
}) {
  const alignClasses = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const eyebrowClasses = variant === "dark" ? "text-gold-400" : "text-gold-600";
  const titleClasses = variant === "dark" ? "text-cream-50" : "text-navy-950";
  const descriptionClasses = variant === "dark" ? "text-cream-100/70" : "text-navy-900/70";

  return (
    <div className={`flex flex-col gap-3 ${alignClasses} max-w-2xl`}>
      {eyebrow ? (
        <span className={`text-xs font-bold uppercase tracking-[0.2em] ${eyebrowClasses}`}>{eyebrow}</span>
      ) : null}
      <h2 className={`font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-tight ${titleClasses}`}>
        {title}
      </h2>
      {description ? (
        <p className={`text-base sm:text-lg leading-relaxed ${descriptionClasses}`}>{description}</p>
      ) : null}
    </div>
  );
}
