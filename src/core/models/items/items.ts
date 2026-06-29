import { getDatabase } from "@/core/services/database";

import { IItemModels, ItemRow } from "./items.types";
import { ITEM_COLUMNS, toItem, toRowValues } from "./items.utils";

const SELECT_COLUMNS = `id, ${ITEM_COLUMNS.join(", ")}`;

const getItems: IItemModels["getItems"] = async () => {
  const database = await getDatabase();
  const rows = await database.select<ItemRow[]>(
    `SELECT ${SELECT_COLUMNS} FROM items ORDER BY id DESC`,
  );
  return rows.map(toItem);
};

const getItem: IItemModels["getItem"] = async (id) => {
  const database = await getDatabase();
  const rows = await database.select<ItemRow[]>(
    `SELECT ${SELECT_COLUMNS} FROM items WHERE id = $1`,
    [id],
  );
  return rows.length > 0 ? toItem(rows[0]) : null;
};

const createItem: IItemModels["createItem"] = async (item) => {
  const database = await getDatabase();
  const placeholders = ITEM_COLUMNS.map((_, index) => `$${index + 1}`).join(", ");
  const result = await database.execute(
    `INSERT INTO items (${ITEM_COLUMNS.join(", ")}) VALUES (${placeholders})`,
    toRowValues(item),
  );
  return { ...item, id: result.lastInsertId };
};

const updateItem: IItemModels["updateItem"] = async (item) => {
  if (item.id == null) throw new Error("Item id is required");
  const database = await getDatabase();
  const assignments = ITEM_COLUMNS.map(
    (column, index) => `${column} = $${index + 1}`,
  ).join(", ");
  await database.execute(
    `UPDATE items SET ${assignments} WHERE id = $${ITEM_COLUMNS.length + 1}`,
    [...toRowValues(item), item.id],
  );
  return item;
};

const deleteItem: IItemModels["deleteItem"] = async (id) => {
  const database = await getDatabase();
  await database.execute("DELETE FROM items WHERE id = $1", [id]);
};

export const itemModels: IItemModels = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};

export { getItems, getItem, createItem, updateItem, deleteItem };
