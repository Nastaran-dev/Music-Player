import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

export type TypographyVariant =
  | "display"
  | "title"
  | "heading"
  | "subheading"
  | "body"
  | "small"
  | "caption"
  | "overline";

const VARIANT_CLASSES: Record<TypographyVariant, string> = {
  display: "font-display text-display font-extrabold tracking-tight",
  title: "font-display text-title font-bold tracking-tight",
  heading: "font-display text-heading font-semibold tracking-tight",
  subheading: "text-subheading font-semibold",
  body: "text-body",
  small: "text-small",
  caption: "text-caption",
  overline: "text-caption font-semibold tracking-widest uppercase",
};

const DEFAULT_TAGS: Record<TypographyVariant, ElementType> = {
  display: "h1",
  title: "h1",
  heading: "h2",
  subheading: "h3",
  body: "p",
  small: "p",
  caption: "span",
  overline: "span",
};

const TONE_CLASSES = {
  default: "text-foreground",
  muted: "text-muted-foreground",
} as const;

type TypographyProps<T extends ElementType> = {
  as?: T;
  variant?: TypographyVariant;
  tone?: keyof typeof TONE_CLASSES;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "variant" | "tone" | "className">;

export function Typography<T extends ElementType = "p">({
  as,
  variant = "body",
  tone = "default",
  className,
  ...props
}: TypographyProps<T>) {
  const Component: ElementType = as ?? DEFAULT_TAGS[variant];

  return (
    <Component
      className={cn(VARIANT_CLASSES[variant], TONE_CLASSES[tone], className)}
      {...props}
    />
  );
}
