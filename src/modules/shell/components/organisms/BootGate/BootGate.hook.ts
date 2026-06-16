"use client";

import { useCallback, useState } from "react";

type BootPhase = "booting" | "exiting" | "done";

export function useBootGate() {
  const [phase, setPhase] = useState<BootPhase>("booting");

  const startExit = useCallback(
    () => setPhase((current) => (current === "booting" ? "exiting" : current)),
    [],
  );
  const finishBoot = useCallback(() => setPhase("done"), []);

  return { phase, startExit, finishBoot };
}
