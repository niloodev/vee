"use client";

import { useApp } from "@/modules/shell/store/appSlice";

export function useAccountGate() {
  const { account, ui, setReplayWelcome } = useApp();

  return {
    showWelcome: account.data === null || ui.replayWelcome,
    finishWelcome: () => setReplayWelcome(false),
  };
}
