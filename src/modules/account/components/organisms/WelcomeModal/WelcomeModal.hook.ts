"use client";

import { useCallback, useMemo, useState } from "react";

import type { AccountDraft } from "@/modules/account/account.types";
import { createAccount } from "@/modules/account/services";
import { useApp } from "@/modules/shell/store/appSlice";

import { DEFAULT_DRAFT, STEP_COUNT } from "./WelcomeModal.constants";
import type { WelcomeModalProps } from "./WelcomeModal.types";

export function useWelcomeModal({ onComplete }: WelcomeModalProps) {
  const { setAccount } = useApp();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<AccountDraft>(DEFAULT_DRAFT);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setField = useCallback(
    <K extends keyof AccountDraft>(key: K, value: AccountDraft[K]) =>
      setDraft((current) => ({ ...current, [key]: value })),
    [],
  );

  const canAdvance = useMemo(() => {
    if (step === 1)
      return draft.displayName.trim() !== "" && draft.username.trim() !== "";
    return true;
  }, [step, draft.displayName, draft.username]);

  const back = useCallback(() => {
    setError(null);
    setStep((current) => Math.max(0, current - 1));
  }, []);
  const next = useCallback(() => {
    setError(null);
    setStep((current) => Math.min(STEP_COUNT - 1, current + 1));
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSaving(true);
    setError(null);

    const result = await createAccount({ data: draft, setAccount });
    setIsSaving(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    onComplete?.();
  }, [draft, setAccount, onComplete]);

  return {
    step,
    draft,
    isSaving,
    error,
    setField,
    canAdvance,
    back,
    next,
    handleSubmit,
    isLast: step === STEP_COUNT - 1,
  };
}
