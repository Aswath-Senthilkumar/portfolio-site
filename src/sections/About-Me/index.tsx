import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutMeCard from "./about-me-content/about-me-card";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const middleCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !headingRef.current ||
      !leftCardRef.current ||
      !middleCardRef.current ||
      !rightCardRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Set initial states immediately
      gsap.set("#about-me", { opacity: 0 });

      // Initial positions: Left (off-screen left), Right (off-screen right), Middle (below)
      gsap.set(leftCardRef.current, { x: -100, opacity: 0 });
      gsap.set(rightCardRef.current, { x: 100, opacity: 0 });
      gsap.set(middleCardRef.current, { y: 100, opacity: 0 });

      // Pin the About section and animate cards with scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about-me",
          start: "top bottom", // Start animating as soon as it enters
          end: "bottom bottom", // Finish exactly when the bottom hits the viewport bottom
          pin: false,
          scrub: true, // Strict sync to ensure it finishes exactly at the end position
          onEnter: () => {
            // Ensure opacity is 1 when entering
            gsap.to("#about-me", {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            // Fade out when scrolling back up
            gsap.to("#about-me", {
              opacity: 0,
              duration: 0.3,
            });
          },
        },
      });

      // 1. Heading enters
      tl.fromTo(
        headingRef.current,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      )
        // 2. All cards enter simultaneously
        .to(
          leftCardRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.1,
            ease: "power3.out",
            stagger: 0.2, // Smooth slide in
          },
          "-=0.2" // Start just before heading finishes
        )
        .to(
          rightCardRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.1,
            ease: "power3.out",
            stagger: 0.2, // Smooth slide in
          },
          "<" // Sync with Left card
        )
        .to(
          middleCardRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.1,
            ease: "power3.out",
            stagger: 0.2, // Smooth slide up
          },
          "<" // Sync with Left/Right cards
        );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about-me"
      className="relative min-h-screen w-full bg-transparent text-white flex flex-col items-center justify-start pt-20 z-20"
    >
      <div className="w-full max-w-7xl px-8">
        <h2
          ref={headingRef}
          className="text-2xl md:text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500"
        >
          About Me
        </h2>
      </div>

      <AboutMeCard
        leftCardRef={leftCardRef}
        middleCardRef={middleCardRef}
        rightCardRef={rightCardRef}
      />
    </section>
  );
}
