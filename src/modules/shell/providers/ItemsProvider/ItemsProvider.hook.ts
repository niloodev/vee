"use client";

import { useEffect } from "react";

import { createItem, getItems } from "@/core/controllers/items";
import { itemsSeed } from "@/core/models/items";
import { useApp } from "@/modules/shell/store/appSlice";

export function useItemsProvider() {
  const { setItems, setItemsStatus } = useApp();

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        let result = await getItems();
        if (!active) return;
        if ("error" in result) {
          setItemsStatus("error");
          return;
        }

        if (result.payload.length === 0) {
          await Promise.all(itemsSeed.map((seed) => createItem(seed)));
          result = await getItems();
          if (!active) return;
          if ("error" in result) {
            setItemsStatus("error");
            return;
          }
        }

        setItems(result.payload);
      } catch {
        if (active) setItemsStatus("error");
      }
    })();

    return () => {
      active = false;
    };
  }, [setItems, setItemsStatus]);
}
