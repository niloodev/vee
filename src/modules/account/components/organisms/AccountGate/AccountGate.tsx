"use client";

import { WelcomeModal } from "@/modules/account/components/organisms/WelcomeModal";

import { useAccountGate } from "./AccountGate.hook";
import type { AccountGateProps } from "./AccountGate.types";

export function AccountGate({ children }: AccountGateProps) {
  const { showWelcome, finishWelcome } = useAccountGate();

  return showWelcome ? <WelcomeModal onComplete={finishWelcome} /> : <>{children}</>;
}
