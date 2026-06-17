import { Icon } from "@/shared/components/atoms/Icon";

import { ALERT_TONES } from "./Alert.constants";
import type { AlertProps } from "./Alert.types";

export function Alert({ tone = "danger", children }: AlertProps) {
  const { icon, className } = ALERT_TONES[tone];

  return (
    <div
      className={`flex items-center gap-2 rounded-sm border px-3 py-2 text-[12px] ${className}`}
    >
      <Icon name={icon} size={14} className="shrink-0" />
      <span>{children}</span>
    </div>
  );
}
