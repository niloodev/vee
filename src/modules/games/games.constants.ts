import type { ModuleNavSection } from "@/shared/types";

export const gamesNav: ModuleNavSection[] = [
  {
    items: [
      { id: "library", label: "Library", icon: "grid" },
      { id: "installed", label: "Installed", icon: "hardDrive" },
      { id: "archived", label: "Archived", icon: "archive" },
    ],
  },
  {
    label: "Types",
    items: [
      { id: "native", label: "Native", icon: "monitor", accentColor: "var(--vee-games)" },
      { id: "emulated", label: "Emulated", icon: "cpu", accentColor: "var(--vee-amber)" },
    ],
  },
];
