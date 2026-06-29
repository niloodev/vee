import type { CSSProperties } from "react";

import { Button, Icon, ProgressBar } from "@/shared/components/atoms";

import type { FeaturedCardProps } from "./FeaturedCard.types";

export function FeaturedCard({ model }: FeaturedCardProps) {
  return (
    <article
      style={
        {
          "--feat-accent": model.accent,
          background: `radial-gradient(120% 130% at 78% 12%, color-mix(in srgb, ${model.accent} 28%, var(--vee-surface-2)), var(--vee-surface-1))`,
        } as CSSProperties
      }
      className="group relative h-[184px] cursor-pointer overflow-hidden rounded-md border border-border-default transition-all duration-200 ease-out hover:-translate-y-[3px] hover:border-[var(--feat-accent)]"
    >
      {model.cover ? (
        <span
          className="absolute inset-0 bg-cover bg-top opacity-55"
          style={{ backgroundImage: `url(${model.cover})` }}
        />
      ) : (
        <span className="pointer-events-none absolute -top-[18px] right-[-6px] font-pixel text-[150px] leading-none text-white/[0.07]">
          {model.initials}
        </span>
      )}

      <span
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(7,8,10,0.86) 30%, transparent)" }}
      />

      <div className="relative flex h-full flex-col justify-between p-[18px]">
        <div className="flex items-center gap-2">
          {model.iconChip ? (
            <span className="grid h-7 w-7 flex-none place-items-center overflow-hidden rounded-sm border border-border-strong bg-surface-raised">
              {model.iconChip.src ? (
                <span
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${model.iconChip.src})` }}
                />
              ) : (
                <Icon name="gamepad" size={15} style={{ color: model.accent }} />
              )}
            </span>
          ) : (
            model.eyebrowIcon && (
              <span className="flex" style={{ color: model.accent }}>
                <Icon name={model.eyebrowIcon} size={15} />
              </span>
            )
          )}
          <span
            className="font-pixel text-[12px] uppercase tracking-[0.14em]"
            style={{ color: model.accent }}
          >
            {model.eyebrowLabel}
          </span>
          {model.caption && (
            <span className="text-[11px] text-text-faint">· {model.caption}</span>
          )}
        </div>

        <div>
          <div className="mb-3 font-pixel text-[30px] leading-none text-text-strong">
            {model.title}
          </div>

          {model.progress && (
            <div className="flex items-center gap-3">
              <div className="max-w-[200px] flex-1">
                <ProgressBar
                  value={model.progress.value}
                  total={model.progress.total}
                  showCount={false}
                />
              </div>
              <span className="text-[11px] text-text-body">
                {model.progress.value}/{model.progress.total} {model.progress.unit} ·{" "}
                {model.progress.pct}%
              </span>
            </div>
          )}

          {model.meta && (
            <div className="flex items-center gap-3.5 text-[11px] text-text-body">
              {model.meta.genres && (
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="layers" size={12} className="text-text-dim" />
                  {model.meta.genres}
                </span>
              )}
              {model.meta.lastPlayed && (
                <span className="inline-flex items-center gap-1.5 text-text-dim">
                  <Icon name="refresh" size={11} />
                  {model.meta.lastPlayed}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="absolute right-3.5 top-3.5 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
        <Button
          variant="primary"
          size="sm"
          icon={<Icon name={model.actionIcon ?? "play"} size={13} />}
        >
          {model.actionLabel}
        </Button>
      </div>
    </article>
  );
}
