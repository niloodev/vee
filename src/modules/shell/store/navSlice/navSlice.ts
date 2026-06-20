import type { StateCreator } from "zustand";

import type { AppStore } from "@/modules/shell/store/appSlice";

import { defaultNavState } from "./navSlice.constants";
import type { NavSlice } from "./navSlice.types";

export const createNavSlice: StateCreator<AppStore, [], [], NavSlice> = (
  set,
) => ({
  ...defaultNavState,
  setActiveModule: (moduleId, defaultTabId) =>
    set(() => ({ nav: { activeModuleId: moduleId, activeTabId: defaultTabId } })),
  setActiveTab: (tabId) =>
    set((state) => ({ nav: { ...state.nav, activeTabId: tabId } })),
});
