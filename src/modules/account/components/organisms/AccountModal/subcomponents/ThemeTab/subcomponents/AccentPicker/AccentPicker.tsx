import { Icon } from "@/shared/components/atoms";

import type { AccentPickerProps } from "./AccentPicker.types";

export function AccentPicker({
  label,
  hint,
  value,
  fallback,
  presets,
  onPick,
  onReset,
}: AccentPickerProps) {
  const current = value || fallback;

  return (
    <div className="flex flex-col gap-4 rounded-md border border-border-default bg-surface-raised p-4">
      <div className="flex items-center gap-3">
        <span
          className="h-11 w-11 flex-none rounded-sm border border-border-strong"
          style={{
            background: current,
            boxShadow: `0 0 14px color-mix(in srgb, ${current} 45%, transparent)`,
          }}
        />
        <div className="min-w-0 flex-1">
          <div className="text-[13px] text-text-strong">{label}</div>
          <div className="mt-0.5 text-[11px] leading-relaxed text-text-dim">{hint}</div>
        </div>
        <code className="flex-none rounded-sm border border-border-strong bg-surface-well px-2 py-1 font-mono text-[12px] uppercase text-text-body">
          {current}
        </code>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {presets.map((color) => {
          const on = current.toLowerCase() === color.toLowerCase();
          return (
            <button
              key={color}
              type="button"
              title={color}
              onClick={() => onPick(color)}
              className="h-[26px] w-[26px] flex-none cursor-pointer rounded-full p-0"
              style={{
                background: color,
                border: `2px solid ${on ? "var(--text-strong)" : "var(--vee-line)"}`,
                boxShadow: on
                  ? `0 0 0 2px var(--vee-bg), 0 0 10px color-mix(in srgb, ${color} 55%, transparent)`
                  : "none",
              }}
            />
          );
        })}

        <label className="relative grid h-[26px] w-[26px] flex-none cursor-pointer place-items-center overflow-hidden rounded-full border border-dashed border-border-strong text-text-dim">
          <Icon name="upload" size={13} />
          <input
            type="color"
            value={current}
            onChange={(event) => onPick(event.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>

        {value && (
          <button
            type="button"
            onClick={onReset}
            className="ml-auto inline-flex cursor-pointer items-center gap-1.5 font-mono text-[11px] text-link"
          >
            <Icon name="refresh" size={12} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}
