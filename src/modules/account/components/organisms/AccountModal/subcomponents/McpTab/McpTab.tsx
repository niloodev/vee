import { Button, Icon, Switch } from "@/shared/components/atoms";

import { MCP_ENDPOINT } from "../../AccountModal.constants";
import { SectionLabel } from "../SectionLabel";
import { CopyField } from "./subcomponents";
import type { McpTabProps } from "./McpTab.types";

export function McpTab({ draft, onToggle, onRegen, onCopy }: McpTabProps) {
  const connectionUrl = `${MCP_ENDPOINT}?key=${draft.mcpKey}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 rounded-md border border-border-default bg-surface-raised p-4">
        <span className={`flex ${draft.mcpEnabled ? "text-accent" : "text-text-dim"}`}>
          <Icon name="terminal" size={21} />
        </span>
        <div className="flex-1">
          <div className="text-[13px] text-text-strong">Enable MCP server</div>
          <div className="text-[11px] text-text-dim">
            Expose your library as MCP tools for local clients.
          </div>
        </div>
        <Switch checked={draft.mcpEnabled} onChange={onToggle} label="Enable MCP server" />
      </div>

      {draft.mcpEnabled ? (
        <div className="flex flex-col gap-4">
          <SectionLabel>Connection</SectionLabel>
          <CopyField label="Server endpoint" value={MCP_ENDPOINT} onCopy={onCopy} />
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-[0.14em] text-text-faint">
              Access key · required
            </span>
            <div className="flex items-center gap-2">
              <code className="min-w-0 flex-1 truncate rounded-sm border border-border-strong bg-surface-well px-3 py-[9px] font-mono text-[12.5px] text-accent">
                {draft.mcpKey}
              </code>
              <Button
                variant="secondary"
                size="sm"
                icon={<Icon name="note" size={14} />}
                onClick={() => onCopy(draft.mcpKey)}
              >
                Copy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={<Icon name="refresh" size={14} />}
                onClick={onRegen}
              >
                New
              </Button>
            </div>
          </div>
          <CopyField
            label="Connection URL · use this to connect"
            value={connectionUrl}
            onCopy={onCopy}
          />
        </div>
      ) : (
        <p className="text-[11.5px] leading-relaxed text-text-dim">
          Turn the server on to reveal your connection URL, access key and setup
          details.
        </p>
      )}
    </div>
  );
}
