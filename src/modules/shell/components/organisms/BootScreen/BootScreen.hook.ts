"use client";

import { useEffect, useMemo, useState } from "react";

import {
  BOOT_EXIT_MS,
  BOOT_HOLD_MS,
  BOOT_LINES,
  BOOT_REDUCED_EXIT_MS,
  BOOT_REDUCED_HOLD_MS,
  BOOT_START_DELAY_MS,
  BOOT_STEP_MS,
} from "./BootScreen.constants";
import type { BootScreenProps } from "./BootScreen.types";

export function useBootScreen({ onExit, onDone }: BootScreenProps) {
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true,
    [],
  );

  const [shown, setShown] = useState(prefersReducedMotion ? BOOT_LINES.length : 0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const beginExit = () => {
      setExiting(true);
      onExit?.();
    };

    if (prefersReducedMotion) {
      timers.push(setTimeout(beginExit, BOOT_REDUCED_HOLD_MS));
      timers.push(setTimeout(() => onDone?.(), BOOT_REDUCED_HOLD_MS + BOOT_REDUCED_EXIT_MS));
      return () => timers.forEach(clearTimeout);
    }

    BOOT_LINES.forEach((_, index) => {
      timers.push(
        setTimeout(() => setShown(index + 1), BOOT_START_DELAY_MS + index * BOOT_STEP_MS),
      );
    });

    const exitAt = BOOT_START_DELAY_MS + BOOT_LINES.length * BOOT_STEP_MS + BOOT_HOLD_MS;
    timers.push(setTimeout(beginExit, exitAt));
    timers.push(setTimeout(() => onDone?.(), exitAt + BOOT_EXIT_MS));

    return () => timers.forEach(clearTimeout);
  }, [onDone, onExit, prefersReducedMotion]);

  const revealed = Math.min(shown, BOOT_LINES.length);
  const visibleLines = BOOT_LINES.slice(0, revealed);
  const current = BOOT_LINES[Math.max(0, revealed - 1)];
  const phase = current?.domain ?? "media";
  const pct = Math.round((revealed / BOOT_LINES.length) * 100);
  const complete = revealed >= BOOT_LINES.length;
  const caption = pct < 100 ? (current?.label ?? "Booting local library") : "Ready";

  return { visibleLines, pct, exiting, phase, caption, complete };
}
