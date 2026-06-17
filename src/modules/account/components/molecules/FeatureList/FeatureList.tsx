import { Icon } from "@/shared/components/atoms";

import type { FeatureListProps } from "./FeatureList.types";

export function FeatureList({ items }: FeatureListProps) {
  return (
    <ul className="flex flex-col gap-[9px]">
      {items.map((item) => (
        <li key={item.text} className="flex items-center gap-[11px]">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-sm border border-border-default bg-surface-well text-accent">
            <Icon name={item.icon} size={14} />
          </span>
          <span className="text-[12.5px] text-text-body">{item.text}</span>
        </li>
      ))}
    </ul>
  );
}
