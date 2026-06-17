import { AccountRow, IAccount } from "./account.types";

export const toAccount = (row: AccountRow): IAccount => ({
  username: row.username,
  displayName: row.displayName,
  avatar: row.avatar,
  mcpEnabled: row.mcpEnabled === 1,
  mcpKey: row.mcpKey,
});
