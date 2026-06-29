import { createStore } from "zustand";

import { createAccountSlice } from "@/modules/account/store/accountSlice";
import { createGamesSlice } from "@/modules/games/store/gamesSlice";
import { createMediaSlice } from "@/modules/media/store/mediaSlice";
import { createNavSlice } from "@/modules/shell/store/navSlice";
import { createItemsSlice } from "@/modules/shell/store/itemsSlice";
import { createUiSlice } from "@/modules/shell/store/uiSlice";

import type { AppStore } from "./appSlice.types";

export const createAppStore = () =>
  createStore<AppStore>()((...args) => ({
    ...createAccountSlice(...args),
    ...createGamesSlice(...args),
    ...createMediaSlice(...args),
    ...createNavSlice(...args),
    ...createItemsSlice(...args),
    ...createUiSlice(...args),
  }));
