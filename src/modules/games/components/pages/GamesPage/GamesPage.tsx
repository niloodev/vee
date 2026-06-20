import { GridBackground } from "@/shared/components/molecules";
import type { ModulePageProps } from "@/shared/types";

import { useGamesPage } from "./GamesPage.hook";

export function GamesPage({ activeTabId }: ModulePageProps) {
  const { tabLabel } = useGamesPage(activeTabId);

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <GridBackground />
      <main className="relative flex flex-1 flex-col gap-4 p-12">
        <h1 className="text-2xl font-semibold tracking-tight">Games</h1>
        <p className="text-text-body">{tabLabel}</p>
      </main>
    </div>
  );
}
