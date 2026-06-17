import { z } from "zod";

import { accountSchema } from "./account.schemas";

export type IAccount = z.infer<typeof accountSchema>;

export interface AccountRow {
  username: string;
  displayName: string;
  avatar: string;
  mcpEnabled: number;
  mcpKey: string;
}

export interface IAccountModels {
  getAccount: () => Promise<IAccount | null>;
  saveAccount: (account: IAccount) => Promise<IAccount>;
}
