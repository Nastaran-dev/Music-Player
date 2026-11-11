"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

import { DURATION, EASE } from "@/constants/motion";


export default function MainTemplate({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.base, ease: EASE.standard }}
    >
      {children}
    </motion.div>
  );
}
