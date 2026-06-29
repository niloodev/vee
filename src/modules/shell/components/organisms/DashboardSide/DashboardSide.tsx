"use client";

import {
  Logo,
  NavList,
  ProfileCard,
  SegmentedControl,
} from "@/shared/components/molecules";

import { useDashboardSide } from "./DashboardSide.hook";

export function DashboardSide() {
  const {
    moduleItems,
    activeModule,
    activeModuleId,
    activeTabId,
    accountName,
    accountUsername,
    openAccountModal,
    selectModule,
    selectTab,
  } = useDashboardSide();

  return (
    <aside className="flex h-full min-h-0 w-[248px] flex-none flex-col border-r border-border-default bg-surface-card font-mono">
      <div className="border-b border-border-default px-4 py-3.5">
        <Logo size={20} />
      </div>
      <div className="px-3 pt-3">
        <SegmentedControl
          items={moduleItems}
          activeId={activeModuleId}
          onSelect={selectModule}
        />
      </div>
      <NavList
        sections={activeModule.nav}
        activeId={activeTabId}
        onSelect={selectTab}
      />
      <ProfileCard
        name={accountName}
        username={accountUsername}
        onOpenSettings={openAccountModal}
      />
    </aside>
  );
}
