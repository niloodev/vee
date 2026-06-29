import { IGameItem, IItem, IMediaItem, ItemRow } from "./items.types";

export const ITEM_COLUMNS = [
  "domain",
  "title",
  "rating",
  "year",
  "genres",
  "notes",
  "cover",
  "type",
  "status",
  "value",
  "total",
  "unit",
  "epMinute",
  "epDuration",
  "subtitle",
  "synopsis",
  "gameType",
  "platform",
  "developer",
  "publisher",
  "playtime",
  "lastPlayed",
  "installSize",
  "installDir",
  "launcher",
  "icon",
  "description",
  "prevStatus",
  "createdAt",
  "updatedAt",
] as const;

const parseGenres = (raw: string): string[] => {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const toItem = (row: ItemRow): IItem => {
  const base = {
    id: row.id,
    title: row.title,
    rating: row.rating,
    year: row.year ?? undefined,
    genres: parseGenres(row.genres),
    notes: row.notes,
    cover: row.cover,
    createdAt: row.createdAt ?? undefined,
    updatedAt: row.updatedAt ?? undefined,
  };

  if (row.domain === "games") {
    return {
      ...base,
      domain: "games",
      status: (row.status ?? "installed") as IGameItem["status"],
      gameType: (row.gameType ?? "Native") as IGameItem["gameType"],
      platform: row.platform ?? "",
      developer: row.developer ?? "",
      publisher: row.publisher ?? "",
      playtime: row.playtime ?? 0,
      lastPlayed: row.lastPlayed ?? "",
      installSize: row.installSize ?? 0,
      installDir: row.installDir ?? "",
      launcher: row.launcher ?? "",
      icon: row.icon ?? "",
      description: row.description ?? "",
      prevStatus: (row.prevStatus ?? undefined) as IGameItem["prevStatus"],
    };
  }

  return {
    ...base,
    domain: "media",
    type: (row.type ?? "Series") as IMediaItem["type"],
    status: (row.status ?? "backlog") as IMediaItem["status"],
    value: row.value ?? 0,
    total: row.total ?? 0,
    unit: (row.unit ?? "eps") as IMediaItem["unit"],
    epMinute: row.epMinute ?? 0,
    epDuration: row.epDuration ?? 0,
    subtitle: row.subtitle ?? "",
    synopsis: row.synopsis ?? "",
    prevStatus: (row.prevStatus ?? undefined) as IMediaItem["prevStatus"],
  };
};

export const toRowValues = (item: IItem): unknown[] => {
  const media = item.domain === "media" ? item : null;
  const game = item.domain === "games" ? item : null;

  return [
    item.domain,
    item.title,
    item.rating,
    item.year ?? null,
    JSON.stringify(item.genres),
    item.notes,
    item.cover,
    media?.type ?? null,
    item.status,
    media?.value ?? null,
    media?.total ?? null,
    media?.unit ?? null,
    media?.epMinute ?? null,
    media?.epDuration ?? null,
    media?.subtitle ?? null,
    media?.synopsis ?? null,
    game?.gameType ?? null,
    game?.platform ?? null,
    game?.developer ?? null,
    game?.publisher ?? null,
    game?.playtime ?? null,
    game?.lastPlayed ?? null,
    game?.installSize ?? null,
    game?.installDir ?? null,
    game?.launcher ?? null,
    game?.icon ?? null,
    game?.description ?? null,
    item.prevStatus ?? null,
    item.createdAt ?? null,
    item.updatedAt ?? null,
  ];
};
