import type { IAccount } from "@/core/models/account";

export interface UpdateAccountProps {
  data: IAccount;
  setAccount: (account: IAccount) => void;
}

export type UpdateAccountResult = { ok: true } | { ok: false; error: string };
