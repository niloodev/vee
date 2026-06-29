import { Icon } from "@/shared/components/atoms";

import type { SectionHeadProps } from "./SectionHead.types";

export function SectionHead({ icon, title, count, accent }: SectionHeadProps) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span
        className="flex shrink-0 text-accent"
        style={accent ? { color: accent } : undefined}
      >
        <Icon name={icon} size={16} />
      </span>
      <h2 className="shrink-0 whitespace-nowrap font-pixel text-[26px] leading-none text-text-strong">
        {title}
      </h2>
      <span className="h-px flex-1 bg-border-default" />
      {count != null && (
        <span className="shrink-0 rounded-full border border-border-default bg-surface-raised px-2 py-0.5 text-[11px] text-text-dim">
          {count}
        </span>
      )}
    </div>
  );
}
