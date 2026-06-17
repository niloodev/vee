import type { LoadStatus } from "@/shared/types";

export interface MediaState {
  media: {
    status: LoadStatus;
  };
}

export interface MediaActions {
  setMediaStatus: (status: LoadStatus) => void;
}

export type MediaSlice = MediaState & MediaActions;
