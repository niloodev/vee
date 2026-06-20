import { shellModules } from "@/modules/shell/shell.config";

import type { NavState } from "./navSlice.types";

export const defaultNavState: NavState = {
  nav: {
    activeModuleId: shellModules[0].id,
    activeTabId: shellModules[0].defaultTabId,
  },
};
