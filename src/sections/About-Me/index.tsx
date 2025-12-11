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

  const hasAnimated = useRef(false);

  useLayoutEffect(() => {
    if (
      !headingRef.current ||
      !leftCardRef.current ||
      !middleCardRef.current ||
      !rightCardRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set("#about-me", { opacity: 0 });
      gsap.set(leftCardRef.current, { x: -100, opacity: 0 });
      gsap.set(rightCardRef.current, { x: 100, opacity: 0 });
      gsap.set(middleCardRef.current, { y: 100, opacity: 0 });

      // Create the timeline (Paused initially)
      const tl = gsap.timeline({ paused: true });

      // Build the animation timeline
      tl.to("#about-me", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      })
        .fromTo(
          headingRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" }
        )
        .to(
          [leftCardRef.current, rightCardRef.current, middleCardRef.current],
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power2.out",
            // stagger: 0.5,
          },
          "-=0.2"
        );

      ScrollTrigger.create({
        trigger: "#about-me",
        start: "top 60%", // Start earlier/easier
        end: "bottom bottom",
        onEnter: () => {
          if (!hasAnimated.current) {
            // First time: Play full animation
            tl.play();
            hasAnimated.current = true;
          } else {
            // Subsequent times: Just fade in instantly/smoothly
            gsap.to("#about-me", { opacity: 1, duration: 0.5 });
          }
        },
        onLeaveBack: () => {
          // Fade out when leaving back upwards
          gsap.to("#about-me", { opacity: 0, duration: 0.3 });
        },
      });
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
