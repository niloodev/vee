import { WindowControlButton } from "./subcomponents";
import type { WindowControlsProps } from "./WindowControls.types";

export function WindowControls({
  isMaximized,
  onMinimize,
  onToggleMaximize,
  onClose,
}: WindowControlsProps) {
  return (
    <div className="ml-auto flex h-full">
      <WindowControlButton aria-label="Minimizar" title="Minimizar" onClick={onMinimize}>
        <svg width="12" height="12" viewBox="0 0 12 12" shapeRendering="crispEdges">
          <rect x="1" y="6" width="10" height="1.4" fill="currentColor" />
        </svg>
      </WindowControlButton>

      <WindowControlButton
        aria-label={isMaximized ? "Restaurar" : "Maximizar"}
        title={isMaximized ? "Restaurar" : "Maximizar"}
        onClick={onToggleMaximize}
      >
        {isMaximized ? (
          <svg width="12" height="12" viewBox="0 0 12 12" shapeRendering="crispEdges">
            <rect x="3" y="1.5" width="7.5" height="7.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <rect
              x="1.5"
              y="3"
              width="7.5"
              height="7.5"
              fill="var(--vee-surface-2)"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" shapeRendering="crispEdges">
            <rect x="1.5" y="1.5" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <rect x="1.5" y="1.5" width="9" height="2.6" fill="currentColor" />
          </svg>
        )}
      </WindowControlButton>

      <WindowControlButton intent="close" aria-label="Fechar" title="Fechar" onClick={onClose}>
        <svg width="12" height="12" viewBox="0 0 12 12">
          <line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </WindowControlButton>
    </div>
  );
}
