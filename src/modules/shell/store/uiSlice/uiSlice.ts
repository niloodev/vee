import type { StateCreator } from "zustand";

import type { AppStore } from "@/modules/shell/store/appSlice";

import type { UiSlice } from "./uiSlice.types";

export const createUiSlice: StateCreator<AppStore, [], [], UiSlice> = (set) => ({
  ui: {
    accountModalOpen: false,
    replayWelcome: false,
  },
  openAccountModal: () =>
    set((state) => ({ ui: { ...state.ui, accountModalOpen: true } })),
  closeAccountModal: () =>
    set((state) => ({ ui: { ...state.ui, accountModalOpen: false } })),
  setReplayWelcome: (value) =>
    set((state) => ({ ui: { ...state.ui, replayWelcome: value } })),
});
