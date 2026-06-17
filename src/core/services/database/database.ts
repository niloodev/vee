import Database from "@tauri-apps/plugin-sql";

import { DATABASE_NAME } from "./database.constants";

let connection: Promise<Database> | null = null;

export const getDatabase = () => {
  if (!connection) connection = Database.load(DATABASE_NAME);
  return connection;
};
