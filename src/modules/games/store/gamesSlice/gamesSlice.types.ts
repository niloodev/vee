import type { LoadStatus } from "@/shared/types";

export interface GamesState {
  games: {
    status: LoadStatus;
  };
}

export interface GamesActions {
  setGamesStatus: (status: LoadStatus) => void;
}

export type GamesSlice = GamesState & GamesActions;
