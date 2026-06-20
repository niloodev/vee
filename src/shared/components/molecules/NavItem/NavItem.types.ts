import type { ModuleNavItem } from "@/shared/types";

export interface NavItemProps {
  item: ModuleNavItem;
  active: boolean;
  onSelect: (id: string) => void;
}
