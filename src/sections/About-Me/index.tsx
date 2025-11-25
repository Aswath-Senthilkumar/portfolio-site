import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutMeCard from "./about-me-content/about-me-card";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    // Section fade-in at 50% wrapper scroll
    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#wrapper",
          start: "center top", // 50%: When wrapper center reaches top
          end: "center top",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
          // markers: {
          //   startColor: "yellow",
          //   endColor: "orange",
          //   fontSize: "12px",
          // },
        },
      }
    );

    // Heading animation (slightly after fade-in)
    gsap.fromTo(
      headingRef.current,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#wrapper",
          start: "center top", // 50%: Synced with section fade-in
          end: "60% top",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (
          t.trigger === sectionRef.current ||
          t.trigger === headingRef.current
        ) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-me"
      className="relative min-h-screen w-full bg-transparent text-white flex flex-col items-center justify-start pt-20 z-20"
      style={{ opacity: 0 }}
    >
      <div className="w-full max-w-7xl px-8 mb-4">
        <h2
          ref={headingRef}
          className="text-2xl md:text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500"
        >
          About Me
        </h2>
        {/* <p className="relative z-10 text-center text-gray-400 max-w-2xl mx-auto">
          A journey through my professional career, building scalable
          applications and leading engineering teams.
        </p> */}
      </div>

      <AboutMeCard />
    </section>
  );
}
