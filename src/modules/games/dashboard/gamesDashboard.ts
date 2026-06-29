import type { IGameItem, IItem } from "@/core/models/items";
import type {
  CardModel,
  DashboardViewProps,
  FeaturedModel,
  StatDef,
} from "@/shared/types";

const initialsOf = (title: string) =>
  title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();

const avgRating = (items: IGameItem[]) => {
  const rated = items.filter((item) => item.rating > 0);
  return rated.length
    ? (rated.reduce((sum, item) => sum + item.rating, 0) / rated.length).toFixed(1)
    : "0.0";
};

const subtitleOf = (item: IGameItem) =>
  [item.gameType, item.platform, item.year]
    .filter((part) => part !== "" && part != null)
    .join(" · ");

const metaOf = (item: IGameItem) =>
  item.genres.slice(0, 2).join(" · ") || item.platform || undefined;

const computeStats = (games: IGameItem[]): StatDef[] => [
  {
    icon: "hardDrive",
    label: "Installed",
    value: games.filter((item) => item.status === "installed").length,
    accent: "var(--vee-games)",
    bars: [3, 5, 4, 6, 4, 7, 5],
  },
  {
    icon: "layers",
    label: "Genres",
    value: new Set(games.flatMap((item) => item.genres)).size,
    accent: "var(--vee-cyan)",
    bars: [2, 4, 3, 5, 6, 4, 8],
  },
  {
    icon: "archive",
    label: "Archived",
    value: games.filter((item) => item.status === "archived").length,
    accent: "var(--vee-magenta)",
    bars: [4, 3, 5, 4, 6, 5, 7],
  },
  {
    icon: "star",
    label: "Avg rating",
    value: avgRating(games),
    unit: "/5",
    accent: "var(--vee-amber)",
    bars: [5, 6, 5, 7, 6, 7, 6],
  },
];

const toCard = (item: IGameItem): CardModel => ({
  id: item.id ?? 0,
  kind: "games",
  title: item.title,
  cover: item.cover || undefined,
  initials: initialsOf(item.title),
  status: item.status,
  typeChip: { icon: "gamepad", color: "var(--vee-games)" },
  rating: item.rating,
  subtitle: subtitleOf(item),
  meta: metaOf(item),
  iconChip: { initials: initialsOf(item.title) },
  ready: item.status === "installed" && Boolean(item.launcher),
});

const toFeatured = (item: IGameItem): FeaturedModel => ({
  id: item.id ?? 0,
  title: item.title,
  cover: item.cover || undefined,
  initials: initialsOf(item.title),
  accent: "var(--vee-games)",
  eyebrowLabel: item.gameType,
  caption: item.platform || undefined,
  iconChip: { initials: initialsOf(item.title) },
  meta: {
    genres: item.genres.slice(0, 2).join(" · ") || item.platform || undefined,
    lastPlayed: item.lastPlayed || undefined,
  },
  actionLabel: "Launch",
  actionIcon: "play",
});

export const buildGamesDashboard = (items: IItem[]): DashboardViewProps => {
  const games = items.filter(
    (item): item is IGameItem => item.domain === "games",
  );
  const grid = games.filter((item) => item.status !== "archived");
  const featured = games.filter((item) => item.status === "installed");

  return {
    eyebrow: "Games · Dashboard",
    heading: "Game Library",
    subtitle: `${grid.length} games in your collection`,
    stats: computeStats(games),
    featured: featured.length
      ? { title: "Recently played", icon: "zap", items: featured.map(toFeatured) }
      : undefined,
    gridTitle: "All games",
    cards: grid.map(toCard),
    emptyLabel: "NO GAMES",
    emptyHint: "Nothing here yet. Add your first game to start tracking.",
  };
};
