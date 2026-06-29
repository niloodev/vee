import type { CSSProperties } from "react";

import { BADGE_STATUSES } from "./Badge.constants";
import type { BadgeProps } from "./Badge.types";

export function Badge({ status, solid = false }: BadgeProps) {
  const config = BADGE_STATUSES[status];
  const style: CSSProperties = solid
    ? { background: config.color, color: "var(--vee-accent-on)", borderColor: "transparent" }
    : { color: config.color, borderColor: config.border };

  return (
    <span
      style={style}
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm border bg-surface-card px-2.5 py-[5px] font-mono text-[11px] font-bold uppercase leading-none tracking-[0.14em]"
    >
      {!solid && (
        <span
          className="h-[7px] w-[7px] flex-none rounded-full"
          style={{ background: config.color }}
        />
      )}
      {config.label}
    </span>
  );
}
