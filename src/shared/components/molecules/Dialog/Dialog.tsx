"use client";

import { Icon } from "@/shared/components/atoms";

import { useDialog } from "./Dialog.hook";
import type { DialogProps } from "./Dialog.types";

export function Dialog({
  open,
  onClose,
  title,
  width = 560,
  children,
  footer,
}: DialogProps) {
  useDialog(open, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 font-mono">
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{ width, maxWidth: "92vw", maxHeight: "88vh" }}
        className="relative z-[1] flex flex-col overflow-hidden rounded-lg border border-border-default bg-surface-card shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
      >
        <header className="flex items-center justify-between border-b border-border-default px-5 py-3">
          <span className="flex items-baseline gap-2 text-[12px]">
            <span className="text-text-dim">vee</span>
            <span className="text-text-faint">·</span>
            <span className="tracking-wide text-text-body">{title}</span>
            <span className="text-accent motion-safe:animate-blink">_</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-7 w-7 cursor-pointer place-items-center rounded-sm text-text-dim transition-colors hover:bg-surface-raised hover:text-text-strong"
          >
            <Icon name="x" size={15} />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>

        {footer && (
          <footer className="border-t border-border-default px-5 py-3">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
