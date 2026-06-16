import type { WindowControlButtonProps } from "./WindowControlButton.types";

const intentClasses = {
  default:
    "text-text-dim before:bg-accent before:shadow-[0_0_8px_var(--vee-accent-glow)] hover:bg-surface-well hover:text-accent",
  close:
    "text-text-dim before:bg-red before:shadow-[0_0_8px_rgba(255,107,107,0.5)] hover:bg-red hover:text-[#1a0808]",
} as const;

export function WindowControlButton({
  intent = "default",
  className,
  children,
  ...props
}: WindowControlButtonProps) {
  return (
    <button
      {...props}
      className={`relative grid h-full w-12 place-items-center transition-colors before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:origin-center before:scale-x-0 before:transition-transform hover:before:scale-x-100 ${intentClasses[intent]} ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
