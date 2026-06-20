import { NavItem } from "@/shared/components/molecules/NavItem";

import type { NavListProps } from "./NavList.types";

export function NavList({ sections, activeId, onSelect }: NavListProps) {
  return (
    <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
      {sections.map((section, index) => (
        <div key={section.label ?? index} className="flex flex-col gap-0.5">
          {section.label && (
            <div className="px-3 pb-2 pt-4 text-[10px] uppercase tracking-[0.14em] text-text-faint">
              {section.label}
            </div>
          )}
          {section.items.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              active={item.id === activeId}
              onSelect={onSelect}
            />
          ))}
        </div>
      ))}
    </nav>
  );
}
