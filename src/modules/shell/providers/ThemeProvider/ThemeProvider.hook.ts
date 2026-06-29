"use client";

import { useEffect } from "react";

import { useApp } from "@/modules/shell/store/appSlice";

const applyAccent = (token: "media" | "games", color: string) => {
  const root = document.documentElement.style;
  if (color) root.setProperty(`--vee-${token}`, color);
  else root.removeProperty(`--vee-${token}`);
};

export function useThemeProvider() {
  const { account } = useApp();
  const mediaColor = account.data?.mediaColor ?? "";
  const gamesColor = account.data?.gamesColor ?? "";

  useEffect(() => {
    applyAccent("media", mediaColor);
    applyAccent("games", gamesColor);
  }, [mediaColor, gamesColor]);
}
