import type { IItem, IMediaItem } from "@/core/models/items";
import type { IconName } from "@/shared/components/atoms";
import type {
  CardModel,
  CardProgress,
  DashboardViewProps,
  FeaturedModel,
  StatDef,
  TypeChip,
} from "@/shared/types";

const TYPE_CHIP: Record<IMediaItem["type"], { icon: IconName; color: string }> = {
  Series: { icon: "tv", color: "var(--vee-media)" },
  Film: { icon: "film", color: "var(--vee-cyan)" },
  Podcast: { icon: "mic", color: "var(--vee-magenta)" },
  "Video series": { icon: "layers", color: "var(--vee-amber)" },
};

const initialsOf = (title: string) =>
  title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();

const avgRating = (items: IMediaItem[]) => {
  const rated = items.filter((item) => item.rating > 0);
  return rated.length
    ? (rated.reduce((sum, item) => sum + item.rating, 0) / rated.length).toFixed(1)
    : "0.0";
};

const progressOf = (item: IMediaItem): CardProgress | undefined =>
  item.total > 0
    ? {
        value: item.value,
        total: item.total,
        unit: item.unit,
        pct: Math.min(100, Math.round((item.value / item.total) * 100)),
      }
    : undefined;

const computeStats = (media: IMediaItem[]): StatDef[] => [
  {
    icon: "play",
    label: "Now watching",
    value: media.filter((item) => item.status === "watching").length,
    accent: "var(--vee-media)",
    bars: [3, 5, 4, 6, 4, 7, 5],
  },
  {
    icon: "clock",
    label: "Hours this month",
    value: 148,
    unit: "h",
    accent: "var(--vee-cyan)",
    bars: [2, 4, 3, 5, 6, 4, 8],
  },
  {
    icon: "check",
    label: "Completed",
    value: media.filter((item) => item.status === "completed").length,
    accent: "var(--vee-magenta)",
    bars: [4, 3, 5, 4, 6, 5, 7],
  },
  {
    icon: "star",
    label: "Avg rating",
    value: avgRating(media),
    unit: "/5",
    accent: "var(--vee-amber)",
    bars: [5, 6, 5, 7, 6, 7, 6],
  },
];

const toCard = (item: IMediaItem): CardModel => {
  const chip: TypeChip = TYPE_CHIP[item.type];
  return {
    id: item.id ?? 0,
    kind: "media",
    title: item.title,
    cover: item.cover || undefined,
    initials: initialsOf(item.title),
    status: item.status,
    typeChip: chip,
    rating: item.rating,
    subtitle: item.subtitle || undefined,
    progress: progressOf(item),
  };
};

const toFeatured = (item: IMediaItem): FeaturedModel => ({
  id: item.id ?? 0,
  title: item.title,
  cover: item.cover || undefined,
  initials: initialsOf(item.title),
  accent: TYPE_CHIP[item.type].color,
  eyebrowIcon: TYPE_CHIP[item.type].icon,
  eyebrowLabel: item.type,
  caption: item.subtitle || undefined,
  progress: progressOf(item),
  actionLabel: "Resume",
  actionIcon: "play",
});

export const buildMediaDashboard = (items: IItem[]): DashboardViewProps => {
  const media = items.filter(
    (item): item is IMediaItem => item.domain === "media",
  );
  const grid = media.filter((item) => item.status !== "archived");
  const featured = media.filter((item) => item.status === "watching");

  return {
    eyebrow: "Media · Dashboard",
    heading: "The Library",
    subtitle: `${grid.length} titles in your library`,
    stats: computeStats(media),
    featured: featured.length
      ? { title: "Continue watching", icon: "zap", items: featured.map(toFeatured) }
      : undefined,
    gridTitle: "All titles",
    cards: grid.map(toCard),
    emptyLabel: "NO TITLES",
    emptyHint: "Nothing here yet. Add your first title to start tracking.",
  };
};
