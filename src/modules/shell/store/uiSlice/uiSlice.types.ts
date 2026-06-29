export interface UiState {
  ui: {
    accountModalOpen: boolean;
    replayWelcome: boolean;
  };
}

export interface UiActions {
  openAccountModal: () => void;
  closeAccountModal: () => void;
  setReplayWelcome: (value: boolean) => void;
}

export type UiSlice = UiState & UiActions;
