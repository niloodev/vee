import type { EmptyStateProps } from "./EmptyState.types";

export function EmptyState({ label, hint }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-border-strong px-6 py-16 text-center">
      <div className="font-pixel text-[22px] uppercase tracking-[0.14em] text-text-dim">
        {label}
      </div>
      <p className="max-w-sm text-[13px] text-text-dim">{hint}</p>
    </div>
  );
}
