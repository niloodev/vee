export type BootDomain = "media" | "games";

export interface BootLine {
  label: string;
  dots?: string;
  ok?: boolean;
  ready?: boolean;
  domain: BootDomain;
}

export interface BootScreenProps {
  onExit?: () => void;
  onDone?: () => void;
}
