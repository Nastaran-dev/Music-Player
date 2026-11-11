import { BRAND } from "@/constants/brand";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  showWordmark?: boolean;
  className?: string;
  wordmarkClassName?: string;
}

export function BrandLogo({
  showWordmark = true,
  className,
  wordmarkClassName,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 32 32"
        className="size-8 shrink-0"
        role={showWordmark ? "presentation" : "img"}
        aria-hidden={showWordmark}
        aria-label={showWordmark ? undefined : BRAND.name}
      >
        <rect x="2" y="3" width="4" height="26" rx="2" className="fill-brand-violet" />
        <rect x="8" y="7" width="4" height="18" rx="2" className="fill-brand-violet" />
        <rect x="14" y="11" width="4" height="10" rx="2" className="fill-brand-violet" />
        <rect x="20" y="7" width="4" height="18" rx="2" className="fill-brand-cyan" />
        <rect x="26" y="3" width="4" height="26" rx="2" className="fill-brand-cyan" />
      </svg>
      {showWordmark ? (
        <span
          className={cn(
            "font-display text-heading font-extrabold tracking-tight",
            wordmarkClassName,
          )}
        >
          {BRAND.name}
        </span>
      ) : null}
    </span>
  );
}
