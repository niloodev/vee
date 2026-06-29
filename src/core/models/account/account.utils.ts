import { AccountRow, IAccount } from "./account.types";

export const toAccount = (row: AccountRow): IAccount => ({
  username: row.username,
  displayName: row.displayName,
  avatar: row.avatar,
  mediaColor: row.mediaColor,
  gamesColor: row.gamesColor,
  mcpEnabled: row.mcpEnabled === 1,
  mcpKey: row.mcpKey,
});
