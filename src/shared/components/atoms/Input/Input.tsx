import type { InputProps } from "./Input.types";

export function Input({
  label,
  prefix,
  hint,
  error,
  mono = false,
  className,
  ...props
}: InputProps) {
  return (
    <label className="flex flex-col gap-2">
      {label && (
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-dim">
          {label}
        </span>
      )}
      <span
        className={`flex items-center gap-2 rounded-sm border bg-surface-well px-3 transition-colors focus-within:shadow-[0_0_0_3px_var(--vee-accent-glow)] ${
          error
            ? "border-red"
            : "border-border-default focus-within:border-accent-dim"
        }`}
      >
        {prefix && <span className="flex shrink-0 text-accent">{prefix}</span>}
        <input
          className={`w-full bg-transparent py-[9px] text-[13px] text-text-strong outline-none placeholder:text-text-faint ${
            mono ? "font-mono" : ""
          } ${className ?? ""}`}
          {...props}
        />
      </span>
      {error ? (
        <span className="text-[11px] text-red">{error}</span>
      ) : hint ? (
        <span className="text-[11px] text-text-dim">{hint}</span>
      ) : null}
    </label>
  );
}
