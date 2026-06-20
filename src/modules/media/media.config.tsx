import type { ModuleDescriptor } from "@/shared/types";

import { MediaPage } from "./components/pages";
import { mediaNav } from "./media.constants";

export const mediaModule: ModuleDescriptor = {
  id: "media",
  label: "Media",
  icon: "play",
  domain: "media",
  defaultTabId: "library",
  Page: MediaPage,
  nav: mediaNav,
};
