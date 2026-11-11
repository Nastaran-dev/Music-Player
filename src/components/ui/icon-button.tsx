"use client";

import type { ReactNode } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type IconButtonSize = "sm" | "md" | "lg";

const SIZE_MAP = {
  sm: "icon-sm",
  md: "icon-md",
  lg: "icon-lg",
} as const satisfies Record<IconButtonSize, NonNullable<ButtonProps["size"]>>;

export interface IconButtonProps
  extends Omit<ButtonProps, "size" | "children" | "asChild" | "aria-label"> {
  label: string;
  size?: IconButtonSize;
  pressed?: boolean;
  showTooltip?: boolean;
  children: ReactNode;
}

export function IconButton({
  label,
  size = "md",
  pressed,
  showTooltip = true,
  variant = "ghost",
  children,
  ...props
}: IconButtonProps) {
  const button = (
    <Button
      {...props}
      variant={variant}
      size={SIZE_MAP[size]}
      aria-label={label}
      aria-pressed={pressed}
    >
      {children}
    </Button>
  );

  if (!showTooltip) return button;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
