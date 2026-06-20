import type { ModuleNavSection } from "@/shared/types";

export const mediaNav: ModuleNavSection[] = [
  {
    items: [
      { id: "library", label: "Library", icon: "grid" },
      { id: "watching", label: "Watching", icon: "play" },
      { id: "backlog", label: "Backlog", icon: "bookmark" },
      { id: "completed", label: "Completed", icon: "check" },
      { id: "archived", label: "Archived", icon: "archive" },
    ],
  },
  {
    label: "Types",
    items: [
      { id: "series", label: "Series", icon: "tv", accentColor: "var(--vee-media)" },
      { id: "film", label: "Film", icon: "film", accentColor: "var(--vee-cyan)" },
      { id: "podcast", label: "Podcast", icon: "mic", accentColor: "var(--vee-magenta)" },
      { id: "video-series", label: "Video series", icon: "layers", accentColor: "var(--vee-amber)" },
    ],
  },
];
