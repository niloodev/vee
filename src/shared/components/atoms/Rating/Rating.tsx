import type { RatingProps } from "./Rating.types";

export function Rating({
  value,
  max = 5,
  size = 16,
  showValue = true,
  onChange,
}: RatingProps) {
  const rounded = Math.round(value);

  return (
    <span className="inline-flex items-center gap-2 font-mono">
      <span className="inline-flex gap-0.5">
        {Array.from({ length: max }, (_, index) => {
          const on = index < rounded;
          const color = on ? "var(--vee-amber)" : "var(--vee-fg-faint)";
          const glyph = on ? "★" : "☆";

          if (onChange) {
            return (
              <button
                key={index}
                type="button"
                onClick={() => onChange(index + 1)}
                className="cursor-pointer leading-none transition-transform duration-150 ease-out hover:scale-125"
                style={{ fontSize: size, color }}
              >
                {glyph}
              </button>
            );
          }

          return (
            <span key={index} className="leading-none" style={{ fontSize: size, color }}>
              {glyph}
            </span>
          );
        })}
      </span>
      {showValue && (
        <span className="text-[12px] text-text-body">
          <b className="font-bold text-amber">{value || "-"}</b>/{max}
        </span>
      )}
    </span>
  );
}
