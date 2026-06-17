"use client";

import { useCallback, useState } from "react";

import { useApp } from "@/modules/shell/store/appSlice";

type BootPhase = "booting" | "exiting" | "done";

export function useBootGate() {
  const { account, games, media } = useApp();
  const [phase, setPhase] = useState<BootPhase>("booting");

  const ready = [account.status, games.status, media.status].every(
    (status) => status !== "loading",
  );

  const startExit = useCallback(
    () => setPhase((current) => (current === "booting" ? "exiting" : current)),
    [],
  );
  const finishBoot = useCallback(() => setPhase("done"), []);

  return { phase, ready, startExit, finishBoot };
}
