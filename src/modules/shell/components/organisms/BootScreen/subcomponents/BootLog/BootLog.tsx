import type { BootLogProps } from "./BootLog.types";

export function BootLog({ lines, complete }: BootLogProps) {
  return (
    <div className="min-h-[156px] text-[12px] leading-[1.85]">
      {lines.map((line, index) => {
        const isLast = index === lines.length - 1;
        const highlight = line.ready || line.ok;

        return (
          <div
            key={line.label}
            className={`flex items-baseline motion-safe:animate-boot-line ${
              highlight ? "text-accent" : "text-text-dim"
            }`}
          >
            <span className={`mr-2 ${highlight ? "text-accent" : "text-text-faint"}`}>{">"}</span>
            <span className="whitespace-pre">
              {line.label}
              {line.dots}
            </span>
            {line.ok && <span className="ml-auto font-bold text-accent">ok</span>}
            {isLast && (complete || line.ready) && (
              <span className="ml-1 text-accent motion-safe:animate-blink">_</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
