import { ControllerResult } from "@/core/controllers/controllers.types";
import { IItem } from "@/core/models/items";

import { itemErrors } from "./items.errors";

type ItemErrorKey = keyof typeof itemErrors;
export type ItemError = (typeof itemErrors)[ItemErrorKey];

export interface IItemController {
  getItems: () => Promise<ControllerResult<IItem[], ItemError>>;
  getItem: (id: number) => Promise<ControllerResult<IItem, ItemError>>;
  createItem: (item: IItem) => Promise<ControllerResult<IItem, ItemError>>;
  updateItem: (item: IItem) => Promise<ControllerResult<IItem, ItemError>>;
  deleteItem: (id: number) => Promise<ControllerResult<number, ItemError>>;
}
