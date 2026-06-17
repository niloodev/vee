"use client";

import { useRef } from "react";
import type { ChangeEvent } from "react";

import type { AvatarUploadHookProps } from "./AvatarUpload.types";

export function useAvatarUpload({ onUpload }: AvatarUploadHookProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => inputRef.current?.click();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () =>
      onUpload(typeof reader.result === "string" ? reader.result : "");
    reader.readAsDataURL(file);

    event.target.value = "";
  };

  return { inputRef, openPicker, handleChange };
}
