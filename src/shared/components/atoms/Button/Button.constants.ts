import type { ButtonSize, ButtonVariant } from "./Button.types";

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-on hover:bg-accent-bright hover:shadow-[0_0_12px_var(--vee-accent-glow)]",
  secondary:
    "border border-border-default bg-surface-raised text-text-strong hover:border-border-strong",
  ghost: "bg-transparent text-text-body hover:bg-surface-raised hover:text-text-strong",
  danger: "border border-border-default bg-transparent text-red hover:border-red",
};

export const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "h-[30px] gap-1.5 px-3 text-[12px]",
  md: "h-[38px] gap-2 px-4 text-[13px]",
  lg: "h-[44px] gap-2 px-5 text-[14px]",
};
