import type { AccountDraft } from "@/modules/account/account.types";
import type { FeatureItem } from "@/modules/account/components/molecules";

export const STEP_COUNT = 2;

export const DEFAULT_DRAFT: AccountDraft = {
  username: "",
  displayName: "",
  avatar: "",
};

export const FEATURES: FeatureItem[] = [
  { icon: "settings", text: "Name your operator profile" },
  { icon: "terminal", text: "Everything stays on this machine" },
];
