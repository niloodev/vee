import { PLAY_MARK_LIDS, PLAY_MARK_PIXELS } from "./PlayMark.constants";
import type { PlayMarkProps } from "./PlayMark.types";

export function PlayMark({ size = 32, animated = false, className, ...props }: PlayMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Vee"
      className={`block shrink-0 ${className ?? ""}`}
      {...props}
    >
      {PLAY_MARK_PIXELS.map((pixel, index) => (
        <rect
          key={index}
          x={pixel.x}
          y={pixel.y}
          width="1.04"
          height="1.04"
          fill={pixel.fill}
        />
      ))}
      <g className={animated ? "opacity-0 motion-safe:animate-eye-blink" : "opacity-0"}>
        {PLAY_MARK_LIDS.map(([x, y]) => (
          <rect key={`lid-${x},${y}`} x={x} y={y} width="1.04" height="1.04" fill="var(--vee-accent)" />
        ))}
      </g>
    </svg>
  );
}
