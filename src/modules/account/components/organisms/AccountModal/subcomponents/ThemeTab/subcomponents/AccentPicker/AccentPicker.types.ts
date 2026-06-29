export interface AccentPickerProps {
  label: string;
  hint: string;
  value: string;
  fallback: string;
  presets: string[];
  onPick: (color: string) => void;
  onReset: () => void;
}
