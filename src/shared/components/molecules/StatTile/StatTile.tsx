import { Icon } from "@/shared/components/atoms";

import type { StatTileProps } from "./StatTile.types";

export function StatTile({ icon, label, value, unit, accent, bars }: StatTileProps) {
  const max = Math.max(...bars, 1);

  return (
    <div className="relative overflow-hidden rounded-md border border-border-default bg-surface-card px-4 pb-3.5 pt-[15px]">
      <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-text-dim">
        <span className="flex" style={{ color: accent }}>
          <Icon name={icon} size={13} />
        </span>
        {label}
      </div>
      <div className="flex items-end justify-between gap-2.5">
        <div className="shrink-0 whitespace-nowrap font-pixel text-[40px] leading-[0.8] text-text-strong">
          {value}
          {unit && <span className="ml-[3px] font-mono text-[13px] text-text-dim">{unit}</span>}
        </div>
        <div className="flex h-[26px] shrink-0 items-end gap-[3px]">
          {bars.map((bar, index) => (
            <span
              key={index}
              className="w-[5px] rounded-[1px]"
              style={{
                height: `${(bar / max) * 100}%`,
                background:
                  index === bars.length - 1 ? accent : "var(--vee-surface-3)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
