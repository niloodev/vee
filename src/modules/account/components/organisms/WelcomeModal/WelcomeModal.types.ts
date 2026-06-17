import type { AccountDraft } from "@/modules/account/account.types";

export interface WelcomeModalProps {
  onComplete?: () => void;
}

export interface WelcomeStepProps {
  draft: AccountDraft;
  setField: <K extends keyof AccountDraft>(
    key: K,
    value: AccountDraft[K],
  ) => void;
}
