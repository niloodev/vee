"use client";

import { useCallback, useRef, useState } from "react";

import { createItem, getItems } from "@/core/controllers/items";
import type { IAccount } from "@/core/models/account";
import type { IItem } from "@/core/models/items";
import { generateMcpKey } from "@/modules/account/account.utils";
import { updateAccount } from "@/modules/account/services";
import { useApp } from "@/modules/shell/store/appSlice";

import { EMPTY_ACCOUNT } from "./AccountModal.constants";
import type { AccountTab } from "./AccountModal.types";

const applyAccent = (token: "media" | "games", color: string) => {
  const root = document.documentElement.style;
  if (color) root.setProperty(`--vee-${token}`, color);
  else root.removeProperty(`--vee-${token}`);
};

export function useAccountModal() {
  const {
    account,
    items,
    setAccount,
    setItems,
    closeAccountModal,
    setReplayWelcome,
  } = useApp();

  const saved = account.data;
  const [draft, setDraft] = useState<IAccount>(saved ?? EMPTY_ACCOUNT);
  const [tab, setTab] = useState<AccountTab>("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [flash, setFlash] = useState("");
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback((message: string) => {
    setFlash(message);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(""), 2400);
  }, []);

  const setField = useCallback(
    <K extends keyof IAccount>(key: K, value: IAccount[K]) =>
      setDraft((current) => ({ ...current, [key]: value })),
    [],
  );

  const setAccent = useCallback(
    (token: "media" | "games", color: string) => {
      setField(token === "media" ? "mediaColor" : "gamesColor", color);
      applyAccent(token, color);
    },
    [setField],
  );

  const restoreSavedAccents = useCallback(() => {
    applyAccent("media", saved?.mediaColor ?? "");
    applyAccent("games", saved?.gamesColor ?? "");
  }, [saved]);

  const close = useCallback(() => {
    restoreSavedAccents();
    closeAccountModal();
  }, [restoreSavedAccents, closeAccountModal]);

  const save = useCallback(async () => {
    setIsSaving(true);
    const result = await updateAccount({ data: draft, setAccount });
    setIsSaving(false);
    notify(result.ok ? "Configurações salvas" : result.error);
  }, [draft, setAccount, notify]);

  const toggleMcp = useCallback(
    (enabled: boolean) =>
      setDraft((current) => ({
        ...current,
        mcpEnabled: enabled,
        mcpKey: enabled && !current.mcpKey ? generateMcpKey() : current.mcpKey,
      })),
    [],
  );

  const regenKey = useCallback(() => {
    setField("mcpKey", generateMcpKey());
    notify("Nova chave gerada");
  }, [setField, notify]);

  const copy = useCallback(
    (value: string) => {
      navigator.clipboard?.writeText(value);
      notify("Copiado");
    },
    [notify],
  );

  const exportLibrary = useCallback(() => {
    const payload = JSON.stringify(
      { exportedAt: new Date().toISOString(), account: draft, items: items.data },
      null,
      2,
    );
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `vee-export-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    notify("Biblioteca exportada");
  }, [draft, items.data, notify]);

  const importLibrary = useCallback(
    async (file: File) => {
      try {
        const text = await file.text();
        const parsed = JSON.parse(text) as { items?: IItem[] };
        const incoming = Array.isArray(parsed.items) ? parsed.items : null;
        if (!incoming) throw new Error("invalid");

        for (const item of incoming) {
          await createItem(item);
        }

        const result = await getItems();
        if (!("error" in result)) setItems(result.payload);
        notify(`Importados ${incoming.length} itens`);
      } catch {
        notify("Arquivo de importação inválido");
      }
    },
    [setItems, notify],
  );

  const replayWelcome = useCallback(() => {
    close();
    setReplayWelcome(true);
  }, [close, setReplayWelcome]);

  return {
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
  };
}
