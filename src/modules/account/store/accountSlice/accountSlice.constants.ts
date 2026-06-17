import type { AccountState } from "./accountSlice.types";

export const defaultAccountState: AccountState = {
  account: {
    status: "loading",
    data: null,
  },
};
