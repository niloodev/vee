import type { BootLine } from "./BootScreen.types";

export const BOOT_LINES: BootLine[] = [
  { label: "vee boot --local", domain: "media" },
  { label: "mounting library.db", dots: " ............ ", ok: true, domain: "media" },
  { label: "indexing titles", dots: " ......... ", ok: true, domain: "media" },
  { label: "loading media module", dots: " .......... ", ok: true, domain: "media" },
  { label: "loading games module", dots: " .......... ", ok: true, domain: "games" },
  { label: "calibrating phosphor display", dots: " ... ", ok: true, domain: "games" },
  { label: "ready", ready: true, domain: "games" },
];

export const BOOT_START_DELAY_MS = 300;
export const BOOT_STEP_MS = 300;
export const BOOT_HOLD_MS = 520;
export const BOOT_EXIT_MS = 650;
export const BOOT_REDUCED_HOLD_MS = 500;
export const BOOT_REDUCED_EXIT_MS = 320;
