import type { StateCreator } from "zustand";

import { shellModules } from "@/modules/shell/shell.config";
import type { AppStore } from "@/modules/shell/store/appSlice";

import type { NavSlice } from "./navSlice.types";

export const createNavSlice: StateCreator<AppStore, [], [], NavSlice> = (
  set,
) => ({
  nav: {
    activeModuleId: shellModules[0].id,
    activeTabId: shellModules[0].defaultTabId,
  },
  setActiveModule: (moduleId, defaultTabId) =>
    set(() => ({ nav: { activeModuleId: moduleId, activeTabId: defaultTabId } })),
  setActiveTab: (tabId) =>
    set((state) => ({ nav: { ...state.nav, activeTabId: tabId } })),
});
