import { GAMES_PRESETS, MEDIA_PRESETS } from "../../AccountModal.constants";
import { SectionLabel } from "../SectionLabel";
import { AccentPicker } from "./subcomponents";
import type { ThemeTabProps } from "./ThemeTab.types";

export function ThemeTab({ draft, setAccent }: ThemeTabProps) {
  return (
    <div className="flex flex-col gap-4">
      <SectionLabel>Accent colors</SectionLabel>

      <AccentPicker
        label="Media accent"
        hint="The phosphor-green brand color: sidebar, badges, glows & focus rings in the Media domain."
        value={draft.mediaColor}
        fallback="#4ee98a"
        presets={MEDIA_PRESETS}
        onPick={(color) => setAccent("media", color)}
        onReset={() => setAccent("media", "")}
      />

      <AccentPicker
        label="Games accent"
        hint="The blue signature for the Games domain: sidebar, cards and glows."
        value={draft.gamesColor}
        fallback="#4d8bff"
        presets={GAMES_PRESETS}
        onPick={(color) => setAccent("games", color)}
        onReset={() => setAccent("games", "")}
      />

      <p className="text-[11.5px] leading-relaxed text-text-dim">
        Accents apply instantly across the whole app and persist on this machine.
        Switch domains in the sidebar to preview each one live.
      </p>
    </div>
  );
}
