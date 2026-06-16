import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface WindowControlButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: "default" | "close";
  children: ReactNode;
}
