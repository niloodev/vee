"use client";

import { BootScreen } from "@/modules/shell/components/organisms/BootScreen";

import { useBootGate } from "./BootGate.hook";
import type { BootGateProps } from "./BootGate.types";

export function BootGate({ children }: BootGateProps) {
  const { phase, startExit, finishBoot } = useBootGate();

  return (
    <>
      {phase !== "booting" && children}
      {phase !== "done" && <BootScreen onExit={startExit} onDone={finishBoot} />}
    </>
  );
}
