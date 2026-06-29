import type { IconName } from "@/shared/components/atoms";

export interface SectionHeadProps {
  icon: IconName;
  title: string;
  count?: number;
  accent?: string;
}
