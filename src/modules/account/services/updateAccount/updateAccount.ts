import { accountErrors, saveAccount } from "@/core/controllers/account";
import { accountSchema } from "@/core/models/account";

import type {
  UpdateAccountProps,
  UpdateAccountResult,
} from "./updateAccount.types";

export async function updateAccount({
  data,
  setAccount,
}: UpdateAccountProps): Promise<UpdateAccountResult> {
  const parsed = accountSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: accountErrors.accountNotValid };

  const result = await saveAccount(parsed.data);
  if ("error" in result) return { ok: false, error: result.error };

  setAccount(result.payload);
  return { ok: true };
}
