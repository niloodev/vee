"use client";

import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";

import { createAppStore } from "./appSlice";
import type {
  AppStore,
  AppStoreApi,
  AppStoreProviderProps,
} from "./appSlice.types";

const AppStoreContext = createContext<AppStoreApi | undefined>(undefined);

export function AppStoreProvider({ children }: AppStoreProviderProps) {
  const [store] = useState<AppStoreApi>(() => createAppStore());

  return (
    <AppStoreContext.Provider value={store}>
      {children}
    </AppStoreContext.Provider>
  );
}

export function useApp(): AppStore {
  const store = useContext(AppStoreContext);
  if (!store) throw new Error("useApp must be used within an AppStoreProvider");
  return useStore(store);
}
