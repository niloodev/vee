import type { ModuleDescriptor } from "@/shared/types";

import { GamesPage } from "./components/pages";
import { gamesNav } from "./games.constants";

export const gamesModule: ModuleDescriptor = {
  id: "games",
  label: "Games",
  icon: "gamepad",
  domain: "games",
  defaultTabId: "library",
  Page: GamesPage,
  nav: gamesNav,
};
