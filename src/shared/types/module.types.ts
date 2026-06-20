import type { ComponentType } from "react";

import type { IconName } from "@/shared/components/atoms/Icon/Icon.types";

export type DomainId = "media" | "games";

export interface ModuleNavItem {
  id: string;
  label: string;
  icon: IconName;
  accentColor?: string;
}

export interface ModuleNavSection {
  label?: string;
  items: ModuleNavItem[];
}

export interface ModulePageProps {
  activeTabId: string;
}

export interface ModuleDescriptor {
  id: string;
  label: string;
  icon: IconName;
  domain: DomainId;
  nav: ModuleNavSection[];
  defaultTabId: string;
  Page: ComponentType<ModulePageProps>;
}
