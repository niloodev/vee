import type { IAccount } from "@/core/models/account";

export interface McpTabProps {
  draft: IAccount;
  onToggle: (enabled: boolean) => void;
  onRegen: () => void;
  onCopy: (value: string) => void;
}
