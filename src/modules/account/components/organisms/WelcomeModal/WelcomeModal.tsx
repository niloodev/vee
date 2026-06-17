"use client";

import { Alert, Button, Icon } from "@/shared/components/atoms";
import { GridBackground } from "@/shared/components/molecules";

import { Stepper } from "@/modules/account/components/molecules";

import { STEP_COUNT } from "./WelcomeModal.constants";
import { useWelcomeModal } from "./WelcomeModal.hook";
import type { WelcomeModalProps } from "./WelcomeModal.types";
import { WelcomeIntro, WelcomeProfile } from "./subcomponents";

export function WelcomeModal({ onComplete }: WelcomeModalProps) {
  const {
    step,
    draft,
    isSaving,
    error,
    setField,
    canAdvance,
    back,
    next,
    handleSubmit,
    isLast,
  } = useWelcomeModal({ onComplete });

  return (
    <div
      data-domain="media"
      className="vee-scanlines relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-background p-8 font-mono"
    >
      <GridBackground />

      <div
        data-tauri-drag-region
        aria-hidden
        className="absolute inset-x-0 top-0 z-[10] h-[38px]"
      />

      <div className="relative z-[1] flex w-[500px] max-w-[90vw] flex-col gap-6 rounded-lg border border-border-default bg-surface-card/90 p-7 shadow-[0_6px_20px_rgba(0,0,0,0.5)]">
        <div className="min-h-[260px]">
          {step === 0 && <WelcomeIntro />}
          {step === 1 && <WelcomeProfile draft={draft} setField={setField} />}
        </div>

        {error && <Alert tone="danger">{error}</Alert>}

        <div className="flex items-center gap-3">
          <Stepper steps={STEP_COUNT} current={step} />

          <div className="ml-auto flex gap-2">
            {step > 0 && (
              <Button
                variant="ghost"
                icon={<Icon name="chevronLeft" size={14} />}
                onClick={back}
                disabled={isSaving}
              >
                Back
              </Button>
            )}

            {!isLast && (
              <Button
                variant="primary"
                iconRight={<Icon name="chevronRight" size={15} />}
                onClick={next}
                disabled={!canAdvance}
              >
                {step === 0 ? "Get started" : "Next"}
              </Button>
            )}

            {isLast && (
              <Button
                variant="primary"
                icon={<Icon name="check" size={15} />}
                onClick={handleSubmit}
                disabled={isSaving || !canAdvance}
              >
                Enter Vee
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
