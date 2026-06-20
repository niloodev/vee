import type { IconName } from "@/shared/components/atoms";

export interface SegmentedItem {
  id: string;
  label: string;
  icon?: IconName;
  accentColor?: string;
}

export interface SegmentedControlProps {
  items: SegmentedItem[];
  activeId: string;
  onSelect: (id: string) => void;
}
