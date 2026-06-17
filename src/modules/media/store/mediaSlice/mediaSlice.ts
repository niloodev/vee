import type { StateCreator } from "zustand";

import type { AppStore } from "@/modules/shell/store/appSlice";

import { defaultMediaState } from "./mediaSlice.constants";
import type { MediaSlice } from "./mediaSlice.types";

export const createMediaSlice: StateCreator<AppStore, [], [], MediaSlice> = (
  set,
) => ({
  ...defaultMediaState,
  setMediaStatus: (status) =>
    set((state) => ({ media: { ...state.media, status } })),
});
