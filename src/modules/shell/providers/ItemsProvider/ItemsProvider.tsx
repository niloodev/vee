"use client";

import { useItemsProvider } from "./ItemsProvider.hook";
import type { ItemsProviderProps } from "./ItemsProvider.types";

export function ItemsProvider({ children }: ItemsProviderProps) {
  useItemsProvider();

  return <>{children}</>;
}
