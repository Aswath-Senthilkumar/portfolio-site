import { HomeTitle } from "./hero-content/greet";
import LightRays from "./background/LightRays";
import ComputersCanvas from "./model/Computers";
import { Taglines } from "./hero-content/taglines";
import { HomeInfoGrid } from "./hero-content/info";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-transparent"
    >
      {/* Content Layer */}
      <div
        id="content-container"
        className="absolute inset-0 z-12 flex flex-col items-start justify-start pt-32 pl-8 md:pl-20 pointer-events-none"
      >
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
