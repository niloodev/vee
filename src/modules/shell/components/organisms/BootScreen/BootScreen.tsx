"use client";

import { GridBackground, Logo } from "@/shared/components/molecules";

import { useBootScreen } from "./BootScreen.hook";
import type { BootScreenProps } from "./BootScreen.types";
import { BootLog, BootProgress } from "./subcomponents";

export function BootScreen({ ready, onExit, onDone }: BootScreenProps) {
  const { visibleLines, pct, exiting, phase, caption, complete } = useBootScreen({
    ready,
    onExit,
    onDone,
  });

  return (
    <div
      data-domain={phase}
      className={`vee-scanlines fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-background font-mono transition-opacity duration-300 ease-in-out ${
        exiting
          ? "motion-safe:animate-boot-exit motion-reduce:opacity-0"
          : "motion-safe:animate-boot-power"
      }`}
    >
      <GridBackground />

      <div data-tauri-drag-region aria-hidden className="absolute inset-x-0 top-0 z-[10] h-[38px]" />

      <div
        aria-hidden
        className="pointer-events-none absolute h-[560px] w-[560px] rounded-full blur-[44px] motion-safe:animate-boot-orb"
        style={{ background: "radial-gradient(circle, var(--vee-accent-glow), transparent 65%)" }}
      />

      <div className="relative z-[6] flex w-[440px] max-w-[88vw] flex-col items-center gap-7">
        <Logo size={40} animated />

        <div className="w-full rounded-md border border-border-default bg-surface-card/80 px-[18px] py-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.5)]">
          <BootLog lines={visibleLines} complete={complete} />
          <BootProgress pct={pct} />
        </div>

        <p className="font-pixel text-[10px] uppercase tracking-[0.14em] text-accent">{caption}</p>
      </div>
    </div>
  );
}
