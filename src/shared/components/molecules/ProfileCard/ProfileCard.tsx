import { Icon } from "@/shared/components/atoms";

import type { ProfileCardProps } from "./ProfileCard.types";

export function ProfileCard({ name, caption = "local profile" }: ProfileCardProps) {
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <div className="mt-auto border-t border-border-default p-3">
      <div className="flex cursor-pointer items-center gap-2.5 rounded-sm p-1.5 transition-colors duration-200 ease-out hover:bg-surface-raised">
        <span className="grid h-[30px] w-[30px] flex-none place-items-center overflow-hidden rounded-sm border border-border-strong bg-surface-well font-pixel text-[11px] text-accent">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12px] text-text-strong">{name}</div>
          <div className="text-[10px] text-text-dim">{caption}</div>
        </div>
        <Icon name="chevronDown" size={16} className="text-text-dim" />
      </div>
    </div>
  );
}
