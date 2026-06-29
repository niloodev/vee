import { ItemCard } from "@/shared/components/molecules";

import type { ItemGridProps } from "./ItemGrid.types";

export function ItemGrid({ cards }: ItemGridProps) {
  return (
    <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(178px,1fr))]">
      {cards.map((card) => (
        <ItemCard key={card.id} model={card} />
      ))}
    </div>
  );
}
