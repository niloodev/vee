import { BUTTON_SIZES, BUTTON_VARIANTS } from "./Button.constants";
import type { ButtonProps } from "./Button.types";

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  block = false,
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-sm font-mono font-medium tracking-[0.04em] transition-all duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-45 ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${block ? "w-full" : ""} ${className ?? ""}`}
      {...props}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}
