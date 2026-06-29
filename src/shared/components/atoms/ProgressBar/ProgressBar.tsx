import type { ProgressBarProps } from "./ProgressBar.types";

export function ProgressBar({
  value,
  total,
  label,
  showCount = true,
  unit = "",
}: ProgressBarProps) {
  const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
  const done = pct >= 100;

  return (
    <div className="flex w-full flex-col gap-1.5 font-mono">
      {(label || showCount) && (
        <div className="flex items-baseline justify-between text-[11px]">
          {label && (
            <span className="uppercase tracking-wide text-text-dim">{label}</span>
          )}
          {showCount && (
            <span className="text-text-strong">
              {value}/{total} {unit}
            </span>
          )}
        </div>
      )}
      <div className="relative h-2 overflow-hidden rounded-full border border-border-default bg-surface-well">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-300 ease-out"
          style={{
            width: `${pct}%`,
            background: done
              ? "linear-gradient(90deg, #2c5e70, var(--vee-cyan))"
              : "linear-gradient(90deg, var(--vee-accent-dim), var(--vee-accent))",
          }}
        />
      </div>
    </div>
  );
}
