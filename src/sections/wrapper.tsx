import AboutMe from "./About-Me";
import Hero from "./Hero";
import LightRays from "./Hero/background/LightRays";
import LazyComputers from "./Hero/model/LazyComputers";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useLenis } from "../components/providers/context";

export default function Wrapper() {
  const isScrolling = useRef(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If we are already animating a scroll, ignore wheel events
      if (isScrolling.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const currentScroll = lenis ? lenis.scroll : window.scrollY;
      const targetScroll = window.innerHeight; // About Me starts at 100vh

      // console.log("Checking:", { currentScroll, targetScroll, deltaY: e.deltaY });
      // Threshold to detect intent (avoid tiny accidental trackpad jitters)
      if (Math.abs(e.deltaY) < 2) return;

      // Scrolling Down from Home (0 to near bottom of home)
      // Check if we are in the visual range of the first section
      if (e.deltaY > 0 && currentScroll < targetScroll - 50) {
        e.preventDefault();
        e.stopPropagation();
        isScrolling.current = true;

        if (lenis) {
          // lenis.stop() removed - it pauses the loop!
          lenis.scrollTo(targetScroll, {
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            lock: true, // This handles the locking
            onComplete: () => {
              isScrolling.current = false;
            },
          });
        } else {
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
          setTimeout(() => {
            isScrolling.current = false;
          }, 800);
        }
      }
      // Scrolling Up from About Me (Top of About Me or transition zone)
      else if (
        e.deltaY < 0 &&
        currentScroll > 0 &&
        currentScroll <= targetScroll + 50
      ) {
        e.preventDefault();
        e.stopPropagation();
        isScrolling.current = true;

        if (lenis) {
          // lenis.stop() removed
          lenis.scrollTo(0, {
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            lock: true,
            onComplete: () => {
              isScrolling.current = false;
            },
          });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => {
            isScrolling.current = false;
          }, 800);
        }
      }
    };

    // Delay binding the listener to allow the page/3D model to fully hydrate and settle
    // This prevents "jank" during the first second of load
    const timeoutId = setTimeout(() => {
      window.addEventListener("wheel", handleWheel, { passive: false });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [lenis]);

  return (
    <section
      id="wrapper"
      className="relative w-full"
      style={{ minHeight: "200vh" }}
    >
      {/* Background Layer - Absolutely positioned to prevent layout shifts */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-screen z-0 bg-black pointer-events-none"
        style={{ backgroundColor: "black" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={0.8}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </motion.div>

      {/* 3D Model - Absolute positioned so GSAP pin can control it */}
      <div
        id="model-container"
        className="absolute top-0 left-0 right-0 h-screen z-0 pointer-events-none"
      >
        <LazyComputers modelPath="https://jjv5kewiwbig2jji.public.blob.vercel-storage.com/scene.compressed.glb" />
      </div>

      {/* Sections - Start at very top of page */}
      <div className="relative z-10">
        <Hero />
        <AboutMe />
      </div>
    </section>
  );
}
