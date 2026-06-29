import { z } from "zod";

import { gameItemSchema, itemSchema, mediaItemSchema } from "./items.schemas";

export type IItem = z.infer<typeof itemSchema>;
export type IMediaItem = z.infer<typeof mediaItemSchema>;
export type IGameItem = z.infer<typeof gameItemSchema>;

export interface ItemRow {
  id: number;
  domain: string;
  title: string;
  rating: number;
  year: number | null;
  genres: string;
  notes: string;
  cover: string;
  type: string | null;
  status: string | null;
  value: number | null;
  total: number | null;
  unit: string | null;
  epMinute: number | null;
  epDuration: number | null;
  subtitle: string | null;
  synopsis: string | null;
  gameType: string | null;
  platform: string | null;
  developer: string | null;
  publisher: string | null;
  playtime: number | null;
  lastPlayed: string | null;
  installSize: number | null;
  installDir: string | null;
  launcher: string | null;
  icon: string | null;
  description: string | null;
  prevStatus: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface IItemModels {
  getItems: () => Promise<IItem[]>;
  getItem: (id: number) => Promise<IItem | null>;
  createItem: (item: IItem) => Promise<IItem>;
  updateItem: (item: IItem) => Promise<IItem>;
  deleteItem: (id: number) => Promise<void>;
}
