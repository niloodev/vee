import type { StateCreator } from "zustand";

import type { AppStore } from "@/modules/shell/store/appSlice";

import { defaultItemsState } from "./itemsSlice.constants";
import type { ItemsSlice } from "./itemsSlice.types";

export const createItemsSlice: StateCreator<AppStore, [], [], ItemsSlice> = (
  set,
) => ({
  ...defaultItemsState,
  setItems: (data) => set(() => ({ items: { status: "ready", data } })),
  setItemsStatus: (status) =>
    set((state) => ({ items: { ...state.items, status } })),
  upsertItem: (item) =>
    set((state) => {
      const exists = state.items.data.some((current) => current.id === item.id);
      const data = exists
        ? state.items.data.map((current) =>
            current.id === item.id ? item : current,
          )
        : [item, ...state.items.data];
      return { items: { ...state.items, data } };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: {
        ...state.items,
        data: state.items.data.filter((current) => current.id !== id),
      },
    })),
});
