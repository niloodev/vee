import type { SwitchProps } from "./Switch.types";

export function Switch({ checked, onChange, disabled, label }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[22px] w-[38px] flex-none items-center rounded-full border transition-colors duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-45 ${
        checked
          ? "border-transparent bg-accent shadow-[0_0_10px_var(--vee-accent-glow)]"
          : "border-border-strong bg-surface-well"
      }`}
    >
      <span
        className={`grid h-[16px] w-[16px] place-items-center rounded-full transition-transform duration-200 ease-out ${
          checked
            ? "translate-x-[18px] bg-[var(--vee-accent-on)]"
            : "translate-x-[3px] bg-text-dim"
        }`}
      />
    </button>
  );
}
