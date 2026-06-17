"use client";

import { useApp } from "@/modules/shell/store/appSlice";

export function useAccountGate() {
  const { account } = useApp();

  return { hasAccount: account.data !== null };
}
