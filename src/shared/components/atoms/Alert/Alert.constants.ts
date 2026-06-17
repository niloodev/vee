import type { IconName } from "@/shared/components/atoms/Icon";

import type { AlertTone } from "./Alert.types";

export const ALERT_TONES: Record<AlertTone, { icon: IconName; className: string }> =
  {
    danger: { icon: "triangleAlert", className: "border-red/40 bg-red/10 text-red" },
    warning: {
      icon: "triangleAlert",
      className: "border-amber/40 bg-amber/10 text-amber",
    },
    success: {
      icon: "check",
      className: "border-accent-dim bg-accent/10 text-accent",
    },
    info: { icon: "info", className: "border-cyan/40 bg-cyan/10 text-cyan" },
  };
