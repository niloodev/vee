import type { TitlebarBrandProps } from "./TitlebarBrand.types";

export function TitlebarBrand({ script }: TitlebarBrandProps) {
  return (
    <span
      data-tauri-drag-region
      className="flex select-none items-baseline gap-2 text-[11.5px] leading-none"
    >
      <span className="text-text-dim">vee</span>
      <span className="text-text-faint">·</span>
      <span className="tracking-wide text-text-body">{script}</span>
      <span className="text-accent motion-safe:animate-blink">_</span>
    </span>
  );
}
