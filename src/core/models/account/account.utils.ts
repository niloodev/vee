import { AccountRow, IAccount } from "./account.types";

export const toAccount = (row: AccountRow): IAccount => ({
  username: row.username,
  displayName: row.displayName,
  avatar: row.avatar,
  defaultGameDir: row.defaultGameDir,
  defaultRomDir: row.defaultRomDir,
  defaultEmulator: row.defaultEmulator,
  mcpEnabled: row.mcpEnabled === 1,
  mcpKey: row.mcpKey,
});
