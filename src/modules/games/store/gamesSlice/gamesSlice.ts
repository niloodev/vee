import type { StateCreator } from "zustand";

import type { AppStore } from "@/modules/shell/store/appSlice";

import { defaultGamesState } from "./gamesSlice.constants";
import type { GamesSlice } from "./gamesSlice.types";

export const createGamesSlice: StateCreator<AppStore, [], [], GamesSlice> = (
  set,
) => ({
  ...defaultGamesState,
  setGamesStatus: (status) =>
    set((state) => ({ games: { ...state.games, status } })),
});
