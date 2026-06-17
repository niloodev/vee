"use client";

import { useEffect } from "react";

import { accountErrors, getAccount } from "@/core/controllers/account";
import { useApp } from "@/modules/shell/store/appSlice";

export function useAccountProvider() {
  const { setAccount, setAccountStatus } = useApp();

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const result = await getAccount();
        if (!active) return;

        if ("error" in result) {
          if (result.error === accountErrors.accountNotFound) {
            setAccount(null);
          } else {
            setAccountStatus("error");
          }
          return;
        }

        setAccount(result.payload);
      } catch {
        if (active) setAccountStatus("error");
      }
    })();

    return () => {
      active = false;
    };
  }, [setAccount, setAccountStatus]);
}
