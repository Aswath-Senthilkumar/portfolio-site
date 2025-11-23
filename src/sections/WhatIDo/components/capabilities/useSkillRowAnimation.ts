import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useSkillRowAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rows = container.querySelectorAll(".skill-row");
    const ctx = gsap.context(() => {
      rows.forEach((row, index) => {
        const isRight = index % 2 === 0; // Row 0 moves Right, Row 1 moves Left
        const totalWidth = row.scrollWidth / 3; // We have 3 copies

        if (isRight) {
          // Move Right: Start at -totalWidth (Copy 2) and move to 0 (Copy 1)
          gsap.fromTo(row, 
            { x: -totalWidth },
            {
              x: 0,
              duration: 20 + index * 5,
              ease: "none",
              repeat: -1,
            }
          );
        } else {
          // Move Left: Start at 0 (Copy 1) and move to -totalWidth (Copy 2)
          gsap.fromTo(row,
            { x: 0 },
            {
              x: -totalWidth,
              duration: 20 + index * 5,
              ease: "none",
              repeat: -1,
            }
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
