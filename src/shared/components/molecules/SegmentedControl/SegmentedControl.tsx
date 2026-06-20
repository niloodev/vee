import type { CSSProperties } from "react";

import { Icon } from "@/shared/components/atoms";

import type { SegmentedControlProps } from "./SegmentedControl.types";

export function SegmentedControl({
  items,
  activeId,
  onSelect,
}: SegmentedControlProps) {
  return (
    <div className="flex gap-1.5 rounded-md border border-border-default bg-surface-well p-1">
      {items.map((item) => {
        const active = item.id === activeId;
        const color = item.accentColor ?? "var(--vee-accent)";
        const style = {
          "--seg-color": color,
          borderColor: active ? color : "transparent",
          background: active
            ? `color-mix(in srgb, ${color} 18%, transparent)`
            : undefined,
          color: active ? color : undefined,
          boxShadow: active
            ? `0 0 16px color-mix(in srgb, ${color} 35%, transparent)`
            : undefined,
        } as CSSProperties;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            style={style}
            className="group flex flex-1 cursor-pointer items-center justify-center gap-[7px] rounded-sm border border-transparent px-1.5 py-2 font-pixel text-[10px] uppercase tracking-[0.14em] text-text-dim transition-all duration-300 ease-out hover:bg-[color-mix(in_srgb,var(--seg-color)_12%,transparent)] hover:text-[var(--seg-color)] active:scale-[0.96]"
          >
            {item.icon && (
              <Icon
                name={item.icon}
                size={14}
                className="transition-transform duration-300 ease-out group-hover:scale-110"
              />
            )}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
