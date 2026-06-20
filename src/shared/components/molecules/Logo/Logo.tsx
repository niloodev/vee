import { PlayMark } from "@/shared/components/atoms";
import type { LogoProps } from "./Logo.types";

export function Logo({ size = 40, animated = false }: LogoProps) {
  return (
    <div className="flex items-center" style={{ gap: size * 0.4 }}>
      <span
        className={`grid place-items-center rounded-md border border-border-strong bg-surface-raised ${
          animated ? "motion-safe:animate-boot-logo" : ""
        }`}
        style={{ padding: size * 0.3 }}
      >
        <PlayMark size={size} animated={animated} />
      </span>
      <span
        className="font-pixel leading-none tracking-[0.14em] text-text-strong"
        style={{ fontSize: size }}
      >
        VEE<span className="text-accent">_</span>
      </span>
    </div>
  );
}
