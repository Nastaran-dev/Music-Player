import { cn } from "@/lib/utils";

export function EqualizerBars({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex h-4 items-end gap-0.5", className)}
    >
      {[0, 200, 400].map((delay) => (
        <span
          key={delay}
          className="h-full w-1 origin-bottom animate-eq rounded-full bg-accent"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}
