import type { IAccount } from "@/core/models/account";

import type { AccountDraft } from "@/modules/account/account.types";

export interface CreateAccountProps {
  data: AccountDraft;
  setAccount: (account: IAccount) => void;
}

export type CreateAccountResult = { ok: true } | { ok: false; error: string };
