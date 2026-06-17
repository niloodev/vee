"use client";

import { useAccountProvider } from "./AccountProvider.hook";
import type { AccountProviderProps } from "./AccountProvider.types";

export function AccountProvider({ children }: AccountProviderProps) {
  useAccountProvider();

  return <>{children}</>;
}
