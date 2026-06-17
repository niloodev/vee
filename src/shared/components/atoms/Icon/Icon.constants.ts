import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Folder,
  HardDrive,
  Info,
  Settings,
  StickyNote,
  Terminal,
  TriangleAlert,
  Upload,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const ICONS = {
  note: StickyNote,
  terminal: Terminal,
  folder: Folder,
  hardDrive: HardDrive,
  settings: Settings,
  upload: Upload,
  x: X,
  check: Check,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  triangleAlert: TriangleAlert,
  info: Info,
} satisfies Record<string, LucideIcon>;
