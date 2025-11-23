import { HomeTitle } from "./hero-content/greet";
import LightRays from "./background/LightRays";
import ComputersCanvas from "./model/Computers";
import { Taglines } from "./hero-content/taglines";
import { HomeInfoGrid } from "./hero-content/info";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Layer */}
      <div
        className="absolute inset-0 z-0 bg-black"
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

      <div className="absolute inset-0 z-10">
        <ComputersCanvas />
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-start pt-32 pl-8 md:pl-20 pointer-events-none">
        <div className="pointer-events-auto">
          <HomeTitle />
        </div>
        <div className="pointer-events-auto mt-10">
          <Taglines />
        </div>
        <div className="mt-8 flex items-center">
          <HomeInfoGrid />
        </div>
      </div>
    </section>
  );
}
