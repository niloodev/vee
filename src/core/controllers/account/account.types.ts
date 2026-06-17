import { ControllerResult } from "@/core/controllers/controllers.types";
import { IAccount } from "@/core/models/account";

import { accountErrors } from "./account.errors";

type AccountErrorKey = keyof typeof accountErrors;
export type AccountError = (typeof accountErrors)[AccountErrorKey];

export interface IAccountController {
  getAccount: () => Promise<ControllerResult<IAccount, AccountError>>;
  saveAccount: (
    account: IAccount,
  ) => Promise<ControllerResult<IAccount, AccountError>>;
}
