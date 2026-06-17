import type { TerminalPromptProps } from "./TerminalPrompt.types";

export function TerminalPrompt({ label }: TerminalPromptProps) {
  return (
    <p className="text-[11.5px] leading-relaxed text-text-dim">
      <span className="text-accent">{">"}</span> {label}
    </p>
  );
}
