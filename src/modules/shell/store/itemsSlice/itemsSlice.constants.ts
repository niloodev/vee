import type { ItemsState } from "./itemsSlice.types";

export const defaultItemsState: ItemsState = {
  items: {
    status: "loading",
    data: [],
  },
};
