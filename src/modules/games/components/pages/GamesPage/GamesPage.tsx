"use client";

import { GridBackground } from "@/shared/components/molecules";
import { DashboardView } from "@/shared/components/organisms";
import type { ModulePageProps } from "@/shared/types";

import { useGamesDashboard } from "./GamesPage.hook";

export function GamesPage({ activeTabId }: ModulePageProps) {
  const dashboard = useGamesDashboard();

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <GridBackground />
      {activeTabId === "library" ? (
        <DashboardView {...dashboard} />
      ) : (
        <main className="relative flex flex-1 flex-col items-center justify-center gap-2 p-12">
          <p className="font-pixel text-[28px] capitalize text-text-dim">
            {activeTabId}
          </p>
          <p className="text-[13px] text-text-faint">Em breve.</p>
        </main>
      )}
    </div>
  );
}
