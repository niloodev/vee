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

export function useBootScreen({ ready = true, onExit, onDone }: BootScreenProps) {
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true,
    [],
  );

  const [shown, setShown] = useState(prefersReducedMotion ? BOOT_LINES.length : 0);
  const [animationDone, setAnimationDone] = useState(false);

  const exiting = animationDone && ready;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (prefersReducedMotion) {
      timers.push(setTimeout(() => setAnimationDone(true), BOOT_REDUCED_HOLD_MS));
      return () => timers.forEach(clearTimeout);
    }

    BOOT_LINES.forEach((_, index) => {
      timers.push(
        setTimeout(() => setShown(index + 1), BOOT_START_DELAY_MS + index * BOOT_STEP_MS),
      );
    });

    const doneAt = BOOT_START_DELAY_MS + BOOT_LINES.length * BOOT_STEP_MS + BOOT_HOLD_MS;
    timers.push(setTimeout(() => setAnimationDone(true), doneAt));

    return () => timers.forEach(clearTimeout);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!exiting) return;

    onExit?.();

    const exitMs = prefersReducedMotion ? BOOT_REDUCED_EXIT_MS : BOOT_EXIT_MS;
    const timer = setTimeout(() => onDone?.(), exitMs);

    return () => clearTimeout(timer);
  }, [exiting, prefersReducedMotion, onExit, onDone]);

  const revealed = Math.min(shown, BOOT_LINES.length);
  const visibleLines = BOOT_LINES.slice(0, revealed);
  const current = BOOT_LINES[Math.max(0, revealed - 1)];
  const phase = current?.domain ?? "media";
  const waiting = animationDone && !ready;
  const complete = revealed >= BOOT_LINES.length && ready;
  const pct = complete ? 100 : Math.min(Math.round((revealed / BOOT_LINES.length) * 100), 99);
  const caption = complete
    ? "Ready"
    : waiting
      ? "Syncing local data"
      : (current?.label ?? "Booting local library");

  return { visibleLines, pct, exiting, phase, caption, complete };
}
