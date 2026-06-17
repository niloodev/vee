import type { ReactNode } from "react";

import type { AccountSlice } from "@/modules/account/store/accountSlice";
import type { GamesSlice } from "@/modules/games/store/gamesSlice";
import type { MediaSlice } from "@/modules/media/store/mediaSlice";

import type { createAppStore } from "./appSlice";

export type AppStore = AccountSlice & GamesSlice & MediaSlice;

export type AppStoreApi = ReturnType<typeof createAppStore>;

export interface AppStoreProviderProps {
  children: ReactNode;
}
