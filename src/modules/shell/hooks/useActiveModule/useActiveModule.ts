import { shellModules } from "@/modules/shell/shell.config";
import { useApp } from "@/modules/shell/store/appSlice";

export function useActiveModule() {
  const { nav } = useApp();

  const activeModule =
    shellModules.find((module) => module.id === nav.activeModuleId) ??
    shellModules[0];

  return { activeModule, activeTabId: nav.activeTabId };
}
