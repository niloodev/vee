"use client";

import { DashboardSide } from "@/modules/shell/components/organisms";

import { useShellPage } from "./ShellPage.hook";

export function ShellPage() {
  const { activeModule, activeTabId } = useShellPage();
  const ModulePage = activeModule.Page;

  return (
    <div
      data-domain={activeModule.domain}
      className="flex min-h-0 flex-1 overflow-hidden"
    >
      <DashboardSide />
      <ModulePage activeTabId={activeTabId} />
    </div>
  );
}
