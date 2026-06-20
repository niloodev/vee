import { mediaNav } from "@/modules/media/media.constants";

export function useMediaPage(activeTabId: string) {
  const tab = mediaNav
    .flatMap((section) => section.items)
    .find((item) => item.id === activeTabId);

  return { tabLabel: tab?.label ?? activeTabId };
}
