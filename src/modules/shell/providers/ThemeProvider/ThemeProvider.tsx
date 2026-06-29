"use client";

import { useThemeProvider } from "./ThemeProvider.hook";
import type { ThemeProviderProps } from "./ThemeProvider.types";

export function ThemeProvider({ children }: ThemeProviderProps) {
  useThemeProvider();

  return <>{children}</>;
}
