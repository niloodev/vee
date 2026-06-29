import type { IAccount } from "@/core/models/account";

import type { AccountTabDef } from "./AccountModal.types";

export const ACCOUNT_TABS: AccountTabDef[] = [
  { id: "profile", label: "Profile", icon: "settings" },
  { id: "theme", label: "Theme", icon: "layers" },
  { id: "mcp", label: "MCP", icon: "terminal" },
  { id: "data", label: "Data", icon: "folder" },
];

export const MEDIA_PRESETS = [
  "#4ee98a",
  "#6bffa3",
  "#5cc8e8",
  "#f5c451",
  "#e16bd0",
  "#ff6b6b",
];

export const GAMES_PRESETS = [
  "#4d8bff",
  "#7aa8ff",
  "#a06bff",
  "#5cc8e8",
  "#4ee98a",
  "#e16bd0",
];

export const MCP_ENDPOINT = "localhost:2215/mcp";
export const STORAGE_PATH = "%APPDATA%\\com.vee.app\\vee.db";

export const EMPTY_ACCOUNT: IAccount = {
  username: "",
  displayName: "",
  avatar: "",
  mediaColor: "",
  gamesColor: "",
  mcpEnabled: false,
  mcpKey: "",
};
