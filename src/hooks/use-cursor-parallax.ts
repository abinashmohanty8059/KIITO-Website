import { useState, useEffect, useCallback, useRef } from "react";

interface CursorPosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useCursorParallax() {
  const [cursor, setCursor] = useState<CursorPosition>({
    x: 0, y: 0, normalizedX: 0, normalizedY: 0,
  });
  const rafRef = useRef<number>();
  const targetRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetRef.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    };
  }, []);

  useEffect(() => {
    const current = { x: 0, y: 0 };
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      current.x = lerp(current.x, targetRef.current.x, 0.06);
      current.y = lerp(current.y, targetRef.current.y, 0.06);
      setCursor({
        x: current.x,
        y: current.y,
        normalizedX: current.x,
        normalizedY: current.y,
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return cursor;
}
