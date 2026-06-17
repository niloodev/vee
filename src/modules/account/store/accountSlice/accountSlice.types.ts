import type { IAccount } from "@/core/models/account";
import type { LoadStatus } from "@/shared/types";

export interface AccountState {
  account: {
    status: LoadStatus;
    data: IAccount | null;
  };
}

export interface AccountActions {
  setAccount: (data: IAccount | null) => void;
  setAccountStatus: (status: LoadStatus) => void;
}

export type AccountSlice = AccountState & AccountActions;
