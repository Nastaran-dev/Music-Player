"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { IconButton } from "@/components/ui/icon-button";
import { useMounted } from "@/hooks/use-mounted";

const OPTIONS = [
  { value: "dark", label: "Dark theme", icon: Moon },
  { value: "light", label: "Light theme", icon: Sun },
  { value: "system", label: "System theme", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-1 p-1"
    >
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const active = mounted && theme === value;
        return (
          <IconButton
            key={value}
            label={label}
            size="sm"
            variant={active ? "secondary" : "ghost"}
            pressed={active}
            onClick={() => setTheme(value)}
          >
            <Icon aria-hidden="true" />
          </IconButton>
        );
      })}
    </div>
  );
}
