import type { ModuleNavSection } from "@/shared/types";

export interface NavListProps {
  sections: ModuleNavSection[];
  activeId: string;
  onSelect: (id: string) => void;
}
