import AboutMe from "./About-Me";
import Hero from "./Hero";
import LightRays from "./Hero/background/LightRays";
import LazyComputers from "./Hero/model/LazyComputers";
import { motion } from "motion/react";
// import { useEffect, useRef } from "react"; // Removed unused imports
// import { useLenis } from "../components/providers/context"; // Removed unused imports

export default function Wrapper() {
  // Scroll hijacking logic removed to fix severe performance lag.
  // GSAP animations are driven by ScrollTrigger and will function naturally with Lenis smooth scroll.

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
        <LazyComputers modelPath="/desktop_pc/scene.compressed.glb" />
      </div>

      {/* Sections - Start at very top of page */}
      <div className="relative z-10">
        <Hero />
        <AboutMe />
      </div>
    </section>
  );
}
