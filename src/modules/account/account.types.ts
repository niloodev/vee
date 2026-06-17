import type { IAccount } from "@/core/models/account";

export type AccountDraft = Pick<
  IAccount,
  "username" | "displayName" | "avatar"
>;
