import { buildMediaDashboard } from "@/modules/media/dashboard/mediaDashboard";
import { useApp } from "@/modules/shell/store/appSlice";

export function useMediaDashboard() {
  const { items } = useApp();

  return buildMediaDashboard(items.data);
}
