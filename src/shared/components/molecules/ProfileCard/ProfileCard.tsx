"use client";

import { useState } from "react";

import { Icon } from "@/shared/components/atoms";

import type { ProfileCardProps } from "./ProfileCard.types";

export function ProfileCard({
  name,
  username,
  caption = "local profile",
  onOpenSettings,
}: ProfileCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <div className="relative mt-auto border-t border-border-default p-3">
      {menuOpen && (
        <>
          <div
            aria-hidden
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30"
          />
          <div className="absolute inset-x-3 bottom-[calc(100%-4px)] z-40 overflow-hidden rounded-md border border-border-strong bg-surface-raised shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
            <div className="border-b border-border-default px-3 py-2.5">
              <div className="truncate text-[12px] text-text-strong">{name}</div>
              {username && (
                <div className="truncate text-[10.5px] text-accent">@{username}</div>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenSettings?.();
              }}
              className="flex w-full cursor-pointer items-center gap-2.5 px-3 py-2.5 text-left text-[12.5px] text-text-body transition-colors hover:bg-surface-well"
            >
              <Icon name="settings" size={15} />
              <span>Settings</span>
            </button>
          </div>
        </>
      )}

      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        className="flex w-full cursor-pointer items-center gap-2.5 rounded-sm p-1.5 text-left transition-colors duration-200 ease-out hover:bg-surface-raised"
      >
        <span className="grid h-[30px] w-[30px] flex-none place-items-center overflow-hidden rounded-sm border border-border-strong bg-surface-well font-pixel text-[11px] text-accent">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12px] text-text-strong">{name}</div>
          <div className="text-[10px] text-text-dim">{caption}</div>
        </div>
        <Icon
          name="chevronDown"
          size={16}
          className={`text-text-dim transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
