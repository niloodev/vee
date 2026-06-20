import { useActiveModule } from "@/modules/shell/hooks/useActiveModule";
import { shellModules } from "@/modules/shell/shell.config";
import { useApp } from "@/modules/shell/store/appSlice";
import type { SegmentedItem } from "@/shared/components/molecules";

export function useDashboardSide() {
  const { account, setActiveModule, setActiveTab } = useApp();
  const { activeModule, activeTabId } = useActiveModule();

  const moduleItems: SegmentedItem[] = shellModules.map((module) => ({
    id: module.id,
    label: module.label,
    icon: module.icon,
    accentColor: `var(--vee-${module.domain})`,
  }));

  const selectModule = (moduleId: string) => {
    const target = shellModules.find((module) => module.id === moduleId);
    if (target) setActiveModule(target.id, target.defaultTabId);
  };

  return {
    moduleItems,
    activeModule,
    activeModuleId: activeModule.id,
    activeTabId,
    accountName: account.data?.displayName ?? "Guest",
    selectModule,
    selectTab: setActiveTab,
  };
}
