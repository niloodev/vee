import { gamesNav } from "@/modules/games/games.constants";

export function useGamesPage(activeTabId: string) {
  const tab = gamesNav
    .flatMap((section) => section.items)
    .find((item) => item.id === activeTabId);

  return { tabLabel: tab?.label ?? activeTabId };
}
