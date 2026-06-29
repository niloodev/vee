"use client";

import { useRef } from "react";
import type { ChangeEvent } from "react";

export function useDataTab(onImport: (file: File) => void) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => inputRef.current?.click();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onImport(file);
    event.target.value = "";
  };

  return { inputRef, openPicker, handleChange };
}
