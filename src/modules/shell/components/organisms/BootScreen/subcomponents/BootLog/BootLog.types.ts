import type { BootLine } from "../../BootScreen.types";

export interface BootLogProps {
  lines: BootLine[];
  complete: boolean;
}
