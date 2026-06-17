import { Logo } from "@/shared/components/molecules";

import { FeatureList } from "@/modules/account/components/molecules";

import { FEATURES } from "../../WelcomeModal.constants";

export function WelcomeIntro() {
  return (
    <div className="flex flex-col items-center gap-[18px] text-center">
      <Logo size={40} animated />
      <h1 className="font-pixel text-[38px] leading-none tracking-tight text-text-strong">
        Welcome to Vee
      </h1>
      <p className="max-w-[360px] text-[13px] leading-relaxed text-text-dim">
        Your local library for everything you watch and play. Let&apos;s set up
        the basics: it takes about 20 seconds, and you can change all of it later
        in Settings.
      </p>
      <FeatureList items={FEATURES} />
    </div>
  );
}
