"use client";

import { useTitlebar } from "./Titlebar.hook";
import { TitlebarBrand, WindowControls } from "./subcomponents";

export function Titlebar() {
  const { isMaximized, minimize, toggleMaximize, close } = useTitlebar();

  return (
    <header
      data-tauri-drag-region
      className="flex h-[38px] select-none items-center gap-3 border-b border-border-default bg-surface-raised pl-4 font-mono"
    >
      <TitlebarBrand />
      <WindowControls
        isMaximized={isMaximized}
        onMinimize={minimize}
        onToggleMaximize={toggleMaximize}
        onClose={close}
      />
    </header>
  );
}
