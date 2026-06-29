import type { BadgeStatus } from "./Badge.types";

export const BADGE_STATUSES: Record<
  BadgeStatus,
  { color: string; border: string; label: string }
> = {
  watching: { color: "var(--vee-accent)", border: "var(--vee-accent-dim)", label: "Watching" },
  backlog: { color: "var(--vee-amber)", border: "#7a6328", label: "Backlog" },
  completed: { color: "var(--vee-cyan)", border: "#2c5e70", label: "Completed" },
  dropped: { color: "var(--vee-red)", border: "#7a3535", label: "Dropped" },
  installed: { color: "var(--vee-accent)", border: "var(--vee-accent-dim)", label: "Installed" },
  archived: { color: "var(--vee-fg-muted)", border: "var(--vee-line-strong)", label: "Archived" },
};
