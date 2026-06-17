"use client";

import { Button } from "@/shared/components/atoms/Button";
import { Icon } from "@/shared/components/atoms/Icon";

import { useAvatarUpload } from "./AvatarUpload.hook";
import type { AvatarUploadProps } from "./AvatarUpload.types";

export function AvatarUpload({
  value,
  initials,
  onUpload,
  onRemove,
}: AvatarUploadProps) {
  const { inputRef, openPicker, handleChange } = useAvatarUpload({ onUpload });

  return (
    <div className="flex items-center gap-4">
      <span className="grid h-[60px] w-[60px] shrink-0 place-items-center overflow-hidden rounded-md border border-border-strong bg-surface-well font-pixel text-[19px] text-accent">
        {value ? (
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          initials
        )}
      </span>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          icon={<Icon name="upload" size={14} />}
          onClick={openPicker}
        >
          Upload icon
        </Button>
        {value && (
          <Button
            variant="ghost"
            size="sm"
            icon={<Icon name="x" size={14} />}
            onClick={onRemove}
          >
            Remove
          </Button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
