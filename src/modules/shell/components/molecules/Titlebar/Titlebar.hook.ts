"use client";

import { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";

import { useActiveModule } from "@/modules/shell/hooks/useActiveModule";

export function useTitlebar() {
  const [isMaximized, setIsMaximized] = useState(false);
  const { activeModule, activeTabId } = useActiveModule();

  useEffect(() => {
    const appWindow = getCurrentWindow();

    appWindow.isMaximized().then(setIsMaximized);

    const unlisten = appWindow.onResized(() => {
      appWindow.isMaximized().then(setIsMaximized);
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  const minimize = () => getCurrentWindow().minimize();
  const toggleMaximize = () => getCurrentWindow().toggleMaximize();
  const close = () => getCurrentWindow().close();

  return {
    isMaximized,
    minimize,
    toggleMaximize,
    close,
    domain: activeModule.domain,
    script: `${activeTabId}.sh`,
    statusPath: `~/vee/${activeModule.domain}/${activeTabId}`,
  };
}
