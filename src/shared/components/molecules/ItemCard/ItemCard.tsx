import { Badge, Icon, ProgressBar, Rating } from "@/shared/components/atoms";

import type { ItemCardProps } from "./ItemCard.types";

export function ItemCard({ model }: ItemCardProps) {
  const isGame = model.kind === "games";

  return (
    <article className="group flex cursor-pointer flex-col overflow-hidden rounded-md border border-border-default bg-surface-card transition-all duration-200 ease-out hover:-translate-y-[3px] hover:border-border-strong hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)]">
      <div className="relative aspect-[2/3] overflow-hidden bg-surface-well">
        {model.cover ? (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${model.cover})` }}
          />
        ) : (
          <div
            className="absolute inset-0 grid place-items-center"
            style={{
              background: `radial-gradient(120% 120% at 50% 0%, color-mix(in srgb, ${model.typeChip.color} 26%, var(--vee-surface-3)), var(--vee-surface-1))`,
            }}
          >
            <span className="font-pixel text-[58px] text-white/90">
              {model.initials}
            </span>
          </div>
        )}

        <span
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 45%, rgba(7,8,10,0.82) 100%)" }}
        />

        <div className="absolute left-2 top-2 z-[2]">
          <Badge status={model.status} />
        </div>

        <div
          className="absolute right-2 top-2 z-[2] grid h-6 w-6 place-items-center rounded-sm border border-border-default text-[13px] backdrop-blur"
          style={{ background: "rgba(7,8,10,0.74)", color: model.typeChip.color }}
        >
          {model.typeChip.icon ? (
            <Icon name={model.typeChip.icon} size={13} />
          ) : (
            model.typeChip.glyph
          )}
        </div>

        {model.iconChip && (
          <span className="absolute bottom-2.5 left-2.5 z-[2] grid h-[34px] w-[34px] place-items-center overflow-hidden rounded-sm border border-border-strong bg-surface-raised shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
            {model.iconChip.src ? (
              <span
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${model.iconChip.src})` }}
              />
            ) : (
              <span className="font-pixel text-[11px] text-accent">
                {model.iconChip.initials}
              </span>
            )}
          </span>
        )}

        {model.ready && (
          <span
            className="absolute bottom-2.5 right-2.5 z-[2] inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[9px] uppercase tracking-[0.14em] backdrop-blur"
            style={{ background: "rgba(7,8,10,0.72)", borderColor: "var(--vee-accent-dim)", color: "var(--vee-accent)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--vee-accent)", boxShadow: "0 0 6px var(--vee-accent-glow)" }}
            />
            Ready
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2.5 px-3 pb-3.5 pt-3">
        <div className="truncate font-pixel text-[21px] leading-none text-text-strong">
          {model.title}
        </div>
        {model.subtitle && (
          <div className="-mt-1.5 truncate text-[11px] tracking-wide text-text-dim">
            {model.subtitle}
          </div>
        )}

        {model.progress && (
          <div className="flex flex-col gap-1.5">
            <ProgressBar
              value={model.progress.value}
              total={model.progress.total}
              showCount={false}
            />
            <div className="flex items-baseline justify-between gap-2 text-[11px] text-text-dim">
              <span className="truncate">
                {model.progress.value} / {model.progress.total} {model.progress.unit}
              </span>
              <span className="flex-none text-text-body">{model.progress.pct}%</span>
            </div>
          </div>
        )}

        {model.meta && (
          <div className="truncate text-[11px] text-text-dim">{model.meta}</div>
        )}

        {model.rating > 0 ? (
          <Rating value={model.rating} size={14} showValue={!isGame} />
        ) : (
          isGame && <span className="text-[11px] text-text-faint">unrated</span>
        )}
      </div>
    </article>
  );
}
