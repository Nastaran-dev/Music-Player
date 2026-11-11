"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";

import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PersistedStoresHydrator } from "@/components/providers/persisted-stores-hydrator";
import { PlayerEngineBridge } from "@/features/player/components/player-engine-bridge";


export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        <QueryProvider>
          <TooltipProvider delayDuration={300}>
            <PlayerEngineBridge />
            <PersistedStoresHydrator />
            {children}
            <Toaster />
          </TooltipProvider>
        </QueryProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
