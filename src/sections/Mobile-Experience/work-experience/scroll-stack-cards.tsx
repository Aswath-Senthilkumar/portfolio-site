import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { mobileExperienceData } from "../../../constants";
import { WorkExperienceCard } from "./work-experience-card";

gsap.registerPlugin(Draggable);

export const ScrollStackCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleNext = () => {
    if (activeIndex < mobileExperienceData.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  useGSAP(() => {
    const cards = cardsRef.current;
    const totalCards = mobileExperienceData.length;

    // Animate cards based on activeIndex
    cards.forEach((card, index) => {
      if (!card) return;

      const isPast = index < activeIndex;
      const isCurrent = index === activeIndex;
      const isFuture = index > activeIndex;

      // Kill any existing Draggable to avoid duplicates/conflicts on re-render
      const existingDraggable = Draggable.get(card);
      if (existingDraggable) existingDraggable.kill();

      if (isCurrent) {
        const canSwipeUp = index < totalCards - 1;
        const canSwipeDown = index > 0;

        const minY = canSwipeUp ? -500 : 0; // Increased bounds for slide out
        const maxY = canSwipeDown ? 500 : 0;

        // Make current card draggable
        Draggable.create(card, {
          type: "y",
          bounds: { minY, maxY },
          inertia: true,
          onDrag: function () {
            const y = this.y;
            const limit = 300; // Increased limit for longer slide
            const progress = gsap.utils.clamp(-1, 1, y / limit);

            // Animate Current Card: Slide out and Flip
            gsap.set(card, {
              rotationX: progress * -45, // Less extreme rotation for "natural" feel
              y: y, // Follow finger exactly
              opacity: 1 - Math.abs(progress), // Fade out as it leaves
              scale: 1 - Math.abs(progress) * 0.1, // Slight scale down
            });

            // Animate Next Card (Swipe Up -> Next Card comes from Bottom)
            if (y < 0 && canSwipeUp) {
              const nextCard = cards[index + 1];
              if (nextCard) {
                // Progress: 0 -> -1
                // Next Card starts at: yPercent: 100, rotationX: -45, opacity: 0
                // Ends at: yPercent: 0, rotationX: 0, opacity: 1

                const absProgress = Math.abs(progress);
                gsap.set(nextCard, {
                  rotationX: -45 + absProgress * 45,
                  yPercent: 100 - absProgress * 100,
                  opacity: absProgress,
                  scale: 0.9 + absProgress * 0.1,
                });
              }
            }

            // Animate Prev Card (Swipe Down -> Prev Card comes from Top)
            if (y > 0 && canSwipeDown) {
              const prevCard = cards[index - 1];
              if (prevCard) {
                // Progress: 0 -> 1
                // Prev Card starts at: yPercent: -100, rotationX: 45, opacity: 0
                // Ends at: yPercent: 0, rotationX: 0, opacity: 1

                gsap.set(prevCard, {
                  rotationX: 45 - progress * 45,
                  yPercent: -100 + progress * 100,
                  opacity: progress,
                  scale: 0.9 + progress * 0.1,
                });
              }
            }
          },
          onDragEnd: function () {
            const y = this.y;
            const threshold = 150;

            if (y < -threshold && canSwipeUp) {
              handleNext();
            } else if (y > threshold && canSwipeDown) {
              handlePrev();
            } else {
              // Snap back Current
              gsap.to(card, {
                y: 0,
                rotationX: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "elastic.out(1, 0.75)",
              });

              // Snap back Next (reset to Future state)
              if (canSwipeUp) {
                const nextCard = cards[index + 1];
                if (nextCard) {
                  gsap.to(nextCard, {
                    rotationX: -45,
                    yPercent: 100,
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.3,
                  });
                }
              }

              // Snap back Prev (reset to Past state)
              if (canSwipeDown) {
                const prevCard = cards[index - 1];
                if (prevCard) {
                  gsap.to(prevCard, {
                    rotationX: 45,
                    yPercent: -100,
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.3,
                  });
                }
              }
            }
          },
        });

        gsap.to(card, {
          yPercent: 0,
          x: 0,
          y: 0,
          rotationX: 0,
          opacity: 1,
          scale: 1,
          zIndex: totalCards - index,
          duration: 0.6,
          ease: "power3.out",
          pointerEvents: "auto",
        });
      } else if (isFuture) {
        gsap.to(card, {
          yPercent: 100, // Start from below
          y: 0,
          rotationX: -45, // Tilted forward
          opacity: 0,
          scale: 0.9,
          zIndex: totalCards - index,
          duration: 0.6,
          ease: "power3.out",
          pointerEvents: "none",
        });
      } else if (isPast) {
        gsap.to(card, {
          yPercent: -100, // Move up
          y: 0,
          rotationX: 45, // Tilted back
          opacity: 0,
          scale: 0.9,
          zIndex: totalCards - index,
          duration: 0.6,
          ease: "power3.in",
          pointerEvents: "none",
        });
      }
    });
  }, [activeIndex]);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center relative min-h-[80vh]">
      <div className="relative w-full max-w-md h-[550px] perspective-1000">
        {mobileExperienceData.map((experience, index) => (
          <div
            key={experience.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="absolute inset-0 w-full h-full will-change-transform touch-none"
          >
            <WorkExperienceCard experience={experience} index={index} />
          </div>
        ))}
      </div>

      {/* Indicator */}
      <div className="mt-8 flex flex-col items-center gap-2 opacity-50 animate-pulse pointer-events-none">
        <span className="text-xs uppercase tracking-widest text-gray-400">
          Swipe Up / Down
        </span>
      </div>
    </div>
  );
};
