"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiProps {
  tier: string;
}

export function ConfettiTrigger({ tier }: ConfettiProps) {
  useEffect(() => {
    if (tier === "Top 1%" || tier === "Top 5%" || tier === "Top 15%") {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ["#ffd700", "#58a6ff", "#a371f7", "#3fb950"],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ["#ffd700", "#58a6ff", "#a371f7", "#3fb950"],
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [tier]);

  return null;
}
