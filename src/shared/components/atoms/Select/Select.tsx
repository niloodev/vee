import { Icon } from "@/shared/components/atoms/Icon";

import type { SelectProps } from "./Select.types";

export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <label className="flex flex-col gap-2">
      {label && (
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-dim">
          {label}
        </span>
      )}
      <span className="relative flex items-center rounded-sm border border-border-default bg-surface-well transition-colors focus-within:border-accent-dim focus-within:shadow-[0_0_0_3px_var(--vee-accent-glow)]">
        <select
          className={`w-full appearance-none bg-transparent py-[9px] pl-3 pr-9 text-[13px] text-text-strong outline-none ${className ?? ""}`}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-surface-card text-text-strong"
            >
              {option}
            </option>
          ))}
        </select>
        <Icon
          name="chevronDown"
          size={15}
          className="pointer-events-none absolute right-3 text-text-dim"
        />
      </span>
    </label>
  );
}
