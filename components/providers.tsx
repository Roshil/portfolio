"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Animations follow the visitor's reduced-motion setting everywhere.
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
