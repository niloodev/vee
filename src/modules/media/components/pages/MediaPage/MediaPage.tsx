import { GridBackground } from "@/shared/components/molecules";
import type { ModulePageProps } from "@/shared/types";

import { useMediaPage } from "./MediaPage.hook";

export function MediaPage({ activeTabId }: ModulePageProps) {
  const { tabLabel } = useMediaPage(activeTabId);

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <GridBackground />
      <main className="relative flex flex-1 flex-col gap-4 p-12">
        <h1 className="text-2xl font-semibold tracking-tight">Media</h1>
        <p className="text-text-body">{tabLabel}</p>
      </main>
    </div>
  );
}
