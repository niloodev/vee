import type { BadgeStatus, IconName } from "@/shared/components/atoms";

export interface StatDef {
  icon: IconName;
  label: string;
  value: string | number;
  unit?: string;
  accent: string;
  bars: number[];
}

export interface TypeChip {
  icon?: IconName;
  glyph?: string;
  color: string;
}

export interface CardProgress {
  value: number;
  total: number;
  unit: string;
  pct: number;
}

export interface IconChip {
  src?: string;
  initials: string;
}

export interface CardModel {
  id: number;
  kind: "media" | "games";
  title: string;
  cover?: string;
  initials: string;
  status: BadgeStatus;
  typeChip: TypeChip;
  rating: number;
  subtitle?: string;
  meta?: string;
  progress?: CardProgress;
  iconChip?: IconChip;
  ready?: boolean;
}

export interface FeaturedModel {
  id: number;
  title: string;
  cover?: string;
  initials: string;
  accent: string;
  eyebrowIcon?: IconName;
  eyebrowLabel: string;
  caption?: string;
  progress?: CardProgress;
  iconChip?: IconChip;
  meta?: { genres?: string; lastPlayed?: string };
  actionLabel: string;
  actionIcon?: IconName;
}

export interface DashboardFeatured {
  title: string;
  icon: IconName;
  items: FeaturedModel[];
}

export interface DashboardViewProps {
  eyebrow: string;
  heading: string;
  subtitle: string;
  stats: StatDef[];
  featured?: DashboardFeatured;
  gridTitle: string;
  cards: CardModel[];
  emptyLabel: string;
  emptyHint: string;
}
