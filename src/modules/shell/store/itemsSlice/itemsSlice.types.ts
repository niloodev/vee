import type { IItem } from "@/core/models/items";
import type { LoadStatus } from "@/shared/types";

export interface ItemsState {
  items: {
    status: LoadStatus;
    data: IItem[];
  };
}

export interface ItemsActions {
  setItems: (data: IItem[]) => void;
  setItemsStatus: (status: LoadStatus) => void;
  upsertItem: (item: IItem) => void;
  removeItem: (id: number) => void;
}

export type ItemsSlice = ItemsState & ItemsActions;
