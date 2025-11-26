import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MobileAboutMeCard from "./about-me-content/mobile-about-me-card";

gsap.registerPlugin(ScrollTrigger);

export default function MobileAboutMe() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const firstTextRef = useRef<HTMLDivElement>(null);
  const secondImageCardRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !headingRef.current ||
      !imageCardRef.current ||
      !firstTextRef.current ||
      !secondImageCardRef.current ||
      !secondTextRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(headingRef.current, { y: 30, opacity: 0 });
      gsap.set(imageCardRef.current, { y: 50, opacity: 0 });
      gsap.set(firstTextRef.current, { y: 50, opacity: 0 });
      gsap.set(secondImageCardRef.current, { y: 50, opacity: 0 });
      gsap.set(secondTextRef.current, { y: 50, opacity: 0 });

      // Heading animation
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(headingRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          });
        },
        once: true,
      });

      // Image card animation
      ScrollTrigger.create({
        trigger: imageCardRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(imageCardRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          });
        },
        once: true,
      });

      // First text card animation
      ScrollTrigger.create({
        trigger: firstTextRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(firstTextRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          });
        },
        once: true,
      });

      // Second image card animation
      ScrollTrigger.create({
        trigger: secondImageCardRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(secondImageCardRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          });
        },
        once: true,
      });

      // Second text card animation
      ScrollTrigger.create({
        trigger: secondTextRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(secondTextRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          });
        },
        once: true,
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about-me-mobile"
      className="relative w-full bg-transparent text-white py-12"
    >
      <div className="w-full max-w-7xl mx-auto px-8 mb-8">
        <h2
          ref={headingRef}
          className="text-2xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500"
        >
          About Me
        </h2>
      </div>

      <MobileAboutMeCard
        imageCardRef={imageCardRef}
        firstTextRef={firstTextRef}
        secondImageCardRef={secondImageCardRef}
        secondTextRef={secondTextRef}
      />
    </section>
  );
}
