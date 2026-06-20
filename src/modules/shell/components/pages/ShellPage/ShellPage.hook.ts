import { useActiveModule } from "@/modules/shell/hooks/useActiveModule";

export function useShellPage() {
  const { activeModule, activeTabId } = useActiveModule();

  return { activeModule, activeTabId };
}
