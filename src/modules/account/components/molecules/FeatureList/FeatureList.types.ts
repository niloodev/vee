import type { IconName } from "@/shared/components/atoms";

export interface FeatureItem {
  icon: IconName;
  text: string;
}

export interface FeatureListProps {
  items: FeatureItem[];
}
