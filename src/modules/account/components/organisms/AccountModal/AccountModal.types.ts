import type { IAccount } from "@/core/models/account";
import type { IconName } from "@/shared/components/atoms";

export type AccountTab = "profile" | "theme" | "mcp" | "data";

export interface AccountTabDef {
  id: AccountTab;
  label: string;
  icon: IconName;
}

export interface AccountTabProps {
  draft: IAccount;
  setField: <K extends keyof IAccount>(key: K, value: IAccount[K]) => void;
}
