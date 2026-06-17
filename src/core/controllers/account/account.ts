import {
  accountSchema,
  getAccount as getAccountModel,
  saveAccount as saveAccountModel,
} from "@/core/models/account";

import { accountErrors } from "./account.errors";
import { IAccountController } from "./account.types";

export const getAccount: IAccountController["getAccount"] = async () => {
  try {
    const account = await getAccountModel();
    if (!account) return { error: accountErrors.accountNotFound };
    return { message: "Conta carregada com sucesso", payload: account };
  } catch {
    return { error: accountErrors.accountNotLoaded };
  }
};

export const saveAccount: IAccountController["saveAccount"] = async (account) => {
  const parsed = accountSchema.safeParse(account);
  if (!parsed.success) return { error: accountErrors.accountNotValid };
  try {
    const saved = await saveAccountModel(parsed.data);
    return { message: "Conta salva com sucesso", payload: saved };
  } catch {
    return { error: accountErrors.accountNotSaved };
  }
};
