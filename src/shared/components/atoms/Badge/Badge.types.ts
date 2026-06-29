export type BadgeStatus =
  | "watching"
  | "backlog"
  | "completed"
  | "dropped"
  | "installed"
  | "archived";

export interface BadgeProps {
  status: BadgeStatus;
  solid?: boolean;
}
