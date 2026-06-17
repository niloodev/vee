import type { StepperProps } from "./Stepper.types";

export function Stepper({ steps, current }: StepperProps) {
  return (
    <div className="flex items-center gap-[7px]">
      {Array.from({ length: steps }, (_, index) => {
        const active = index === current;
        const filled = index <= current;

        return (
          <span
            key={index}
            className={`h-[7px] rounded-full transition-all duration-200 ease-out ${
              active ? "w-[22px] shadow-[0_0_8px_var(--vee-accent-glow)]" : "w-[7px]"
            } ${filled ? "bg-accent" : "bg-surface-well"}`}
          />
        );
      })}
    </div>
  );
}
