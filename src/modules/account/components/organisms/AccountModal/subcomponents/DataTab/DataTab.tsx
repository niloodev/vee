import { Button, Icon } from "@/shared/components/atoms";

import { STORAGE_PATH } from "../../AccountModal.constants";
import { SectionLabel } from "../SectionLabel";
import { useDataTab } from "./DataTab.hook";
import type { DataTabProps } from "./DataTab.types";

export function DataTab({ itemCount, onExport, onImport, onReplay }: DataTabProps) {
  const { inputRef, openPicker, handleChange } = useDataTab(onImport);

  return (
    <div className="flex flex-col gap-4">
      <SectionLabel>Library file</SectionLabel>

      <div className="flex items-center gap-3 rounded-md border border-border-default bg-surface-raised p-4">
        <Icon name="upload" size={18} className="rotate-180 text-text-dim" />
        <div className="flex-1">
          <div className="text-[13px] text-text-strong">Export library</div>
          <div className="text-[11px] text-text-dim">
            {itemCount} items + profile as JSON
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={<Icon name="upload" size={14} className="rotate-180" />}
          onClick={onExport}
        >
          Export
        </Button>
      </div>

      <div className="flex items-center gap-3 rounded-md border border-border-default bg-surface-raised p-4">
        <Icon name="upload" size={18} className="text-text-dim" />
        <div className="flex-1">
          <div className="text-[13px] text-text-strong">Import library</div>
          <div className="text-[11px] text-text-dim">
            Merge items from a .json export
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={<Icon name="upload" size={14} />}
          onClick={openPicker}
        >
          Import
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      <SectionLabel>Storage location</SectionLabel>
      <div className="flex items-center gap-3 rounded-md border border-border-default bg-surface-raised p-4">
        <Icon name="folder" size={18} className="text-text-dim" />
        <div className="min-w-0 flex-1">
          <code className="block truncate font-mono text-[12px] text-text-body">
            {STORAGE_PATH}
          </code>
          <div className="text-[11px] text-text-dim">
            Your library lives here on this machine
          </div>
        </div>
      </div>

      <SectionLabel>First-run setup</SectionLabel>
      <div className="flex items-center gap-3 rounded-md border border-border-default bg-surface-raised p-4">
        <Icon name="refresh" size={18} className="text-text-dim" />
        <div className="flex-1">
          <div className="text-[13px] text-text-strong">Replay welcome setup</div>
          <div className="text-[11px] text-text-dim">
            Run the first-time configuration wizard again
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={<Icon name="refresh" size={14} />}
          onClick={onReplay}
        >
          Replay
        </Button>
      </div>

      <p className="text-[11.5px] leading-relaxed text-text-dim">
        Vee is fully local: your library and profile never leave this device.
      </p>
    </div>
  );
}
