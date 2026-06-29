import { Button, Icon } from "@/shared/components/atoms";

import type { CopyFieldProps } from "./CopyField.types";

export function CopyField({ label, value, onCopy }: CopyFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-[0.14em] text-text-faint">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <code className="min-w-0 flex-1 truncate rounded-sm border border-border-strong bg-surface-well px-3 py-[9px] font-mono text-[12.5px] text-text-strong">
          {value}
        </code>
        <Button
          variant="secondary"
          size="sm"
          icon={<Icon name="note" size={14} />}
          onClick={() => onCopy(value)}
        >
          Copy
        </Button>
      </div>
    </div>
  );
}
