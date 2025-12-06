import AboutMe from "./About-Me";
import Hero from "./Hero";
import LightRays from "./Hero/background/LightRays";
import ComputersCanvas from "./Hero/model/Computers";

export default function Wrapper() {
  return (
    <section
      id="wrapper"
      className="relative w-full"
      style={{ minHeight: "200vh" }}
    >
      {/* Background Layer - Absolutely positioned to prevent layout shifts */}
      <div
        className="absolute top-0 left-0 right-0 h-screen z-0 bg-black pointer-events-none"
        style={{ backgroundColor: "black" }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      {/* 3D Model - Absolute positioned so GSAP pin can control it */}
      <div
        id="model-container"
        className="absolute top-0 left-0 right-0 h-screen z-0 pointer-events-none"
      >
        <ComputersCanvas />
      </div>

      {/* Sections - Start at very top of page */}
      <div className="relative z-10">
        <Hero />
        <AboutMe />
      </div>
    </section>
  );
}
