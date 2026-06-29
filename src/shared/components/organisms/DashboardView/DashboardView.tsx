import { EmptyState, SectionHead } from "@/shared/components/molecules";
import { FeaturedRow } from "@/shared/components/organisms/FeaturedRow";
import { ItemGrid } from "@/shared/components/organisms/ItemGrid";
import { StatsRow } from "@/shared/components/organisms/StatsRow";
import type { DashboardViewProps } from "@/shared/types";

export function DashboardView({
  eyebrow,
  heading,
  subtitle,
  stats,
  featured,
  gridTitle,
  cards,
  emptyLabel,
  emptyHint,
}: DashboardViewProps) {
  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col p-12">
        <div className="mb-8 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-accent">
            <span
              className="h-1.5 w-1.5"
              style={{ background: "var(--vee-accent)", boxShadow: "0 0 8px var(--vee-accent-glow)" }}
            />
            {eyebrow}
          </div>
          <h1 className="font-pixel text-[52px] leading-none text-text-strong">
            {heading}
          </h1>
          <p className="text-[12.5px] text-text-dim">{subtitle}</p>
        </div>

        <div className="mb-[30px]">
          <StatsRow stats={stats} />
        </div>

        {featured && featured.items.length > 0 && <FeaturedRow featured={featured} />}

        <SectionHead icon="grid" title={gridTitle} count={cards.length} />

        {cards.length > 0 ? (
          <ItemGrid cards={cards} />
        ) : (
          <EmptyState label={emptyLabel} hint={emptyHint} />
        )}
      </div>
    </div>
  );
}
