import {
  createItem as createItemModel,
  deleteItem as deleteItemModel,
  getItem as getItemModel,
  getItems as getItemsModel,
  itemSchema,
  updateItem as updateItemModel,
} from "@/core/models/items";

import { itemErrors } from "./items.errors";
import { IItemController } from "./items.types";

export const getItems: IItemController["getItems"] = async () => {
  try {
    const items = await getItemsModel();
    return { message: "Itens carregados com sucesso", payload: items };
  } catch (error) {
    console.error("getItems failed:", error);
    return { error: itemErrors.itemsNotLoaded };
  }
};

export const getItem: IItemController["getItem"] = async (id) => {
  try {
    const item = await getItemModel(id);
    if (!item) return { error: itemErrors.itemNotFound };
    return { message: "Item carregado com sucesso", payload: item };
  } catch (error) {
    console.error("getItem failed:", error);
    return { error: itemErrors.itemsNotLoaded };
  }
};

export const createItem: IItemController["createItem"] = async (item) => {
  const parsed = itemSchema.safeParse(item);
  if (!parsed.success) return { error: itemErrors.itemNotValid };
  try {
    const saved = await createItemModel(parsed.data);
    return { message: "Item criado com sucesso", payload: saved };
  } catch (error) {
    console.error("createItem failed:", error);
    return { error: itemErrors.itemNotSaved };
  }
};

export const updateItem: IItemController["updateItem"] = async (item) => {
  const parsed = itemSchema.safeParse(item);
  if (!parsed.success) return { error: itemErrors.itemNotValid };
  try {
    const saved = await updateItemModel(parsed.data);
    return { message: "Item atualizado com sucesso", payload: saved };
  } catch (error) {
    console.error("updateItem failed:", error);
    return { error: itemErrors.itemNotSaved };
  }
};

export const deleteItem: IItemController["deleteItem"] = async (id) => {
  try {
    await deleteItemModel(id);
    return { message: "Item removido com sucesso", payload: id };
  } catch (error) {
    console.error("deleteItem failed:", error);
    return { error: itemErrors.itemNotDeleted };
  }
};
