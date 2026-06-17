import type { StateCreator } from "zustand";

import type { AppStore } from "@/modules/shell/store/appSlice";

import { defaultAccountState } from "./accountSlice.constants";
import type { AccountSlice } from "./accountSlice.types";

export const createAccountSlice: StateCreator<
  AppStore,
  [],
  [],
  AccountSlice
> = (set) => ({
  ...defaultAccountState,
  setAccount: (data) => set(() => ({ account: { status: "ready", data } })),
  setAccountStatus: (status) =>
    set((state) => ({ account: { ...state.account, status } })),
});
