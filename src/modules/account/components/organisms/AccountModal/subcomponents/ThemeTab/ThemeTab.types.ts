import type { IAccount } from "@/core/models/account";

export interface ThemeTabProps {
  draft: IAccount;
  setAccent: (token: "media" | "games", color: string) => void;
}
