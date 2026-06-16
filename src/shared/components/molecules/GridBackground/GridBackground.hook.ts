"use client";

import { useEffect, useRef } from "react";

export function useGridBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    let nextX = 0;
    let nextY = 0;
    let inside = false;

    const apply = () => {
      frame = 0;
      element.style.setProperty("--glow-x", `${nextX}px`);
      element.style.setProperty("--glow-y", `${nextY}px`);
      element.style.setProperty("--glow-opacity", inside ? "1" : "0");
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      nextX = event.clientX - rect.left;
      nextY = event.clientY - rect.top;
      inside = nextX >= 0 && nextY >= 0 && nextX <= rect.width && nextY <= rect.height;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref };
}
