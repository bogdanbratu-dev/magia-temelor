import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-gold-500 text-navy-950 hover:bg-gold-400 shadow-[var(--shadow-card)] focus-visible:outline-gold-600",
  secondary:
    "bg-navy-900 text-cream-50 hover:bg-navy-800 shadow-[var(--shadow-card)] focus-visible:outline-navy-600",
  ghost:
    "bg-transparent text-navy-900 ring-1 ring-inset ring-navy-900/15 hover:bg-navy-900/5 focus-visible:outline-navy-600",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base font-semibold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-0";

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const isAnchor = href.startsWith("#");
  const classes = `${baseClasses} ${VARIANT_CLASSES[variant]} ${className}`;

  if (isAnchor) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
