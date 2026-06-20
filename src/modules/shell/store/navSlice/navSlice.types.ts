export interface NavState {
  nav: {
    activeModuleId: string;
    activeTabId: string;
  };
}

export interface NavActions {
  setActiveModule: (moduleId: string, defaultTabId: string) => void;
  setActiveTab: (tabId: string) => void;
}

export type NavSlice = NavState & NavActions;
