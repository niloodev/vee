"use client";

import { useGridBackground } from "./GridBackground.hook";
import type { GridBackgroundProps } from "./GridBackground.types";

export function GridBackground({ className }: GridBackgroundProps) {
  const { ref } = useGridBackground();

  return (
    <div
      ref={ref}
      aria-hidden
      className={`vee-grid-bg pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <div className="vee-grid-glow motion-safe:animate-grid-glow-pulse" />
    </div>
  );
}
