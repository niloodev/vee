"use client";

import { Button, Icon } from "@/shared/components/atoms";
import { Dialog } from "@/shared/components/molecules";
import { useApp } from "@/modules/shell/store/appSlice";

import { ACCOUNT_TABS } from "./AccountModal.constants";
import { useAccountModal } from "./AccountModal.hook";
import { DataTab, McpTab, ProfileTab, ThemeTab } from "./subcomponents";

function AccountModalContent() {
  const { items } = useApp();
  const {
    draft,
    tab,
    setTab,
    isSaving,
    flash,
    setField,
    setAccent,
    toggleMcp,
    regenKey,
    copy,
    exportLibrary,
    importLibrary,
    replayWelcome,
    save,
    close,
  } = useAccountModal();

  return (
    <Dialog
      open
      onClose={close}
      title="settings.sh"
      width={680}
      footer={
        <div className="flex items-center gap-3">
          {flash && (
            <span className="flex items-center gap-1.5 text-[12px] text-accent">
              <Icon name="check" size={14} /> {flash}
            </span>
          )}
          <div className="ml-auto flex gap-2">
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button
              variant="primary"
              icon={<Icon name="check" size={15} />}
              onClick={save}
              disabled={isSaving}
            >
              Save
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex min-h-[360px]">
        <nav className="flex w-[150px] flex-none flex-col gap-1 border-r border-border-default p-3">
          {ACCOUNT_TABS.map((item) => {
            const active = item.id === tab;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`flex cursor-pointer items-center gap-2.5 rounded-sm px-3 py-2 text-left text-[13px] transition-colors ${
                  active
                    ? "bg-accent font-bold text-accent-on"
                    : "text-text-body hover:bg-surface-raised"
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="min-w-0 flex-1 p-5">
          {tab === "profile" && <ProfileTab draft={draft} setField={setField} />}
          {tab === "theme" && <ThemeTab draft={draft} setAccent={setAccent} />}
          {tab === "mcp" && (
            <McpTab
              draft={draft}
              onToggle={toggleMcp}
              onRegen={regenKey}
              onCopy={copy}
            />
          )}
          {tab === "data" && (
            <DataTab
              itemCount={items.data.length}
              onExport={exportLibrary}
              onImport={importLibrary}
              onReplay={replayWelcome}
            />
          )}
        </div>
      </div>
    </Dialog>
  );
}

export function AccountModal() {
  const { ui } = useApp();

  if (!ui.accountModalOpen) return null;

  return <AccountModalContent />;
}
