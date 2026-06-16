export function TitlebarBrand() {
  return (
    <span
      data-tauri-drag-region
      className="flex select-none items-baseline gap-2 text-[11.5px] leading-none"
    >
      <span className="text-text-dim">vee</span>
      <span className="text-accent motion-safe:animate-pulse">_</span>
    </span>
  );
}
