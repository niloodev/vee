import { FeaturedCard, SectionHead } from "@/shared/components/molecules";

import type { FeaturedRowProps } from "./FeaturedRow.types";

export function FeaturedRow({ featured }: FeaturedRowProps) {
  return (
    <section className="mb-[34px]">
      <SectionHead
        icon={featured.icon}
        title={featured.title}
        count={featured.items.length}
      />
      <div className="grid grid-flow-col [grid-auto-columns:minmax(320px,1fr)] gap-4 overflow-x-auto px-0.5 pb-3.5 pt-1.5">
        {featured.items.map((item) => (
          <FeaturedCard key={item.id} model={item} />
        ))}
      </div>
    </section>
  );
}
