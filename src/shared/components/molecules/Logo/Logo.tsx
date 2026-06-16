import { PlayMark } from "@/shared/components/atoms";
import type { LogoProps } from "./Logo.types";

export function Logo({ size = 40, animated = false }: LogoProps) {
  return (
    <div className="flex items-center gap-4">
      <span
        className={`grid place-items-center rounded-md border border-border-strong bg-surface-raised p-3 ${
          animated ? "motion-safe:animate-boot-logo" : ""
        }`}
      >
        <PlayMark size={size} animated={animated} />
      </span>
      <span className="font-pixel text-[40px] leading-none tracking-[0.14em] text-text-strong">
        VEE<span className="text-accent">_</span>
      </span>
    </div>
  );
}
