import type { ReactNode } from "react";

export type AlertTone = "danger" | "warning" | "success" | "info";

export interface AlertProps {
  tone?: AlertTone;
  children: ReactNode;
}
