import { getDatabase } from "@/core/services/database";

import { AccountRow, IAccountModels } from "./account.types";
import { toAccount } from "./account.utils";

const getAccount: IAccountModels["getAccount"] = async () => {
  const database = await getDatabase();
  const rows = await database.select<AccountRow[]>(
    "SELECT username, displayName, avatar, mediaColor, gamesColor, mcpEnabled, mcpKey FROM account WHERE id = 1",
  );
  return rows.length > 0 ? toAccount(rows[0]) : null;
};

const saveAccount: IAccountModels["saveAccount"] = async (account) => {
  const database = await getDatabase();
  await database.execute(
    `INSERT INTO account (id, username, displayName, avatar, mediaColor, gamesColor, mcpEnabled, mcpKey)
     VALUES (1, $1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT(id) DO UPDATE SET
       username = excluded.username,
       displayName = excluded.displayName,
       avatar = excluded.avatar,
       mediaColor = excluded.mediaColor,
       gamesColor = excluded.gamesColor,
       mcpEnabled = excluded.mcpEnabled,
       mcpKey = excluded.mcpKey`,
    [
      account.username,
      account.displayName,
      account.avatar,
      account.mediaColor,
      account.gamesColor,
      account.mcpEnabled ? 1 : 0,
      account.mcpKey,
    ],
  );
  return account;
};

export const accountModels: IAccountModels = { getAccount, saveAccount };

export { getAccount, saveAccount };
