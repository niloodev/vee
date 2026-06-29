import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 text-[10px] uppercase tracking-[0.14em] text-text-faint">
      {children}
    </div>
  );
}
