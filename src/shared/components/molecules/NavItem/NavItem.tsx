import type { CSSProperties } from "react";

import { Icon } from "@/shared/components/atoms";

import type { NavItemProps } from "./NavItem.types";

export function NavItem({ item, active, onSelect }: NavItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className={`group flex cursor-pointer items-center gap-[11px] rounded-sm px-3 py-[9px] text-left text-[13px] transition-all duration-200 ease-out ${
        active
          ? "bg-accent font-bold text-accent-on"
          : "text-text-body hover:translate-x-0.5 hover:bg-surface-raised"
      }`}
    >
      <span
        className="flex transition-transform duration-200 ease-out group-hover:scale-110"
        style={active ? undefined : ({ color: item.accentColor } as CSSProperties)}
      >
        <Icon name={item.icon} size={16} />
      </span>
      <span className="flex-1">{item.label}</span>
    </button>
  );
}
