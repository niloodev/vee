import { buildGamesDashboard } from "@/modules/games/dashboard/gamesDashboard";
import { useApp } from "@/modules/shell/store/appSlice";

export function useGamesDashboard() {
  const { items } = useApp();

  return buildGamesDashboard(items.data);
}
