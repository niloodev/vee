import type { TitlebarStatusProps } from "./TitlebarStatus.types";

export function TitlebarStatus({ status }: TitlebarStatusProps) {
  return (
    <span className="ml-4 flex min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap text-[10.5px] text-text-faint">
      <span className="h-[5px] w-[5px] flex-none rounded-full bg-accent shadow-[0_0_6px_var(--vee-accent-glow)]" />
      <span className="truncate">{status}</span>
    </span>
  );
}
