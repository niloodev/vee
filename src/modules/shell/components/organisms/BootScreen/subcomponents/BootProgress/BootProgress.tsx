import type { BootProgressProps } from "./BootProgress.types";

export function BootProgress({ pct }: BootProgressProps) {
  return (
    <div className="mt-[14px] flex items-center gap-3">
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-well">
        <div
          className="h-full rounded-full bg-accent shadow-[0_0_10px_var(--vee-accent-glow)] transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="min-w-[30px] text-right text-[11px] tabular-nums text-text-dim">{pct}%</span>
    </div>
  );
}
