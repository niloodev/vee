import { z } from "zod";

export const MEDIA_STATUSES = [
  "watching",
  "backlog",
  "completed",
  "dropped",
  "archived",
] as const;
export const GAME_STATUSES = ["installed", "archived"] as const;
export const MEDIA_TYPES = ["Series", "Film", "Podcast", "Video series"] as const;
export const GAME_TYPES = ["Native", "Emulated"] as const;
export const MEDIA_UNITS = ["eps", "videos", "min"] as const;

const baseFields = {
  id: z.number().optional(),
  title: z.string().min(1, "Título é obrigatório"),
  rating: z.number().min(0).max(5).default(0),
  year: z.number().optional(),
  genres: z.array(z.string()).default([]),
  notes: z.string().default(""),
  cover: z.string().default(""),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
};

export const mediaItemSchema = z.object({
  ...baseFields,
  domain: z.literal("media"),
  type: z.enum(MEDIA_TYPES),
  status: z.enum(MEDIA_STATUSES),
  value: z.number().default(0),
  total: z.number().default(0),
  unit: z.enum(MEDIA_UNITS).default("eps"),
  epMinute: z.number().default(0),
  epDuration: z.number().default(0),
  subtitle: z.string().default(""),
  synopsis: z.string().default(""),
  prevStatus: z.enum(MEDIA_STATUSES).optional(),
});

export const gameItemSchema = z.object({
  ...baseFields,
  domain: z.literal("games"),
  status: z.enum(GAME_STATUSES),
  gameType: z.enum(GAME_TYPES),
  platform: z.string().default(""),
  developer: z.string().default(""),
  publisher: z.string().default(""),
  playtime: z.number().default(0),
  lastPlayed: z.string().default(""),
  installSize: z.number().default(0),
  installDir: z.string().default(""),
  launcher: z.string().default(""),
  icon: z.string().default(""),
  description: z.string().default(""),
  prevStatus: z.enum(GAME_STATUSES).optional(),
});

export const itemSchema = z.discriminatedUnion("domain", [
  mediaItemSchema,
  gameItemSchema,
]);
