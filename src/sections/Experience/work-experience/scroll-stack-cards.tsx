import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experienceData } from "../../../constants";
import { WorkExperienceCard } from "./work-experience-card";

gsap.registerPlugin(ScrollTrigger);

export const ScrollStackCards: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Build the timeline + pin synchronously at useLayoutEffect timing so the
  // ScrollTrigger is registered before the page is interactive — otherwise a
  // fast scroller can blow past #experience before the pin engages and end up
  // straight in Projects. Per-tween `y` values are functional so they
  // re-evaluate on ScrollTrigger.refresh() (see the fonts.ready useEffect
  // below) — that's how we accommodate font-swap height changes without
  // delaying initial setup.
  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean);
    const contents = contentRefs.current;
    const totalCards = cards.length;
    const section = document.getElementById("experience");

    if (totalCards === 0 || !section) return;

    gsap.set(cards, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      transformOrigin: "center center",
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
    });

    cards.forEach((card, index) => {
      if (index === 0) {
        gsap.set(card, {
          yPercent: 0,
          rotationX: 0,
          opacity: 1,
          zIndex: totalCards,
          scale: 1,
          pointerEvents: "auto",
        });
      } else {
        gsap.set(card, {
          yPercent: 100,
          rotationX: -90,
          opacity: 0,
          zIndex: totalCards - index,
          scale: 0.8,
          pointerEvents: "none",
        });
      }
    });

    const tl = gsap.timeline();

    cards.forEach((card, index) => {
      const content = contents[index];
      const nextCard = cards[index + 1];

      // 1. Scroll internal content. `y` is a function so refresh() re-runs it
      //    against the current scrollHeight (corrected after fonts swap).
      //    24px buffer keeps the last bullet above the edge before the flip.
      if (content && content.parentElement) {
        const parent = content.parentElement;
        const initialDist = content.scrollHeight - parent.clientHeight + 24;
        if (initialDist > 0) {
          tl.to(content, {
            y: () => -(content.scrollHeight - parent.clientHeight + 24),
            duration: initialDist / 100,
            ease: "none",
          });
        }
      }

      // 2. Flip to next card (if not last)
      if (index !== totalCards - 1 && nextCard) {
        tl.to(card, {
          yPercent: -100,
          rotationX: 90,
          opacity: 0,
          scale: 0.8,
          duration: 2,
          ease: "power2.inOut",
          pointerEvents: "none",
        })
          .to(
            nextCard,
            {
              yPercent: 0,
              rotationX: 0,
              opacity: 1,
              scale: 1,
              duration: 2,
              ease: "power2.inOut",
            },
            "<"
          )
          .set(nextCard, { pointerEvents: "auto" });
      }
    });

    ScrollTrigger.create({
      animation: tl,
      trigger: "#experience",
      start: "top top",
      end: () => `+=${tl.duration() * 300}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });
  }, []);

  // Once fonts swap (Inter / Azonix), the content's scrollHeight changes.
  // Refresh propagates new measurements through the functional `y` values
  // above via invalidateOnRefresh. Pin is already registered so this only
  // corrects measurements — the user can't outrun setup any more.
  useEffect(() => {
    if (typeof document === "undefined" || !document.fonts) return;
    if (document.fonts.status === "loaded") return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full flex-1 flex items-center justify-center relative">
      <div className="relative w-full max-w-4xl h-[60vh] md:h-[70vh] perspective-1000">
        {experienceData.map((experience, index) => (
          <div
            key={experience.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <WorkExperienceCard
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              experience={experience}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce pointer-events-none">
        <span className="text-xs uppercase tracking-widest text-gray-400">
          Scroll to Read & Flip
        </span>
        <div className="w-1 h-8 rounded-full bg-gradient-to-b from-gray-400 to-transparent" />
      </div>
    </div>
  );
};
